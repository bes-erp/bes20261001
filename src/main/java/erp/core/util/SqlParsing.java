package erp.core.util;


import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import com.p6spy.engine.spy.appender.MessageFormattingStrategy;

/**
 * =====================================================================================
 * @packageName         : erp.core.util
 * @fileName            : SqlParsing.java
 * @author              : Built1
 * @date                : 2026.11.11
 * @description         : p6spy SQL 및 PL/SQL 로그 포맷팅
 * =====================================================================================
 * 수정일자             수정자             수정내용
 * -------------------------------------------------------------------------------------
 * 2026.10.15           Built1             최초 생성
 * 2026.10.19           Built1             PL/SQL 프로시저 호출문 포맷팅 추가
 * 2026.10.21           Built1             문자열/주석 보호, SQL 포맷팅 안정화
 * 2026.11.11           Built1             서브쿼리(인라인뷰/스칼라/IN/EXISTS) 재귀 포맷팅,
 *                                         UNION/MINUS 등 집합연산자, WITH절 처리,
 *                                         select 직후 주석(쿼리ID) 줄 분리
 * =====================================================================================
 */
public class SqlParsing implements MessageFormattingStrategy {

    private static final String INDENT_SELECT = "       ";
    private static final String INDENT_COMMA = "     , ";

    /** 서브쿼리 자리표시자 (예: __SQ0__) */
    private static final String SUBQUERY_KEY_PREFIX = "__SQ";
    private static final String SUBQUERY_KEY_SUFFIX = "__";

    @Override
    public String formatMessage(
            int connectionId,
            String now,
            long elapsed,
            String category,
            String prepared,
            String sql,
            String url) {

        if (sql == null || sql.trim().isEmpty()) {
            return "";
        }

        String formattedSql = pretty(sql);

        return "\n\n/* [ 쿼리실행시간 ] : " + elapsed + " ms */\n"
                + formattedSql.trim()
                + "\n";
    }

    /**
     * SQL 문자열을 포맷팅한다.
     * 1) 괄호 안의 서브쿼리는 자리표시자로 치환하고 재귀적으로 따로 포맷팅한다.
     * 2) UNION / MINUS 등 집합연산자 기준으로 나누어 각 문장을 포맷팅한다.
     * 3) 자리표시자 위치에 포맷팅된 서브쿼리를 들여쓰기하여 되돌려 넣는다.
     * 문자열 리터럴 및 주석 안의 키워드/콤마는 변경하지 않는다.
     */
    private String pretty(String sql) {
        String text = normalizeWhitespace(sql).trim();

        if (text.isEmpty()) {
            return text;
        }

        String lower = text.toLowerCase(Locale.ROOT);

        if (lower.startsWith("begin") || lower.startsWith("declare")) {
            return formatPlsqlCall(text);
        }

        List<String> subqueries = new ArrayList<>();
        text = extractSubqueries(text, subqueries);

        List<String> parts = splitSetOperators(text);
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < parts.size(); i++) {
            if (i % 2 == 0) {
                out.append(formatStatement(parts.get(i)));
            } else {
                // 집합연산자 (union all, minus 등)
                out.append("\n ").append(parts.get(i)).append("\n");
            }
        }

        return restoreSubqueries(out.toString(), subqueries).trim();
    }

    /**
     * 서브쿼리가 제거된 단일 문장을 포맷팅한다.
     */
    private String formatStatement(String sql) {
        String text = sql.trim();

        if (text.isEmpty()) {
            return text;
        }

        String lower = text.toLowerCase(Locale.ROOT);

        // WITH절: CTE 정의부와 본문 select를 분리
        if (lower.startsWith("with ")) {
            int selectIdx = indexOfTopLevelWord(text, "select");
            if (selectIdx > 0) {
                String head = splitTopLevelCommas(text.substring(0, selectIdx).trim());
                return head + "\n" + formatStatement(text.substring(selectIdx));
            }
            return text;
        }

        text = formatKeywords(text, lower.startsWith("update "));
        text = splitTopLevelCommas(text);

        if (lower.startsWith("select ")) {
            text = text.replaceFirst("(?i)^select\\s+", "select\n" + INDENT_SELECT);
            // select 직후 블록 주석(MyBatis 쿼리ID, 힌트 등)은 별도 줄로 분리
            text = text.replaceFirst("(?s)^(select\\n" + INDENT_SELECT + "/\\*.*?\\*/)[ ]*",
                    "$1\n" + INDENT_SELECT);
            text = alignSelectAs(text);
            text = alignJoinCondition(text);
            text = alignWhereCondition(text);
        } else if (lower.startsWith("update ")) {
            text = text.replaceFirst("(?i)\\s+set\\s+", "\n   set ");
            text = alignUpdateSet(text);
            text = alignWhereCondition(text);
        } else if (lower.startsWith("delete")) {
            text = text.replaceFirst("(?i)^delete\\s+", "delete ");
            text = alignWhereCondition(text);
        } else if (lower.startsWith("insert ")) {
            text = text.replaceFirst("(?i)^insert\\s+into\\s+", "insert into ");
            text = text.replaceFirst("(?i)\\s+values\\s*\\(", "\nvalues (\n       ");
        }

        return text.replaceAll("(?i)where\\s+1\\s*=\\s*1", "where 1=1").trim();
    }

    // =================================================================================
    // 서브쿼리 / 집합연산자 처리
    // =================================================================================

    /**
     * 괄호 안 내용이 select / with 로 시작하면 서브쿼리로 보고
     * 재귀 포맷팅한 결과를 목록에 담고 원문은 자리표시자로 바꾼다.
     * 함수 괄호 nvl( ... ) 등은 그대로 두되, 그 안의 서브쿼리는 찾아낸다.
     */
    private String extractSubqueries(String text, List<String> subqueries) {
        StringBuilder out = new StringBuilder();
        int i = 0;

        while (i < text.length()) {
            int end = skipLiteral(text, i);
            if (end > i) {
                out.append(text, i, end);
                i = end;
                continue;
            }

            char ch = text.charAt(i);
            if (ch == '(') {
                int close = findCloseParen(text, i);
                if (close > i) {
                    String inner = text.substring(i + 1, close).trim();
                    if (isQuery(inner)) {
                        String key = SUBQUERY_KEY_PREFIX + subqueries.size() + SUBQUERY_KEY_SUFFIX;
                        subqueries.add(pretty(inner));
                        out.append('(').append(key).append(')');
                        i = close + 1;
                        continue;
                    }
                }
            }

            out.append(ch);
            i++;
        }
        return out.toString();
    }

    private boolean isQuery(String text) {
        return text.matches("(?is)^(select|with)\\b.*");
    }

    /**
     * 자리표시자를 포맷팅된 서브쿼리로 되돌린다.
     * 여는 괄호 다음 열을 기준으로 서브쿼리 전체를 들여쓰기하고,
     * 닫는 괄호는 여는 괄호와 같은 열에 맞춘다.
     */
    private String restoreSubqueries(String text, List<String> subqueries) {
        for (int n = 0; n < subqueries.size(); n++) {
            String key = SUBQUERY_KEY_PREFIX + n + SUBQUERY_KEY_SUFFIX;
            int idx = text.indexOf(key);
            if (idx < 0) {
                continue;
            }

            int lineStart = text.lastIndexOf('\n', idx) + 1;
            int col = idx - lineStart;
            String pad = spaces(col);
            String closePad = spaces(Math.max(0, col - 1));

            StringBuilder block = new StringBuilder("\n");
            for (String line : subqueries.get(n).split("\n", -1)) {
                block.append(pad).append(line).append("\n");
            }
            block.append(closePad);

            text = text.substring(0, idx) + block + text.substring(idx + key.length());
        }
        return text;
    }

    /**
     * 최상위(괄호 깊이 0) 집합연산자 기준으로 문장을 나눈다.
     * 반환 목록: [문장, 연산자, 문장, 연산자, 문장 ...]
     */
    private List<String> splitSetOperators(String text) {
        List<String> parts = new ArrayList<>();
        int depth = 0;
        int last = 0;
        int i = 0;

        while (i < text.length()) {
            int end = skipLiteral(text, i);
            if (end > i) {
                i = end;
                continue;
            }

            char ch = text.charAt(i);
            if (ch == '(') {
                depth++;
                i++;
                continue;
            }
            if (ch == ')') {
                depth = Math.max(0, depth - 1);
                i++;
                continue;
            }

            if (Character.isLetter(ch) || ch == '_') {
                int start = i;
                i = readWordEnd(text, i);
                String upper = text.substring(start, i).toUpperCase(Locale.ROOT);

                if (depth == 0 && ("UNION".equals(upper) || "INTERSECT".equals(upper)
                        || "MINUS".equals(upper) || "EXCEPT".equals(upper))) {
                    int opEnd = i;
                    if ("UNION".equals(upper)) {
                        int j = skipWhitespace(text, i);
                        int k = readWordEnd(text, j);
                        if ("ALL".equalsIgnoreCase(text.substring(j, k))) {
                            opEnd = k;
                        }
                    }
                    parts.add(text.substring(last, start).trim());
                    parts.add(text.substring(start, opEnd).replaceAll("\\s+", " "));
                    last = opEnd;
                    i = opEnd;
                }
                continue;
            }
            i++;
        }

        parts.add(text.substring(last).trim());
        return parts;
    }

    /**
     * 최상위(괄호 깊이 0)에서 주어진 단어의 시작 위치를 찾는다. 없으면 -1.
     */
    private int indexOfTopLevelWord(String text, String word) {
        int depth = 0;
        int i = 0;

        while (i < text.length()) {
            int end = skipLiteral(text, i);
            if (end > i) {
                i = end;
                continue;
            }

            char ch = text.charAt(i);
            if (ch == '(') {
                depth++;
            } else if (ch == ')') {
                depth = Math.max(0, depth - 1);
            } else if (Character.isLetter(ch) || ch == '_') {
                int start = i;
                i = readWordEnd(text, i);
                if (depth == 0 && word.equalsIgnoreCase(text.substring(start, i))) {
                    return start;
                }
                continue;
            }
            i++;
        }
        return -1;
    }

    /**
     * i 위치가 문자열/따옴표 식별자/주석의 시작이면 그 끝(다음 위치)을 반환한다.
     * 아니면 -1.
     */
    private int skipLiteral(String text, int i) {
        char ch = text.charAt(i);
        char next = i + 1 < text.length() ? text.charAt(i + 1) : '\0';

        if (ch == '-' && next == '-') {
            int nl = text.indexOf('\n', i);
            return nl < 0 ? text.length() : nl + 1;
        }
        if (ch == '/' && next == '*') {
            int close = text.indexOf("*/", i + 2);
            return close < 0 ? text.length() : close + 2;
        }
        if (ch == '\'' || ch == '"') {
            int j = i + 1;
            while (j < text.length()) {
                if (text.charAt(j) == ch) {
                    if (j + 1 < text.length() && text.charAt(j + 1) == ch) {
                        j += 2;
                        continue;
                    }
                    return j + 1;
                }
                j++;
            }
            return text.length();
        }
        return -1;
    }

    /**
     * 문자열/주석을 고려하여 짝이 맞는 닫는 괄호 위치를 찾는다. 없으면 -1.
     */
    private int findCloseParen(String text, int openIdx) {
        int depth = 0;
        int i = openIdx;

        while (i < text.length()) {
            int end = skipLiteral(text, i);
            if (end > i) {
                i = end;
                continue;
            }

            char ch = text.charAt(i);
            if (ch == '(') {
                depth++;
            } else if (ch == ')' && --depth == 0) {
                return i;
            }
            i++;
        }
        return -1;
    }

    private int readWordEnd(String text, int start) {
        int i = start;
        while (i < text.length()
                && (Character.isLetterOrDigit(text.charAt(i))
                || text.charAt(i) == '_'
                || text.charAt(i) == '$'
                || text.charAt(i) == '#')) {
            i++;
        }
        return i;
    }

    private String spaces(int count) {
        StringBuilder sb = new StringBuilder(count);
        for (int i = 0; i < count; i++) {
            sb.append(' ');
        }
        return sb.toString();
    }

    // =================================================================================
    // 기존 포맷팅 로직
    // =================================================================================

    /**
     * SQL 문자열/주석 영역을 보존하면서 일반 공백만 정리한다.
     */
    private String normalizeWhitespace(String sql) {
        StringBuilder out = new StringBuilder();
        boolean inString = false;
        boolean inQuotedIdentifier = false;
        boolean inLineComment = false;
        boolean inBlockComment = false;
        boolean pendingSpace = false;

        for (int i = 0; i < sql.length(); i++) {
            char ch = sql.charAt(i);
            char next = i + 1 < sql.length() ? sql.charAt(i + 1) : '\0';

            if (inLineComment) {
                out.append(ch);
                if (ch == '\n' || ch == '\r') {
                    inLineComment = false;
                }
                continue;
            }
            if (inBlockComment) {
                out.append(ch);
                if (ch == '*' && next == '/') {
                    out.append(next);
                    i++;
                    inBlockComment = false;
                }
                continue;
            }
            if (inString) {
                out.append(ch);
                if (ch == '\'' && next == '\'') {
                    out.append(next);
                    i++;
                } else if (ch == '\'') {
                    inString = false;
                }
                continue;
            }
            if (inQuotedIdentifier) {
                out.append(ch);
                if (ch == '"' && next == '"') {
                    out.append(next);
                    i++;
                } else if (ch == '"') {
                    inQuotedIdentifier = false;
                }
                continue;
            }

            if (ch == '-' && next == '-') {
                if (pendingSpace && out.length() > 0) out.append(' ');
                pendingSpace = false;
                out.append(ch).append(next);
                i++;
                inLineComment = true;
            } else if (ch == '/' && next == '*') {
                if (pendingSpace && out.length() > 0) out.append(' ');
                pendingSpace = false;
                out.append(ch).append(next);
                i++;
                inBlockComment = true;
            } else if (ch == '\'') {
                if (pendingSpace && out.length() > 0) out.append(' ');
                pendingSpace = false;
                out.append(ch);
                inString = true;
            } else if (ch == '"') {
                if (pendingSpace && out.length() > 0) out.append(' ');
                pendingSpace = false;
                out.append(ch);
                inQuotedIdentifier = true;
            } else if (Character.isWhitespace(ch)) {
                pendingSpace = true;
            } else {
                if (pendingSpace && out.length() > 0
                        && out.charAt(out.length() - 1) != '\n') {
                    out.append(' ');
                }
                pendingSpace = false;
                out.append(ch);
            }
        }
        return out.toString();
    }

    /**
     * SQL 키워드 앞에 개행을 넣는다.
     * 문자열과 주석 내부는 건드리지 않는다.
     */
    private String formatKeywords(String sql, boolean update) {
        StringBuilder out = new StringBuilder();
        boolean inString = false;
        boolean inQuotedIdentifier = false;
        boolean inLineComment = false;
        boolean inBlockComment = false;
        int depth = 0;

        // between 조건의 and 구분 여부
        boolean betweenPending = false;

        for (int i = 0; i < sql.length();) {
            char ch = sql.charAt(i);
            char next = i + 1 < sql.length() ? sql.charAt(i + 1) : '\0';

            if (inLineComment) {
                out.append(ch);
                i++;
                if (ch == '\n' || ch == '\r') {
                    inLineComment = false;
                }
                continue;
            }

            if (inBlockComment) {
                out.append(ch);
                i++;
                if (ch == '*' && next == '/') {
                    out.append(next);
                    i++;
                    inBlockComment = false;
                }
                continue;
            }

            if (inString) {
                out.append(ch);
                i++;
                if (ch == '\'' && next == '\'') {
                    out.append(next);
                    i++;
                } else if (ch == '\'') {
                    inString = false;
                }
                continue;
            }

            if (inQuotedIdentifier) {
                out.append(ch);
                i++;
                if (ch == '"' && next == '"') {
                    out.append(next);
                    i++;
                } else if (ch == '"') {
                    inQuotedIdentifier = false;
                }
                continue;
            }

            if (ch == '-' && next == '-') {
                out.append(ch).append(next);
                i += 2;
                inLineComment = true;
                continue;
            }

            if (ch == '/' && next == '*') {
                out.append(ch).append(next);
                i += 2;
                inBlockComment = true;
                continue;
            }

            if (ch == '\'') {
                out.append(ch);
                i++;
                inString = true;
                continue;
            }

            if (ch == '"') {
                out.append(ch);
                i++;
                inQuotedIdentifier = true;
                continue;
            }

            if (ch == '(') {
                depth++;
            }

            if (ch == ')') {
                depth = Math.max(0, depth - 1);
            }

            if (Character.isLetter(ch) || ch == '_') {
                int start = i;
                i = readWordEnd(sql, i);

                String word = sql.substring(start, i);
                String upper = word.toUpperCase(Locale.ROOT);
                String nextWord = peekNextWord(sql, i).toUpperCase(Locale.ROOT);

                String newline = null;

                // between 조건 확인
                if (depth == 0 && "BETWEEN".equals(upper)) {
                    betweenPending = true;
                }

                if (depth == 0) {
                    if ("FROM".equals(upper)) {
                        newline = "\n  ";
                    } else if ("LEFT".equals(upper) && "JOIN".equals(nextWord)) {
                        newline = "\n ";
                    } else if ("RIGHT".equals(upper) && "JOIN".equals(nextWord)) {
                        newline = "\n ";
                    } else if ("INNER".equals(upper) && "JOIN".equals(nextWord)) {
                        newline = "\n ";
                    } else if ("JOIN".equals(upper)) {
                        newline = "\n ";
                    } else if ("ON".equals(upper)) {
                        newline = "\n   ";
                    } else if ("WHERE".equals(upper)) {
                        newline = "\n ";
                    } else if ("AND".equals(upper)) {
                        if (betweenPending) {
                            // between 조건의 and는 줄바꿈하지 않음
                            newline = null;
                            betweenPending = false;
                        } else {
                            newline = "\n   ";
                        }
                    } else if ("OR".equals(upper)) {
                        newline = "\n    ";
                    } else if ("ORDER".equals(upper) && "BY".equals(nextWord)) {
                        newline = "\n ";
                    } else if ("GROUP".equals(upper) && "BY".equals(nextWord)) {
                        newline = "\n ";
                    } else if ("HAVING".equals(upper)) {
                        newline = "\n ";
                    } else if (update && "SET".equals(upper)) {
                        newline = "\n   ";
                    }
                }

                if (newline != null && out.length() > 0) {
                    trimTrailingSpaces(out);
                    out.append(newline).append(word);

                    // ORDER BY / GROUP BY의 BY 앞 공백을 유지한다.
                    if (("ORDER".equals(upper) || "GROUP".equals(upper))
                            && "BY".equals(nextWord)) {

                        i = skipWhitespace(sql, i);
                        int byStart = i;

                        while (i < sql.length()
                                && Character.isLetter(sql.charAt(i))) {
                            i++;
                        }

                        out.append(' ');
                        out.append(sql, byStart, i);
                    }
                } else {
                    out.append(word);
                }

                continue;
            }

            out.append(ch);
            i++;
        }

        return out.toString();
    }

    private String peekNextWord(String text, int start) {
        int i = skipWhitespace(text, start);
        int begin = i;
        while (i < text.length() && Character.isLetter(text.charAt(i))) i++;
        return text.substring(begin, i);
    }

    private int skipWhitespace(String text, int start) {
        int i = start;
        while (i < text.length() && Character.isWhitespace(text.charAt(i))) i++;
        return i;
    }

    private void trimTrailingSpaces(StringBuilder sb) {
        while (sb.length() > 0 && sb.charAt(sb.length() - 1) == ' ') {
            sb.setLength(sb.length() - 1);
        }
    }

    /**
     * 괄호 깊이가 0인 콤마만 개행 처리한다.
     * 문자열과 주석 안의 콤마는 보존한다.
     */
    private String splitTopLevelCommas(String sql) {
        StringBuilder out = new StringBuilder();
        boolean inString = false;
        boolean inQuotedIdentifier = false;
        boolean inLineComment = false;
        boolean inBlockComment = false;
        int depth = 0;

        for (int i = 0; i < sql.length(); i++) {
            char ch = sql.charAt(i);
            char next = i + 1 < sql.length() ? sql.charAt(i + 1) : '\0';

            if (inLineComment) {
                out.append(ch);
                if (ch == '\n' || ch == '\r') inLineComment = false;
                continue;
            }
            if (inBlockComment) {
                out.append(ch);
                if (ch == '*' && next == '/') {
                    out.append(next);
                    i++;
                    inBlockComment = false;
                }
                continue;
            }
            if (inString) {
                out.append(ch);
                if (ch == '\'' && next == '\'') {
                    out.append(next);
                    i++;
                } else if (ch == '\'') {
                    inString = false;
                }
                continue;
            }
            if (inQuotedIdentifier) {
                out.append(ch);
                if (ch == '"' && next == '"') {
                    out.append(next);
                    i++;
                } else if (ch == '"') {
                    inQuotedIdentifier = false;
                }
                continue;
            }
            if (ch == '-' && next == '-') {
                out.append(ch).append(next);
                i++;
                inLineComment = true;
                continue;
            }
            if (ch == '/' && next == '*') {
                out.append(ch).append(next);
                i++;
                inBlockComment = true;
                continue;
            }
            if (ch == '\'') {
                out.append(ch);
                inString = true;
            } else if (ch == '"') {
                out.append(ch);
                inQuotedIdentifier = true;
            } else if (ch == '(') {
                depth++;
                out.append(ch);
            } else if (ch == ')') {
                depth = Math.max(0, depth - 1);
                out.append(ch);
            } else if (ch == ',' && depth == 0) {
                trimTrailingSpaces(out);
                out.append("\n").append(INDENT_COMMA);
                while (i + 1 < sql.length() && Character.isWhitespace(sql.charAt(i + 1))) i++;
            } else {
                out.append(ch);
            }
        }
        return out.toString();
    }

    private String alignSelectAs(String sql) {
        String[] lines = sql.split("\n", -1);
        int maxLen = 0;

        for (String line : lines) {
            int idx = indexOfOutsideString(line, " as ");
            if (idx >= 0) {
                String expr = line.substring(0, idx).trim().replaceFirst("^,\\s*", "");
                maxLen = Math.max(maxLen, expr.length());
            }
        }

        StringBuilder out = new StringBuilder();
        for (String line : lines) {
            int idx = indexOfOutsideString(line, " as ");
            if (idx >= 0) {
                String left = line.substring(0, idx);
                String alias = line.substring(idx + 4).trim();
                String indent = left.replaceAll("^([^\\S\\r\\n]*).*", "$1");
                String expr = left.trim();
                String comma = "";
                if (expr.startsWith(",")) {
                    comma = ", ";
                    expr = expr.substring(1).trim();
                }
                out.append(indent).append(comma)
                        .append(String.format(Locale.ROOT, "%-" + maxLen + "s as %s", expr, alias));
            } else {
                out.append(line);
            }
            out.append("\n");
        }
        return out.toString().replaceFirst("\\n$", "");
    }

    private int indexOfOutsideString(String text, String target) {
        boolean inString = false;
        boolean inQuotedIdentifier = false;
        boolean inLineComment = false;
        boolean inBlockComment = false;

        for (int i = 0; i <= text.length() - target.length(); i++) {
            char ch = text.charAt(i);
            char next = i + 1 < text.length() ? text.charAt(i + 1) : '\0';

            if (!inString && !inQuotedIdentifier && !inLineComment && !inBlockComment
                    && text.regionMatches(true, i, target, 0, target.length())) {
                return i;
            }
            if (inLineComment) {
                if (ch == '\n' || ch == '\r') inLineComment = false;
                continue;
            }
            if (inBlockComment) {
                if (ch == '*' && next == '/') {
                    inBlockComment = false;
                    i++;
                }
                continue;
            }
            if (inString) {
                if (ch == '\'' && next == '\'') i++;
                else if (ch == '\'') inString = false;
            } else if (inQuotedIdentifier) {
                if (ch == '"' && next == '"') i++;
                else if (ch == '"') inQuotedIdentifier = false;
            } else if (ch == '-' && next == '-') {
                inLineComment = true;
                i++;
            } else if (ch == '/' && next == '*') {
                inBlockComment = true;
                i++;
            } else if (ch == '\'') {
                inString = true;
            } else if (ch == '"') {
                inQuotedIdentifier = true;
            }
        }
        return -1;
    }

    private String alignUpdateSet(String sql) {
        String[] lines = sql.split("\n", -1);
        int maxLen = 0;
        for (String line : lines) {
            String trim = line.trim().toLowerCase(Locale.ROOT);
            if (trim.startsWith("set ") || trim.startsWith(",")) {
                int idx = indexOfOutsideString(line, "=");
                if (idx > 0) {
                    String left = line.substring(0, idx)
                            .replaceFirst("(?i)^\\s*set\\s+", "")
                            .replaceFirst("^\\s*,\\s*", "").trim();
                    maxLen = Math.max(maxLen, left.length());
                }
            }
        }

        StringBuilder out = new StringBuilder();
        for (String line : lines) {
            String trim = line.trim().toLowerCase(Locale.ROOT);
            int idx = indexOfOutsideString(line, "=");
            if ((trim.startsWith("set ") || trim.startsWith(",")) && idx > 0) {
                String left = line.substring(0, idx)
                        .replaceFirst("(?i)^\\s*set\\s+", "")
                        .replaceFirst("^\\s*,\\s*", "").trim();
                String right = line.substring(idx + 1).trim();
                if (trim.startsWith("set ")) {
                    out.append(String.format(Locale.ROOT, "   set %-" + maxLen + "s = %s", left, right));
                } else {
                    out.append(String.format(Locale.ROOT, "     , %-" + maxLen + "s = %s", left, right));
                }
            } else {
                out.append(line);
            }
            out.append("\n");
        }
        return out.toString().replaceFirst("\\n$", "");
    }

    private String alignWhereCondition(String sql) {
        String[] lines = sql.split("\n", -1);
        int maxLen = 0;

        for (String line : lines) {
            String trim = line.trim().toLowerCase(Locale.ROOT);
            if (trim.startsWith("where ") || trim.startsWith("and ") || trim.startsWith("or ")) {
                String expr = trim.replaceFirst("^(where|and|or)\\s+", "");
                int idx = findOperatorOutsideString(expr);
                if (idx >= 0) maxLen = Math.max(maxLen, expr.substring(0, idx).trim().length());
            }
        }

        StringBuilder out = new StringBuilder();
        for (String line : lines) {
            String trim = line.trim();
            String lower = trim.toLowerCase(Locale.ROOT);
            String prefix;
            if (lower.startsWith("where ")) prefix = " where ";
            else if (lower.startsWith("and ")) prefix = "   and ";
            else if (lower.startsWith("or ")) prefix = "    or ";
            else {
                out.append(line).append("\n");
                continue;
            }

            String expr = trim.replaceFirst("(?i)^(where|and|or)\\s+", "");
            int idx = findOperatorOutsideString(expr);
            if (idx >= 0) {
                String op = operatorAt(expr, idx);
                String left = expr.substring(0, idx).trim();
                String right = expr.substring(idx + op.length()).trim();
                out.append(prefix).append(String.format(Locale.ROOT, "%-" + maxLen + "s %s %s", left, op, right));
            } else {
                out.append(line);
            }
            out.append("\n");
        }
        return out.toString().replaceFirst("\\n$", "");
    }

    private int findOperatorOutsideString(String text) {
        String[] operators = {"<=", ">=", "<>", "!=", "=", "<", ">"};
        boolean inString = false;
        boolean inQuotedIdentifier = false;
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            char next = i + 1 < text.length() ? text.charAt(i + 1) : '\0';
            if (inString) {
                if (ch == '\'' && next == '\'') i++;
                else if (ch == '\'') inString = false;
                continue;
            }
            if (inQuotedIdentifier) {
                if (ch == '"' && next == '"') i++;
                else if (ch == '"') inQuotedIdentifier = false;
                continue;
            }
            if (ch == '\'') {
                inString = true;
                continue;
            }
            if (ch == '"') {
                inQuotedIdentifier = true;
                continue;
            }
            for (String op : operators) {
                if (text.startsWith(op, i)) return i;
            }
        }
        return -1;
    }

    private String operatorAt(String text, int idx) {
        for (String op : new String[]{"<=", ">=", "<>", "!=", "=", "<", ">"}) {
            if (text.startsWith(op, idx)) return op;
        }
        return "=";
    }

    private String alignJoinCondition(String sql) {
        String[] lines = sql.split("\n", -1);
        int maxLen = 0;
        for (String line : lines) {
            String trim = line.trim();
            if (trim.toLowerCase(Locale.ROOT).startsWith("on ")) {
                String expr = trim.substring(3);
                int idx = findOperatorOutsideString(expr);
                if (idx > 0) maxLen = Math.max(maxLen, expr.substring(0, idx).trim().length());
            }
        }

        StringBuilder out = new StringBuilder();
        for (String line : lines) {
            String trim = line.trim();
            if (trim.toLowerCase(Locale.ROOT).startsWith("on ")) {
                String expr = trim.substring(3);
                int idx = findOperatorOutsideString(expr);
                if (idx > 0) {
                    String op = operatorAt(expr, idx);
                    String left = expr.substring(0, idx).trim();
                    String right = expr.substring(idx + op.length()).trim();
                    out.append("   on ").append(String.format(Locale.ROOT, "%-" + maxLen + "s %s %s", left, op, right));
                } else {
                    out.append(line);
                }
            } else {
                out.append(line);
            }
            out.append("\n");
        }
        return out.toString().replaceFirst("\\n$", "");
    }

    /**
     * PL/SQL 호출문은 매개변수명과 값을 정렬한다.
     * 문자열 리터럴 안의 쉼표 및 괄호는 분리 기준으로 사용하지 않는다.
     */
    private String formatPlsqlCall(String sql) {
        String text = sql.trim();
        int beginIdx = text.toLowerCase(Locale.ROOT).indexOf("begin");
        int openIdx = text.indexOf('(', beginIdx);

        if (beginIdx < 0 || openIdx < 0) return text;

        int closeIdx = findMatchingParen(text, openIdx);
        if (closeIdx < 0) return text;

        String callName = text.substring(beginIdx + 5, openIdx).trim();
        String paramText = text.substring(openIdx + 1, closeIdx).trim();
        List<String> params = splitParameters(paramText);
        int maxLen = 0;

        for (String param : params) {
            int idx = param.indexOf("=>");
            if (idx > 0) maxLen = Math.max(maxLen, param.substring(0, idx).trim().length());
        }

        StringBuilder out = new StringBuilder("begin\n    ")
                .append(callName).append("(\n");

        for (int i = 0; i < params.size(); i++) {
            String param = params.get(i);
            int idx = param.indexOf("=>");
            out.append(i == 0 ? "          " : "        , ");
            if (idx > 0) {
                String name = param.substring(0, idx).trim();
                String value = param.substring(idx + 2).trim();
                out.append(String.format(Locale.ROOT, "%-" + maxLen + "s => %s", name, value));
            } else {
                out.append(param);
            }
            out.append("\n");
        }

        out.append("    );\nend;");
        String suffix = text.substring(closeIdx + 1).trim();
        if (!suffix.isEmpty() && !suffix.equals(";")) {
            out.append("\n").append(suffix);
        }
        return out.toString();
    }

    private int findMatchingParen(String text, int openIdx) {
        int depth = 0;
        boolean inString = false;
        for (int i = openIdx; i < text.length(); i++) {
            char ch = text.charAt(i);
            char next = i + 1 < text.length() ? text.charAt(i + 1) : '\0';
            if (inString) {
                if (ch == '\'' && next == '\'') i++;
                else if (ch == '\'') inString = false;
                continue;
            }
            if (ch == '\'') {
                inString = true;
            } else if (ch == '(') {
                depth++;
            } else if (ch == ')' && --depth == 0) {
                return i;
            }
        }
        return -1;
    }

    private List<String> splitParameters(String text) {
        List<String> params = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        int depth = 0;
        boolean inString = false;

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            char next = i + 1 < text.length() ? text.charAt(i + 1) : '\0';

            if (inString) {
                current.append(ch);
                if (ch == '\'' && next == '\'') {
                    current.append(next);
                    i++;
                } else if (ch == '\'') {
                    inString = false;
                }
                continue;
            }
            if (ch == '\'') {
                inString = true;
                current.append(ch);
            } else if (ch == '(') {
                depth++;
                current.append(ch);
            } else if (ch == ')') {
                depth = Math.max(0, depth - 1);
                current.append(ch);
            } else if (ch == ',' && depth == 0) {
                params.add(current.toString().trim());
                current.setLength(0);
            } else {
                current.append(ch);
            }
        }
        if (current.length() > 0) params.add(current.toString().trim());
        return params;
    }
}
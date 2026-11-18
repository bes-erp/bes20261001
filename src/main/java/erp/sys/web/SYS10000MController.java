package erp.sys.web;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter.spring.core.data.NexacroResult;

import erp.core.util.SessionConst;
import erp.core.util.SessionUserInfo;
import erp.sys.service.SYS10000MService;
import erp.sys.vo.SYS10000MVO;
import lombok.extern.slf4j.Slf4j;
import static erp.core.util.MessageFinder.*;

/**
 * =====================================================================================
 * @packageName     : erp.sys.web
 * @fileName        : SYS10000MController.java
 * @author          : Built1
 * @date            : 2026.11.03
 * @description     : 사용자 로그인 요청 및 세션정보를 처리하는 클래스
 * =====================================================================================
 * 수정일자          수정자             수정내용
 * -------------------------------------------------------------------------------------
 * 2026.11.03        Built1             최초 생성
 * 2026.11.11        Built1             로그인 사용자정보를 세션정보로 전환
 * 2026.11.12        Built1             로그인시간 세션정보 추가, 사용자정보 팝업 연동
 * 2026.11.16        Built1             비밀번호 검증 WAS 이관, 입력값 검증 추가,
 *                                      조회 파라미터에서 비밀번호 제외, 로그인 결과 처리 통합
 */
@Slf4j
@Controller
@RequestMapping(value = "sys/SYS10000M")
public class SYS10000MController {

    /** 로그인 결과코드 : 성공 */
    private static final String RESULT_SUCCESS = "S";

    /** 로그인 결과코드 : 실패 */
    private static final String RESULT_FAIL    = "F";

    /** 로그인 실패 기본 메시지 (ID 존재 여부를 노출하지 않도록 공통 문구 사용) */
    private static final String MSG_LOGIN_FAIL = "사용자ID 또는 비밀번호가 올바르지 않습니다.";

    /** 로그인시간 표시 형식 */
    private static final DateTimeFormatter LOGIN_TIME_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Resource
    private SYS10000MService service;

    /**
     * @methodName          : login
     * @author              : Built1
     * @date                : 2026.11.03
     * @description         : 사용자 로그인 인증 후 세션정보 등록 및 사용자정보·프로파일·메뉴 반환
     * @param paramMap      : 로그인 요청정보 (dsLogin : USER_ID, PASSWORD, LANG_CD)
     * @param request       : HTTP 요청정보
     * @return              : outLogin, outSelectUserInfo, outSelectProfileList, outSelectMenuList
     * @throws Exception
     */
    @RequestMapping(value = "login.do")
    public NexacroResult login(@ParamDataSet(name = "dsLogin") Map<String, Object> paramMap
                              ,HttpServletRequest request) throws Exception {

        NexacroResult result = new NexacroResult();

        // 요청 Dataset이 비어 있는 경우 대비
        Map<String, Object> reqMap = (paramMap == null) ? Collections.emptyMap() : paramMap;

        String sUserId   = toStr(reqMap.get("USER_ID"));
        String sPassword = toStr(reqMap.get("PASSWORD"));
        String sLangCd   = toStr(reqMap.get("LANG_CD"));

        log.debug("## [ LOGIN ] 요청 : {}", sUserId);

        // ----------------------------------------------------------------------------
        // 1. 입력값 검증 (화면 검증과 별개로 서버에서도 확인)
        // ----------------------------------------------------------------------------
        if (isBlank(sUserId) || isBlank(sPassword)) {
            return addLoginResult(result, RESULT_FAIL, MSG_LOGIN_FAIL);
        }

        // ----------------------------------------------------------------------------
        // 2. 비밀번호 검증 및 결과 기록 (실패 횟수, 계정 잠금)
        // ----------------------------------------------------------------------------
        Map<String, Object> loginResultMap = service.checkLogin(sUserId, sPassword);

        String sResultCd    = toStr(loginResultMap.get("RESULT_CD"));
        String sResultDescr = toStr(loginResultMap.get("RESULT_DESCR"));

        if (!RESULT_SUCCESS.equals(sResultCd)) {
            return addLoginResult(result, RESULT_FAIL, isBlank(sResultDescr) ? MSG_LOGIN_FAIL : sResultDescr);
        }

        // ----------------------------------------------------------------------------
        // 3. 로그인 후 데이터 일괄 조회 : 사용자정보, 시스템 프로파일, 메뉴정보
        //    조회 파라미터에는 비밀번호를 넣지 않음
        // ----------------------------------------------------------------------------
        Map<String, Object> queryMap = new HashMap<>();
        queryMap.put("USER_ID", sUserId);
        queryMap.put("LANG_CD", sLangCd);

        Map<String, Object> allDataMap = service.selectAllData(queryMap);

        @SuppressWarnings("unchecked")
        Map<String, Object> comUserInfoMap = (Map<String, Object>) allDataMap.get("comUserInfo");

        // 인증은 성공했으나 사용자정보(사원 매핑 등)가 없는 경우
        log.debug("## getMessage(\"JM-ALT-10041\")  : {}", getMessage("JM-ALT-10041"));
        log.debug("## SessionUserInfo.getLangCd();) : {}", SessionUserInfo.getLangCd());
        if (comUserInfoMap == null) {
            log.warn("## [ LOGIN ] 사용자정보 없음 : {}", sUserId);
            return addLoginResult(result, RESULT_FAIL, getMessage("JM-ALT-10041"));  // 사용자정보가 등록되지 않았습니다. 관리자에게 문의해 주세요.
        }

        // ----------------------------------------------------------------------------
        // 4. 세션 등록
        //    기존 세션 무효화 후 신규 세션 생성 (세션 고정 공격 방지)
        // ----------------------------------------------------------------------------
        SYS10000MVO loginUserVO = toSYS10000MVO(comUserInfoMap);
        loginUserVO.setLoginTime(LocalDateTime.now().format(LOGIN_TIME_FORMAT));

        HttpSession oldSession = request.getSession(false);

        if (oldSession != null) {
            oldSession.invalidate();
        }

        HttpSession session = request.getSession(true);
        session.setAttribute(SessionConst.LOGIN_USER, loginUserVO);
        session.setMaxInactiveInterval(SessionConst.SESSION_TIMEOUT);

        // ----------------------------------------------------------------------------
        // 5. 응답 Dataset 구성
        // ----------------------------------------------------------------------------
        result.addDataSet("outSelectUserInfo"   , Collections.singletonList(toUserInfoMap(loginUserVO)));  // gds_user_info
        result.addDataSet("outSelectProfileList", toList(allDataMap.get("sysProfileList")));               // gds_profile
        result.addDataSet("outSelectMenuList"   , toList(allDataMap.get("comUserMenuList")));              // gds_menu

        log.debug("## [ LOGIN ] 성공 : {}", sUserId);

        return addLoginResult(result, RESULT_SUCCESS, sResultDescr);
    }

    /**
     * @methodName          : getSessionUser
     * @author              : Built1
     * @date                : 2026.11.12
     * @description         : 세션에 등록된 사용자정보 조회 (새로고침 시 gds_user_info 복원용)
     * @param session       : HTTP 세션
     * @return              : outSelectUserInfo
     * @throws Exception
     */
    @RequestMapping(value = "getSessionUser.do")
    public NexacroResult getSessionUser(HttpSession session) throws Exception {

        NexacroResult result = new NexacroResult();

        SYS10000MVO sessionUserVO = (SYS10000MVO) session.getAttribute(SessionConst.LOGIN_USER);

        if (sessionUserVO == null) {
            result.setErrorCode(-1);
            result.setErrorMsg("세션이 만료되었습니다. 다시 로그인해 주세요.");
            return result;
        }

        // 세션 사용자ID/언어로 최신 사용자정보 재조회
        Map<String, Object> queryMap = new HashMap<>();
        queryMap.put("USER_ID", sessionUserVO.getUserId());
        queryMap.put("LANG_CD", sessionUserVO.getLangCd());

        Map<String, Object> comUserInfoMap = service.selectLoginUserInfo(queryMap);

        if (comUserInfoMap != null) {
            SYS10000MVO refreshUserVO = toSYS10000MVO(comUserInfoMap);
            refreshUserVO.setLoginTime(sessionUserVO.getLoginTime());     // 로그인시간 유지

            session.setAttribute(SessionConst.LOGIN_USER, refreshUserVO);
            sessionUserVO = refreshUserVO;
        }

        result.addDataSet("outSelectUserInfo", Collections.singletonList(toUserInfoMap(sessionUserVO)));   // gds_user_info

        return result;
    }

    /**
     * @methodName          : logout
     * @author              : Built1
     * @date                : 2026.11.12
     * @description         : 사용자 로그아웃 및 세션 무효화
     * @param request       : HTTP 요청정보
     * @return              : 처리 결과
     * @throws Exception
     */
    @RequestMapping(value = "logout.do")
    public NexacroResult logout(HttpServletRequest request) throws Exception {

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return new NexacroResult();
    }

    /**
     * @methodName          : addLoginResult
     * @description         : 로그인 결과 Dataset(outLogin) 추가 (결과코드/메시지만 전송)
     * @param result        : 응답 객체
     * @param resultCd      : 결과코드 (S:성공, F:실패)
     * @param resultDescr   : 결과메시지
     * @return              : 응답 객체
     */
    private NexacroResult addLoginResult(NexacroResult result, String resultCd, String resultDescr) {

        Map<String, Object> outLoginMap = new HashMap<>();
        outLoginMap.put("RESULT_CD",    resultCd);
        outLoginMap.put("RESULT_DESCR", resultDescr);

        result.addDataSet("outLogin", Collections.singletonList(outLoginMap));

        return result;
    }

    /**
     * @methodName          : toSYS10000MVO
     * @description         : 조회된 사용자정보 Map을 세션 VO로 변환
     * @param userInfoMap   : 사용자정보
     * @return              : 세션 VO
     */
    private SYS10000MVO toSYS10000MVO(Map<String, Object> userInfoMap) {

        SYS10000MVO vo = new SYS10000MVO();

        vo.setLangCd(toStr(userInfoMap.get("LANG_CD")));
        vo.setUserId(toStr(userInfoMap.get("USER_ID")));
        vo.setUserNm(toStr(userInfoMap.get("USER_NM")));
        vo.setEmpId(toLong(userInfoMap.get("EMP_ID")));
        vo.setEmpNum(toStr(userInfoMap.get("EMP_NUM")));
        vo.setEmpNm(toStr(userInfoMap.get("EMP_NM")));
        vo.setCompanyCd(toStr(userInfoMap.get("COMPANY_CD")));
        vo.setCompanyNm(toStr(userInfoMap.get("COMPANY_NM")));
        vo.setDeptCd(toStr(userInfoMap.get("DEPT_CD")));
        vo.setDeptNm(toStr(userInfoMap.get("DEPT_NM")));
        vo.setGradeCd(toStr(userInfoMap.get("GRADE_CD")));
        vo.setGradeNm(toStr(userInfoMap.get("GRADE_NM")));
        vo.setJobCd(toStr(userInfoMap.get("JOB_CD")));
        vo.setJobNm(toStr(userInfoMap.get("JOB_NM")));
        vo.setPositionCd(toStr(userInfoMap.get("POSITION_CD")));
        vo.setPositionNm(toStr(userInfoMap.get("POSITION_NM")));
        vo.setHireDate(toStr(userInfoMap.get("HIRE_DATE")));
        vo.setRetireDate(toStr(userInfoMap.get("RETIRE_DATE")));
        vo.setSupervisorEmpId(toLong(userInfoMap.get("SUPERVISOR_EMP_ID")));
        vo.setSupervisorEmpNum(toStr(userInfoMap.get("SUPERVISOR_EMP_NUM")));
        vo.setSupervisorEmpNm(toStr(userInfoMap.get("SUPERVISOR_EMP_NM")));

        return vo;
    }

    /**
     * @methodName          : toUserInfoMap
     * @description         : 세션 VO를 넥사크로 Dataset용 Map으로 변환 (gds_user_info 컬럼 구조)
     * @param vo            : 세션 VO
     * @return              : 사용자정보 Map
     */
    private Map<String, Object> toUserInfoMap(SYS10000MVO vo) {

        Map<String, Object> userInfoMap = new LinkedHashMap<>();

        userInfoMap.put("LANG_CD",            vo.getLangCd());
        userInfoMap.put("USER_ID",            vo.getUserId());
        userInfoMap.put("USER_NM",            vo.getUserNm());
        userInfoMap.put("EMP_ID",             vo.getEmpId());
        userInfoMap.put("EMP_NUM",            vo.getEmpNum());
        userInfoMap.put("EMP_NM",             vo.getEmpNm());
        userInfoMap.put("COMPANY_CD",         vo.getCompanyCd());
        userInfoMap.put("COMPANY_NM",         vo.getCompanyNm());
        userInfoMap.put("DEPT_CD",            vo.getDeptCd());
        userInfoMap.put("DEPT_NM",            vo.getDeptNm());
        userInfoMap.put("GRADE_CD",           vo.getGradeCd());
        userInfoMap.put("GRADE_NM",           vo.getGradeNm());
        userInfoMap.put("JOB_CD",             vo.getJobCd());
        userInfoMap.put("JOB_NM",             vo.getJobNm());
        userInfoMap.put("POSITION_CD",        vo.getPositionCd());
        userInfoMap.put("POSITION_NM",        vo.getPositionNm());
        userInfoMap.put("HIRE_DATE",          vo.getHireDate());
        userInfoMap.put("RETIRE_DATE",        vo.getRetireDate());
        userInfoMap.put("SUPERVISOR_EMP_ID",  vo.getSupervisorEmpId());
        userInfoMap.put("SUPERVISOR_EMP_NUM", vo.getSupervisorEmpNum());
        userInfoMap.put("SUPERVISOR_EMP_NM",  vo.getSupervisorEmpNm());
        userInfoMap.put("LOGIN_TIME",         vo.getLoginTime());

        return userInfoMap;
    }

    // 조회 결과 List 변환 (null이면 빈 목록 : 빈 Dataset으로 응답)
    private List<?> toList(Object obj) {
        return (obj instanceof List) ? (List<?>) obj : Collections.emptyList();
    }

    // 문자열 공백 여부
    private boolean isBlank(String str) {
        return str == null || str.trim().isEmpty();
    }

    // Object → String 변환 (null 안전)
    private String toStr(Object obj) {
        return obj == null ? null : String.valueOf(obj);
    }

    // Object → Long 변환 (BigDecimal, Integer 등 숫자형 및 숫자 문자열 대응)
    private Long toLong(Object obj) {
        if (obj == null) {
            return null;
        }
        if (obj instanceof Number) {
            return ((Number) obj).longValue();
        }
        String str = String.valueOf(obj).trim();
        return str.isEmpty() ? null : Long.valueOf(str);
    }
}
package erp.core.util;

import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;

/**
* =====================================================================================
* @packageName    		: erp.core.util
* @fileName       		: MessageFinder.java
* @author         		: Built1
* @date           		: 2026.11.17
* @description    		: 서버판 gfn_getMessage 클래스
*                         메시지번호와 언어코드로 메시지를 찾아 {0}, {1} ... 을 인자로 치환한다.
*                         클라이언트 : this.gfn_getMessage("NM-ALT-10010", ["사용자ID"]);
*                         서버       : MessageFinder.getMessage("NM-ALT-10010", "사용자ID");
* @Class process
* 1. 객체생성시도   	: 스프링이 @Component가 붙은 MessageFinder를 발견하고 객체 생성
* 2. 필요한 빈 확인 	: 생성자에 MessageStore가 필요하므로, MessageStore 빈이 준비되어 있는지 확인
                          아직이면 먼저 만들고 afterPropertiesSet(), reload()까지 마쳐 데이터를 채움
* 3. 생성자 호출    	: 준비된 MessageStore의 참조를 넘기면서 new MessageFinder(messageStore)를 호출
* 4. 참조보관       	: 생성자 안에서 그 참조를 static 변수 MessageFinder.messageStore에 할당
* 5. 준비완료       	: 이제 어디서든 getMessage()를 static으로 호출
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.17        	Built1             최초 생성
* 2026.11.17        	Built1             언어코드를 세션(SessionUserInfo.getLangCd())에서 조회하도록 변경
*/
@Component
public class MessageFinder {

	// 기본 언어코드
	public static final String DEFAULT_LANG_CD = "KO";

	// 컬럼명 (DB 컬럼명은 대문자)
	private static final String COL_MESSAGE_TEXT    = "MESSAGE_TEXT_";		// + KO/EN/ZH/JA/OT
	private static final String COL_MESSAGE_TYPE_CD = "MESSAGE_TYPE_CD";

	// 메시지 보관 객체 : static 메소드에서 사용하기 위해 static 변수에 보관
	private static MessageStore messageStore;

	/**
	* @methodName     		: MessageFinder
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 생성자 - 스프링이 주입한 MessageStore를 static 변수에 보관
	* @param messageStore   : 메시지 보관 객체
	*/
	public MessageFinder(MessageStore messageStore) {
		MessageFinder.messageStore = messageStore;
	}

	/**
	* @methodName     		: getMessage
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 현재 요청의 언어코드로 메시지를 조회하는 메소드
	* @param messageNum     : 메시지번호 (예. NM-ALT-10010)
	* @param args           : 치환 인자 ({0}, {1} ...)
	* @return               : 치환된 메시지
	*/
	public static String getMessage(String messageNum, Object... args) {
		return getMessageByLang(messageNum, currentLangCd(), args);
	}

	/**
	* @methodName     		: getMessageByLang
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 언어코드를 직접 지정하여 메시지를 조회하는 메소드 (배치, 메일 발송 등)
	* @param messageNum     : 메시지번호 (예. NM-ALT-10010)
	* @param langCd         : 언어코드 (KO, EN, ZH, JA, 그 외)
	* @param args           : 치환 인자 ({0}, {1} ...)
	* @return               : 치환된 메시지
	*/
	public static String getMessageByLang(String messageNum, String langCd, Object... args) {

		// 메시지 찾기
		Map<String, Object> row = messageStore.find(messageNum);

		// 메시지 미등록 : 메시지번호 그대로 반환
		if (row == null) {
			return messageNum;
		}

		// 언어코드에 해당하는 메시지 선택
		String text = getText(row, langCd);

		// 해당 언어 메시지가 비어 있으면 국어 메시지로 대체
		if (!StringUtils.hasText(text)) {
			text = getText(row, DEFAULT_LANG_CD);
		}

		return format(text, args);
	}

	/**
	* @methodName     		: getMessageType
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 메시지유형코드를 조회하는 메소드
	* @param messageNum     : 메시지번호
	* @return               : 메시지유형코드 (없으면 null)
	*/
	public static String getMessageType(String messageNum) {
		Map<String, Object> row = messageStore.find(messageNum);
		return row == null ? null : toStr(row.get(COL_MESSAGE_TYPE_CD));
	}

	/**
	* @methodName     		: currentLangCd
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 현재 로그인 사용자의 언어코드(대문자)를 반환하는 메소드
	*                         세션의 언어코드(SessionUserInfo.getLangCd())를 사용하며,
	*                         아래의 경우에는 기본 언어코드(KO)를 반환
	*                         - 요청이 없는 스레드 (배치, 스케줄러)
	*                         - 로그인 전 (세션에 언어코드 없음)
	* @return               : 언어코드 (대문자)
	*/
	public static String currentLangCd() {

		// 요청이 없는 스레드(배치, 스케줄러) : 기본 언어코드 반환
		if (RequestContextHolder.getRequestAttributes() == null) {
			return DEFAULT_LANG_CD;
		}

		// 세션의 언어코드 조회 : 로그인 전 세션이 없어 오류가 나더라도 기본 언어코드로 처리
		String langCd;
		try {
			langCd = SessionUserInfo.getLangCd();
		} catch (Exception e) {
			langCd = null;
		}

		// 언어코드는 대문자로 통일, 없으면 기본 언어코드
		return StringUtils.hasText(langCd) ? langCd.trim().toUpperCase() : DEFAULT_LANG_CD;
	}

	/**
	* @methodName     		: getText
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 언어코드에 해당하는 메시지 컬럼 값을 반환하는 메소드
	*                         KO/EN/ZH/JA 외의 언어코드는 기타(OT) 컬럼을 사용
	* @param row            : 메시지 1건
	* @param langCd         : 언어코드 (대문자)
	* @return               : 메시지
	*/
	private static String getText(Map<String, Object> row, String langCd) {

		// 언어코드별 컬럼 접미사 선택 : MESSAGE_TEXT_KO / _EN / _ZH / _JA / _OT
		String suffix;
		switch (langCd == null ? DEFAULT_LANG_CD : langCd.toUpperCase()) {
			case "KO": suffix = "KO"; break;
			case "EN": suffix = "EN"; break;
			case "ZH": suffix = "ZH"; break;
			case "JA": suffix = "JA"; break;
			default  : suffix = "OT"; break;
		}

		return toStr(row.get(COL_MESSAGE_TEXT + suffix));
	}

	/**
	* @methodName     		: format
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 메시지의 {0}, {1} ... 을 인자로 치환하는 메소드
	*                         (MessageFormat과 달리 작은따옴표(')를 특수문자로 취급하지 않음)
	* @param text           : 메시지
	* @param args           : 치환 인자
	* @return               : 치환된 메시지
	*/
	private static String format(String text, Object... args) {

		// 메시지 또는 치환 인자가 없으면 그대로 반환
		if (text == null || args == null || args.length == 0) {
			return text;
		}

		// {순번} 치환 : 넥사크로 gfn_getMessage와 동일하게 {1}부터 시작
		String result = text;
		for (int i = 0; i < args.length; i++) {
			result = result.replace("{" + (i + 1) + "}", String.valueOf(args[i]));
		}

		return result;
	}

	/**
	* @methodName     		: toStr
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: Object를 문자열로 변환하는 메소드 (null은 null 반환)
	* @param value          : 값
	* @return               : 문자열
	*/
	private static String toStr(Object value) {
		return value == null ? null : value.toString();
	}

}
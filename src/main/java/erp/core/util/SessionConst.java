package erp.core.util;

/**
* =====================================================================================
* @packageName    		: erp.core.util
* @fileName       		: SessionConst.java
* @author         		: Built1
* @date           		: 2026.11.12
* @description    		: 세션과 관련된 정적 변수를 관리하는 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.12        	Built1             최초 생성
*/
public final class SessionConst {
    private SessionConst() {}

    // 로그인 사용자 세션 키
    public static final String LOGIN_USER = "LOGIN_USER";

    // 세션 유지시간 : 30분(1800)
    public static final int SESSION_TIMEOUT = 120;
}

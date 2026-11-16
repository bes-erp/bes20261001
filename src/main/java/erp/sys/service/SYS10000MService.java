package erp.sys.service;

import java.util.Map;

/**
 * =====================================================================================
 * @packageName     : erp.sys.service
 * @fileName        : SYS10000MService.java
 * @author          : Built1
 * @date            : 2026.11.02
 * @description     : 사용자 로그인 인증 서비스 인터페이스
 * =====================================================================================
 * 수정일자          수정자             수정내용
 * -------------------------------------------------------------------------------------
 * 2026.11.02        Built1             최초 생성
 * 2026.11.16        Built1             login 삭제 (checkLogin으로 대체)
 */
public interface SYS10000MService {
    
	/**
	* @methodName     		: checkLogin
	* @author         		: built1
	* @date           		: 2026.11.16
	* @description    		: 로그인 비밀번호 검증 및 결과 기록하는 메소드
	* @param 				: userId
	* @param 				: password
	* @return
	* @throws Exception
	*/
	public abstract Map<String, Object> checkLogin(String userId, String password) throws Exception;

	/**
	* @methodName     		: selectLoginUserInfo
	* @author         		: built1
	* @date           		: 2026.11.16
	* @description    		: 로그인 사용자정보(세션정보) 조회하는 메소드
	* @param 				: paramMap(USER_ID, LANG_CD)
	* @return
	*/
	public abstract Map<String, Object> selectLoginUserInfo(Map<String, Object> paramMap);
	
	/**
	* @methodName     		: selectAllData
	* @author         		: built1
	* @date           		: 2026.11.16
	* @description    		: 로그인 후 일괄 조회하는 메소드
	* @param 				: paramMap(comUserInfo, sysProfileList, comUserMenuList)
	* @return
	*/
	public abstract Map<String, Object> selectAllData(Map<String, Object> paramMap);
}

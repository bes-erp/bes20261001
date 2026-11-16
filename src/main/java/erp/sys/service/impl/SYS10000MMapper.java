package erp.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

/**
 * =====================================================================================
 * @packageName     : erp.sys.service.impl
 * @fileName        : SYS10000MMapper.java
 * @author          : Built1
 * @date            : 2026.11.02
 * @description     : 사용자 로그인 인증 및 로그인 후 조회 Mapper 인터페이스
 * =====================================================================================
 * 수정일자          수정자             수정내용
 * -------------------------------------------------------------------------------------
 * 2026.11.02        Built1             최초 생성
 * 2026.11.16        Built1             loginPassword 삭제 (비밀번호 검증 WAS 이관)
 */
@Mapper
public interface SYS10000MMapper {

    /**
     * @methodName          : selectLoginPassword
     * @author              : Built1
     * @date                : 2026.11.16
     * @description         : 로그인 검증용 비밀번호 해시 및 계정상태 조회
     * @param userId        : 사용자ID
     * @return              : PASSWORD, USER_YN, LOCK_YN
     */
	public abstract Map<String, Object> selectLoginPassword(String userId);

    /**
     * @methodName          : loginResult
     * @author              : Built1
     * @date                : 2026.11.16
     * @description         : 로그인 검증 결과 기록 (bcom.com_user_pkg.login_result_p)
     * @param paramMap      : IN  USER_ID, SUCCESS_YN / OUT RESULT_CD, RESULT_DESCR
     */
    void loginResult(Map<String, Object> paramMap);

    /**
     * @methodName          : selectLoginUserInfo
     * @author              : Built1
     * @date                : 2026.11.11
     * @description         : 로그인 사용자정보(세션정보) 조회
     * @param paramMap      : USER_ID, LANG_CD
     * @return              : 사용자정보 (1건)
     */
    public abstract Map<String, Object> selectLoginUserInfo(Map<String, Object> paramMap);

    /**
     * @methodName          : selectProfileList
     * @author              : Built1
     * @date                : 2026.11.13
     * @description         : 시스템 프로파일 목록 조회 (넥사크로 gds_profile 적재용)
     * @return              : 프로파일 목록
     */
    public abstract List<Map<String, Object>> selectProfileList();

	/**
	* @methodName     		: selectMenuList
	* @author         		: built1
	* @date           		: 2026.11.16
	* @description    		: 사용자 권한별 메뉴 목록 조회 (넥사크로 gds_menu 적재용)
	* @param                : menuParamMap(USER_ID, USER_YN)
	* @return
	*/
	public abstract List<Map<String, Object>> selectMenuList(Map<String, Object> menuParamMap);
}
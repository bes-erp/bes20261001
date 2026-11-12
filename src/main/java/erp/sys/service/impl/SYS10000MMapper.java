package erp.sys.service.impl;

import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

/**
* =====================================================================================
* @packageName     : erp.com.service.impl
* @fileName        : SYS10000MMapper.java
* @author          : Built1
* @date            : 2026.11.02
* @description     : 사용자 로그인 인증 패키지를 호출하는 Mapper 인터페이스 클래스
* =====================================================================================
* 수정일자          수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.02        Built1             최초 생성
*/
@Mapper
public interface SYS10000MMapper {

    /**
    * @methodName      		: loginPassword
    * @author          		: built1
    * @date            		: 2026.11.02
    * @description     		: 사용자 로그인 인증 패키지를 호출하는 메소드
    * @param mapperParamMap
    * @return 
    * @throws Exception
    */
    public abstract void loginPassword(Map<String, Object> mapperParamMap);

	/**
	* @methodName     		: selectLoginUserInfo
	* @author         		: built1
	* @date           		: 2026.11.11
	* @description    		: 사용자정보를 조회하는 메소드
	* @param loginParamMap
	* @return
	*/
	public abstract Map<String, Object> selectLoginUserInfo(Map<String, Object> loginParamMap);
 
}

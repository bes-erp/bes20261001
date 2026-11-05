package erp.sys.service;

import java.util.Map;

/**
* =====================================================================================
* @packageName     : erp.com.service
* @fileName        : SYS10000MService.java
* @author          : Built1
* @date            : 2026.11.02
* @description     : 사용자 로그인 인증을 처리하는 인터페이스 클래스
* =====================================================================================
* 수정일자          수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.02        Built1             최초 생성
*/
public interface SYS10000MService {

    /**
    * @methodName      : login
    * @author          : built1
    * @date            : 2026.11.02
    * @description     : 사용자 로그인 인증을 처리하는 메소드
    * @param loginParamMap
    * @return
    * @throws Exception
    */
    public abstract Map<String, Object> login(Map<String, Object> loginParamMap) throws Exception;
}

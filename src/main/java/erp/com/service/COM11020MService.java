package erp.com.service;

import java.util.List;
import java.util.Map;

/**
* =====================================================================================
* @packageName     : erp.com.service
* @fileName        : COM11020MService.java
* @author          : Built1
* @date            : 2026.11.04
* @description     : 메뉴정보 조회를 처리하는 인터페이스 클래스
* =====================================================================================
* 수정일자          수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.04        Built1             최초 생성
*/
public interface COM11020MService {

    /**
    * @methodName      : selectMenuList
    * @author          : built1
    * @date            : 2026.11.04
    * @description     : 메뉴정보 목록을 조회하는 메소드
    * @param menuText
    * @param userYn
    * @return
    * @throws Exception
    */
    public abstract List<Map<String, Object>> selectMenuList(String menuText, String userYn) throws Exception;
}
package erp.com.service;

import java.util.List;
import java.util.Map;

/**
* =====================================================================================
* @packageName    		: erp.com.service
* @fileName       		: COM12000MService.java
* @author         		: Built1
* @date           		: 2026.11.05
* @description    		: 메시지 데이터를 조회/저장하는 인터페이스 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.04        	Built1             최초 생성
* 2026.11.05        	Built1             수정
* 2026.11.10			Built1			   데이터 저장 기능 추가
*/
public interface COM12000MService {

    /**
    * @methodName     		: selectMessageList
    * @author         		: built1
    * @date           		: 2026.11.05
    * @description    		: 메시지 데이터를 조회하는 메소드
    * @param searchParamMap
    * @param userId
    * @return
    * @throws Exception
    */
    public abstract List<Map<String, Object>> selectMessageList(Map<String, Object> searchParamMap, String userId) throws Exception;
    
    /**
    * @methodName     		: saveMessage
    * @author         		: built1
    * @date           		: 2026.11.10
    * @description    		: 메시지 데이터를 저장하는 메소드
    * @param messageList
    * @param userId
    * @return
    * @throws Exception
    */
    public abstract int saveMessage(List<Map<String, Object>> messageList, String userId) throws Exception;
}

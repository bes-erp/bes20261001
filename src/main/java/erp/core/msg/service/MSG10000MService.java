package erp.core.msg.service;

import java.util.List;
import java.util.Map;


/**
* =====================================================================================
* @packageName    		: erp.core.msg.service
* @fileName       		: MSG10000MService.java
* @author         		: Built1
* @date           		: 2026.11.06
* @description    		: [메시지] 데이터를 조회하는 인터페이스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.06        	Built1             최초 생성
*/
public interface MSG10000MService {
	
	
	/**
	* @methodName     		: selectMessageList
	* @author         		: built1
	* @date           		: 2026.11.06
	* @description    		: [메시지] 데이터를 조회하는 메소드
	* @return
	* @throws Exception
	*/
	public abstract List<Map<String, Object>> selectMessageList() throws Exception;	

}

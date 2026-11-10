package erp.core.dtl.service;

import java.util.List;
import java.util.Map;

/**
* =====================================================================================
* @packageName    		: erp.core.dtl.service
* @fileName       		: DTL10000MService.java
* @author         		: Built1
* @date           		: 2026.11.10
* @description    		: [날짜] 데이터를 조회하는 인터페이스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.10        	Built1             최초 생성
*/
public interface DTL10000MService {
	
	/**
	* @methodName     		: selectDateList
	* @author         		: built1
	* @date           		: 2026.11.10
	* @description    		: [메시지] 데이터를 조회하는 메소드
	* @return
	* @throws Exception
	*/
	public abstract List<Map<String, Object>> selectDateList() throws Exception;	

}

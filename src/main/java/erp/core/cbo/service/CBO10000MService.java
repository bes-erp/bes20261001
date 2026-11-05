package erp.core.cbo.service;

import java.util.List;
import java.util.Map;


/**
* =====================================================================================
* @packageName    		: erp.core.cbo.service
* @fileName       		: CBO10000MService.java
* @author         		: Built1
* @date           		: 2026.11.05
* @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 인터페이스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.05        	Built1             최초 생성
*/
public interface CBO10000MService {
	
	/**
	* @methodName     		: selectComboCodeList
	* @author         		: built1
	* @date           		: 2026.11.05
	* @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 메소드
	* @param codeType
	* @param activeType
	* @param addAllRow
	* @return
	* @throws Exception
	*/
	public abstract List<Map<String, Object>> selectComboCodeList(String codeType, String activeType, String addAllRow) throws Exception;	

}

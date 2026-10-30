package erp.com.service;

import java.util.List;
import java.util.Map;

/**
* =====================================================================================
* @packageName    		: erp.com.service.impl
* @fileName       		: COM10000MService.java
* @author         		: Built1
* @date           		: 2026.10.15
* @description    		: 코드유형 데이터를 조회/저장하는 인터페이스 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.10.15        	Built1             최초 생성
*/
public interface COM10000MService {

	/**
	* @methodName     		: selectCodeTypeList
	* @author         		: built1
	* @date           		: 2026.10.21
	* @description    		: 코드유형 및 코드 데이터를 조회하는 메소드
	* @param searchParamMap
	* @param userId
	* @return
	*/
	public abstract Map<String, Object> selectCodeTypeList(Map<String, Object> searchParamMap, String userId) throws Exception;

	/**
	* @methodName     		: selectComboCodeList
	* @author         		: built1
	* @date           		: 2026.10.21
	* @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 메소드
	* @param codeType
	* @param selType
	* @return
	*/
	public abstract List<Map<String, Object>> selectComboCodeList(String codeType, String selType) throws Exception;	

}

package erp.com.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

/**
* =====================================================================================
* @packageName    		: erp.com.service.impl
* @fileName       		: SYS10000MMapper.java
* @author         		: Built1
* @date           		: 2026.10.15
* @description    		: 코드유형 데이터를 조회/저장하는 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.10.15        	Built1             최초 생성
*/
@Mapper
public interface COM10000MMapper {

	/**
	* @methodName     		: selectCodeTypeList
	* @author         		: built1
	* @date           		: 2026.10.15
	* @description    		: 코드유형 데이터를 조회하는 메소드
	* @param searchParamMap
	* @param userId
	* @return
	* @throws Exception
	*/
	public abstract List<Map<String, Object>> selectCodeTypeList(Map<String, Object> mapperParamMap) throws Exception;

	/**
	* @methodName     		: selectCodeList
	* @author         		: built1
	* @date           		: 2026.10.21
	* @description    		: 코드 데이터를 조회하는 메소드
	* @param mapperParamMap
	* @return
	*/
	public abstract List<Map<String, Object>> selectCodeList(Map<String, Object> mapperParamMap) throws Exception;

	/**
	* @methodName     		: selectComboCodeList
	* @author         		: built1
	* @date           		: 2026.10.21
	* @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 메소드
	* @param mapperParamMap
	* @return
	*/
	public abstract List<Map<String, Object>> selectComboCodeList(Map<String, Object> mapperParamMap) throws Exception;

}

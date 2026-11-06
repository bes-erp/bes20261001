package erp.core.cbo.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;


/**
* =====================================================================================
* @packageName    		: erp.core.cbo.service.impl
* @fileName       		: MSG10000MMapper.java
* @author         		: Built1
* @date           		: 2026.11.05
* @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 인터페이스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.05        	Built1             최초 생성
*/
@Mapper
public interface CBO10000MMapper {

	/**
	* @methodName     		: selectComboCodeList
	* @author         		: built1
	* @date           		: 2026.11.05
	* @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 메소드
	* @param mapperParamMap
	* @return
	* @throws Exception
	*/
	public abstract List<Map<String, Object>> selectComboCodeList(Map<String, Object> mapperParamMap) throws Exception;

}

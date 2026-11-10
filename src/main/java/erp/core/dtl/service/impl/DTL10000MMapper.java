package erp.core.dtl.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

/**
* =====================================================================================
* @packageName    		: erp.core.dtl.service.impl
* @fileName       		: DTL10000MMapper.java
* @author         		: Built1
* @date           		: 2026.11.10
* @description    		: [날짜] 데이터를 조회하는 인터페이스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.10        	Built1             최초 생성
*/
@Mapper
public interface DTL10000MMapper {

	/**
	* @methodName     		: selectMessageList
	* @author         		: built1
	* @date           		: 2026.11.06
	* @description    		: [메시지] 데이터를 조회하는 메소드
	* @return
	* @throws Exception
	*/
	public abstract List<Map<String, Object>> selectDateList()throws Exception;

}

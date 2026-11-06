package erp.com.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

/**
* =====================================================================================
* @packageName    		: erp.com.service.impl
* @fileName       		: COM12000MMapper.java
* @author         		: Built1
* @date           		: 2026.11.05
* @description    		: 메시지 데이터를 조회/저장하는 Mapper 인터페이스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.05        	Built1             최초 생성
*/
@Mapper
public interface COM12000MMapper {

    /**
    * @methodName     		: selectMessageList
    * @author         		: built1
    * @date           		: 2026.11.05
    * @description    		: 메시지 목록을 조회하는 메소드
    * @param mapperParamMap
    * @return
    * @throws Exception
    */
    public abstract List<Map<String, Object>> selectMessageList(Map<String, Object> mapperParamMap) throws Exception;

}

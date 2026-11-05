package erp.com.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

/**
* =====================================================================================
* @packageName    		: erp.com.service.impl
* @fileName       		: COM12000MMapper.java
* @author         		: Built1
* @date           		: 2026.11.04
* @description    		: 메시지정보 조회/저장을 위한 데이터 접근 인터페이스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.04        	Built1             최초 생성
*/
@Mapper("COM12000MMapper")
public interface COM12000MMapper {

    /**
     * @methodName  : selectMessageList
     * @description : 메시지 목록을 조회하는 메소드
     */
    List<Map<String, Object>> selectMessageList(
            Map<String, Object> paramMap);

    /**
     * @methodName  : insertMessage
     * @description : 신규 메시지를 등록하는 메소드
     */
    int insertMessage(Map<String, Object> paramMap);

    /**
     * @methodName  : updateMessage
     * @description : 기존 메시지를 수정하는 메소드
     */
    int updateMessage(Map<String, Object> paramMap);

    /**
     * @methodName  : deleteMessage
     * @description : 기존 메시지를 삭제하는 메소드
     */
    int deleteMessage(Map<String, Object> paramMap);
}

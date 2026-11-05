package erp.com.service;

import java.util.List;
import java.util.Map;

/**
 * =====================================================================================
 * @packageName     : erp.com.service
 * @fileName        : COM12000MService.java
 * @author          : Built1
 * @date            : 2026.11.04
 * @description     : 메시지정보 조회/저장 기능을 정의하는 서비스 인터페이스
 * =====================================================================================
 * 수정일자          수정자             수정내용
 * -------------------------------------------------------------------------------------
 * 2026.11.04       Built1             최초 생성
 */
public interface COM12000MService {

    /**
     * @methodName  : selectMessageList
     * @description : 메시지 목록을 조회하는 메소드
     */
    List<Map<String, Object>> selectMessageList(
        Map<String, Object> paramMap
    ) throws Exception;

    /**
     * @methodName  : saveMessage
     * @description : 메시지 등록, 수정, 삭제 기능을 정의하는 메소드
     */
    void saveMessage(
        List<Map<String, Object>> messageList
    ) throws Exception;

}
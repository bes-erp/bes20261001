
package erp.com.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import erp.com.service.COM12000MService;

import org.springframework.transaction.annotation.Transactional;

/**
* =====================================================================================
* @packageName       : erp.com.service.impl
* @fileName          : COM12000MServiceImpl.java
* @author            : Built1
* @date              : 2026.11.04
* @description       : 메시지정보 조회/저장 기능을 처리하는 서비스 구현 클래스
* =====================================================================================
* 수정일자             수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.04          Built1             최초 생성
*/

@Service("COM12000MService")
public class COM12000MServiceImpl implements COM12000MService {

    @Resource(name = "COM12000MMapper")
    private COM12000MMapper mapper;

    /**
     * @methodName  : selectMessageList
     * @description : 메시지 목록을 조회하는 메소드
     */
    @Override
    public List<Map<String, Object>> selectMessageList(
            Map<String, Object> paramMap) throws Exception {

        return mapper.selectMessageList(paramMap);
    }

    /**
     * @methodName  : saveMessage
     * @description : 신규 메시지를 등록하는 메소드
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveMessage(
            List<Map<String, Object>> messageList) throws Exception {

        for (Map<String, Object> message : messageList) {

            // 메시지구분 및 메시지유형 검사
            String gubun = (String) message.get("MESSAGE_GUBUN");
            String type = (String) message.get("MESSAGE_TYPE_CD");

            if (!"FM".equals(gubun) && !"NM".equals(gubun)) {
                throw new IllegalArgumentException("메시지구분이 올바르지 않습니다.");
            }

            if (!"A".equals(type) && !"C".equals(type) && !"I".equals(type)) {
                throw new IllegalArgumentException("메시지유형이 올바르지 않습니다.");
            }

            // 다국어 메시지 필수값 검사
            String[] requiredColumns = {
                "MESSAGE_TEXT_KO",
                "MESSAGE_TEXT_EN",
                "MESSAGE_TEXT_ZH",
                "MESSAGE_TEXT_JA",
                "MESSAGE_TEXT_OT"
            };

            for (String column : requiredColumns) {
                Object value = message.get(column);

                if (value == null || value.toString().trim().isEmpty()) {
                    throw new IllegalArgumentException(
                        column + " 항목은 필수입니다."
                    );
                }
            }

            // 신규 메시지 등록
            mapper.insertMessage(message);
        }
        
        
    }
}

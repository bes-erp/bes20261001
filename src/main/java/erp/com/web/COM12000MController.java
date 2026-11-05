
package erp.com.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.java.xapi.data.DataSet;
import com.nexacro.uiadapter.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter.spring.core.data.NexacroResult;

import erp.com.service.COM12000MService;

/**
* =====================================================================================
* @packageName        : erp.com.web
* @fileName           : COM12000MController.java
* @author             : Built1
* @date               : 2026.11.04
* @description        : 메시지등록 화면의 요청을 처리하는 컨트롤러 클래스
* =====================================================================================
* 수정일자             수정자            수정내용
* -------------------------------------------------------------------------------------
* 2026.11.04          Built1           최초 생성
*/

@Controller
@RequestMapping("/com12000m")
public class COM12000MController {

    @Resource(name = "COM12000MService")
    private COM12000MService service;


    /**
     * @methodName  : selectMessageList
     * @description : 메시지 목록을 조회하는 메소드
     */
    @RequestMapping("/selectMessageList.do")
    public NexacroResult selectMessageList(
            @ParamDataSet(name = "dsSearch", required = false)
            List<Map<String, Object>> searchList
    ) throws Exception {

        // 검색조건을 담을 Map
        Map<String, Object> paramMap = new HashMap<>();

        // Nexacro에서 전달한 검색조건 설정
        if (searchList != null && !searchList.isEmpty()) {
            paramMap.putAll(searchList.get(0));
        }

        // 메시지 목록 조회
        List<Map<String, Object>> messageList =
                service.selectMessageList(paramMap);

        // 조회 결과를 Nexacro로 전달
        NexacroResult result = new NexacroResult();
        result.addDataSet("dsMessage", messageList);

        return result;
    }


    /**
     * @methodName  : saveMessage
     * @description : 신규 메시지 데이터를 전달받는 메소드
     */
    @RequestMapping("/saveMessage.do")
    public NexacroResult saveMessage(
            @ParamDataSet(name = "dsMessage", required = false)
            DataSet dsMessage
    ) throws Exception {

        // 신규 메시지를 담을 List
        List<Map<String, Object>> insertList = new ArrayList<>();

        // Nexacro에서 전달받은 데이터 확인
        if (dsMessage != null) {

            // 전달받은 행을 하나씩 확인
            for (int i = 0; i < dsMessage.getRowCount(); i++) {

                // 신규 행만 처리
                if (dsMessage.getRowType(i) == DataSet.ROW_TYPE_INSERTED) {

                    // 신규 메시지 정보를 담을 Map
                    Map<String, Object> message = new HashMap<>();

                    message.put("MESSAGE_GUBUN",
                            dsMessage.getString(i, "MESSAGE_GUBUN"));

                    message.put("MESSAGE_TYPE_CD",
                            dsMessage.getString(i, "MESSAGE_TYPE_CD"));

                    message.put("MESSAGE_TEXT_KO",
                            dsMessage.getString(i, "MESSAGE_TEXT_KO"));

                    message.put("MESSAGE_TEXT_EN",
                            dsMessage.getString(i, "MESSAGE_TEXT_EN"));

                    message.put("MESSAGE_TEXT_ZH",
                            dsMessage.getString(i, "MESSAGE_TEXT_ZH"));

                    message.put("MESSAGE_TEXT_JA",
                            dsMessage.getString(i, "MESSAGE_TEXT_JA"));

                    message.put("MESSAGE_TEXT_OT",
                            dsMessage.getString(i, "MESSAGE_TEXT_OT"));

                    message.put("REMARK",
                            dsMessage.getString(i, "REMARK"));

                    // 신규 목록에 추가
                    insertList.add(message);
                }
            }
        }

        // 현재 단계에서는 DB 저장을 실행하지 않음
        // 다음 단계에서 필수값 검증과 채번 처리를 완성한 뒤
        // service.saveMessage(insertList)를 연결할 예정

        NexacroResult result = new NexacroResult();

        return result;
    }
}

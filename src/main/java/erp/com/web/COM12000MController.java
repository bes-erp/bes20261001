package erp.com.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter.spring.core.data.NexacroResult;

import erp.com.service.COM12000MService;
import lombok.extern.slf4j.Slf4j;

/**
* =====================================================================================
* @packageName    		: erp.com.web
* @fileName       		: COM12000MController.java
* @author         		: Built1
* @date           		: 2026.11.05
* @description    		: 메시지 데이터를 조회/저장하는 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.04        	Built1             최초 생성
* 2026.11.05        	Built1             수정
* 2026.11.10			Built1			   데이터 저장 기능 추가
*/
@Slf4j
@Controller
@RequestMapping(value = "com/COM12000M")
public class COM12000MController {

    @Resource
    private COM12000MService service;

    /**
    * @methodName     		: selectMessageList
    * @author         		: built1
    * @date           		: 2026.11.05
    * @description    		: 메시지 데이터를 조회하는 메소드
    * @param searchParamMap
    * @param userId
    * @return
    * @throws Exception
    */
    @RequestMapping(value = "selectMessageList.do")
    public NexacroResult selectMessageList(@ParamDataSet(name = "inSearch") Map<String, Object> searchParamMap
                                          ,@ParamVariable(name = "userId") String userId) throws Exception {

        log.debug("## [ COM12000MController ] : {}", "selectMessageList");
        log.debug("## [ searchParamMap      ] : {}", searchParamMap);
        log.debug("## [ userId              ] : {}", userId);

        // 자바 형식 데이터를 넥사크로 데이터셋 형식으로 전환
        NexacroResult result = new NexacroResult();

        // 메시지 목록 조회
        List<Map<String, Object>> resultList = service.selectMessageList(searchParamMap, userId);
        
        log.debug("## [ 조회 건수 ] : {}", resultList.size());

        if (!resultList.isEmpty()) {
            log.debug("## [ 첫 번째 데이터 ] : {}", resultList.get(0));
        }

        // 조회된 데이터셋 결과 추가
        result.addDataSet("outSelectMessageList", resultList);

        // 조회결과 리턴
        return result;
    }

	/**
	* @methodName     		: saveMessage
	* @author         		: built1
	* @date           		: 2026.11.10
	* @description    		: 메시지 데이터를 등록, 수정, 삭제하는 메소드
	* @param messageList
	* @param userId
	* @return
	* @throws Exception
	*/
	@RequestMapping(value = "saveMessage.do")
	public NexacroResult saveMessage(@ParamDataSet(name = "inMessage") List<Map<String, Object>> messageList
	                                ,@ParamVariable(name = "userId") String userId) throws Exception {
	
	    log.debug("## [ COM12000MController ] : {}", "saveMessage");
	    log.debug("## [ 수신 건수 ] : {}", messageList == null ? 0 : messageList.size());
	
	    // 메시지 데이터 저장
	    int nSaveCnt = service.saveMessage(messageList, userId);
	
	    log.debug("## [ 저장 건수 ] : {}", nSaveCnt);
	
	    // 저장결과 리턴
	    NexacroResult result = new NexacroResult();
	
	    return result;
	}
}


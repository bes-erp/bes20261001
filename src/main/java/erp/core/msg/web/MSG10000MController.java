package erp.core.msg.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter.spring.core.data.NexacroResult;
import erp.core.util.MessageStore;
import lombok.extern.slf4j.Slf4j;


/**
* =====================================================================================
* @packageName    		: erp.core.msg.web
* @fileName       		: MSG10000MController.java
* @author         		: Built1
* @date           		: 2026.11.06
* @description    		: [메시지] 데이터를 조회하는 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.06        	Built1             최초 생성
* 2026.11.17        	Built1             메시지 조회를 DB 대신 서버 메모리(MessageStore)에서 하도록 변경
*                                          메시지 재적재(reloadMessage) 추가
*/
@Slf4j
@Controller
@RequestMapping(value = "msg/MSG10000M")
public class MSG10000MController {

	// 메시지 보관 객체 (서버 기동 시 MSG10000MService로 1회 적재됨)
	@Resource
	private MessageStore messageStore;

    
    /**
    * @methodName     		: selectMessageList
    * @author         		: built1
    * @date           		: 2026.11.06
    * @description    		: [메시지] 데이터를 조회하는 메소드
    *                         2026.11.17 DB 조회 대신 서버 메모리의 메시지를 반환
	* @return	            : outSelectMessageList(메시지목록)
    * @throws Exception
    */
    @RequestMapping(value = "selectMessageList.do")
    public NexacroResult selectMessageList() throws Exception {
    	
    	// 자바 형식 데이터를 넥사크로 데이터셋 형식으로 전환
    	NexacroResult result = new NexacroResult();
    	
    	// 메시지 조회 : 서버 메모리에서 조회 (DB 조회 없음)
    	List<Map<String, Object>> resultList = messageStore.getMessageList();
    	
    	// 조회된 데이터셋 결과 추가
    	result.addDataSet("outSelectMessageList", resultList);
    	
    	return result;
    }

    /**
    * @methodName     		: reloadMessage
    * @author         		: Built1
    * @date           		: 2026.11.17
    * @description    		: 메시지를 DB에서 다시 조회하여 서버 메모리에 재적재하는 메소드
    *                         (메시지 관리 화면에서 저장 후 호출)
	* @return	            : reloadCount(적재 건수)
    * @throws Exception
    */
    @RequestMapping(value = "reloadMessage.do")
    public NexacroResult reloadMessage() throws Exception {
    	
    	// 자바 형식 데이터를 넥사크로 데이터셋 형식으로 전환
    	NexacroResult result = new NexacroResult();
    	
    	// 메시지 재적재
    	int reloadCount = messageStore.reload();
    	
    	log.debug("## [ reloadCount             ] : {}", reloadCount);
    	
    	// 적재 건수 변수 추가
    	result.addVariable("reloadCount", reloadCount);
    	
    	return result;
    }
}
package erp.core.msg.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter.spring.core.data.NexacroResult;
import erp.core.msg.service.MSG10000MService;
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
*/
@Slf4j
@Controller
@RequestMapping(value = "msg/MSG10000M")
public class MSG10000MController {

	@Resource
	private MSG10000MService service;

    
    /**
    * @methodName     		: selectComboCodeList
    * @author         		: built1
    * @date           		: 2026.11.06
    * @description    		: [메시지] 데이터를 조회하는 메소드
	* @return	            : outSelectMessageList(메시지목록)
    * @throws Exception
    */
    @RequestMapping(value = "selectMessageList.do")
    public NexacroResult selectMessageList() throws Exception {
    	
    	// 자바 형식 데이터를 넥사크로 데이터셋 형식으로 전환
    	NexacroResult result = new NexacroResult();
    	
    	// 메시지 조회
    	List<Map<String, Object>> resultList = service.selectMessageList();
    	
    	// 조회된 데이터셋 결과 추가
    	result.addDataSet("outSelectMessageList", resultList);
    	
    	return result;
    }
}

package erp.core.dtl.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter.spring.core.data.NexacroResult;

import erp.core.dtl.service.DTL10000MService;
import lombok.extern.slf4j.Slf4j;



/**
* =====================================================================================
* @packageName    		: erp.core.dtl.web
* @fileName       		: DTL10000MController.java
* @author         		: Built1
* @date           		: 2026.11.10
* @description    		: [날짜] 데이터를 조회하는 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.10        	Built1             최초 생성
*/
@Slf4j
@Controller
@RequestMapping(value = "dtl/DTL10000M")
public class DTL10000MController {

	@Resource
	private DTL10000MService service;
    
    /**
    * @methodName     		: selectDateList
    * @author         		: built1
    * @date           		: 2026.11.10
    * @description    		: [날짜] 데이터를 조회하는 메소드
    * @return
    * @throws Exception
    */
    @RequestMapping(value = "selectDateList.do")
    public NexacroResult selectDateList() throws Exception {
    	
    	// 자바 형식 데이터를 넥사크로 데이터셋 형식으로 전환
    	NexacroResult result = new NexacroResult();
    	
    	// 메시지 조회
    	List<Map<String, Object>> resultList = service.selectDateList();
    	
    	// 조회된 데이터셋 결과 추가
    	result.addDataSet("outSelectDateList", resultList);
    	
    	return result;
    }
}

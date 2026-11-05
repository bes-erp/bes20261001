package erp.core.cbo.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter.spring.core.data.NexacroResult;
import erp.core.cbo.service.CBO10000MService;
import lombok.extern.slf4j.Slf4j;


/**
* =====================================================================================
* @packageName    		: erp.core.cbo.web
* @fileName       		: CBO10000MController.java
* @author         		: Built1
* @date           		: 2026.11.05
* @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.05        	Built1             최초 생성
*/
@Slf4j
@Controller
@RequestMapping(value = "cbo/CBO10000M")
public class CBO10000MController {

	@Resource
	private CBO10000MService service;

    /**
    * @methodName     		: selectComboCodeList
    * @author         		: built1
    * @date           		: 2026.11.05
    * @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 메소드
    * @param codeType
    * @param activeType
    * @param addAllRow
    * @return
    * @throws Exception
    */
    @RequestMapping(value = "selectComboCodeList.do")
    public NexacroResult selectComboCodeList(@ParamVariable(name = "codeType") String codeType
    		                                ,@ParamVariable(name = "activeType") String activeType
    		                                ,@ParamVariable(name = "addAllRow") String addAllRow) throws Exception {
    	
    	log.debug("## [ codeType                ] : {}", codeType);
    	log.debug("## [ activeType              ] : {}", activeType);
    	log.debug("## [ addAllRow               ] : {}", addAllRow);
    	
    	//자바 형식 데이터를 넥사크로 데이터셋 형식으로 전환
    	NexacroResult result = new NexacroResult();
    	
    	//코드 조회
    	List<Map<String, Object>> resultList = service.selectComboCodeList(codeType, activeType, addAllRow);
    	
    	//조회된 데이터셋 결과 추가
    	result.addDataSet("outSelectComboCodeList", resultList);
    	
    	return result;
    }
}

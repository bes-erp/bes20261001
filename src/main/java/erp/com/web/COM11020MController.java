package erp.com.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.nexacro.uiadapter.spring.core.data.NexacroResult;

import erp.com.service.COM11020MService;
import lombok.extern.slf4j.Slf4j;

/**
* =====================================================================================
* @packageName     : erp.com.web
* @fileName        : COM11020MController.java
* @author          : Built1
* @date            : 2026.11.04
* @description     : 메뉴정보 조회 요청을 처리하는 클래스
* =====================================================================================
* 수정일자          수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.04        Built1             최초 생성
*/
@Slf4j
@Controller
@RequestMapping(value = "com/menu")
public class COM11020MController {

    @Resource
    private COM11020MService service;

    /**
    * @methodName      : selectMenuList
    * @author          : built1
    * @date            : 2026.11.04
    * @description     : 메뉴정보 목록을 조회하는 메소드
    * @param menuText
    * @param userYn
    * @return
    * @throws Exception
    */
    @RequestMapping(value = "selectMenuList.do")
    public NexacroResult selectMenuList(@RequestParam(value = "menuText", required = false) String menuText, @RequestParam(value = "userYn", required = false) String userYn) throws Exception {

        // 메뉴정보 조회
        List<Map<String, Object>> resultList = service.selectMenuList(menuText, userYn);

        // 자바 형식 데이터를 넥사크로 데이터셋 형식으로 전환
        NexacroResult result = new NexacroResult();

        // 메뉴정보 결과 데이터셋 추가
        result.addDataSet("outMenu", resultList);

        // 메뉴정보 조회 결과 리턴
        return result;
    }
}
package erp.com.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.nexacro.java.xapi.data.DataSet;
import com.nexacro.uiadapter.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter.spring.core.annotation.ParamVariable;
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
 * 2026.11.05        Built1             공통 프레임 메뉴 조회 기능 추가
 */
@Slf4j
@Controller
@RequestMapping(value = "com/menu")
public class COM11020MController {

    @Resource
    private COM11020MService service;

    /**
     * @methodName      : selectMenuList
     * @author          : Built1
     * @date            : 2026.11.04
     * @description     : 메뉴등록 화면의 메뉴정보 목록을 조회하는 메소드
     * @param menuText  메뉴코드 또는 메뉴명
     * @param userYn    사용여부
     * @return          메뉴정보 결과 Dataset
     * @throws Exception
     */
    @RequestMapping(value = "selectMenuList.do")
    public NexacroResult selectMenuList(@ParamVariable(name = "menuText", required = false) String menuText,
                                        @ParamVariable(name = "userYn", required = false) String userYn) throws Exception {

    	 // 조회조건 수신 확인
        log.info("[메뉴조회] menuText={}, userYn={}", menuText, userYn);
        
        // 메뉴정보 조회
        List<Map<String, Object>> resultList = service.selectMenuList(menuText, userYn);

        // 넥사크로 결과 Dataset 생성
        NexacroResult result = new NexacroResult();

        // 메뉴정보 결과 Dataset 추가
        result.addDataSet("outMenu", resultList);

        return result;
    }

    /**
     * @methodName      : selectFrameMenuList
     * @author          : Built1
     * @date            : 2026.11.05
     * @description     : 공통 프레임에 표시할 사용 가능한 메뉴를 조회하는 메소드
     * @return          공통 프레임 메뉴 결과 Dataset
     * @throws Exception
     */
    @RequestMapping(value = "selectFrameMenuList.do")
    public NexacroResult selectFrameMenuList() throws Exception {

        // 공통 프레임 메뉴정보 조회
        List<Map<String, Object>> resultList = service.selectFrameMenuList();

        // 넥사크로 결과 Dataset 생성
        NexacroResult result = new NexacroResult();

        // 공통 프레임 메뉴 결과 Dataset 추가
        result.addDataSet("outFrameMenu", resultList);

        return result;
    }
    
    /**
     * @methodName      : saveMenuList
     * @author          : Built1
     * @date            : 2026.11.10
     * @description     : 메뉴정보 등록, 수정, 삭제를 일괄 처리하는 메소드
     * @param inMenu    변경된 메뉴정보 Dataset
     * @return          저장 처리 결과
     * @throws Exception
     */
    @RequestMapping(value = "saveMenuList.do")
    public NexacroResult saveMenuList(@ParamDataSet(name = "inMenu") DataSet inMenu) throws Exception {

        // 메뉴정보 일괄 저장
        int saveCount = service.saveMenuList(inMenu);

        // 저장 처리 결과 생성
        NexacroResult result = new NexacroResult();
        result.addVariable("saveCount", saveCount);

        return result;
    }
}

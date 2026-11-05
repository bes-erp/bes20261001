package erp.sys.web;

import java.util.Collections;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter.spring.core.data.NexacroResult;

import erp.sys.service.SYS10000MService;
import lombok.extern.slf4j.Slf4j;

/**
 * =====================================================================================
 * @packageName     : erp.sys.web
 * @fileName        : SYS10000MController.java
 * @author          : Built1
 * @date            : 2026.11.03
 * @description     : 사용자 로그인 요청 및 세션정보를 처리하는 클래스
 * =====================================================================================
 * 수정일자          수정자             수정내용
 * -------------------------------------------------------------------------------------
 * 2026.11.03        Built1             최초 생성
 */
@Slf4j
@Controller
@RequestMapping(value = "sys/SYS10000M")
public class SYS10000MController {

    @Resource
    private SYS10000MService service;

    /**
     * @methodName      : login
     * @author          : Built1
     * @date            : 2026.11.02
     * @description     : 사용자 로그인 요청 및 세션정보를 처리하는 메소드
     * @param loginParamMap 로그인 요청정보
     * @param request       HTTP 요청정보
     * @return              로그인 결과 Dataset
     * @throws Exception
     */
    @RequestMapping(value = "login.do")
    public NexacroResult login(@ParamDataSet(name = "dsLogin") Map<String, Object> loginParamMap,
                               HttpServletRequest request) throws Exception {

        // 사용자 로그인 인증
        Map<String, Object> resultMap = service.login(loginParamMap);

        // 로그인 성공 시 세션정보 등록
        if ("S".equals(resultMap.get("RESULT_CD"))) {

            // 기존 세션 무효화
            HttpSession session = request.getSession(false);

            if (session != null) {
                session.invalidate();
            }

            // 신규 세션 생성 및 사용자정보 등록
            session = request.getSession(true);
            session.setAttribute("LOGIN_USER_ID", loginParamMap.get("USER_ID"));
            session.setMaxInactiveInterval(1800);
        }

        // 자바 형식 데이터를 넥사크로 데이터셋 형식으로 전환
        NexacroResult result = new NexacroResult();

        // 로그인 결과 데이터셋 추가
        result.addDataSet("outLogin", Collections.singletonList(resultMap));

        // 로그인 결과 리턴
        return result;
    }
}

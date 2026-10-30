package erp.com.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter.spring.core.data.NexacroResult;

import erp.com.service.LoginService;

@Controller
@RequestMapping(value = "com/login")
public class LoginController {

    @Resource
    private LoginService service;

    // 사용자 로그인
    @RequestMapping(value = "login.do")
    public NexacroResult login(@ParamDataSet(name = "dsLogin") Map<String, Object> loginParamMap, HttpServletRequest request) throws Exception {

        NexacroResult result = new NexacroResult();
        Map<String, Object> resultMap = new HashMap<>();

        String userId = loginParamMap == null ? null : (String) loginParamMap.get("USER_ID");
        String password = loginParamMap == null ? null : (String) loginParamMap.get("PASSWORD");

        if (userId == null || userId.trim().isEmpty() || password == null || password.isEmpty()) {
            resultMap.put("RESULT_CD", "F");
            resultMap.put("RESULT_DESCR", "아이디와 비밀번호를 입력해 주세요.");
        } else {
            resultMap = service.login(loginParamMap);

            // 로그인 성공 시 세션 생성
            if ("S".equals(resultMap.get("RESULT_CD"))) {

                HttpSession oldSession = request.getSession(false);

                if (oldSession != null) {oldSession.invalidate();}

                HttpSession session = request.getSession(true);

                session.setAttribute("LOGIN_USER_ID", userId);
                session.setMaxInactiveInterval(1800);
            }
        }

        List<Map<String, Object>> resultList = new ArrayList<>();

        resultList.add(resultMap);
        result.addDataSet("outLogin", resultList);

        return result;
    }
}

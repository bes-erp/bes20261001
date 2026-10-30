package erp.com.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.com.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService {

    @Resource
    private LoginMapper mapper;

    @Override
    @Transactional
    public Map<String, Object> login(Map<String, Object> loginParamMap) throws Exception {

        Map<String, Object> paramMap = new HashMap<>();

        paramMap.put("user_id", loginParamMap.get("USER_ID"));
        paramMap.put("password", loginParamMap.get("PASSWORD"));
        paramMap.put("result_cd", null);
        paramMap.put("result_descr", null);

        // DB 패키지 호출
        mapper.loginPassword(paramMap);

        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("RESULT_CD", paramMap.get("result_cd"));
        resultMap.put("RESULT_DESCR", paramMap.get("result_descr"));

        return resultMap;
    }
}

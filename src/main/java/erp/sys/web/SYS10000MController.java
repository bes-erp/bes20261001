package erp.sys.web;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter.spring.core.data.NexacroResult;

import erp.core.util.SessionConst;
import erp.sys.service.SYS10000MService;
import erp.sys.vo.SYS10000MVO;
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
 * 2026.11.11	 	 Built1             로그인 사용자정보를 세션정보로 전환
 */
@Slf4j
@Controller
@RequestMapping(value = "sys/SYS10000M")
public class SYS10000MController {

    @Resource
    private SYS10000MService service;

    /**
     * @methodName      	: login
     * @author          	: Built1
     * @date            	: 2026.11.02
     * @description     	: 사용자 로그인 요청 및 세션정보를 처리하는 메소드
     * @param loginParamMap : 로그인 요청정보
     * @param request       : HTTP 요청정보
     * @return              : 로그인 결과 Dataset
     * @throws Exception
     */
    @RequestMapping(value = "login.do")
    public NexacroResult login(@ParamDataSet(name = "dsLogin") Map<String, Object> loginParamMap
                              ,HttpServletRequest request) throws Exception {

        // 자바 형식 데이터를 넥사크로 데이터셋 형식으로 전환
        NexacroResult result = new NexacroResult();
        
    	// 사용자 로그인 인증
        Map<String, Object> loginResultMap = service.login(loginParamMap);

        // 로그인 성공 시 세션정보 등록
        if ("S".equals(loginResultMap.get("RESULT_CD"))) {
        	
        	// 사용자정보 조회
            Map<String, Object> userInfoMap = service.selectLoginUserInfo(loginParamMap);
            
            // 사용자정보 → 세션 VO 변환
            SYS10000MVO loginUserInfo = toSYS10000MVO(userInfoMap);

            // 기존 세션 무효화
            HttpSession session = request.getSession(false);

            if (session != null) {
                session.invalidate();
            }

            // 신규 세션 생성 및 사용자정보 등록(gds_user_info) : erp.core.util.SessionConst
            session = request.getSession(true);
            session.setAttribute(SessionConst.LOGIN_USER, loginUserInfo);
            session.setMaxInactiveInterval(SessionConst.SESSION_TIMEOUT);
            
            // 사용자정보 데이터셋 추가 (넥사크로 gds_user_info 용)
            result.addDataSet("outSelectUserInfo", Collections.singletonList(toUserInfoMap(loginUserInfo)));
        }

        // 로그인 결과 데이터셋 추가
        result.addDataSet("outLogin", Collections.singletonList(loginResultMap));

        // 로그인 결과 리턴
        return result;
    }

    /**
    * @methodName     		: getSessionUser
    * @author         		: built1
    * @date           		: 2026.11.12
    * @description    		: 세션에 등록된 사용자정보를 조회하는 메소드 (새로고침 시 gds_user_info 복원용)
    * @param 				: session(HTTP 세션)
    * @return				: 사용자정보 Dataset
    * @throws Exception
    */
    @RequestMapping(value = "getSessionUser.do")
    public NexacroResult getSessionUser(HttpSession session) throws Exception {

        NexacroResult result = new NexacroResult();

        SYS10000MVO loginUser = (SYS10000MVO) session.getAttribute(SessionConst.LOGIN_USER);

        if (loginUser == null) {
            result.setErrorCode(-1);
            result.setErrorMsg("세션이 만료되었습니다. 다시 로그인해 주세요.");
            return result;
        }

        result.addDataSet("outUserInfo", Collections.singletonList(toUserInfoMap(loginUser)));

        return result;
    }
    
    /**
    * @methodName     		: logout
    * @author         		: built1
    * @date           		: 2026.11.12
    * @description    		: 사용자 로그아웃 및 세션을 무효화하는 메소드
    * @param 				: request(HTTP 요청정보)
    * @return				: 처리 결과
    * @throws Exception
    */
    @RequestMapping(value = "logout.do")
    public NexacroResult logout(HttpServletRequest request) throws Exception {

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return new NexacroResult();
    }

    /**
    * @methodName     		: toSYS10000MVO
    * @author         		: built1
    * @date           		: 2026.11.12
    * @description    		: 조회된 사용자정보 Map을 세션 VO로 변환 메소드
    * @param 				: userInfoMap(사용자정보)
    * @return
    */
    private SYS10000MVO toSYS10000MVO(Map<String, Object> userInfoMap) {

        SYS10000MVO vo = new SYS10000MVO();

        vo.setUserId(toStr(userInfoMap.get("USER_ID")));
        vo.setUserNm(toStr(userInfoMap.get("USER_NM")));
        vo.setEmpId(toLong(userInfoMap.get("EMP_ID")));
        vo.setEmpNum(toStr(userInfoMap.get("EMP_NUM")));
        vo.setEmpNm(toStr(userInfoMap.get("EMP_NM")));
        vo.setCompanyCd(toStr(userInfoMap.get("COMPANY_CD")));
        vo.setCompanyNm(toStr(userInfoMap.get("COMPANY_NM")));
        vo.setDeptCd(toStr(userInfoMap.get("DEPT_CD")));
        vo.setDeptNm(toStr(userInfoMap.get("DEPT_NM")));
        vo.setGradeCd(toStr(userInfoMap.get("GRADE_CD")));
        vo.setGradeNm(toStr(userInfoMap.get("GRADE_NM")));
        vo.setJobCd(toStr(userInfoMap.get("JOB_CD")));
        vo.setJobNm(toStr(userInfoMap.get("JOB_NM")));
        vo.setPositionCd(toStr(userInfoMap.get("POSITION_CD")));
        vo.setPositionNm(toStr(userInfoMap.get("POSITION_NM")));
        vo.setHireDate(toStr(userInfoMap.get("HIRE_DATE")));
        vo.setRetireDate(toStr(userInfoMap.get("RETIRE_DATE")));
        vo.setSupervisorEmpId(toLong(userInfoMap.get("SUPERVISOR_EMP_ID")));
        vo.setSupervisorEmpNum(toStr(userInfoMap.get("SUPERVISOR_EMP_NUM")));
        vo.setSupervisorEmpNm(toStr(userInfoMap.get("SUPERVISOR_EMP_NM")));

        return vo;
    }

    /**
    * @methodName     		: touserInfoMap
    * @author         		: built1
    * @date           		: 2026.11.12
    * @description    		: 세션 VO를 넥사크로 Dataset용 Map으로 변환 (gds_user_info 컬럼 구조)
    * @param 				: vo(vo 클래스)
    * @return
    */
    private Map<String, Object> toUserInfoMap(SYS10000MVO vo) {

        Map<String, Object> userInfoMap = new LinkedHashMap<>();

        userInfoMap.put("USER_ID",            vo.getUserId());
        userInfoMap.put("USER_NM",            vo.getUserNm());
        userInfoMap.put("EMP_ID",             vo.getEmpId());
        userInfoMap.put("EMP_NUM",            vo.getEmpNum());
        userInfoMap.put("EMP_NM",             vo.getEmpNm());
        userInfoMap.put("COMPANY_CD",         vo.getCompanyCd());
        userInfoMap.put("COMPANY_NM",         vo.getCompanyNm());
        userInfoMap.put("DEPT_CD",            vo.getDeptCd());
        userInfoMap.put("DEPT_NM",            vo.getDeptNm());
        userInfoMap.put("GRADE_CD",           vo.getGradeCd());
        userInfoMap.put("GRADE_NM",           vo.getGradeNm());
        userInfoMap.put("JOB_CD",             vo.getJobCd());
        userInfoMap.put("JOB_NM",             vo.getJobNm());
        userInfoMap.put("POSITION_CD",        vo.getPositionCd());
        userInfoMap.put("POSITION_NM",        vo.getPositionNm());
        userInfoMap.put("HIRE_DATE",          vo.getHireDate());
        userInfoMap.put("RETIRE_DATE",        vo.getRetireDate());
        userInfoMap.put("SUPERVISOR_EMP_ID",  vo.getSupervisorEmpId());
        userInfoMap.put("SUPERVISOR_EMP_NUM", vo.getSupervisorEmpNum());
        userInfoMap.put("SUPERVISOR_EMP_NM",  vo.getSupervisorEmpNm());

        return userInfoMap;
    }

    // Object → String 변환 (null 안전)
    private String toStr(Object obj) {
        return obj == null ? null : String.valueOf(obj);
    }

    // Object → Long 변환 (BigDecimal, Integer 등 숫자형 및 숫자 문자열 대응)
    private Long toLong(Object obj) {
        if (obj == null) {
            return null;
        }
        if (obj instanceof Number) {
            return ((Number) obj).longValue();
        }
        String str = String.valueOf(obj).trim();
        return str.isEmpty() ? null : Long.valueOf(str);
    }
}



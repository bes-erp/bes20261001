package erp.core.util;

import java.util.function.Function;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import erp.sys.vo.SYS10000MVO;

/**
* =====================================================================================
* @packageName    		: erp.core.util
* @fileName       		: SessionUserInfo.java
* @author         		: Built1
* @date           		: 2026.11.12
* @description    		: 로그인 사용자 세션정보를 조회하는 공통 유틸 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.12        	Built1             최초 생성
*/
public class SessionUserInfo {

    private SessionUserInfo() {}
    
    /**
    * @methodName     		: getLoginUser
    * @author         		: built1
    * @date           		: 2026.11.12
    * @description    		: 로그인 사용자 VO (미로그인 또는 요청 외 스레드일 경우 null)
    * @return
    */
    public static SYS10000MVO getLoginUser() {

        // 실행 중인 HTTP 요청 정보를 가져오기
    	ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        // 웹 요청이 아닌 경우 (배치, 스케줄러, 비동기 스레드 등)
        if (attr == null) {
            return null;
        }
        
        // 현재 HTTP 요청 객체를 꺼내기
        HttpServletRequest request = attr.getRequest();
        
        // false(기존 세션 반환), true(새 세션을 만들어 반환)
        HttpSession        session = request.getSession(false);

        if (session == null) {
            return null;
        }

        // 세션에 저장해 둔 로그인 사용자정보를 꺼내기
        return (SYS10000MVO) session.getAttribute(SessionConst.LOGIN_USER);
    }

    /**
     * @methodName      : isLogin
     * @description     : 로그인 여부 체크
     * @return          : true(로그인), false(미로그인)
     */
    public static boolean isLogin() {
        SYS10000MVO user = getLoginUser();
        return user != null && user.getUserId() != null;
    }

    /**
     * @methodName      : getLoginUserRequired
     * @description     : 로그인 사용자 세션정보 조회 (미로그인 시 예외 발생)
     * @return          : 로그인 사용자 VO
     */
    public static SYS10000MVO getLoginUserRequired() {
        SYS10000MVO user = getLoginUser();
        if (user == null) {
            throw new IllegalStateException("로그인 세션이 존재하지 않습니다.");
        }
        return user;
    }

    /** 세션 항목 조회 공통 처리 (null 안전) 
     * 로그인 사용자가 있으면 원하는 항목을 꺼내고, 없으면 null */    
    private static <T> T get(Function<SYS10000MVO, T> getter) {
        SYS10000MVO user = getLoginUser();
        return user == null ? null : getter.apply(user);
    }

    // =================================================================================
    // 사용자정보 항목별 조회 (넥사크로 gds_user_info 컬럼과 대응)
    // =================================================================================
    public static String getUserId()           { return get(SYS10000MVO::getUserId); }           // USER_ID
    public static String getUserNm()           { return get(SYS10000MVO::getUserNm); }           // USER_NM
    public static Long   getEmpId()            { return get(SYS10000MVO::getEmpId); }            // EMP_ID
    public static String getEmpNum()           { return get(SYS10000MVO::getEmpNum); }           // EMP_NUM
    public static String getEmpNm()            { return get(SYS10000MVO::getEmpNm); }            // EMP_NM
    public static String getCompanyCd()        { return get(SYS10000MVO::getCompanyCd); }        // COMPANY_CD
    public static String getCompanyNm()        { return get(SYS10000MVO::getCompanyNm); }        // COMPANY_NM
    public static String getDeptCd()           { return get(SYS10000MVO::getDeptCd); }           // DEPT_CD
    public static String getDeptNm()           { return get(SYS10000MVO::getDeptNm); }           // DEPT_NM
    public static String getGradeCd()          { return get(SYS10000MVO::getGradeCd); }          // GRADE_CD
    public static String getGradeNm()          { return get(SYS10000MVO::getGradeNm); }          // GRADE_NM
    public static String getJobCd()            { return get(SYS10000MVO::getJobCd); }            // JOB_CD
    public static String getJobNm()            { return get(SYS10000MVO::getJobNm); }            // JOB_NM
    public static String getPositionCd()       { return get(SYS10000MVO::getPositionCd); }       // POSITION_CD
    public static String getPositionNm()       { return get(SYS10000MVO::getPositionNm); }       // POSITION_NM
    public static String getHireDate()         { return get(SYS10000MVO::getHireDate); }         // HIRE_DATE
    public static String getRetireDate()       { return get(SYS10000MVO::getRetireDate); }       // RETIRE_DATE
    public static Long   getSupervisorEmpId()  { return get(SYS10000MVO::getSupervisorEmpId); }  // SUPERVISOR_EMP_ID
    public static String getSupervisorEmpNum() { return get(SYS10000MVO::getSupervisorEmpNum); } // SUPERVISOR_EMP_NUM
    public static String getSupervisorEmpNm()  { return get(SYS10000MVO::getSupervisorEmpNm); }  // SUPERVISOR_EMP_NM
    
}

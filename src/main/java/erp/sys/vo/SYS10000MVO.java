package erp.sys.vo;

import java.io.Serializable;

import lombok.Data;

/**
* =====================================================================================
* @packageName    		: erp.sys.vo
* @fileName       		: SYS10000MVO.java
* @author         		: Built1
* @date           		: 2026.11.11
* @description    		: 로그인 사용자 세션정보 정보를 정의하는 클래스
* 
* @Data                 : getter/setter
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.11        	Built1             최초 생성
*/
@Data
public class SYS10000MVO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String userId;				// 사용자ID
    private String userNm;				// 사용자명
    private Long   empId;				// 임직원ID
    private String empNum;				// 사번
    private String empNm;				// 성명
    private String companyCd;			// 회사코드
    private String companyNm;			// 회사명
    private String deptCd;				// 부서코드
    private String deptNm;				// 부서명
    private String gradeCd;				// 직급코드
    private String gradeNm;				// 직급명
    private String jobCd;				// 직무코드
    private String jobNm;				// 직무명
    private String positionCd;			// 직책코드
    private String positionNm;			// 직책명
    private String hireDate;			// 입사일자
    private String retireDate;			// 퇴사일자
    private Long   supervisorEmpId;		// 상위자ID
    private String supervisorEmpNum;	// 상위자사번
    private String supervisorEmpNm;		// 상위자성명
    
}
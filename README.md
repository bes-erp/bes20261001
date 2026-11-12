# Built1 enterprise system
**☆ [공통] 매일 작업한 내용을 기록하고 push 바랍니다.**
**☆ [공통] 최근 작업한 내용이 위로 배치, 금일 이후로 작성합니다.**

**☆ [2026-11-12 : dims1111] 넥사크로 세션정보 추가**
 1. libUserInfo
 2. [BES] 전자정부 & NexacroN24-110.리이브러리 목록_20261111_v0.1.xlsx
 3. gds_user_info
 4. 넥사크로 세션 변수
  - this.gUserId           			: 사용자ID          (USER_ID)
  - this.gUserNm           			: 사용자명          (USER_NM)
  - this.gEmpId            			: 임직원ID          (EMP_ID)
  - this.gEmpNum           			: 사번              (EMP_NUM)
  - this.gEmpNm            			: 성명              (EMP_NM)
  - this.gCompanyCd        			: 회사코드          (COMPANY_CD)
  - this.gCompanyNm        			: 회사명            (COMPANY_NM)
  - this.gDeptCd           			: 부서코드          (DEPT_CD)
  - this.gDeptNm           			: 부서명            (DEPT_NM)
  - this.gGradeCd          			: 직급코드          (GRADE_CD)
  - this.gGradeNm          			: 직급명            (GRADE_NM)
  - this.gJobCd            			: 직무코드          (JOB_CD)
  - this.gJobNm            			: 직무명            (JOB_NM)
  - this.gPositionCd       			: 직책코드          (POSITION_CD)
  - this.gPositionNm       			: 직책명            (POSITION_NM)
  - this.gHireDate         			: 입사일자          (HIRE_DATE)
  - this.gRetireDate       			: 퇴사일자          (RETIRE_DATE)
  - this.gSupervisorEmpId  			: 상위자ID          (SUPERVISOR_EMP_ID)
  - this.gSupervisorEmpNum 			: 상위자사번        (SUPERVISOR_EMP_NUM)
  - this.gSupervisorEmpNm  			: 상위자성명        (SUPERVISOR_EMP_NM) 

**☆ [2026-11-11 : dims1111] 라이브러리 재배치 및 수정**
 1. 아래 내용 일괄 변경 모두 pull 하시고 작업하세요.
 2. 라이브러리 함수 내부/외부 구분 및 함수 명칭 변경
 3. 라이브러리 함수 수정
  - gfn_code    => gfn_getCode
  - gfn_message => gfn_getMessage

 4. 문서 작성 및 수정
  - (BES) 전자정부 & NexacroN24-110.리이브러리 목록_20261111_v0.1.xlsx

**☆ [2026-11-11 : dims1111] pom.xml 수정**
 1. favicon.ico 컴파일 폴더로 복사
 2. 넥사크로 / Environment / 더블클릭 / Desktop_screen
   - icon : /bes-ui/favicon.ico
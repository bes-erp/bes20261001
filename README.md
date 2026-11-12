# Built1 enterprise system
**☆ [공통] 매일 작업한 내용을 기록하고 push 바랍니다.**
**☆ [공통] 최근 작업한 내용이 위로 배치, 금일 이후로 작성합니다.**

**☆ [2026-11-12 : sdaeun] 메시지등록 화면 개선 및 그리드 공통함수 추가**
1. 메시지등록 화면(COM12000M) 기능 개선
 - 신규 행 메시지분류 및 메시지유형 수정 가능, 기존 행 수정 제한
 - 그리드 체크박스 전체 선택 / 해제 기능 공통함수 적용
 - 필수항목 검증 공통함수 적용
 
2. 그리드 공통라이브러리(libGrid.js) 기능 추가
 - 함수명 : gfn_gridCheckAll
 - 기능 : 그리드 헤더 체크박스 전체 선택 / 해제
 - 전자정부 & NexacroN24-110.라이브러리 목록 문서 업데이트

3. 공통 메시지 처리 기능 개선 
 - 메시지 출력 시 서식 태그 제거 처리

**☆ [2026-11-12 : dlwmsnw] 파비콘·로고 교체 및 상단 언어 표시 수정**
 1. 파비콘 이미지 교체
 2. 상단 로고 이미지 교체
 3. 로딩 이미지 교체
 4. libLang 함수 추가
  - this.gfn_getCurrentLanguage : 현재 적용 중인 언어 코드 조회
  - this.gfn_getLanguageInfo    : 언어 코드의 표시명과 국기 이미지 조회
 5. Form_Top 수정
  - 로그인에서 선택한 언어만 표시 (상단에서 언어 변경 불가)
  - pdv_language, ds_language 삭제
  - btn_language_onclick, pdv_language_grd_language_oncellclick 삭제
 6. xcss 추가
  - .Button.besTopLanguage : 상단 언어 표시 전용 (드롭다운 화살표·hover 제거, 왼쪽 여백 0)
 7. SYS10000M 수정
  - fn_init 의 cbo_lang.set_index(0) 삭제 (콤보 표시와 실제 적용 언어 불일치 수정)
 8. 문서 수정
  - [BES] 전자정부 & NexacroN24-110.리이브러리 목록_20261111_v0.1.xlsx : libLang 함수 추가
 9. ※ pull 후 넥사크로 Generate 및 브라우저 캐시 삭제(Ctrl+F5) 필요

**☆ [2026-11-12 : dims1111] 넥사크로 데이터셋, 변수, 자바변수 SQL, 프로파일 정보 추가**
1. 넥사크로 데이터셋, 변수, 자바 변수 선언 sql
 - 쿼리 파일 :  /bes/src/main/bes-db/900.tip/넥사크로, 자바 변수선언.sql

2. 프로파일 정보 생성
 - 테이블 : sys_profile
 - 데이터 등록 파일 : /bes/src/main/bes-db/300.table/sys/100.데이터 등록/프로파일 등록.xlsx
 
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
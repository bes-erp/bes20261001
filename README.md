# Built1 enterprise system
**☆ [공통] 매일 작업한 내용을 기록하고 push 바랍니다.**
**☆ [공통] 최근 작업한 내용이 위로 배치, 금일 이후로 작성합니다.**

**☆ [2026-11-18 : dims1111] 자바에서 메시지 데이터를 세션에서 호출하도록 기능 구현 **
**1. 수정 파일**
 - MSG10000MController
 - 1.1 List<Map<String, Object>> resultList = messageStore.getMessageList(); // 메시지 데이터 조회
 - 1.2 함수 추가 : 메시지 데이터 DB에서 조회하여 재 적재
 -     public NexacroResult reloadMessage() throws Exception
 - 1.3 위 2.2 함수를 메시지 컨트롤러 저장 후 함수[ reloadMessage() ] 호출 해주세요.
 
**2. 신규 파일**
 - MessageStore.java : 넥사크로의 gds_message 역할
 - MessageFinder.java : 넥사크로 라이브러리 gfn_getMessage 역할 
 - 상세한 내용은 자바 주석을 확인하세요
 
**3. 사용 방법**
 - 임포트 : import static erp.core.util.MessageFinder.*;
 - log.debug("## getMessage(\"JM-ALT-10041\")  : {}", getMessage("JM-ALT-10041"));  // 사용자정보가 등록되지 않았습니다. 관리자에게 문의해 주세요.
 
 - 임포트 : import erp.core.util.SessionUserInfo;
 - log.debug("## SessionUserInfo.getLangCd();) : {}", SessionUserInfo.getLangCd());  // 언어코드

**☆ [2026-11-18 : sdaeunn] 공통 라이브러리 개선 및 웹폰트 적용 구조 개선 **
 1. 그리드 공통라이브러리(libGrid.js) 개선
  - 헤더 셀 인덱스 조회 공통함수(gfn_getGridHeaderIndex) 추가
  - 헤더 체크박스 초기화 공통함수(gfn_gridCheckReset) 추가
 2. 데이터셋 공통라이브러리(libDataset.js) 기능 추가
  - 체크박스 변경 상태 초기화 공통함수(gfn_resetSelectionOnlyRows) 추가
  - CHK 컬럼만 변경된 기존 행을 저장 대상에서 제외하도록 처리
 3. 메시지등록 화면(COM12000M) 개선
  - 조회조건 영역 상·하단 간격 가이드 Static 추가 및 수직 중앙 정렬
  - 컴포넌트별 개별 font 속성 제거 및 공통 폰트 스타일 적용
 4. Pretendard 웹폰트 적용 구조 개선
  - XFONT 내 폰트 정의를 별도 CSS 파일로 분리
  - @import 방식의 WOFF2 웹폰트 로딩 구조 적용
  - 개발자 PC별 폰트 설치 관련 Generate 오류 해결
  
**☆ [2026-11-18 : dlwmsnw] 업무 탭 최대 개수 기본값 제거, 업무 탭 이동·PrivateProfile·로그인 토큰 분석**
 1. 업무 탭 최대 개수 화면 기본값 제거 (Form_Mdi)
  - fv_tabMaxDefault(7) 삭제, sys_profile MDI_TAB_MAX_CNT 값만 사용
  - 프로파일 미등록·값 오류 시 개수 제한 없음 처리 (fn_getTabMaxCnt 0 반환)
 2. 업무 탭 이동 버튼(‹ ›) 동작 분석 (fn_createTabs)
  - 버튼 클릭 시 표시 시작 위치만 변경 후 탭 버튼 전체 재생성
  - 선택 탭 위치 조정(bShowActive), 시작 위치 범위 보정, 이동 버튼 활성 조건 정리
 3. PrivateProfile 저장 위치 분석
  - 사용자 PC 저장 (웹 : 브라우저 localStorage), 재부팅 후에도 유지
  - 세션(서버 메모리)·전역 Dataset(앱 메모리)과 구분, 개발자 도구에서 평문 확인 가능하여 비밀번호 저장 부적합
 4. 로그인 비밀번호 저장 토큰 테이블 분석
  - sys_profile 은 전체 사용자 공용 설정이며 로그인 시 화면으로 전송되어 사용자별 토큰 저장 부적합
  - 별도 토큰 테이블(com_user_login_token) 설계안 작성 (토큰 해시, 만료일, 사용여부)
  - 토큰 유효기간 등 설정값은 sys_profile 로 관리 가능
  
**☆ [2026-11-17 : sdaeunn] 공통 UI 스타일 및 메시지등록 화면 기능 개선 **
 1. 공통 폰트 적용 및 스타일 개선
  - Grid 일반 데이터, 편집 영역 및 ComboBox 폰트 통일
  - Work 영역 엑셀 다운로드 버튼 아이콘 변경
 2. 메시지등록 화면(COM12000M) 개선
  - 메시지번호 더블클릭 시 클립보드 복사 기능 추가
  - 복사 완료 토스트 메시지 출력 및 자동 숨김 처리
  - 메시지 분류 및 유형 신규 행은 콤보박스, 기존 행은 텍스트 형태로 표시
  
**☆ [2026-11-17 : dlwmsnw] 업무 탭 디자인 변경, 로그인 비밀번호 저장 관리, gv_lang·gv_userid 잔여 참조 정리**
 1. 업무 탭(Form_Mdi) 선택 표시 디자인 변경
  - 선택 탭 : 직각, 네이비 100(#D6E0F0) → 네이비 50(#EEF2F9) → 흰색 그라데이션, 상단 강조선 보조 청록 500(#0E8C78) 2px, 좌·우 테두리 제거
  - 하단 기준선 : 2px → 1px
  - 닫기 버튼(×) : 텍스트 → 이미지, 선택 탭 × 강조 (besMdiTabCloseSelected)
  - bes_icon : btn_tab_close.png(#8A94A6), btn_tab_close_sel.png(#1F3F73) 추가
  - 글자 위치 : 선택 탭은 강조선과, 기본 탭은 기준선과 간격을 두도록 조정
  - 둥근 모서리 제거로 NRE 보정용 선택 탭 덮개(btn_tab_cover, besMdiTabCover) 삭제
 2. 로그인 화면(SYS10000M) 비밀번호 저장 관리
  - 비밀번호 저장 체크박스 기본 숨김, 아이디 ADMIN 입력 시에만 표시 (edt_userId oninput)
  - ADMIN 전용 비밀번호 저장/복원 추가
 3. SYS10000M gv_lang, gv_userid 잔여 참조 정리
  - fn_loginSuccess : gv_lang → this.gfn_getCurrentLanguage()
  - fn_resetLogin : gv_userid 초기화 삭제 (gds_user_info 초기화로 대체)

**☆ [2026-11-16 : dims1111] 로그인 비밀번호 검증 WAS 이관 및 대문자 규칙 적용 **
 1. 로그인 화면 정규화 진행
  - 넥사크로
  - 자바
  - 매퍼
 2. 비밀번호 검증 오라클 패키지에서 자바 클래스로 변경
  - 원인 : 오라클 패캐지 7초 
  - 자바 클래스 : PasswordHasher.java 
 3. 이클립스, 자바, 매퍼 대소문자 규칙
  - 넥사크로 : 데이터셋 대문자
  -          : 데이터셋 명명 규칙 : ds_login_result ("_"로 구분)
  -          : 예시
  -          <ColumnInfo>
  -			  	<Column id="USER_ID" type="STRING" size="256"/>
  -			  	<Column id="PASSWORD" type="STRING" size="256"/>
  -				<Column id="LANG_CD" type="STRING" size="256"/>
  -			 </ColumnInfo>
			 
  - 자바 : 데이터베이스 컬럼 직접 사용 대문자 (get, set)
  -	     : 예시
  -	     String sResultCd    = toStr(loginResultMap.get("RESULT_CD"));
  -      String sResultDescr = toStr(loginResultMap.get("RESULT_DESCR"));
         
  - 매퍼 : 쿼리는 소문자, 조건의 매개변수는 대문자
  -       : 쿼리 작성시 첫줄에 /* 매퍼이름.쿼리ID */ 반드시 표기
  -       : 스키마.명칭의 스키마 사용하지 않음
  -       : 예시
  -       <select id="selectLoginPassword" parameterType="string" resultType="map">
  -      	select /* SYS10000MMapper.selectLoginPassword */
  -                cu.password
  -               ,cu.user_yn
  -               ,cu.lock_yn
  -           from com_user cu
  -          where 1=1
  -            and cu.user_id = #{USER_ID}
  -       </select>
  
**☆ [2026-11-16 : sdaeunn] 웹폰트 적용 및 공통 버튼 디자인 개선 **
 1. Pretendard 웹폰트 적용
  - Pretendard 웹폰트 파일(Regular, Medium, SemiBold, Bold) 등록
  - UserFont(Pretendard.xfont) 생성 및 Environment 설정
  - Work 영역 전용 폰트 스타일(Pretendard.xcss) 추가
 2. 공통 버튼 스타일(Button.xcss) 추가
  - 조회, 초기화, 저장, 행 추가, 행 삭제, 엑셀 다운로드 버튼 아이콘 등록
  - 버튼별 cssclass 정의 및 아이콘 공통 관리
 3. 메시지등록 화면(COM12000M) 개선
  - Work 영역 전용 폰트 cssclass 적용
  - 공통 버튼 아이콘 cssclass 적용 

**☆ [2026-11-16 : dlwmsnw] 업무 탭 디자인 변경, 다국어 확대(JA·OT), gv_lang·gv_userid 삭제**
 1. 업무 탭(Form_Mdi) 선택 표시 디자인 변경
  - 선택 탭 : 흰 카드 + 보조 청록 500(#0E8C78) 테두리 2px, 위쪽 모서리 둥글게
  - 하단 기준선 : 같은 색 2px, 선택 탭 아래만 열림 (sta_tabLineL, sta_tabLineR)
  - 선택 전후 탭 글자 위치 동일, NRE 표시 보정 (선택 탭 아래 덮개, 닫기 버튼 여백 0)
 2. 다국어 지원 확대 (일본어 JA, 기타 OT 추가)
  - libLang : 지원 언어 확인 함수(_gfn_isLanguage) 추가, 일본어/JP · 기타/OT 표시 정보 추가
  - libMessage : gfn_msgBox OT 추가, 미지원 언어·빈 메시지는 한국어로 대체
  - SYS10000M : 로그인 언어 콤보 JA, OT 추가, 일본어 로그인 문구 추가 (OT 는 영어 문구)
  - bes_icon : img_TF_jp.png(일본 국기), img_TF_ot.png(지구본) 추가
 3. 넥사크로 전역 변수 gv_lang, gv_userid 삭제
  - appvariables.xml : gv_lang, gv_userid 삭제
  - 현재 언어 : this.gfn_getCurrentLanguage() (PrivateProfile 저장값 기준)
  - 사용자 ID : 넥사크로 this.gUserId / 자바 getUserId() (SessionUserInfo)
  - libLang, libMessage, libUserInfo, SYS10000M 수정 (로그인 후 상단 언어 표시 추가)
 4. 메시지등록(COM12000M) 사용자 ID 서버 세션 조회로 변경
  - 화면에서 userId 전달 제거, Controller·Service·Serviceimpl 에서 getUserId() 사용
  - 세션이 없으면 저장 차단 (isLogin)
 5. libEvent : gfn_delRow 체크 컬럼 매개변수 추가 (미지정 시 기존 CHK)
 6. web.xml : 세션 쿠키 경로를 / 로 지정
  - nginx(/bes) 와 Tomcat(/built1) 경로 차이로 세션이 유지되지 않던 문제 해결 (nginx 수정 불필요)
  
**☆ [2026-11-15 : dims1111] 매뉴얼, 언어코드 세션 통합, 라이브러리 파일 업데이트**
 1. 매뉴얼 현행화
  - 폴더 명칭 변경 : 110.설치 메뉴얼 => 110.설치 매뉴얼
  - 현행화 내용 : 엔진엑스 강제 종료, 이클립스 최적화 등
 2. 매뉴얼 추가
  - [BES] 전자정부 & NexacroN24-230.오라클 19.3.0.0c 설치 및 삭제_20261027_v0.1.pptx
  - [BES] 전자정부 & NexacroN24-240.로그인 및 민감정보 로그 제외 또는 마스킹 처리_20261027_v0.1.pptx
 3. 언어코드 세션 통합
  - gds_user_info : LANG_CD 추가
  - 넥사크로 접근자 프로퍼티 : this.gLangCd (언어코드)
  - 이클립스 getter 함수 : getLangCd() (언어코드)
  - 이클립스에서는 반드시 임포트 : import static erp.core.util.SessionUserInfo.*;
  - 예) log.debug("## [ COM12000MServiceimpl ] : {}", "COM12000MServiceimpl");
  -     log.debug("## [ getLangCd()          ] : {}", getLangCd());
  -     log.debug("## [ getUserId()          ] : {}", getUserId());
 4. 넥사크로 라이브러리 파일 업데이트
  - 파일 : [BES] 전자정부 & NexacroN24-110.리이브러리 목록_20261111_v0.1.xlsx
  - 파일 : [BES] 전자정부 & NexacroN24-120.넥사크로 세션정보 생성_20261113_v0.1.xlsx
  
**☆ [2026-11-12 : sdaeunn] 메시지등록 화면 개선 및 공통함수 추가**
 1. 메시지등록 화면(COM12000M) 기능 개선
  - Dataset 컬럼 ID 대문자 통일 및 관련 스크립트 수정
  - MapperSQL 조회 컬럼 별칭 및 파라미터 대문자 통일
  - 조회조건 초기화 공통함수(gfn_searchClear) 적용
  - 행 추가/삭제 공통함수(gfn_addRow/gfn_delRow) 적용
  - 조회 건수 표시 공통함수(gfn_setRowCount) 적용
  - 화면 초기화 이벤트(onload) 직접 연결
 2. 그리드 공통라이브러리(libGrid.js) 기능 개선
  - gfn_gridCheckAll 함수 개선
  - 체크박스 컬럼명 'CHK'로 통일
  - 체크박스 Body 및 Head 셀 위치 자동 탐색
  - 헤더 클릭 대상 검증 로직 공통함수 내 통합 
 3. 화면 공통라이브러리(libEven.js) 수정
  - '_gfn_searchClearComp' 내부 재귀 호출 함수명 수정
  - gfn_delRow 선택 행 삭제 공통함수 추가
 4. Dataset 공통라이브러리(libDataset.js) 기능 추가
  - gfn_setRowCount 조회 건수 표시 공통함수 추가


**☆ [2026-11-13 : dlwmsnw] 사용자정보 팝업, 로그아웃 세션 연동, 업무 탭 최대 개수 제한**
 1. 공통 상단(Form_Top) 사용자정보 팝업 추가
  - 상단 표기 : {사용자명}님 환영합니다 | 로그아웃 (패스워드 변경 → 팝업으로 이동)
  - 사용자명 클릭 시 팝업 : 사진, 아이디, 이름, 소속, 로그인 시간
 2. 로그아웃 서버 세션 무효화 연동 (logout.do)
 3. 로그인시간 세션정보 추가
  - SYS10000MVO, SYS10000MController, SessionUserInfo(getLoginTime()), gds_user_info(LOGIN_TIME)
 4. 업무 탭(Form_Mdi) 최대 개수 제한 및 이동 버튼 추가
  - 최대 개수 : sys_profile.MDI_TAB_MAX_CNT (로그인 시 gds_profile 적재)
  - 이동 버튼(‹ ›) : 항상 표시, 넘길 탭이 있을 때만 활성화
 5. 넥사크로 라이브러리 추가
  - libUserInfo : this.gLoginTime, this.gfn_clearUserInfo
  - libUtil     : this.gfn_getTextWidth, this.gfn_getProfile
 6. xcss 추가 : besTopUser, BES USER POPUP, besMdiTabNav (BES 컬러 팔레트 기준)
 7. 기타
  - 이미지 색상 변경 : img_TF_user.png, img_pop_user.png
  - COM10000MMapperSQL -> CBO10000MMapperSQL 수정 (이사님 요청)
 8. 문서 수정
  - [BES] 전자정부 & NexacroN24-110.리이브러리 목록_20261111_v0.1.xlsx

**☆ [2026-11-12 : dims1111] 자바 로그인 사용자정보 세션함수 추가**
 1. 클래스 : SessionUserInfo.java
 2. 사용할 클래스에서 import
 -  import static erp.core.util.SessionUserInfo.*;
 3. 사용법
 - log.debug("## [ getUserId()             ] : {}", getUserId());
 - mapperParamMap.put("user_id", getUserId());
 4. 자바 사용자정보 세션 함수 (엑세파일 시트 추가)
 - getUserId()          
 - getUserNm()          
 - getEmpId()           
 - getEmpNum()          
 - getEmpNm()           
 - getCompanyCd()       
 - getCompanyNm()       
 - getDeptCd()          
 - getDeptNm()          
 - getGradeCd()         
 - getGradeNm()         
 - getJobCd()           
 - getJobNm()           
 - getPositionCd()      
 - getPositionNm()      
 - getHireDate()        
 - getRetireDate()      
 - getSupervisorEmpId() 
 - getSupervisorEmpNum()
 - getSupervisorEmpNm() 
  
**☆ [2026-11-12 : sdaeunn] 메시지등록 화면 개선 및 그리드 공통함수 추가**
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
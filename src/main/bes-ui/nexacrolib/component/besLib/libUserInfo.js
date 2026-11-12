var pForm 	= nexacro.Form.prototype;

/*
 ===============================================================================
 ==  libUserInfo 관련 공통 함수
 ==  라이브러리 내부에서 사용하는 함수는 제외
 ● this.gfn_함수명              	: 라이브러리 외부 함수에 대한 설명
 ● this._gfn_함수명             	: 라이브러리 내부 함수에 대한 설명
 ===============================================================================
 ● this.gfn_isLogin                 : 로그인 여부 체크 함수
 ● this.gfn_getUserInfo             : 로그인 사용자정보 컬럼값 조회 함수
 ===============================================================================
 ● 전역 속성 목록 (gds_user_info 컬럼)
   this.gUserId           			: 사용자ID          (USER_ID)
   this.gUserNm           			: 사용자명          (USER_NM)
   this.gEmpId            			: 임직원ID          (EMP_ID)
   this.gEmpNum           			: 사번              (EMP_NUM)
   this.gEmpNm            			: 성명              (EMP_NM)
   this.gCompanyCd        			: 회사코드          (COMPANY_CD)
   this.gCompanyNm        			: 회사명            (COMPANY_NM)
   this.gDeptCd           			: 부서코드          (DEPT_CD)
   this.gDeptNm           			: 부서명            (DEPT_NM)
   this.gGradeCd          			: 직급코드          (GRADE_CD)
   this.gGradeNm          			: 직급명            (GRADE_NM)
   this.gJobCd            			: 직무코드          (JOB_CD)
   this.gJobNm            			: 직무명            (JOB_NM)
   this.gPositionCd       			: 직책코드          (POSITION_CD)
   this.gPositionNm       			: 직책명            (POSITION_NM)
   this.gHireDate         			: 입사일자          (HIRE_DATE)
   this.gRetireDate       			: 퇴사일자          (RETIRE_DATE)
   this.gSupervisorEmpId  			: 상위자ID          (SUPERVISOR_EMP_ID)
   this.gSupervisorEmpNum 			: 상위자사번        (SUPERVISOR_EMP_NUM)
   this.gSupervisorEmpNm  			: 상위자성명        (SUPERVISOR_EMP_NM)
*/

/**
 * @description		로그인 여부 체크 함수
 * @return 			{bReturnValue	: boolen} 	true(로그인), false(미로그인)
 */
pForm.gfn_isLogin = function()
{
	var bReturnValue = false;
	var sUserId      = this.gfn_getUserInfo("USER_ID");

	if (sUserId != "") bReturnValue = true;

	return bReturnValue;
};

/**
 * @description		로그인 사용자정보 컬럼값 조회 함수
 * @param 			{sColId			: String} 	gds_user_info 컬럼ID
 * @return 			{objReturnValue	: Object} 	컬럼값 (없으면 "")
 */
pForm.gfn_getUserInfo = function(sColId)
{
	var objReturnValue = "";
	var objDs          = nexacro.getApplication().gds_user_info;

	// 사용자정보 Dataset 미존재 또는 데이터 없음
	if (objDs == null || objDs.rowcount < 1) return objReturnValue;

	var objValue = objDs.getColumn(0, sColId);

	if (objValue !== undefined && objValue !== null) objReturnValue = objValue;

	return objReturnValue;
};

/**
 * @description		로그인 사용자정보 전역 속성 정의 함수 (라이브러리 내부용)
 * @param 			{sPropNm		: String} 	속성명 (예: gCompanyCd)
 * @param 			{sColId			: String} 	gds_user_info 컬럼ID (예: COMPANY_CD)
 * @return 			없음
 */
pForm._gfn_defineUserProp = function(sPropNm, sColId)
{
	Object.defineProperty(pForm, sPropNm, {
		get : function()
		{
			return this.gfn_getUserInfo(sColId);
		},
		enumerable   : false,
		configurable : true
	});
};

/*
 ===============================================================================
 ==  전역 속성 등록 (라이브러리 로드 시 1회 실행)
 ===============================================================================
*/
var arrUserProp = [
	  ["gUserId"          , "USER_ID"           ]
	, ["gUserNm"          , "USER_NM"           ]
	, ["gEmpId"           , "EMP_ID"            ]
	, ["gEmpNum"          , "EMP_NUM"           ]
	, ["gEmpNm"           , "EMP_NM"            ]
	, ["gCompanyCd"       , "COMPANY_CD"        ]
	, ["gCompanyNm"       , "COMPANY_NM"        ]
	, ["gDeptCd"          , "DEPT_CD"           ]
	, ["gDeptNm"          , "DEPT_NM"           ]
	, ["gGradeCd"         , "GRADE_CD"          ]
	, ["gGradeNm"         , "GRADE_NM"          ]
	, ["gJobCd"           , "JOB_CD"            ]
	, ["gJobNm"           , "JOB_NM"            ]
	, ["gPositionCd"      , "POSITION_CD"       ]
	, ["gPositionNm"      , "POSITION_NM"       ]
	, ["gHireDate"        , "HIRE_DATE"         ]
	, ["gRetireDate"      , "RETIRE_DATE"       ]
	, ["gSupervisorEmpId" , "SUPERVISOR_EMP_ID" ]
	, ["gSupervisorEmpNum", "SUPERVISOR_EMP_NUM"]
	, ["gSupervisorEmpNm" , "SUPERVISOR_EMP_NM" ]
];

// 이미 등록된 경우 중복 등록 방지
if (!pForm.hasOwnProperty("gUserId"))
{
	for (var i = 0; i < arrUserProp.length; i++)
	{
		pForm._gfn_defineUserProp(arrUserProp[i][0], arrUserProp[i][1]);
	}
}
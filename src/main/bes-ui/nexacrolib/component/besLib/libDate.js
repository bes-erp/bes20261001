var pForm = nexacro.Form.prototype;

/*
 ===============================================================================
 ==  Util 관련 공통 함수
 =============================================================================== 
 ● this.gfn_Date                        :  현재일자를 DB에서 조회후 gds_date 저장하는 함수
 ● this.gfn_getDate                     :  오늘 날짜를 nType형에 따라 데이터를 추출하는 함수
 */

/**
 * @description     현재일자를 DB에서 조회후 gds_date 저장하는 함수
 * @example         this.gfn_Date();
 */
pForm.gfn_Date = function()
{
    // 메시지 조회 : 임시 Dataset 
    var gdsDate = nexacro.getApplication().gds_date;
 
    if (this.gfn_isNull(gdsDate))
    {
        trace("[날짜] gds_date가 정의되지 않았습니다.");
        return;
    }
	
    // 트랜잭션 실행
    var sSvcID          = "selectDateList";                                 // 서비스ID
    var sSvcURL         = "svcUrl::dtl/DTL10000M/selectDateList.do";        // 서비스URL
    var sInDatasets     = "";                                               // 인풋데이터셋
    var sOutDatasets    = "gds_date=outSelectDateList";                     // 아웃풋데이터셋
    var sArgument       = "";                                               // 매개변수
    var sCallbackFunc   = "fn_selectDateCallback";                          // 콜백함수
	var bAsync          = false;                                            // 동기방식

    this.gfn_transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc, bAsync);
};
 
/**
 * @description     공통 날짜 조회 콜백 함수
 * @param           {sSvcID     : String    } 서비스 ID
 * @param           {nErrCd     : Number    } 오류 코드
 * @param           {sErrMsg    : String    } 오류 메시지
 */
pForm.fn_selectDateCallback = function(sSvcID, nErrCd, sErrMsg)
{ 
    // 날짜 조회 서비스가 아니면 무시
    if (sSvcID != "selectDateList")
    {
        return;
    }
	
	// 오류 확인
    if (nErrCd < 0)
    {
        trace("###########################################################");
        trace("[날짜] 조회 오류");
        trace("[오류코드] "   + nErrCd);
        trace("[오류메시지] " + sErrMsg);
        trace("###########################################################");
        return;
    }
 
    var gdsDate = nexacro.getApplication().gds_date; 
    trace("[날짜] " + gdsDate.getRowCount() + "건 로드 완료");
}; 

/**
 * @description		오늘 날짜를 nType형에 따라 데이터를 추출하는 함수
 * @param 			{sType			: Sting} 	yyyy-mm-dd, yyyymmdd, yyyy-mm-01, yyyymm01, yyyy-mm, yyyymm, yyyy-01, yyyy01, yyyy, mm, dd
 * @return 			{sReturnValue	: Sting} 	sType 유형에 따른 값 리턴
 */
pForm.gfn_getDate = function(sType)
{
    // 데이터베이스 현재일자 호출 : 동기방식
	this.gfn_Date();
	
	// gds_date 데이터셋
	var gdsDate = nexacro.getApplication().gds_date;
	
	// gds_date 데이터셋 검증
	if (!gdsDate || gdsDate.rowcount == 0)
	{
		return
	}
	
	// gds_date 데이터 추출
	var sCurrentDate = gdsDate.getColumn(0, "CURRENT_DATE");
	
	var sReturnValue = "";	
	var sYear		 = sCurrentDate.substr(0, 4);
	var sMonth		 = sCurrentDate.substr(5, 2);
	var sDay		 = sCurrentDate.substr(8, 2);;	
	
	switch(sType) {
		case "yyyy-mm-dd":
			sReturnValue = sYear + "-" + sMonth + "-" + sDay;
			break;
		case "yyyymmdd":
			sReturnValue = sYear + sMonth + sDay;
			break;	
		case "yyyy-mm-01":
			sReturnValue = sYear + "-" + sMonth + "-" + "01";
			break;
		case "yyyymm01":
			sReturnValue = sYear + sMonth + "01";
			break;
		case "yyyy-mm":
			sReturnValue = sYear + "-" + sMonth; 
			break;
		case "yyyymm":
			sReturnValue = sYear + sMonth; 
			break;
		case "yyyy-01":
			sReturnValue = sYear + '-' + '01'; 
			break;
		case "yyyy01":
			sReturnValue = sYear + '01'; 
			break;
		case "yyyy":
			sReturnValue = sYear; 
			break;
		case "mm":
			sReturnValue = sMonth; 
			break;
		case "dd":
			sReturnValue = sDay; 
			break;
		default:
			sReturnValue = "";
			break;
	}
	
	return sReturnValue;
};

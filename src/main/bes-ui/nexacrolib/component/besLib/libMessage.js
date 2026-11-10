var pForm 	= nexacro.Form.prototype;

/*
 ===============================================================================
 ==  Util 관련 공통 함수
 ===============================================================================
 ● this.gfn_loadMessage         : 공통 메시지 조회 (gds_message 생성)
 ● this.fn_messageCallback      : 공통 메시지 조회 콜백 함수
 ● this.gfn_getMessage          : 메시지번호로 메시지 문자열 반환
 ● this.gfn_getMessageColumn    : 현재 언어에 해당하는 메시지 컬럼명 반환
 ● this.gfn_message             : 메시지번호로 메시지창 표시 (alert / confirm)
*/


/**
 * @description     공통 메시지 조회 (로그인 후 또는 메인화면 onload에서 1회 호출)
 */
pForm.gfn_loadMessage = function()
{
    // 메시지 조회 : 임시 Dataset
    var gdsMessage = nexacro.getApplication().gds_message;
 
    if (!gdsMessage)
    {
        trace("[메시지] gds_message가 정의되지 않았습니다.");
        return;
    }
 
    gdsMessage.clearData();
 
    // 트랜잭션 실행
    var sSvcID          = "selectMessageList";                                  // 서비스ID
    var sSvcURL         = "svcUrl::msg/MSG10000M/selectMessageList.do";         // 서비스URL
    var sInDatasets     = "";                                                   // 인풋데이터셋
    var sOutDatasets    = "gds_message=outSelectMessageList";                  // 아웃풋데이터셋
    var sArgument       = "";                                                   // 매개변수
    var sCallbackFunc   = "fn_messageCallback";                                 // 콜백함수
 
    this.gfn_transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc);
};
 
/**
 * @description     공통 메시지 조회 콜백 함수
 * @param           {sSvcID     : String    } 서비스 ID
 * @param           {nErrCd     : Number    } 오류 코드
 * @param           {sErrMsg    : String    } 오류 메시지
 */
pForm.fn_messageCallback = function(sSvcID, nErrCd, sErrMsg)
{ 
    // 메시지 조회 서비스가 아니면 무시
    if (sSvcID != "selectMessageList")
    {
        return;
    }
	
	// 오류 확인
    if (nErrCd < 0)
    {
        trace("###########################################################");
        trace("[메시지] 조회 오류");
        trace("[오류코드] "   + nErrCd);
        trace("[오류메시지] " + sErrMsg);
        trace("###########################################################");
        return;
    }
 
    var gdsMessage = nexacro.getApplication().gds_message; 
    trace("[메시지] " + gdsMessage.getRowCount() + "건 로드 완료");
}; 
 
/**
 * @description     메시지번호로 메시지 문자열 반환
 * @param           {sMessageNum: String            }   메시지번호  : NM-ALT-10000
 * @param           {arrParam   : Array | String    }   치환값      : ["사용자명"] → {1}, {2} ... 순서대로 치환
 * @return          {String} 메시지 문자열
 */
pForm.gfn_getMessage = function(sMessageNum, arrParam)
{
    var sMessage   = "";
    var gdsMessage = nexacro.getApplication().gds_message;

    // 공통 메시지 미생성
    if (!gdsMessage || gdsMessage.getRowCount() == 0)
    {
        sMessage = "메시지정보(gds_message)가 생성되지 않았습니다.";
        trace(sMessage);
        return sMessage;
    }

    // 메시지 조회
    var nRow = gdsMessage.findRow("MESSAGE_NUM", sMessageNum);

    if (nRow < 0)
    {
        sMessage = "[" + sMessageNum + "] 메시지가 존재하지 않습니다.";
        trace(sMessage);
        return sMessage;
    }

    // 언어별 컬럼 선택 (gv_lang 미설정 시 국어)
    sMessage = gdsMessage.getColumn(nRow, this.gfn_getMessageColumn());

    // 해당 언어 메시지가 비어 있으면 국어로 대체
    if (this.gfn_isNull(sMessage))
    {
        sMessage = gdsMessage.getColumn(nRow, "MESSAGE_TEXT_KO");
    }

    // 국어 메시지도 없으면 메시지번호 반환
    if (this.gfn_isNull(sMessage))
    {
        return "[" + sMessageNum + "]";
    }

    sMessage = String(sMessage);

    // {1}, {2} ... 치환
    if (arrParam != null && arrParam !== "")
    {
        if (!Array.isArray(arrParam))
        {
            arrParam = [arrParam];
        }

        for (var i = 0; i < arrParam.length; i++)
        {
            var sParam = (arrParam[i] == null) ? "" : String(arrParam[i]);
            sMessage = sMessage.split("{" + (i + 1) + "}").join(sParam);
        }
    }

    return sMessage;
};


/**
 * @description     현재 언어에 해당하는 메시지 컬럼명 반환
 * @return          {String} 컬럼명
 */
pForm.gfn_getMessageColumn = function()
{
    var sGvLang = nexacro.getApplication().gv_lang;

    sGvLang = sGvLang ? String(sGvLang).toUpperCase() : "KO";

    switch (sGvLang)
    {
        case "KO" : return "MESSAGE_TEXT_KO";
        case "EN" : return "MESSAGE_TEXT_EN";
        case "ZH" : return "MESSAGE_TEXT_ZH";
        case "JA" : return "MESSAGE_TEXT_JA";
        case "OT" : return "MESSAGE_TEXT_OT";
        default   : return "MESSAGE_TEXT_KO";
    }
}; 
 
/**
 * @description     메시지번호로 메시지창 표시
 *                  메시지유형코드 C(Confirm)는 confirm, 그 외(A, I, E, W)는 alert
 * @param           {sMessageNum: String            }   메시지번호  : NM-ALT-10000
 * @param           {arrParam   : Array | String    }   치환값      : ["사용자명"]
 * @return          {Boolean} confirm 결과 (alert는 항상 true)
 */
pForm.gfn_message = function(sMessageNum, arrParam)
{
    var sMessage       = this.gfn_getMessage(sMessageNum, arrParam);
    var gdsMessage     = nexacro.getApplication().gds_message;
    var sMessageTypeCd = "A";
 
    if (gdsMessage)
    {
        var nRow = gdsMessage.findRow("MESSAGE_NUM", sMessageNum);
 
        if (nRow >= 0)
        {
            sMessageTypeCd = gdsMessage.getColumn(nRow, "MESSAGE_TYPE_CD");
        }
    }
 
    if (sMessageTypeCd == "C")
    {
        return this.confirm(sMessage);
    }
 
    this.alert(sMessage);
    return true;
};
var pForm 	= nexacro.Form.prototype;

/*
 ===============================================================================
 ==  libMessage 관련 공통 함수
 ==  라이브러리 내부에서 사용하는 함수는 제외
 ● this.gfn_함수명              	: 라이브러리 외부 함수에 대한 설명
 ● this._gfn_함수명             	: 라이브러리 내부 함수에 대한 설명
 ===============================================================================
 ● this.gfn_loadMessage         	: 공통 메시지를 로드하는 함수(로그인시 1회 사용)
 ● this.gfn_getMessage          	: 메시지번호로 메시지창 표시하는 함수(alert or confirm)
 ● this.gfn_msgBox					: 메시지ID를 기준으로 alert, confirm 메시지 출력
*/


/**
 * @description     공통 메시지를 로드하는 함수(로그인시 1회 사용)
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
    var sOutDatasets    = "gds_message=outSelectMessageList";                   // 아웃풋데이터셋
    var sArgument       = "";                                                   // 매개변수
    var sCallbackFunc   = "_gfn_messageCallback";                               // 콜백함수
 
    this.gfn_transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc);
};
 
/**
 * @description     공통 메시지 조회 콜백 함수
 * @param           {sSvcID     : String    } 서비스 ID
 * @param           {nErrCd     : Number    } 오류 코드
 * @param           {sErrMsg    : String    } 오류 메시지
 */
pForm._gfn_messageCallback = function(sSvcID, nErrCd, sErrMsg)
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
 * @description     메시지번호로 메시지창 표시하는 함수(alert or confirm)
 * @param           {sMessageNum: String            }   메시지번호  : NM-ALT-10000
 * @param           {arrParam   : Array | String    }   치환값      : ["사용자명"]
 * @return          {Boolean} confirm 결과 (alert는 항상 true)
 */
pForm.gfn_getMessage = function(sMessageNum, arrParam)
{
    var sMessage       = this._gfn_selMessage(sMessageNum, arrParam);
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
 
/**
 * @description     메시지번호로 메시지 문자열 반환
 * @param           {sMessageNum: String            }   메시지번호  : NM-ALT-10000
 * @param           {arrParam   : Array | String    }   치환값      : ["사용자명"] → {1}, {2} ... 순서대로 치환
 * @return          {String} 메시지 문자열
 */
pForm._gfn_selMessage = function(sMessageNum, arrParam)
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
    sMessage = gdsMessage.getColumn(nRow, this._gfn_getMessageColumn());

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
pForm._gfn_getMessageColumn = function()
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
 * @description		메시지ID를 기준으로 alert, confirm 메시지 출력
 * @param 			{sMessageNum	: String}  	메시지번호
 * @return 			{bReturnValue	: boolen} 	true, false
 */
pForm.gfn_msgBox = function(sMessageNum, arrArguments)
{
	var app   			= nexacro.getApplication();
	var gdsMsg			= app.gds_message;
	var sLanguageCd		= app.languageCd;
	var sMsgText 	 	= "";
	var sMsgType 	 	= "";
	var bReturnValue 	= false;

	trace("sLanguageCd : " + sLanguageCd);
	
	var nRow = gdsMsg.findRow("MESSAGE_NUM", sMessageNum);
	trace("메시지번호 : " + sMessageNum);
	trace("메시지 검색 행 : " + nRow);

	if (nRow >= 0) {
		if (pForm.gfn_isNull(sLanguageCd)) {
			sMsgText = gdsMsg.getColumn(nRow, "MESSAGE_TEXT_KO");
		} else {
			switch(sLanguageCd)	{
				case "KO":
					sMsgText = gdsMsg.getColumn(nRow, "MESSAGE_TEXT_KO");
					break;
				case "EN":
					sMsgText = gdsMsg.getColumn(nRow, "MESSAGE_TEXT_EN");
					break;
				case "ZH":
					sMsgText = gdsMsg.getColumn(nRow, "MESSAGE_TEXT_ZH");
					break;
				case "JA":
					sMsgText = gdsMsg.getColumn(nRow, "MESSAGE_TEXT_JA");
					break;
				default:
					sMsgText = "";
			}
		}
		
		// 메시지 치환
		if (!pForm.gfn_isNull(arrArguments))
		{
			for (var i=0; i<arrArguments.length; i++)
			{
				var reg = new RegExp("\\{" + (i + 1) + "\\}", "g");
				sMsgText = sMsgText.replace(reg, arrArguments[i]);
			}
		}
		
		// 메시지 서식 태그 제거 (alert/confirm은 서식 태그 미지원)
		sMsgText = sMsgText.replace(/<\/?fc\b[^>]*>/gi, "");
		
		sMsgType = gdsMsg.getColumn(nRow, "MESSAGE_TYPE_CD");
		if (sMsgType == "A") alert(sMsgText);
		else if (sMsgType == "C") bReturnValue = confirm(sMsgText);
	}
		
	return bReturnValue;
};
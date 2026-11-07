var pForm 	= nexacro.Form.prototype;

/*
 ===============================================================================
 ==  Util 관련 공통 함수
 ===============================================================================
 ● this.gfn_isNull                      :  null 체크 함수
 ● this.gfn_msgBox						:  메시지ID를 기준으로 alert, confirm 메시지 출력
 ● this.gfn_center                     	:  대상 컴포넌트를 기준 영역의 중앙에 배치
 ● this.gfn_essential                  	:  필수 항목에 * and class = 'txt_WF_Essential' 표시하면 붉은색으로 *로 전환
*/

/**
 * @description		null 체크 함수
 * @param 			{objValue		: String} 	입력값
 * @return 			{bReturnValue	: boolen} 	true, false
 */
pForm.gfn_isNull = function(objValue)
{
	var bReturnValue = false;
	
    // undefined 또는 null
    if (objValue === undefined || objValue === null) bReturnValue = true;
	
    // 공백 문자열
    if (String(objValue).trim() == "" || String(objValue).length == 0) bReturnValue = true;	

    return bReturnValue;
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
		
		sMsgType = gdsMsg.getColumn(nRow, "MESSAGE_TYPE_CD");
		if (sMsgType == "A") alert(sMsgText);
		else if (sMsgType == "C") bReturnValue = confirm(sMsgText);
	}
		
	return bReturnValue;
};

/**
 * @description     대상 컴포넌트를 기준 영역의 중앙에 배치
 * @param           {objTarget : Object} 중앙 정렬 대상 컴포넌트
 * @param           {objParent : Object} 중앙 정렬 기준 영역
 * @param           {nOffsetX : Number} 가로 위치 보정값
 * @param           {nOffsetY : Number} 세로 위치 보정값
 */
pForm.gfn_center = function(objTarget, objParent, nOffsetX, nOffsetY)
{
    if (!objTarget || !objParent) return;

    nOffsetX = this.gfn_isNull(nOffsetX) ? 0 : Number(nOffsetX);
    nOffsetY = this.gfn_isNull(nOffsetY) ? 0 : Number(nOffsetY);

    var nParentWidth  = objParent.getOffsetWidth();
    var nParentHeight = objParent.getOffsetHeight();
    var nTargetWidth  = objTarget.getOffsetWidth();
    var nTargetHeight = objTarget.getOffsetHeight();

    var nLeft = Math.max(0, Math.floor((nParentWidth - nTargetWidth) / 2) + nOffsetX);
    var nTop  = Math.max(0, Math.floor((nParentHeight - nTargetHeight) / 2) + nOffsetY);

    objTarget.move(nLeft, nTop, nTargetWidth, nTargetHeight);
};

/**
 * @description     필수 항목에 * and class = 'txt_WF_Essential' 표시하면 붉은색으로 *로 전환             
 * 					- Static : text * 시작하면 변환
 * 					- Grid   : 헤더 text * 시작하면 변환
 * @param 			{objForm : this}  대상 폼 (this)
 */
pForm.gfn_essential = function(objForm)
{
    var MARK = "<fc v='#D64545'>*</fc>";
    var arrComp = objForm.components;

    for (var i = 0; i < arrComp.length; i++) {
        var obj = arrComp[i];

        // Div 내부 (검색 영역, 등록 폼 등)
        if (obj instanceof nexacro.Div) {
            this.gfnSetEssentialMark(obj.form);
            continue;
        }

        // Tab 내부
        if (obj instanceof nexacro.Tab) {
            for (var j = 0; j < obj.tabpages.length; j++) {
                this.gfnSetEssentialMark(obj.tabpages[j].form);
            }
            continue;
        }

        // 필수 라벨
        if (obj instanceof nexacro.Static) {
            var arrClass = String(obj.cssclass || "").split(",");
            var sText    = String(obj.text || "").trim();

            if (arrClass.indexOf("txt_WF_Essential") > -1 && sText.charAt(0) == "*") {
                obj.set_usedecorate(true);
                obj.set_text(MARK + sText.substr(1).trim());
            }
            continue;
        }

        // 그리드 필수 헤더
        if (obj instanceof nexacro.Grid) {
            var nCnt = obj.getCellCount("head");

            for (var k = 0; k < nCnt; k++) {
                var sHead = String(obj.getCellProperty("head", k, "text") || "").trim();

                if (sHead.charAt(0) == "*") {
                    obj.setCellProperty("head", k, "displaytype", "decoratetext");
                    obj.setCellProperty("head", k, "text", MARK + sHead.substr(1).trim());
                }
            }
        }
    }
};

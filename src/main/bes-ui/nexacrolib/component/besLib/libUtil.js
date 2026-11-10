var pForm 	= nexacro.Form.prototype;

/*
 ===============================================================================
 ==  Util 관련 공통 함수
 ===============================================================================
 ● this.gfn_isNull                      : null 체크 함수
 ● this.gfn_msgBox						: 메시지ID를 기준으로 alert, confirm 메시지 출력
 ● this.gfn_center                     	: 대상 컴포넌트를 기준 영역의 중앙에 배치
 ● this.gfn_essential           		: 필수항목 * 붉은색 표시 함수 (Div, Tab 재귀 처리)
 ● this.gfn_essentialStatic     		: Static 필수항목 * 붉은색 표시 함수
 ● this.gfn_essentialGrid       		: Grid 헤더 필수항목 * 붉은색 표시 함수
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
 * @description     필수항목 * 붉은색 표시 함수
 *                  - Static : cssclass에 txt_WF_Essential 지정 + text가 * 로 시작하면 변환
 *                  - Grid   : 헤더 text가 * 로 시작하면 변환
 *                  - Div, Tab 내부는 재귀 처리
 * @param           {objForm    : object    }   대상 Form   : this
 * @example         this.gfn_essential(this);
 */
pForm.gfn_essential = function(objForm)
{
    var arrComp = objForm.components;

    for (var i = 0; i < arrComp.length; i++) 
    {
        var obj = arrComp[i];

        if (obj instanceof nexacro.Div)             // Div 내부 (검색 영역, 등록 폼 등)
        {
            this.gfn_essential(obj.form);
        }
        else if (obj instanceof nexacro.Tab)        // Tab 내부
        {
            for (var j = 0; j < obj.tabpages.length; j++) 
            {
                this.gfn_essential(obj.tabpages[j].form);
            }
        }
        else if (obj instanceof nexacro.Static)     // 필수 라벨
        {
            this.gfn_essentialStatic(obj);
        }
        else if (obj instanceof nexacro.Grid)       // 그리드 필수 헤더
        {
            this.gfn_essentialGrid(obj);
        }
    }
};


/**
 * @description     Static 필수항목 * 붉은색 표시 함수
 *                  - cssclass에 txt_WF_Essential 지정 + text가 * 로 시작하면 변환
 * @param           {objStatic  : object    }   대상 Static     : this.sta_msgCls
 */
pForm.gfn_essentialStatic = function(objStatic)
{
    var MARK  = "<fc v='#D64545'>*</fc>";
    var sText = String(objStatic.text || "").trim();

    // * 붉은색 변환
    if (sText.charAt(0) == "*") 
    {
        objStatic.set_usedecorate(true);
        objStatic.set_text(MARK + sText.substr(1).trim());
    }
};

/**
 * @description     Grid 헤더 필수항목 * 붉은색 표시 함수
 *                  - 헤더 text가 * 로 시작하면 변환
 *                  - 그리드 포맷 변경 후 해당 그리드만 다시 적용할 때 단독 호출 가능
 * @param           {objGrid    : object    }   대상 Grid       : this.grd_message
 */
pForm.gfn_essentialGrid = function(objGrid)
{
    var MARK = "<fc v='#D64545'>*</fc>";
    var nCnt = objGrid.getCellCount("head");

    for (var i = 0; i < nCnt; i++) 
    {
        var sHead = String(objGrid.getCellProperty("head", i, "text") || "").trim();

        // * 붉은색 변환
        if (sHead.charAt(0) == "*") 
        {
            objGrid.setCellProperty("head", i, "displaytype", "decoratetext");
            objGrid.setCellProperty("head", i, "text", MARK + sHead.substr(1).trim());
        }
    }
};

var pForm 	= nexacro.Form.prototype;

/*
 ===============================================================================
 ==  libUtil 관련 공통 함수
 ==  라이브러리 내부에서 사용하는 함수는 제외
 ● this.gfn_함수명              	: 라이브러리 외부 함수에 대한 설명
 ● this._gfn_함수명             	: 라이브러리 내부 함수에 대한 설명
 ===============================================================================
 ● this.gfn_isNull                  : null 체크 함수
 ● this.gfn_center                 	: 대상 컴포넌트를 기준 영역의 중앙에 배치 
 ● this.gfn_essential           	: 필수항목 * 붉은색 표시 함수(Div, Tab, Grid 등)
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
 * @description     필수항목 * 붉은색 표시 함수 (Div, Tab 재귀 처리)
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
            this._gfn_essentialStatic(obj);
        }
        else if (obj instanceof nexacro.Grid)       // 그리드 필수 헤더
        {
            this._gfn_essentialGrid(obj);
        }
    }
};

/**
 * @description     Static 필수항목 * 붉은색 표시 함수
 *                  - cssclass에 txt_WF_Essential 지정 + text가 * 로 시작하면 변환
 * @param           {objStatic  : object    }   대상 Static     : this.sta_msgCls
 */
pForm._gfn_essentialStatic = function(objStatic)
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
pForm._gfn_essentialGrid = function(objGrid)
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

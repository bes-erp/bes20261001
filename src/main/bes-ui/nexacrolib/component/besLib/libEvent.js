var pForm 	= nexacro.Form.prototype;

/*
 ===============================================================================
 ==  libEven 화면 공통 이벤트 관련 함수
 ==  라이브러리 내부에서 사용하는 함수는 제외
 ● this.gfn_함수명              	: 라이브러리 외부 함수에 대한 설명
 ● this._gfn_함수명             	: 라이브러리 내부 함수에 대한 설명
 ===============================================================================
 ● this.gfn_searchClear         	: 검색조건 초기화 함수
 ● this.gfn_addRow                  : 그리드 첫행 추가 및 지정 셀 포커스 이동하는 함수
*/


/**
 * @description     검색조건 초기화 함수
 *                  - 콤보       : 첫번째 인덱스
 *                  - 텍스트     : clear
 *                  - 체크박스   : null
 *                  - 라디오     : 첫번째 인덱스
 *                  - 달력       : 서버 현재일자
 * @param           {objDiv     : object    }   검색조건 Div    : this.div_search
 * @example         this.gfn_searchClear(this.div_search);
 */
pForm.gfn_searchClear = function(objDiv)
{
    if (this.gfn_isNull(objDiv)) 
    {
        trace("검색조건 Div가 존재하지 않습니다.");
        return;
    }

    // 서버 현재일자 (yyyyMMdd)
    var sToday = this.gfn_getDate("yyyymmdd");
	
	trace("[서버현재일자] " + sToday);

    // 검색조건 컴포넌트 초기화
    this._gfn_searchClearComp(objDiv.form, sToday);
};

/**
 * @description     검색조건 컴포넌트 값 초기화 함수 (Div 내부 재귀 처리)
 * @param           {objForm    : object    }   대상 Form       : this.div_search.form
 * @param           {sToday     : String    }   현재일자        : yyyyMMdd
 */
pForm._gfn_searchClearComp = function(objForm, sToday)
{
    var arrComp = objForm.components;

    for (var i = 0; i < arrComp.length; i++) 
    {
        var objComp = arrComp[i];

        if (objComp instanceof nexacro.Combo)               // 콤보 : 첫번째 인덱스
        {
            objComp.set_index(0);
        }
        else if (objComp instanceof nexacro.Calendar)       // 달력 : 현재일자
        {
            objComp.set_value(this.gfn_isNull(sToday) ? null : sToday);
        }
        else if (objComp instanceof nexacro.Edit 
              || objComp instanceof nexacro.MaskEdit 
              || objComp instanceof nexacro.TextArea)       // 텍스트 : clear
        {
            objComp.set_value("");
        }
        else if (objComp instanceof nexacro.CheckBox)       // 체크박스 : null
        {
            objComp.set_value(null);
        }
        else if (objComp instanceof nexacro.Radio)          // 라디오 : 첫번째 인덱스
        {
            objComp.set_index(0);
        }
        else if (objComp instanceof nexacro.Div)            // Div : 내부 재귀 처리
        {
            this.gfn_searchClearComp(objComp.form, sToday);
        }
    }
};

/**
 * @description     그리드 첫행 추가 및 지정 셀 포커스 이동하는 함수
 * @param           {objGrid        	: object            }   대상 그리드     : this.grd_message
 * @param           {sFocusCellBindText : String            }   포커스 셀       : 컬럼ID("MESSAGE_CLASS_CD")
 * @example         this.gfn_addRow(this.grd_message, "MESSAGE_CLASS_CD");
 */
pForm.gfn_addRow = function(objGrid, sFocusCellBindText)
{
	// 대상 그리드
    var objDs = objGrid.getBindDataset();

    // 첫행 추가
    var nRow = objDs.insertRow(0);
    objDs.set_rowposition(0);

    // 지정 셀 포커스
    objGrid.setFocus();

    // 행 포커스
    if (!this.gfn_isNull(sFocusCellBindText)) 
    {
		var sFocusCell = sFocusCellBindText.toUpperCase();
        var nCell = (typeof sFocusCell == "number") ? sFocusCell : objGrid.getBindCellIndex("body", sFocusCell);
		
		// 지정 셀 없을 경우 리턴
		if (nCell < 0) 
        {
            return;
        }
        
		// 지정 셀 이동 및 편집 상태
        objGrid.setCellPos(nCell);
        objGrid.showEditor(true);
    }
};

var pForm 	= nexacro.Form.prototype;

/*
 ===============================================================================
 ==  libGrid 관련 공통 함수
 ==  라이브러리 내부에서 사용하는 함수는 제외
 ● this.gfn_함수명              	: 라이브러리 외부 함수에 대한 설명
 ● this._gfn_함수명             	: 라이브러리 내부 함수에 대한 설명
 ===============================================================================
 ● this.gfn_gridComboDropdown       : 그리드 콤보 셀 클릭시 드롭다운 목록 즉시 편집 상태로 전환 함수
 ● this.gfn_getGridColumnIndex 		: 그리드 특정 컬럼의 인덱스 찾기는 함수
 ● this.gfn_getGridHeaderText 		: 그리드 컬럼 인덱스를 기준으로 헤더 텍스트 찾는 함수
 ● this.gfn_gridCheckRequired		: 그리드의 필수 항목 체크하는 함수
 ● this.gfn_gridCheckAll			: 그리드 헤더 체크박스 클릭 시 전체 행 선택/해제 처리 함수
*/


/**
 * @description     그리드 콤보 셀 클릭시 드롭다운 목록 즉시 편집 상태로 전환 함수
 * @param           {objGrid    : object                        }   대상 그리드         : obj
 * @param           {e          : nexacro.GridClickEventInfo    }   셀 클릭 이벤트 정보 : e
 * @example         this.grd_message_oncellclick = function(obj, e)
 *                  {
 *                      this.gfn_gridComboDropdown(obj, e);
 *                  };
 */
pForm.gfn_gridComboDropdown = function(objGrid, e)
{
    if (objGrid.getCellProperty("body", e.cell, "edittype") == "combo") 
    {
        objGrid.dropdownCombo();
    }
};

/**
 * @description		그리드 특정 컬럼의 인덱스 찾는 함수
 * @param 			{objGrid		: Object}	그리드(this.grd_codeType)
 * @param 			{sColumnName	: String}	그리드에 바인드된 컬럼명 (CODE_TYPE_NM)
 * @return 			{i				: Number} 	그리드에서 조회된 컬럼의 위치(0,1,2...n)
 */  
pForm.gfn_getGridColumnIndex = function(objGrid, sColumnName)
{
	//그리드 전체 컬럼의 갯수
    var nColumnCount = objGrid.getCellCount("body");
	
    for (var i=0; i<nColumnCount; i++) {
        //그리드 프로퍼티의 바인드된 text 값 추출
		var sBindColumnName = objGrid.getCellProperty("body", i, "text");

		//바인드된 컬럼의 명칭이 동일할 경우 찾은 인덱스 리턴
        if (sBindColumnName == ("bind:" + sColumnName)) return i;
    }
    return -1;
};

/**
 * @description		그리드 컬럼 인덱스를 기준으로 헤더 텍스트 찾는 함수
 * @param 			{objGrid		: Object}	그리드(this.grd_codeType)
 * @param 			{nColumnIndex	: Number}	그리드에 컬럼의 인덱스(0,1,2...n)
 * @return 			{sHeaderText	: String} 	그리드 컬럼의 헤더 텍스트(코드유형명)
 */  
pForm.gfn_getGridHeaderText = function(objGrid, nColumnIndex)
{
    if (nColumnIndex<0) return "";
	
	//그리드 헤더 텍스트 추출
    var sHeaderText = objGrid.getCellText(-1, nColumnIndex);

    // 줄바꿈 제거
    sHeaderText = sHeaderText.replace(/\r/g, "");
    sHeaderText = sHeaderText.replace(/\n/g, " ");

    return sHeaderText;
};

/** 
 * @description		그리드의 필수 항목 체크하는 함수 
 * @param 			{objGrid		: Object}	그리드(this.grd_codeType)
 * @param 			{arrRequired	: Arrary}	필수체크항목 배열(["CODE_TYPE", "CODE_TYPE_NM"]
 * @return 			{bDsChange		: boolen} 	true(정상), false(오류)
 */
pForm.gfn_gridCheckRequired = function(objGrid, arrRequired)
{
    var app   = nexacro.getApplication();
    var objDs = objGrid.getBindDataset();

	//그리드에 바인드된 DataSet이 없으면 리턴
    if (!objDs) return true;

	//찾은 바인드셋의 데이터 건수
    var nRowCnt = objDs.rowcount;

	//DataSet 데이터 건수 기준으로 필수항목 체크
    for (var nRow=0; nRow<nRowCnt; nRow++) {
	
        //DataSet 상태가 : 초기 데이터는 Skip
        if (objDs.getRowType(nRow) == Dataset.ROWTYPE_NORMAL) continue;
		
		//매개변수의 필수항목 만큼 체크
        for (var i=0; i<arrRequired.length; i++) {
            var sColumnName  = arrRequired[i];
			var sColumnValue = objDs.getColumn(nRow, sColumnName);
			
            if (pForm.gfn_isNull(sColumnValue)) {
                var nColIndex   = this.gfn_getGridColumnIndex(objGrid, sColumnName);
                var sHeaderText = this.gfn_getGridHeaderText(objGrid, nColIndex);

                this.gfn_msgBox("NM-ALT-10010", [sHeaderText]); //{1} 항목은 필수입니다.

                //오류 발생 위치로 이동
				if (nColIndex>=0) {
                    objGrid.setFocus();
                    objGrid.selectCell(nRow, nColIndex);
                }
                return false;
            }
        }
    }
    return true;
};

/** 
 * @description		그리드 헤더 체크박스 클릭 시 전체 행 선택/해제 처리 함수
 * @param 			{objGrid  : Object					   }  그리드 객체
 * @param           {e        : nexacro.GridClickEventInfo }  그리드 헤더 클릭 이벤트 정보 
 */
pForm.gfn_gridCheckAll = function(objGrid, e)
{
    var sCheckColumn = "SELECT_YN";
	
    var objDs = objGrid.getBindDataset();
    if (!objDs) return;
	
    // SELECT_YN 컬럼의 Body 셀 인덱스 조회
    var nBodyCell = objGrid.getBindCellIndex("body", sCheckColumn);
    if (nBodyCell < 0) return;
	
	// Body 셀의 컬럼 위치 조회
    var nCol = objGrid.getCellProperty("body", nBodyCell, "col");

    // SELECT_YN과 동일한 컬럼 위치의 헤더 셀 탐색
    var nHeadCell = -1;

    for (var i = 0; i < objGrid.getCellCount("head"); i++)
    {
        if (objGrid.getCellProperty("head", i, "col") == nCol)
        {
            nHeadCell = i;
            break;
        }
    }

    if (nHeadCell < 0) return;

    // 체크박스 헤더 클릭 시에만 처리
    if (e.cell != nHeadCell) return;

    // 현재 헤더 체크박스 상태
    var sCheck = objGrid.getCellProperty("head", nHeadCell, "text");
    var sValue = (sCheck == "1") ? "N" : "Y";

    // 전체 행 선택 / 해제
    for (var nRow = 0; nRow < objDs.rowcount; nRow++)
    {
        objDs.setColumn(nRow, sCheckColumn, sValue);
    }

    // 헤더 체크박스 상태 변경
    objGrid.setCellProperty("head", nHeadCell, "text", (sValue == "Y") ? "1" : "0");
};
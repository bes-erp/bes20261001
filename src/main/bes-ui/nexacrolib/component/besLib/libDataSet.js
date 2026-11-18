var pForm = nexacro.Form.prototype;

/*
 ===============================================================================
 ==  libDataset 관련 공통 함수
 ==  라이브러리 내부에서 사용하는 함수는 제외
 ● this.gfn_함수명              	: 라이브러리 외부 함수에 대한 설명
 ● this._gfn_함수명             	: 라이브러리 내부 함수에 대한 설명
 ===============================================================================
 ● this.gfn_dataSetChange			: DataSet 데이터 변경여부 체크 함수
 ● this.gfn_resetSelectionOnlyRows 	: DataSet 체크박스만 변경된 행의 변경 상태 초기화 함수
 ● this.gfn_transaction				: DataSet 데이터를 처리(신규/수정/삭제/조회 등)하기 위한 서비스를 호출하는 트랜잭션 함수
 ● this.gfn_setRowCount 			: Dataset 전체 건수를 Static에 표시하는 함수
 */


/**
 * @description		DataSet 데이터 변경여부 체크
 * @param 			{objDs			: nexacro.NormalDataset} 	DataSet
 * @return 			{bDsChange		: boolen} 					true, false
 */  
pForm.gfn_dataSetChange = function(objDs)
{
	var bDsChange = false;
	
	var nCnt = objDs.rowcount;	
	for(var i=0; i<nCnt; i++) {
		var nRowType = objDs.getRowType(i);
		/*
		Dataset.ROWTYPE_EMPTY		0		존재하지 않는 행의 상태	
		Dataset.ROWTYPE_NORMAL		1		초기 행의 상태
		Dataset.ROWTYPE_INSERT		2		추가된 행의 상태
		Dataset.ROWTYPE_UPDATE		4		수정된 행의 상태
		Dataset.ROWTYPE_DELETE		8		삭제된 행의 상태
		Dataset.ROWTYPE_GROUP		16		그룹 정보 행의 상태
		*/
		if (nRowType == Dataset.ROWTYPE_INSERT || nRowType == Dataset.ROWTYPE_UPDATE || nRowType == Dataset.ROWTYPE_DELETE) {
			bDsChange = true;
			break;
		}
	}
	
	var nDelCnt = objDs.getDeletedRowCount();
	for (var i=0; i<nDelCnt; i++) {
		bDsChange = true;
		break;
	}
	
	return bDsChange;
};

/**
 * @description     체크박스만 변경된 기존 행의 변경 상태 초기화
 *                  CHK 컬럼만 변경된 행은 저장 대상에서 제외
 * @param           {objDs : nexacro.NormalDataset} 대상 Dataset
 * @example         this.gfn_resetSelectionOnlyRows(this.ds_message);
 */
pForm.gfn_resetSelectionOnlyRows = function(objDs)
{
    if (!objDs) return;

    var sCheckColumn = "CHK";

    // 수정된 기존 행의 데이터 변경 여부 확인
    for (var i = 0; i < objDs.rowcount; i++)
    {
        if (objDs.getRowType(i) != Dataset.ROWTYPE_UPDATE) continue;

        var bDataChanged = false;

        for (var j = 0; j < objDs.getColCount(); j++)
        {
            var sColId = objDs.getColID(j);

            // 체크박스 컬럼은 변경 여부 확인 대상에서 제외
            if (sColId == sCheckColumn) continue;

            // 현재 데이터와 원본 데이터 비교
            if (objDs.getColumn(i, sColId) !== objDs.getOrgColumn(i, sColId))
            {
                bDataChanged = true;
                break;
            }
        }

        // 실제 데이터 변경이 없는 경우 RowType 초기화
        if (!bDataChanged)
        {
            var bUpdateControl = objDs.updatecontrol;
            objDs.set_updatecontrol(false);

            try
            {
                objDs.setRowType(i, Dataset.ROWTYPE_NORMAL);
            }
            finally
            {
                objDs.set_updatecontrol(bUpdateControl);
            }
        }
    }
};

/**
 * @description		DataSet 데이터를 처리(신규/수정/삭제/조회 등)하기 위한 서비스를 호출하는 트랜잭션 함수
 * @param 			{sSvcID			: String}	서비스ID 명칭
 * @param  			{sSvcURL		: String} 	controller 호출하기 위한 서비스 URL
 * @param  			{sInDataSets	: String} 	input DataSet (input=ds_codeType)
 * @param  			{sOutDataSets	: String} 	output DataSet (ds_codeType=output)
 * @param  			{sCallbackFunc	: String} 	call back function 명칭
 * @param  			{bAsync			: Boolean} 	true(비동기), false(동기)
 * @param  			{nDataType		: Number} 	서버로 데이터 전송 형식 (XML-0, binary-1, SSV-2, JSON-2)
 * @param  			{bCompress		: Boolean} 	true(압축), false(압축X)
 * @param  			{String} 
 */  
pForm.gfn_transaction = function(sSvcID, sSvcURL, sInDataSets, sOutDataSets, sArgument, sCallbackFunc, bAsync, nDataType, bCompress)
{	
	if(pForm.gfn_isNull(bAsync)) bAsync = true;
	if(pForm.gfn_isNull(nDataType)) nDataType = 0;
	if(pForm.gfn_isNull(bCompress)) bCompress = false;
	if(pForm.gfn_isNull(sCallbackFunc)) sCallbackFunc = "_gfn_callback";
	this.transaction(sSvcID, sSvcURL, sInDataSets, sOutDataSets, sArgument, sCallbackFunc, bAsync, nDataType, bCompress);
};

pForm._gfn_callback = function(sServiceID, nErrorCode, sErrorMessage)
{
	if(nErrorCode < 0) {
		alert("[라이브러리 오류] : " + sErrorMessage);
		return;
	}
};

/**
 * @description     Dataset의 전체 건수를 Static에 표시하는 함수
 * @param           {objDs     : nexacro.NormalDataset} 대상 Dataset
 * @param           {objStatic : nexacro.Static}        건수 표시 Static
 * @example         this.gfn_setRowCount(this.ds_message, this.div_title.form.sta_titleCnt);
 */
pForm.gfn_setRowCount = function(objDs, objStatic)
{
    if (!objDs || !objStatic) return;

    objStatic.set_text("| " + objDs.rowcount + "건");
};
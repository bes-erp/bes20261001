var pForm = nexacro.Form.prototype;

/*
 ===============================================================================
 ==  Dataset 관련 공통 함수
 ===============================================================================
 ● this.gfn_code        				: 콤보박스 데이터 조회 함수
 ● thisfn_comboCallback 				: 콤보박스 데이터 조회 콜백 함수
 */


/**
 * @description		콤보박스 데이터 조회 함수
 * @param 			{objForm    		: object				} 	해당화면 		: this
 * @param 			{sComboId		 	: Component				} 	콤보ID		    : cbo_repeat_cd
 * @param 			{sComboDataSetId	: nexacro.NormalDataset	} 	콤보데이터셋ID	: ds_cbo_repeate_cd
 * @param 			{sCodeType			: String				} 	코드유형 		: REPEAT_TYPE_CD
 * @param 			{sSelType  			: String				} 	선택구분코드	: A(유효한데이터), I(유효하지않은데이터), ""(전체) 
 * @param 			{sCallback			: String				} 	콤보콜백 		: fn_cboCallback 
 */  
pForm.gfn_code = function(objForm, sComboId, sComboDataSetId, sCodeType, sSelType)
{
	if (this.gfn_isNull(sComboDataSetId)) {
        trace("[공통코드] 대상 Dataset이 존재하지 않습니다.");
        return;
    }

    //콤보 Dataset
    var objComboDataSet = objForm.objects[sComboDataSetId];

    if (!objComboDataSet) {
        trace("[" + sComboDataSetId + "] Dataset이 존재하지 않습니다.");
        return;
    }
	
	//데이터 선택구분코드
	if (this.gfn_isNull(sSelType)) {
		sSelType = "";
	}
	
	//데이터셋 초기화
	objComboDataSet.clearData();
	
	//콤보박스ID 저장
	objForm._sComboId = sComboId;

    // 트랜잭션 실행	
	var sSvcID 			= "comboCode_" + sComboDataSetId;                   //서비스ID
	var sSvcURL			= "svcUrl::com/COM10000M/selectComboCodeList.do"	//서비스URL
	var sInDatasets 	= "";												//인풋데이터셋   : 이클립스=넥사크로
	var sOutDatasets 	= sComboDataSetId + "=outSelectComboCodeList";		//아웃풋데이터셋 : 넥사크로=이클립스
	var sArgument 		= "codeType=" + nexacro.wrapQuote(sCodeType);		//매개변수 		 : 코드유형
	    sArgument      += "selType="  + nexacro.wrapQuote(sSelType);		//매개변수 		 : 선택구분코드
	var sCallbackFunc 	= "fn_comboCallback";								//콜백함수
	
    objForm.transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc, true);
};

/**
 * @description     콤보박스 데이터 조회 콜백 함수
 * @param           {sSvcID    			: String	} 서비스 ID
 * @param           {nErrCd  		    : Number	} 오류 코드
 * @param           {sErrMsg   			: String	} 오류 메시지
 * @param 			{sComboId		 	: Component	} 콤보ID
 */
pForm.fn_comboCallback = function(sSvcID, nErrCd, sErrMsg)
{
    // 오류 확인
    if (nErrCd < 0) {
        trace("###########################################################");
        trace("[공통코드] 조회 오류");
        trace("[서비스ID] "   + sSvcID);
        trace("[오류코드] "   + nErrCd);
        trace("[오류메시지] " + sErrMsg);
        trace("###########################################################");
        return;
    }

    // 조회 결과 확인
    var sPrefix = "comboCode_";

    if (sSvcID.indexOf(sPrefix) != 0) {
        return;
    }

    // 서비스 ID에서 Dataset ID 추출
    var sComboDataSetId = sSvcID.substring(sPrefix.length);

    // Dataset 객체 확인
    var objTargetDs = this.objects[sComboDataSetId];

    if (!objTargetDs) {
        trace("[공통코드] 대상 Dataset이 존재하지 않습니다.");
        trace("[서비스ID] "  + sSvcID);
        trace("[DatasetID] " + sComboDataSetId);
        return;
    }

    // 조회 결과 출력
    if (objTargetDs.getRowCount() == 0) {
        trace("[" + sComboDataSetId + "] 데이터가 존재하지 않습니다.");
    } else {
		//콤보박스 첫번째 인덱스로 표기
        var objCombo = this.components[this._sComboId];

        if (objCombo) {
            objCombo.set_index(0);
        }
	}
};


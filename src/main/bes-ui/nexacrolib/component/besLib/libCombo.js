var pForm = nexacro.Form.prototype;

/*
 ===============================================================================
 ==  Dataset 관련 공통 함수
 ===============================================================================
 ● this.gfn_code                : 콤보박스 데이터 조회 함수
 ● this.fn_comboCallback        : 콤보박스 데이터 조회 콜백 함수
 */


/**
 * @description     콤보박스 데이터 조회 함수
 * @param           {objForm            : object                }   해당화면          : this
 * @param           {sComboDataSetId    : String                }   콤보데이터셋ID    : ds_cbo_repeat_cd
 * @param           {sCodeType          : String                }   코드유형          : REPEAT_TYPE_CD
 * @param           {sAactiveType       : String                }   활성여부코드      : Y(유효한데이터), N(유효하지않은데이터), ""(전체)
 * @param           {sAddAllRow         : String                }   전체로우추가      : Y(전체추가), N(전체추가하지않음)
 */
pForm.gfn_code = function(objForm, sComboDataSetId, sCodeType, sAactiveType, sAddAllRow)
{
    if (this.gfn_isNull(sComboDataSetId)) 
    {
        trace("[공통콤보] 데이터셋ID는 필수 항목입니다.");
        return;
    }

    // 콤보 Dataset
    var objComboDataSet = objForm.objects[sComboDataSetId];

    if (!objComboDataSet) 
    {
        trace("[공통콤보] " + sComboDataSetId + "가 생성되지 않았습니다.");
        return;
    }

    // 활성여부코드 (null이면 빈값 → 전체)
    if (this.gfn_isNull(sAactiveType)) 
    {
        sAactiveType = "";
    }

    // 전체로우추가
    if (this.gfn_isNull(sAddAllRow)) 
    {
        sAddAllRow = "N";
    }

    // 데이터셋 초기화
    objComboDataSet.clearData();

    // 트랜잭션 실행
    var sSvcID          = "comboCode_" + sComboDataSetId;                       // 서비스ID
    var sSvcURL         = "svcUrl::cbo/CBO10000M/selectComboCodeList.do";       // 서비스URL
    var sInDatasets     = "";                                                   // 인풋데이터셋   : 이클립스=넥사크로
    var sOutDatasets    = sComboDataSetId + "=outSelectComboCodeList";          // 아웃풋데이터셋 : 넥사크로=이클립스
    var sArgument       = "codeType="     + nexacro.wrapQuote(sCodeType);       // 매개변수 : 코드유형
        sArgument      += " activeType="  + nexacro.wrapQuote(sAactiveType);    // 매개변수 : 활성여부코드 (앞에 공백 필수)
        sArgument      += " addAllRow="   + nexacro.wrapQuote(sAddAllRow);      // 매개변수 : 전체로우추가 (앞에 공백 필수)
    var sCallbackFunc   = "fn_comboCallback";                                   // 콜백함수

    objForm.gfn_transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc);
};


/**
 * @description     콤보박스 데이터 조회 콜백 함수
 * @param           {sSvcID     : String    } 서비스 ID
 * @param           {nErrCd     : Number    } 오류 코드
 * @param           {sErrMsg    : String    } 오류 메시지
 */
pForm.fn_comboCallback = function(sSvcID, nErrCd, sErrMsg)
{
    // 오류 확인
    if (nErrCd < 0) 
    {
        trace("###########################################################");
        trace("[공통콤보] 조회 오류");
		trace("[서비스ID] "   + sSvcID);
        trace("[오류코드] "   + nErrCd);
        trace("[오류메시지] " + sErrMsg);
        trace("###########################################################");
        return;
    }

    // 공통코드 서비스 여부 확인
    var sPrefix = "comboCode_";

    if (sSvcID.indexOf(sPrefix) != 0) 
    {
        return;
    }

    // 서비스 ID에서 Dataset ID 추출
    var sComboDataSetId = sSvcID.substring(sPrefix.length);

    // Dataset 객체 확인
    var objTargetDs = this.objects[sComboDataSetId];

    if (!objTargetDs) 
    {
        trace("[공통콤보] " + sComboDataSetId + "가 생성되지 않았습니다.");
        return;
    }

    // 조회 결과 확인
    if (objTargetDs.getRowCount() == 0) 
    {
        trace("[공통콤보] " + sComboDataSetId + "에 데이터가 존재하지 않습니다.");
        return;
    }
};
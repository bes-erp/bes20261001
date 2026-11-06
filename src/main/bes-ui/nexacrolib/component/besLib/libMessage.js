var pForm 	= nexacro.Form.prototype;

/*
 ===============================================================================
 ==  Util 관련 공통 함수
 ===============================================================================
 ● this.gfn_loadMessage         : 공통 메시지 조회 (gds_message 생성)
 ● this.fn_messageCallback      : 공통 메시지 조회 콜백 함수
*/


/**
 * @description     공통 메시지 조회 (로그인 후 또는 메인화면 onload에서 1회 호출)
 * @param           {objForm    : object    }   해당화면    : this
 */
pForm.gfn_loadMessage = function(objForm)
{
    // 메시지 조회 : 임시 Dataset
    var ds_messageId = "ds_message";
    var ds_message   = objForm.objects[ds_messageId];
 
    if (!ds_message)
    {
        ds_message = new Dataset(ds_messageId, objForm);
        objForm.addChild(ds_messageId, ds_message);
    }
 
    ds_message.clearData();
 
    // 트랜잭션 실행
    var sSvcID          = "selectMessageList";                                  // 서비스ID
    var sSvcURL         = "svcUrl::msg/MSG10000M/selectMessageList.do";         // 서비스URL
    var sInDatasets     = "";                                                   // 인풋데이터셋
    var sOutDatasets    = ds_messageId + "=outSelectMessageList";               // 아웃풋데이터셋
    var sArgument       = "";                                                   // 매개변수
    var sCallbackFunc   = "fn_messageCallback";                                 // 콜백함수
 
    objForm.gfn_transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc);
};
 
/**
 * @description     공통 메시지 조회 콜백 함수
 * @param           {sSvcID     : String    } 서비스 ID
 * @param           {nErrCd     : Number    } 오류 코드
 * @param           {sErrMsg    : String    } 오류 메시지
 */
pForm.fn_messageCallback = function(sSvcID, nErrCd, sErrMsg)
{ 
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
 
    var objApp     = nexacro.getApplication();
    var ds_message = this.objects["ds_message"];
 
    if (!objApp.gds_message)
    {
        trace("[메시지] Application에 gds_message가 정의되지 않았습니다.");
        return;
    }
 
    // 전역 Dataset으로 복사 (구조 + 데이터)
    objApp.gds_message.copyData(ds_message);
 
    trace("[메시지] " + objApp.gds_message.getRowCount() + "건 로드 완료");
};
(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("COM12000M");
            this.set_titletext("메시지등록");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsMsgGubun", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "code","type" : "STRING","size" : "256"},{"id" : "name","type" : "STRING","size" : "256"}]},"Rows" : [{"code" : "ALL","name" : "전체"},{"code" : "FM","name" : "화면"},{"code" : "NM","name" : "시스템"}]});
            this.addChild(obj.name, obj);


            obj = new Dataset("dsMsgType", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "code","type" : "STRING","size" : "256"},{"id" : "name","type" : "STRING","size" : "256"}]},"Rows" : [{"code" : "ALL","name" : "전체"},{"code" : "A","name" : "경고"},{"code" : "C","name" : "확인"},{"code" : "I","name" : "정보"}]});
            this.addChild(obj.name, obj);


            obj = new Dataset("dsMessage", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "MESSAGE_NUM","type" : "STRING","size" : "30"},{"id" : "MESSAGE_GUBUN","type" : "STRING","size" : "30"},{"id" : "MESSAGE_TYPE_CD","type" : "STRING","size" : "30"},{"id" : "MESSAGE_TEXT_KO","type" : "STRING","size" : "300"},{"id" : "MESSAGE_TEXT_EN","type" : "STRING","size" : "300"},{"id" : "MESSAGE_TEXT_ZH","type" : "STRING","size" : "300"},{"id" : "MESSAGE_TEXT_JA","type" : "STRING","size" : "300"},{"id" : "MESSAGE_TEXT_OT","type" : "STRING","size" : "300"},{"id" : "REMARK","type" : "STRING","size" : "4000"}]}});
            this.addChild(obj.name, obj);


            obj = new Dataset("dsMsgTypeGrid", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "code","type" : "STRING","size" : "30"},{"id" : "name","type" : "STRING","size" : "100"}]},"Rows" : [{"code" : "A","name" : "경고"},{"code" : "C","name" : "확인"},{"code" : "I","name" : "정보"}]});
            this.addChild(obj.name, obj);


            obj = new Dataset("dsMsgGubunGrid", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "code","type" : "STRING","size" : "30"},{"id" : "name","type" : "STRING","size" : "100"}]},"Rows" : [{"code" : "FM","name" : "화면"},{"code" : "NM","name" : "시스템"}]});
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSearch", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "messageGubun","type" : "STRING","size" : "30"},{"id" : "messageType","type" : "STRING","size" : "30"},{"id" : "messageText","type" : "STRING","size" : "300"}]},"Rows" : [{}]});
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("staBackground","0","0","1280","720",null,null,null,null,null,null,this);
            obj.set_background("#F5F7FA");
            this.addChild(obj.name, obj);

            obj = new Static("staTitle","25","20","250","36",null,null,null,null,null,null,this);
            obj.set_text("메시지등록");
            obj.set_font("bold 18pt Arial");
            obj.set_color("#243B64");
            this.addChild(obj.name, obj);

            obj = new Static("staSubTitle","27","55","400","20",null,null,null,null,null,null,this);
            obj.set_text("메시지를 등록하고 관리합니다.");
            obj.set_font("normal 9pt Arial");
            obj.set_color("#7A8494");
            this.addChild(obj.name, obj);

            obj = new Button("btnSave","1160","25","95","34",null,null,null,null,null,null,this);
            obj.set_text("저장");
            obj.set_font("bold 10pt Arial");
            obj.set_background("#315B96");
            obj.set_color("#FFFFFF");
            obj.set_border("1px solid #315B96");
            this.addChild(obj.name, obj);

            obj = new Static("staSearchPanel","25","90","1230","125",null,null,null,null,null,null,this);
            obj.set_background("#FFFFFF");
            obj.set_border("1px solid #DCE2EB");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Static("staSearchTitle","45","105","150","25",null,null,null,null,null,null,this);
            obj.set_text("조회조건");
            obj.set_font("bold 12pt Arial");
            obj.set_color("#243B64");
            this.addChild(obj.name, obj);

            obj = new Static("staSearchLine","45","137","1190","1",null,null,null,null,null,null,this);
            obj.set_background("#E6EAF0");
            this.addChild(obj.name, obj);

            obj = new Static("staMsgGubun","45","160","100","28",null,null,null,null,null,null,this);
            obj.set_text("메시지구분");
            obj.set_textAlign("right");
            obj.set_verticalAlign("middle");
            obj.set_font("bold 10pt Arial");
            obj.set_color("#46546A");
            this.addChild(obj.name, obj);

            obj = new Combo("cboMsgGubun","155","156","160","34",null,null,null,null,null,null,this);
            obj.set_innerdataset("dsMsgGubun");
            obj.set_codecolumn("code");
            obj.set_datacolumn("name");
            obj.set_text("전체");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Static("staMsgType","340","160","100","28",null,null,null,null,null,null,this);
            obj.set_text("메시지유형");
            obj.set_textAlign("right");
            obj.set_verticalAlign("middle");
            obj.set_font("bold 10pt Arial");
            obj.set_color("#46546A");
            this.addChild(obj.name, obj);

            obj = new Combo("cboMsgType","450","156","160","34",null,null,null,null,null,null,this);
            obj.set_innerdataset("dsMsgType");
            obj.set_codecolumn("code");
            obj.set_datacolumn("name");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Static("staMsgSearch","635","160","80","28",null,null,null,null,null,null,this);
            obj.set_text("메시지");
            obj.set_textAlign("right");
            obj.set_verticalAlign("middle");
            obj.set_font("bold 10pt Arial");
            obj.set_color("#46546A");
            this.addChild(obj.name, obj);

            obj = new Edit("edtMsgSearch","725","156","280","34",null,null,null,null,null,null,this);
            obj.set_maxlength("100");
            this.addChild(obj.name, obj);

            obj = new Button("btnSearch","1030","156","85","34",null,null,null,null,null,null,this);
            obj.set_text("조회");
            obj.set_font("bold 10pt Arial");
            obj.set_background("#315B96");
            obj.set_color("#FFFFFF");
            obj.set_border("1px solid #315B96");
            this.addChild(obj.name, obj);

            obj = new Button("btnReset","1125","156","85","34",null,null,null,null,null,null,this);
            obj.set_text("초기화");
            obj.set_font("normal 10pt Arial");
            obj.set_background("#FFFFFF");
            obj.set_color("#46546A");
            obj.set_border("1px solid #C9D1DD");
            this.addChild(obj.name, obj);

            obj = new Static("staResultPanel","25","230","1230","460",null,null,null,null,null,null,this);
            obj.set_background("#FFFFFF");
            obj.set_border("1px solid #DCE2EB");
            this.addChild(obj.name, obj);

            obj = new Static("staGridTitle","45","248","200","28",null,null,null,null,null,null,this);
            obj.set_text("메시지 목록");
            obj.set_font("bold 12pt Arial");
            obj.set_color("#243B64");
            this.addChild(obj.name, obj);

            obj = new Static("staGridSubTitle","45","278","400","18",null,null,null,null,null,null,this);
            obj.set_text("등록된 메시지를 확인하고 수정 및 추가할 수 있습니다.");
            obj.set_font("normal 9pt Arial");
            obj.set_color("#8993A2");
            this.addChild(obj.name, obj);

            obj = new Button("btnAddRow","1030","250","85","32",null,null,null,null,null,null,this);
            obj.set_text("행추가");
            obj.set_font("normal 9pt Arial");
            obj.set_background("#FFFFFF");
            obj.set_color("#315B96");
            obj.set_border("1px solid #AABBD2");
            this.addChild(obj.name, obj);

            obj = new Button("btnDeleteRow","1120","250","85","32",null,null,null,null,null,null,this);
            obj.set_text("행삭제");
            obj.set_font("normal 9pt Arial");
            obj.set_background("#FFFFFF");
            obj.set_color("#C35B5B");
            obj.set_border("1px solid #DAB8B8");
            this.addChild(obj.name, obj);

            obj = new Static("staResultLine","45","300","1190","1",null,null,null,null,null,null,this);
            obj.set_background("#E6EAF0");
            this.addChild(obj.name, obj);

            obj = new Grid("grdMessage","45","315","1190","355",null,null,null,null,null,null,this);
            obj.set_binddataset("dsMessage");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"110\"/><Column size=\"100\"/><Column size=\"210\"/><Column size=\"210\"/><Column size=\"180\"/><Column size=\"180\"/><Column size=\"200\"/></Columns><Rows><Row size=\"38\" band=\"head\"/><Row size=\"38\"/></Rows><Band id=\"head\"><Cell text=\"메시지구분\"/><Cell col=\"1\" text=\"메시지유형\"/><Cell col=\"2\" text=\"메시지(한국어)\"/><Cell col=\"3\" text=\"메시지(영어)\"/><Cell col=\"4\" text=\"메시지(중국어)\"/><Cell col=\"5\" text=\"메시지(일본어)\"/><Cell col=\"6\" text=\"메시지(기타)\"/></Band><Band id=\"body\"><Cell displaytype=\"combocontrol\" edittype=\"combo\" combodataset=\"dsMsgGubunGrid\" combocodecol=\"code\" combodatacol=\"name\" text=\"bind:MESSAGE_GUBUN\"/><Cell col=\"1\" displaytype=\"combocontrol\" edittype=\"combo\" combodataset=\"dsMsgTypeGrid\" combocodecol=\"code\" text=\"bind:MESSAGE_TYPE_CD\" combodatacol=\"name\"/><Cell col=\"2\" displaytype=\"normal\" edittype=\"text\" text=\"bind:MESSAGE_TEXT_KO\"/><Cell col=\"3\" displaytype=\"normal\" edittype=\"text\" text=\"bind:MESSAGE_TEXT_EN\"/><Cell col=\"4\" displaytype=\"normal\" edittype=\"text\" text=\"bind:MESSAGE_TEXT_ZH\"/><Cell col=\"5\" displaytype=\"normal\" edittype=\"text\" text=\"bind:MESSAGE_TEXT_JA\"/><Cell col=\"6\" displaytype=\"normal\" edittype=\"text\" text=\"bind:MESSAGE_TEXT_OT\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("COM12000M.xfdl", function() {

        /***************************************************************************************
         * 프로젝트        : Built1 Enterprise System 구축 프로젝트
         * 업무구분        : 공통관리
         * 파일명          : COM12000M.xfdl
         * 화면            : 메시지등록
         * 설명            : 메시지 목록 조회 및 관리
         *---------------------------------------------------------------------------------------
         * 변경일            변경자            변경내역
         *---------------------------------------------------------------------------------------
         * 2026-11-03        Built1            최초작성
         ***************************************************************************************/


        /***************************************************************************************
         * 1. FORM 변수 선언
         ***************************************************************************************/


        /***************************************************************************************
         * 2. FORM LOAD
         ***************************************************************************************/

        /*
         * 기능 : 화면 초기화
         */
        this.fn_init = function(obj, e)
        {
            this.fn_search();
        };


        /***************************************************************************************
         * 3. 공통 버튼
         ***************************************************************************************/

        /*
         * 기능 : 메시지 목록 조회
         */
        this.fn_search = function()
        {
            // 조회조건 가져오기
            var sGubun = this.cboMsgGubun.value;
            var sType  = this.cboMsgType.value;
            var sText  = this.edtMsgSearch.value;

            // 검색조건 Dataset 초기화
            this.dsSearch.clearData();

            // 검색조건 행 추가
            var nRow = this.dsSearch.addRow();

            // 검색조건 설정
            this.dsSearch.setColumn(nRow, "messageGubun", sGubun);
            this.dsSearch.setColumn(nRow, "messageType", sType);
            this.dsSearch.setColumn(nRow, "messageText", sText);

            // 조회 Transaction 설정
            var sSvcId = "selectMessageList";
            var sSvcURL = "svcUrl::com12000m/selectMessageList.do";
            var sInData = "dsSearch=dsSearch:A";
            var sOutData = "dsMessage=dsMessage";
            var sArgument = "";
            var sCallback = "fn_callBack";

            // 조회 요청
            this.gfn_transaction(sSvcId, sSvcURL, sInData, sOutData, sArgument, sCallback);
        };


        /***************************************************************************************
         * 4. TRANSACTION, CALLBACK
         ***************************************************************************************/

        /*
         * 기능 : Transaction 결과 처리
         */
        this.fn_callBack = function(sSvcId, nErrorCode, sErrorMsg)
        {
            if (nErrorCode != 0)
            {
                if (sSvcId == "selectMessageList")
                {
                    this.alert("조회 요청 오류: " + sErrorMsg);
                }
                else if (sSvcId == "saveMessage")
                {
                    this.alert("저장 요청 오류: " + sErrorMsg);
                }
                return;
            }

            // 저장 성공 처리는 실제 DB 저장 기능 연결 후 추가 예정
        };


        /***************************************************************************************
         * 5. 팝업 호출 및 콜백
         ***************************************************************************************/


        /***************************************************************************************
         * 6. 기타 함수
         ***************************************************************************************/


        /***************************************************************************************
         * 7. 이벤트
         ***************************************************************************************/

        /*
         * 기능 : 화면 로딩 이벤트
         */
        this.COM12000M_onload = function(obj, e)
        {
            this.fn_init(obj, e);
        };

        /*
         * 기능 : 조회 버튼 클릭 이벤트
         */
        this.btnSearch_onclick = function(obj, e)
        {
            this.fn_search();
        };


        this.btnAddRow_onclick = function(obj,e)
        {
        	// 메시지 목록에 새로운 행 추가
            var nRow = this.dsMessage.addRow();

            // 새 행의 기본값 설정
            this.dsMessage.setColumn(nRow, "MESSAGE_GUBUN", "FM");
            this.dsMessage.setColumn(nRow, "MESSAGE_TYPE_CD", "A");
        };

        this.btnDeleteRow_onclick = function(obj,e)
        {
        	 // 현재 선택된 행 번호 가져오기
            var nRow = this.dsMessage.rowposition;

            // 선택된 행이 없으면 종료
            if (nRow < 0)
            {
                this.alert("삭제할 행을 선택해주세요.");
                return;
            }

            // 선택된 행 삭제
            this.dsMessage.deleteRow(nRow);
        };

        this.btnSave_onclick = function(obj,e)
        {

        	// 변경된 데이터가 있는지 확인
            var bChanged = false;

            // 신규 또는 수정된 행 확인
            for (var i = 0; i < this.dsMessage.rowcount; i++)
            {
                var nRowType = this.dsMessage.getRowType(i);

                if (nRowType == 2 || nRowType == 4)
                {
                    bChanged = true;
                    break;
                }
            }

            // 삭제된 기존 행 확인
            if (this.dsMessage.getDeletedRowCount() > 0)
            {
                bChanged = true;
            }

            // 변경된 데이터가 없으면 안내
            if (!bChanged)
            {
                this.alert("변경된 데이터가 없습니다.");
                return;
            }

        	// 필수 입력값 검사
        	for (var i = 0; i < this.dsMessage.rowcount; i++)
        	{
        		var nRowType = this.dsMessage.getRowType(i);

        		// 신규 또는 수정된 행만 검사
        		if (nRowType == 2 || nRowType == 4)
        		{
        			var arrRequired = [
        				"MESSAGE_TEXT_KO",
        				"MESSAGE_TEXT_EN",
        				"MESSAGE_TEXT_ZH",
        				"MESSAGE_TEXT_JA",
        				"MESSAGE_TEXT_OT"
        			];

        			for (var j = 0; j < arrRequired.length; j++)
        			{
        				var sValue = this.dsMessage.getColumn(i, arrRequired[j]);

        				if (sValue == null || String(sValue).trim() == "")
        				{
        					this.alert("필수 메시지 항목을 입력해주세요.");
        					this.dsMessage.set_rowposition(i);
        					return;
        				}
        			}
        		}
        	}
            // 저장 Transaction 설정
        	var sSvcId = "saveMessage";
        	var sSvcURL = "svcUrl::com12000m/saveMessage.do";
        	var sInData = "dsMessage=dsMessage:U";
        	var sOutData = "";
        	var sArgument = "";
        	var sCallback = "fn_callBack";

        	// 저장 요청
        	this.gfn_transaction(sSvcId, sSvcURL, sInData, sOutData, sArgument, sCallback);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.COM12000M_onload,this);
            this.btnSave.addEventHandler("onclick",this.btnSave_onclick,this);
            this.btnSearch.addEventHandler("onclick",this.btnSearch_onclick,this);
            this.staResultPanel.addEventHandler("onclick",this.staResultPanel_onclick,this);
            this.btnAddRow.addEventHandler("onclick",this.btnAddRow_onclick,this);
            this.btnDeleteRow.addEventHandler("onclick",this.btnDeleteRow_onclick,this);
        };
        this.loadIncludeScript("COM12000M.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

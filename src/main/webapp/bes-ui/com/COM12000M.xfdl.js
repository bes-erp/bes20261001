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
            obj = new Dataset("ds_search", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "message_class_cd","type" : "STRING","size" : "30"},{"id" : "message_type_cd","type" : "STRING","size" : "30"},{"id" : "message_text_ko","type" : "STRING","size" : "300"}]},"Rows" : [{}]});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_message", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "select_yn","type" : "STRING","size" : "1"},{"id" : "message_class_cd","type" : "STRING","size" : "30"},{"id" : "message_type_cd","type" : "STRING","size" : "30"},{"id" : "message_num","type" : "STRING","size" : "30"},{"id" : "message_text_ko","type" : "STRING","size" : "300"},{"id" : "message_text_en","type" : "STRING","size" : "300"},{"id" : "message_text_zh","type" : "STRING","size" : "300"},{"id" : "message_text_ja","type" : "STRING","size" : "300"},{"id" : "message_text_ot","type" : "STRING","size" : "300"},{"id" : "remark","type" : "STRING","size" : "4000"}]}});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_cbo_message_class_cd", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "code","type" : "STRING","size" : "30"},{"id" : "name","type" : "STRING","size" : "100"}]},"Rows" : [{"code" : "ALL","name" : "전체"},{"code" : "FM","name" : "화면"},{"code" : "NM","name" : "시스템"}]});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_cbo_message_type_cd", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "code","type" : "STRING","size" : "30"},{"id" : "name","type" : "STRING","size" : "100"}]},"Rows" : [{"code" : "ALL","name" : "전체"},{"code" : "A","name" : "경고"},{"code" : "C","name" : "확인"},{"code" : "I","name" : "정보"}]});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_cbo_grid_message_class_cd", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "code","type" : "STRING","size" : "30"},{"id" : "name","type" : "STRING","size" : "100"}]},"Rows" : [{"code" : "FM","name" : "화면"},{"code" : "NM","name" : "시스템"}]});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_cbo_grid_message_type_cd", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "code","type" : "STRING","size" : "30"},{"id" : "name","type" : "STRING","size" : "100"}]},"Rows" : [{"code" : "A","name" : "경고"},{"code" : "C","name" : "확인"},{"code" : "I","name" : "정보"}]});
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btn_save",null,"12","76","28","20",null,null,null,null,null,this);
            obj.set_text("저장");
            obj.set_taborder("0");
            this.addChild(obj.name, obj);

            obj = new Static("sta_search_bg","16","49",null,"60","16",null,null,null,null,null,this);
            obj.set_background("#E4E9F8");
            obj.set_border("1px solid #CDD5E8");
            this.addChild(obj.name, obj);

            obj = new Static("sta_message_class_cd","31","66","82","26",null,null,null,null,null,null,this);
            obj.set_text("메시지분류");
            obj.set_verticalAlign("middle");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_message_class_cd","114","65","150","28",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_innerdataset("ds_cbo_message_class_cd");
            obj.set_codecolumn("code");
            obj.set_datacolumn("name");
            obj.set_value("ALL");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Static("sta_message_type_cd","294","66","81","26",null,null,null,null,null,null,this);
            obj.set_text("메시지유형");
            obj.set_verticalAlign("middle");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_message_type_cd","377","65","150","28",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_innerdataset("ds_cbo_message_type_cd");
            obj.set_codecolumn("code");
            obj.set_datacolumn("name");
            obj.set_value("ALL");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Static("sta_message_text_ko","557","66","98","26",null,null,null,null,null,null,this);
            obj.set_text("메시지(한글)");
            obj.set_verticalAlign("middle");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_message_text_ko","655","65","244","28",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_maxlength("300");
            this.addChild(obj.name, obj);

            obj = new Button("btn_search",null,"65","70","28","105",null,null,null,null,null,this);
            obj.set_text("조회");
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Button("btn_reset",null,"65","70","28","27",null,null,null,null,null,this);
            obj.set_text("초기화");
            obj.set_taborder("5");
            this.addChild(obj.name, obj);

            obj = new Static("sta_message_list","10","122","78","27",null,null,null,null,null,null,this);
            obj.set_text("메시지 목록");
            obj.set_font("bold 11pt Arial");
            obj.set_textAlign("left");
            this.addChild(obj.name, obj);

            obj = new Static("sta_message_count","88","122","65","27",null,null,null,null,null,null,this);
            obj.set_text("(0건)");
            obj.set_verticalAlign("middle");
            this.addChild(obj.name, obj);

            obj = new Button("btn_excel",null,"119","115","28","201",null,null,null,null,null,this);
            obj.set_text("엑셀다운로드");
            obj.set_taborder("6");
            this.addChild(obj.name, obj);

            obj = new Button("btn_add",null,"119","83","28","111",null,null,null,null,null,this);
            obj.set_text("행추가");
            obj.set_taborder("7");
            this.addChild(obj.name, obj);

            obj = new Button("btn_delete",null,"119","83","28","20",null,null,null,null,null,this);
            obj.set_text("행삭제");
            obj.set_taborder("8");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_message","16","157",null,null,"16","20",null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_binddataset("ds_message");
            obj.set_selecttype("row");
            obj.set_autoenter("select");
            obj.set_autofittype("none");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"44\"/><Column size=\"42\"/><Column size=\"85\"/><Column size=\"85\"/><Column size=\"95\"/><Column size=\"300\"/><Column size=\"280\"/><Column size=\"250\"/><Column size=\"250\"/><Column size=\"250\"/></Columns><Rows><Row size=\"32\" band=\"head\"/><Row size=\"32\"/></Rows><Band id=\"head\"><Cell text=\"No\"/><Cell col=\"1\" text=\"V\"/><Cell col=\"2\" text=\"*메시지분류\"/><Cell col=\"3\" text=\"*메시지유형\"/><Cell col=\"4\" text=\"*메시지번호\"/><Cell col=\"5\" text=\"*메시지(한글)\"/><Cell col=\"6\" text=\"메시지(영문)\"/><Cell col=\"7\" text=\"메시지(중국)\"/><Cell col=\"8\" text=\"메시지(일본)\"/><Cell col=\"9\" text=\"메시지(기타)\"/></Band><Band id=\"body\"><Cell text=\"expr:currow+1\" edittype=\"none\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:select_yn\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:message_class_cd\" displaytype=\"combocontrol\" edittype=\"combo\" combodataset=\"ds_cbo_grid_message_class_cd\" combocodecol=\"code\" combodatacol=\"name\"/><Cell col=\"3\" text=\"bind:message_type_cd\" displaytype=\"combocontrol\" edittype=\"combo\" combodataset=\"ds_cbo_grid_message_type_cd\" combocodecol=\"code\" combodatacol=\"name\"/><Cell col=\"4\" text=\"bind:message_num\" edittype=\"none\"/><Cell col=\"5\" text=\"bind:message_text_ko\" edittype=\"text\"/><Cell col=\"6\" text=\"bind:message_text_en\" edittype=\"text\"/><Cell col=\"7\" text=\"bind:message_text_zh\" edittype=\"text\"/><Cell col=\"8\" text=\"bind:message_text_ja\" edittype=\"text\"/><Cell col=\"9\" text=\"bind:message_text_ot\" edittype=\"text\"/></Band></Format></Formats>");
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
         * 2026-11-05        Built1            화면 및 스크립트 재작성
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
        this.COM12000M_onload = function(obj, e)
        {
            this.fn_init();
        };

        /*
         * 기능 : 조회조건 및 메시지 목록 초기화
         */
        this.fn_init = function()
        {
            // 검색조건 Dataset 초기화
            this.ds_search.clearData();
            this.ds_search.addRow();

            // 조회조건 기본값 설정
            this.cbo_message_class_cd.set_value("ALL");
            this.cbo_message_type_cd.set_value("ALL");
            this.edt_message_text_ko.set_value("");

            // 목록 초기화
            this.ds_message.clearData();
            this.fn_setMessageCount();

            // 서버 조회 기능 연결 후 최초 조회 사용
            // this.fn_search();
        };


        /***************************************************************************************
         * 3. 공통 버튼
         ***************************************************************************************/

        /*
         * 기능 : 메시지 목록 조회
         */
        this.fn_search = function()
        {
            // 조회조건 Dataset 초기화
            this.ds_search.clearData();

            var nRow = this.ds_search.addRow();

            // 조회조건 설정
            this.ds_search.setColumn(nRow, "message_class_cd", this.cbo_message_class_cd.value);
            this.ds_search.setColumn(nRow, "message_type_cd" , this.cbo_message_type_cd.value);
            this.ds_search.setColumn(nRow, "message_text_ko", this.edt_message_text_ko.value);

            // 사용자 정보
            var sUserId = nexacro.getApplication().gvUserId;

            // Transaction 설정
            var sSvcID        = "selectMessageList";
            var sSvcURL       = "svcUrl::com/COM12000M/selectMessageList.do";
            var sInDatasets   = "inSearch=ds_search";
            var sOutDatasets  = "ds_message=outSelectMessageList";
            var sArgument     = "userId=" + nexacro.wrapQuote(sUserId || "");
            var sCallbackFunc = "fn_callback";

            // 메시지 목록 조회
            this.gfn_transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc);
        };

        /*
         * 기능 : 조회조건 초기화
         */
        this.fn_reset = function()
        {
            this.cbo_message_class_cd.set_value("ALL");
            this.cbo_message_type_cd.set_value("ALL");
            this.edt_message_text_ko.set_value("");

            this.ds_search.clearData();
            this.ds_search.addRow();
        };

        /*
         * 기능 : 메시지 목록 건수 표시
         */
        this.fn_setMessageCount = function()
        {
            var nCnt = this.ds_message.rowcount;

            this.sta_message_count.set_text("(" + nCnt + "건)");
        };

        /*
         * 기능 : 메시지 목록 첫 번째 행 추가
         */
        this.fn_addRow = function()
        {
            var nRow = this.ds_message.insertRow(0);

            this.ds_message.setColumn(nRow, "select_yn"       , "0");
            this.ds_message.setColumn(nRow, "message_class_cd", "FM");
            this.ds_message.setColumn(nRow, "message_type_cd" , "A");

            this.ds_message.set_rowposition(nRow);

            this.fn_setMessageCount();
        };

        /*
         * 기능 : 선택된 메시지 행 삭제
         */
        this.fn_deleteRow = function()
        {
            var nDeleteCnt = 0;

            // 뒤쪽 행부터 삭제하여 행 번호 변경 방지
            for (var i = this.ds_message.rowcount - 1; i >= 0; i--)
            {
                var sSelectYn = this.ds_message.getColumn(i, "select_yn");

                if (sSelectYn == "1")
                {
                    this.ds_message.deleteRow(i);
                    nDeleteCnt++;
                }
            }

            if (nDeleteCnt == 0)
            {
                this.alert("삭제할 행을 선택해주세요.");
                return;
            }

            this.fn_setMessageCount();
        };


        /*
         * 기능 : 저장 전 필수 입력값 검사
         */
        this.fn_validate = function()
        {
            for (var i = 0; i < this.ds_message.rowcount; i++)
            {
                var nRowType = this.ds_message.getRowType(i);

                // 신규 및 수정된 행만 검사
                if (nRowType == 2 || nRowType == 4)
                {
                    var sClassCd = this.ds_message.getColumn(i, "message_class_cd");
                    var sTypeCd  = this.ds_message.getColumn(i, "message_type_cd");
                    var sTextKo  = this.ds_message.getColumn(i, "message_text_ko");

                    if (this.gfn_isNull(sClassCd))
                    {
                        this.alert("메시지분류는 필수 항목입니다.");
                        this.ds_message.set_rowposition(i);
                        return false;
                    }

                    if (this.gfn_isNull(sTypeCd))
                    {
                        this.alert("메시지유형은 필수 항목입니다.");
                        this.ds_message.set_rowposition(i);
                        return false;
                    }

                    if (this.gfn_isNull(sTextKo) || String(sTextKo).trim() == "")
                    {
                        this.alert("메시지(한글)는 필수 항목입니다.");
                        this.ds_message.set_rowposition(i);
                        return false;
                    }
                }
            }

            return true;
        };

        /*
         * 기능 : 변경 데이터 존재 여부 확인
         */
        this.fn_isChanged = function()
        {
            if (this.ds_message.getDeletedRowCount() > 0)
            {
                return true;
            }

            for (var i = 0; i < this.ds_message.rowcount; i++)
            {
                var nRowType = this.ds_message.getRowType(i);

                if (nRowType == 2 || nRowType == 4)
                {
                    return true;
                }
            }

            return false;
        };

        /*
         * 기능 : 메시지 저장
         */
        this.fn_save = function()
        {
            if (!this.fn_isChanged())
            {
                this.alert("변경된 데이터가 없습니다.");
                return;
            }

            if (!this.fn_validate())
            {
                return;
            }

            // DB 저장 Controller 및 트랜잭션 구현 전에는 호출하지 않음
            this.alert("저장 서버 기능 연결 후 테스트할 예정입니다.");
        };


        /***************************************************************************************
         * 4. TRANSACTION, CALLBACK
         ***************************************************************************************/

        /*
         * 기능 : Transaction 결과 처리
         */
        //콜백
        this.fn_callback = function(sSvcID, nErrCd, sErrMsg)
        {
            if(nErrCd < 0) {
                alert(sErrMsg);
                return;
            }

            switch(sSvcID) {

                //메시지 목록 조회
                case "selectMessageList":

                    var nCnt = this.ds_message.rowcount;

                    //조회 건수 표시
                    this.fn_setMessageCount();

                    if (nCnt == 0) {
                        alert("조회조건에 일치하는 데이터가 존재하지 않습니다.");
                        //this.gfn_msgBox('MSG-A-10030');
                    }
                    break;

                //메시지 저장 (추후 서버 기능 연결)
                case "saveMessage":

                    alert("정상적으로 저장되었습니다.");

                    //저장 후 재조회
                    this.fn_search();
                    break;
            }
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


        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.btn_search.addEventHandler("onclick",this.fn_search,this);
        };
        this.loadIncludeScript("COM12000M.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

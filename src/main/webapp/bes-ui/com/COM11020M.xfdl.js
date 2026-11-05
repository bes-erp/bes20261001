(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("COM11020M");
            this.set_titletext("메뉴등록");
            this.set_background("#FFFFFF");
            this.set_scrollbartype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1200,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsMenu", this);
            obj.set_useclientlayout("true");
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "MENU_ID","type" : "BIGDECIMAL","size" : "20"},{"id" : "PARENT_MENU_CD","type" : "STRING","size" : "30"},{"id" : "CHILD_MENU_CD","type" : "STRING","size" : "30"},{"id" : "CHILD_MENU_NM","type" : "STRING","size" : "200"},{"id" : "CHILD_PAGE_ULR","type" : "STRING","size" : "100"},{"id" : "CHILD_MENU_LEVEL","type" : "INT","size" : "4"},{"id" : "CHILD_MENU_SEQ","type" : "INT","size" : "4"},{"id" : "USER_YN","type" : "STRING","size" : "1"},{"id" : "BTN_SEARCH_YN","type" : "STRING","size" : "1"},{"id" : "BTN_SEARCH_INIT_YN","type" : "STRING","size" : "1"},{"id" : "BTN_SAVE_YN","type" : "STRING","size" : "1"},{"id" : "BTN_ADD_ROW_YN","type" : "STRING","size" : "1"},{"id" : "BTN_DEL_ROW_YN","type" : "STRING","size" : "1"},{"id" : "BTN_EXCEL_DOWN_YN","type" : "STRING","size" : "1"},{"id" : "BTN_EXCEL_UP_YN","type" : "STRING","size" : "1"},{"id" : "BTN_PRINT_YN","type" : "STRING","size" : "1"},{"id" : "BTN_BATCH_YN","type" : "STRING","size" : "1"},{"id" : "REMARK","type" : "STRING","size" : "4000"}]}});
            this.addChild(obj.name, obj);


            obj = new Dataset("dsYn", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "CODE","type" : "STRING","size" : "1"},{"id" : "NAME","type" : "STRING","size" : "20"}]},"Rows" : [{"CODE" : "Y","NAME" : "사용"},{"CODE" : "N","NAME" : "미사용"}]});
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSearchYn", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "CODE","type" : "STRING","size" : "1"},{"id" : "NAME","type" : "STRING","size" : "20"}]},"Rows" : [{"CODE" : "","NAME" : "전체"},{"CODE" : "Y","NAME" : "사용"},{"CODE" : "N","NAME" : "미사용"}]});
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("staTitle","20","14","250","34",null,null,null,null,null,null,this);
            obj.set_text("메뉴등록");
            obj.set_font("bold 20px Arial");
            obj.set_color("#222222");
            this.addChild(obj.name, obj);

            obj = new Div("divSearch","20","58",null,"66","20",null,null,null,null,null,this);
            obj.set_background("#F7F8FA");
            obj.set_border("1px solid #E0E4E9");
            obj.getSetter("scrollbartype").set("none");
            this.addChild(obj.name, obj);

            obj = new Static("staMenu","16","18","66","28",null,null,null,null,null,null,this.divSearch.form);
            obj.set_text("메뉴검색");
            this.divSearch.addChild(obj.name, obj);

            obj = new Edit("edtMenu","82","18","210","28",null,null,null,null,null,null,this.divSearch.form);
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("staUseYn","edtMenu:18","18","62","28",null,null,null,null,null,null,this.divSearch.form);
            obj.set_text("사용여부");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboUseYn","staUseYn:4","18","100","28",null,null,null,null,null,null,this.divSearch.form);
            obj.set_innerdataset("dsSearchYn");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("NAME");
            this.divSearch.addChild(obj.name, obj);

            obj = new Button("btnSearch",null,"18","80","28","104",null,null,null,null,null,this.divSearch.form);
            obj.set_text("조회");
            this.divSearch.addChild(obj.name, obj);

            obj = new Button("btnSearchInit",null,"18","80","28","16",null,null,null,null,null,this.divSearch.form);
            obj.set_text("초기화");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("staList","20","143","120","30",null,null,null,null,null,null,this);
            obj.set_text("메뉴 목록");
            obj.set_font("bold 15px Arial");
            this.addChild(obj.name, obj);

            obj = new Static("staCount","staList:4","143","130","30",null,null,null,null,null,null,this);
            obj.set_text("총 0건");
            obj.set_color("#666666");
            this.addChild(obj.name, obj);

            obj = new Button("btnSave",null,"143","80","30","20",null,null,null,null,null,this);
            obj.set_text("저장");
            this.addChild(obj.name, obj);

            obj = new Button("btnDelRow",null,"143","80","30","btnSave:8",null,null,null,null,null,this);
            obj.set_text("행삭제");
            this.addChild(obj.name, obj);

            obj = new Button("btnAddRow",null,"143","80","30","btnDelRow:8",null,null,null,null,null,this);
            obj.set_text("행추가");
            this.addChild(obj.name, obj);

            obj = new Grid("grdMenu","20","183",null,null,"20","20",null,null,null,null,this);
            obj.set_binddataset("dsMenu");
            obj.set_autofittype("col");
            obj.set_autoenter("select");
            obj.set_selecttype("row");
            obj.set_border("1px solid #D9DEE5");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"90\"/><Column size=\"130\"/><Column size=\"130\"/><Column size=\"170\"/><Column size=\"225\"/><Column size=\"80\"/><Column size=\"85\"/><Column size=\"85\"/><Column size=\"180\"/></Columns><Rows><Row size=\"34\" band=\"head\"/><Row size=\"32\"/></Rows><Band id=\"head\"><Cell col=\"0\" text=\"메뉴 ID\"/><Cell col=\"1\" text=\"상위 메뉴 코드\"/><Cell col=\"2\" text=\"메뉴 코드\"/><Cell col=\"3\" text=\"메뉴명\"/><Cell col=\"4\" text=\"화면 경로\"/><Cell col=\"5\" text=\"레벨\"/><Cell col=\"6\" text=\"표시 순서\"/><Cell col=\"7\" text=\"사용 여부\"/><Cell col=\"8\" text=\"비고\"/></Band><Band id=\"body\"><Cell col=\"0\" text=\"bind:MENU_ID\" edittype=\"none\"/><Cell col=\"1\" text=\"bind:PARENT_MENU_CD\" edittype=\"text\"/><Cell col=\"2\" text=\"bind:CHILD_MENU_CD\" edittype=\"text\"/><Cell col=\"3\" text=\"bind:CHILD_MENU_NM\" edittype=\"text\"/><Cell col=\"4\" text=\"bind:CHILD_PAGE_ULR\" edittype=\"text\"/><Cell col=\"5\" text=\"bind:CHILD_MENU_LEVEL\" edittype=\"text\"/><Cell col=\"6\" text=\"bind:CHILD_MENU_SEQ\" edittype=\"text\"/><Cell col=\"7\" text=\"bind:USER_YN\" edittype=\"combo\" combodataset=\"dsYn\" combocodecol=\"CODE\" combodatacol=\"NAME\" displaytype=\"combotext\"/><Cell col=\"8\" text=\"bind:REMARK\" edittype=\"text\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this.divSearch.form
            obj = new Layout("default","",1158,66,this.divSearch.form,function(p){});
            this.divSearch.form.addLayout(obj.name, obj);

            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1200,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("COM11020M.xfdl", function() {

        /***************************************************************************************
         * 프로젝트        : Built1 Enterprise System 구축 프로젝트
         * 업무구분        : 공통관리
         * 파일명          : COM11020M.xfdl
         * 작성자          : Built1
         * 작성일          : 2026-11-04
         *
         * 화면            : 메뉴등록
         * 설명            : 메뉴정보 조회, 등록, 수정 및 삭제
         *---------------------------------------------------------------------------------------
         * 변경일            변경자            변경내역
         *---------------------------------------------------------------------------------------
         * 2026-11-04        Built1            최초작성
         ***************************************************************************************/

        /***************************************************************************************
         * 1. FORM 변수 선언
         ***************************************************************************************/


        /***************************************************************************************
         * 2. FORM LOAD
         ***************************************************************************************/

        /*
         * 기능 : 화면 최초 로드 및 메뉴 조회
         */
        this.COM11020M_onload = function(obj, e)
        {
            this.divSearch.form.cboUseYn.set_index(0);
            this.fn_search();
        };


        /***************************************************************************************
         * 3. 공통 버튼
         ***************************************************************************************/

        /*
         * 기능 : 메뉴 조회
         */
        this.fn_search = function()
        {
            this.grdMenu.updateToDataset();

            if (this.gfn_dataSetChange(this.dsMenu))
            {
                if (!this.confirm("저장하지 않은 변경사항이 있습니다. 다시 조회하시겠습니까?")) return;
            }

            var sMenuText     = this.divSearch.form.edtMenu.value;
            var sUseYn        = this.divSearch.form.cboUseYn.value;
            var sSvcID        = "selectMenuList";
            var sSvcURL       = "svcUrl::com/menu/selectMenuList.do";
            var sInDataSets   = "";
            var sOutDataSets  = "dsMenu=outMenu";
            var sArgument     = "menuText=" + nexacro.wrapQuote(this.gfn_isNull(sMenuText) ? "" : sMenuText);
                sArgument    += " userYn=" + nexacro.wrapQuote(this.gfn_isNull(sUseYn) ? "" : sUseYn);
            var sCallbackFunc = "fn_callBack";

            this.gfn_transaction(sSvcID, sSvcURL, sInDataSets, sOutDataSets, sArgument, sCallbackFunc);
        };

        /*
         * 기능 : 조회조건 초기화
         */
        this.fn_searchInit = function()
        {
            this.divSearch.form.edtMenu.set_value("");
            this.divSearch.form.cboUseYn.set_index(0);
            this.fn_search();
        };

        /*
         * 기능 : 신규 메뉴 행 추가
         */
        this.fn_addRow = function()
        {
            var objDs = this.dsMenu;
            var nRow  = objDs.addRow();

            objDs.setColumn(nRow, "PARENT_MENU_CD", "COM");
            objDs.setColumn(nRow, "CHILD_MENU_LEVEL", 1);
            objDs.setColumn(nRow, "CHILD_MENU_SEQ", objDs.rowcount);
            objDs.setColumn(nRow, "USER_YN", "Y");
            objDs.setColumn(nRow, "BTN_SEARCH_YN", "Y");
            objDs.setColumn(nRow, "BTN_SEARCH_INIT_YN", "Y");
            objDs.setColumn(nRow, "BTN_SAVE_YN", "Y");
            objDs.setColumn(nRow, "BTN_ADD_ROW_YN", "Y");
            objDs.setColumn(nRow, "BTN_DEL_ROW_YN", "Y");
            objDs.setColumn(nRow, "BTN_EXCEL_DOWN_YN", "Y");
            objDs.setColumn(nRow, "BTN_EXCEL_UP_YN", "N");
            objDs.setColumn(nRow, "BTN_PRINT_YN", "N");
            objDs.setColumn(nRow, "BTN_BATCH_YN", "N");
            objDs.set_rowposition(nRow);

            this.fn_setCount();
        };

        /*
         * 기능 : 선택 메뉴 행 삭제
         */
        this.fn_delRow = function()
        {
            this.grdMenu.updateToDataset();

            var objDs = this.dsMenu;
            var nRow  = objDs.rowposition;

            if (nRow < 0)
            {
                this.alert("삭제할 메뉴를 선택하세요.");
                return;
            }

            if (!this.confirm("선택한 메뉴를 삭제하시겠습니까?")) return;

            objDs.deleteRow(nRow);
            this.fn_setCount();
        };

        /*
         * 기능 : 변경 메뉴 저장
         */
        this.fn_save = function()
        {
            this.grdMenu.updateToDataset();

            if (!this.gfn_dataSetChange(this.dsMenu))
            {
                this.alert("저장할 변경사항이 없습니다.");
                return;
            }

            if (!this.fn_validate()) return;
            if (!this.confirm("변경된 메뉴정보를 저장하시겠습니까?")) return;

            var sSvcID        = "saveMenuList";
            var sSvcURL       = "svcUrl::com/menu/saveMenuList.do";
            var sInDataSets   = "inMenu=dsMenu:U";
            var sOutDataSets  = "";
            var sArgument     = "";
            var sCallbackFunc = "fn_callBack";

            this.gfn_transaction(sSvcID, sSvcURL, sInDataSets, sOutDataSets, sArgument, sCallbackFunc);
        };


        /***************************************************************************************
         * 4. TRANSACTION, CALLBACK
         ***************************************************************************************/

        /*
         * 기능 : 메뉴 조회 및 저장 결과 처리
         */
        this.fn_callBack = function(sSvcID, nErrorCode, sErrorMsg)
        {
            if (nErrorCode < 0)
            {
                this.alert("처리 중 오류가 발생했습니다.\n" + sErrorMsg);
                return;
            }

            switch (sSvcID)
            {
                case "selectMenuList":
                    this.fn_setCount();
                    break;

                case "saveMenuList":
                    this.dsMenu.applyChange();
                    this.alert("저장되었습니다.");
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

        /*
         * 기능 : 메뉴 건수 표시
         */
        this.fn_setCount = function()
        {
            this.staCount.set_text("총 " + this.dsMenu.rowcount + "건");
        };

        /*
         * 기능 : 메뉴 입력값 검사
         */
        this.fn_validate = function()
        {
            var objDs = this.dsMenu;

            for (var i = 0; i < objDs.rowcount; i++)
            {
                var nRowType = objDs.getRowType(i);

                if (nRowType != Dataset.ROWTYPE_INSERT && nRowType != Dataset.ROWTYPE_UPDATE) continue;

                var sParentCd = objDs.getColumn(i, "PARENT_MENU_CD");
                var sMenuCd   = objDs.getColumn(i, "CHILD_MENU_CD");
                var sMenuNm   = objDs.getColumn(i, "CHILD_MENU_NM");
                var nLevel    = objDs.getColumn(i, "CHILD_MENU_LEVEL");
                var nSeq      = objDs.getColumn(i, "CHILD_MENU_SEQ");
                var sUseYn    = objDs.getColumn(i, "USER_YN");
                var sPageUrl  = objDs.getColumn(i, "CHILD_PAGE_ULR");

                if (this.gfn_isNull(sParentCd) || this.gfn_isNull(sMenuCd) || this.gfn_isNull(sMenuNm))
                {
                    this.alert((i + 1) + "행의 상위 메뉴 코드, 메뉴 코드, 메뉴명을 입력하세요.");
                    objDs.set_rowposition(i);
                    return false;
                }

                if (String(sParentCd).length > 30 || String(sMenuCd).length > 30 || String(sMenuNm).length > 200 || (!this.gfn_isNull(sPageUrl) && String(sPageUrl).length > 100))
                {
                    this.alert((i + 1) + "행의 입력 길이가 DB 컬럼 크기를 초과했습니다.");
                    objDs.set_rowposition(i);
                    return false;
                }

                if (!/^\d+$/.test(String(nLevel)) || !/^\d+$/.test(String(nSeq)))
                {
                    this.alert((i + 1) + "행의 메뉴 레벨과 표시 순서는 0 이상의 정수여야 합니다.");
                    objDs.set_rowposition(i);
                    return false;
                }

                if (sUseYn != "Y" && sUseYn != "N")
                {
                    this.alert((i + 1) + "행의 사용 여부를 확인하세요.");
                    objDs.set_rowposition(i);
                    return false;
                }

                if (sParentCd == sMenuCd)
                {
                    this.alert((i + 1) + "행의 메뉴 코드는 자기 자신을 상위 메뉴로 지정할 수 없습니다.");
                    objDs.set_rowposition(i);
                    return false;
                }

                for (var j = 0; j < objDs.rowcount; j++)
                {
                    if (i != j && sMenuCd == objDs.getColumn(j, "CHILD_MENU_CD"))
                    {
                        this.alert("중복된 메뉴 코드입니다.\n" + sMenuCd);
                        objDs.set_rowposition(i);
                        return false;
                    }
                }
            }

            return true;
        };


        /***************************************************************************************
         * 7. 이벤트
         ***************************************************************************************/

        /*
         * 기능 : 조회 버튼 클릭
         */
        this.divSearch_btnSearch_onclick = function(obj, e)
        {
            this.fn_search();
        };

        /*
         * 기능 : 초기화 버튼 클릭
         */
        this.divSearch_btnSearchInit_onclick = function(obj, e)
        {
            this.fn_searchInit();
        };

        /*
         * 기능 : 행추가 버튼 클릭
         */
        this.btnAddRow_onclick = function(obj, e)
        {
            this.fn_addRow();
        };

        /*
         * 기능 : 행삭제 버튼 클릭
         */
        this.btnDelRow_onclick = function(obj, e)
        {
            this.fn_delRow();
        };

        /*
         * 기능 : 저장 버튼 클릭
         */
        this.btnSave_onclick = function(obj, e)
        {
            this.fn_save();
        };

        /*
         * 기능 : 검색어 Enter 입력
         */
        this.divSearch_edtMenu_onkeydown = function(obj, e)
        {
            if (e.keycode == 13) this.fn_search();
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.COM11020M_onload,this);
            this.divSearch.form.edtMenu.addEventHandler("onkeydown",this.divSearch_edtMenu_onkeydown,this);
            this.divSearch.form.btnSearch.addEventHandler("onclick",this.divSearch_btnSearch_onclick,this);
            this.divSearch.form.btnSearchInit.addEventHandler("onclick",this.divSearch_btnSearchInit_onclick,this);
            this.btnSave.addEventHandler("onclick",this.btnSave_onclick,this);
            this.btnDelRow.addEventHandler("onclick",this.btnDelRow_onclick,this);
            this.btnAddRow.addEventHandler("onclick",this.btnAddRow_onclick,this);
        };
        this.loadIncludeScript("COM11020M.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

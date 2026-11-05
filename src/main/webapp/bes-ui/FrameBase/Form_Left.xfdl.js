(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Left");
            this.set_titletext("메뉴");
            this.set_cssclass("besLeftForm");
            this.set_scrollbartype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(200,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_menu", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "MENU_ID","type" : "STRING","size" : "256"},{"id" : "PARENT_MENU_CD","type" : "STRING","size" : "256"},{"id" : "CHILD_MENU_CD","type" : "STRING","size" : "256"},{"id" : "CHILD_MENU_NM","type" : "STRING","size" : "256"},{"id" : "CHILD_PAGE_ULR","type" : "STRING","size" : "256"},{"id" : "CHILD_MENU_LEVEL","type" : "INT","size" : "256"},{"id" : "CHILD_MENU_SEQ","type" : "INT","size" : "256"},{"id" : "USER_YN","type" : "STRING","size" : "256"},{"id" : "BTN_SEARCH_YN","type" : "STRING","size" : "256"},{"id" : "BTN_SEARCH_INIT_YN","type" : "STRING","size" : "256"},{"id" : "BTN_SAVE_YN","type" : "STRING","size" : "256"},{"id" : "BTN_ADD_ROW_YN","type" : "STRING","size" : "256"},{"id" : "BTN_DEL_ROW_YN","type" : "STRING","size" : "256"},{"id" : "BTN_EXCEL_DOWN_YN","type" : "STRING","size" : "256"},{"id" : "BTN_EXCEL_UP_YN","type" : "STRING","size" : "256"},{"id" : "BTN_PRINT_YN","type" : "STRING","size" : "256"},{"id" : "BTN_BATCH_YN","type" : "STRING","size" : "256"},{"id" : "REMARK","type" : "STRING","size" : "256"},{"id" : "CREATE_DATE","type" : "STRING","size" : "256"},{"id" : "CREATE_BY","type" : "STRING","size" : "256"},{"id" : "UPDATE_DATE","type" : "STRING","size" : "256"},{"id" : "UPDATE_BY","type" : "STRING","size" : "256"}]}});
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("divMenu","0","0",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_cssclass("besLeftMenuDiv");
            obj.getSetter("scrollbartype").set("none");
            this.addChild(obj.name, obj);

            obj = new Grid("grdMenu","8","8",null,null,"8","8",null,null,null,null,this.divMenu.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_menu");
            obj.set_autofittype("col");
            obj.set_treeinitstatus("expand,all");
            obj.set_treeusecheckbox("false");
            obj.set_treeuseimage("false");
            obj.set_treeusebutton("use");
            obj.set_cssclass("besLeftMenuGrid");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"170\"/></Columns><Rows><Row size=\"0\" band=\"head\"/><Row size=\"28\"/></Rows><Band id=\"head\"><Cell text=\"\"/></Band><Band id=\"body\"><Cell text=\"bind:CHILD_MENU_NM\" displaytype=\"treeitemcontrol\" edittype=\"tree\" treelevel=\"bind:CHILD_MENU_LEVEL\" cssclass=\"expr:CHILD_MENU_LEVEL == 0 ? &apos;menuParent&apos; : &apos;menuChild&apos;\"/></Band></Format></Formats>");
            this.divMenu.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this.divMenu.form
            obj = new Layout("default","",0,0,this.divMenu.form,function(p){});
            this.divMenu.form.addLayout(obj.name, obj);

            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",200,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Left.xfdl", function() {
        /***************************************************************************************
         * 프로젝트        : Built1 Enterprise System 구축 프로젝트
         * 업무구분        : 공통 프레임
         * 파일명          : Form_Left.xfdl
         * 작성자          : Built1
         * 작성일          : 2026-11-03
         *
         * 화면            : BES 왼쪽 메뉴
         * 설명            : DB 메뉴정보를 이용한 계층형 왼쪽 메뉴 표시 및 업무 화면 이동
         *---------------------------------------------------------------------------------------
         * 변경일            변경자            변경내역
         *---------------------------------------------------------------------------------------
         * 2026-11-03        Built1            최초작성
         * 2026-11-04        Built1            왼쪽 메뉴 디자인 개선 및 스크립트 정리
         * 2026-11-05        Built1            DB 메뉴정보 연동 및 메뉴 계층 구성
         * 2026-11-05        Built1            MDI 업무 탭 연동
         ***************************************************************************************/


        /***************************************************************************************
         * 1. FORM 변수 선언
         ***************************************************************************************/

        // 현재 왼쪽 메뉴에 표시 중인 최상위 메뉴 코드
        this.fv_topMenuCd = "";


        /***************************************************************************************
         * 2. FORM LOAD
         ***************************************************************************************/

        /*
         * 기능 : 왼쪽 메뉴 초기화
         */
        this.fn_init = function(obj, e)
        {
            var objApp = nexacro.getApplication();
            var dsMenu = objApp.gdsMenu;

            // 전역 메뉴 Dataset이 없거나 조회된 메뉴가 없으면 종료
            if (!dsMenu || dsMenu.rowcount == 0) return;

            // 전체 메뉴에서 첫 번째 1레벨 메뉴를 찾아 초기 메뉴로 설정
            for (var i = 0; i < dsMenu.rowcount; i++)
            {
                if (Number(dsMenu.getColumn(i, "CHILD_MENU_LEVEL")) == 1)
                {
                    this.fn_selectTopMenu(dsMenu.getColumn(i, "CHILD_MENU_CD"));
                    break;
                }
            }
        };


        /***************************************************************************************
         * 3. 공통 버튼
         ***************************************************************************************/


        /***************************************************************************************
         * 4. TRANSACTION, CALLBACK
         ***************************************************************************************/


        /***************************************************************************************
         * 5. 팝업 호출 및 콜백
         ***************************************************************************************/


        /***************************************************************************************
         * 6. 기타 함수
         ***************************************************************************************/

        /*
         * 기능 : 선택한 최상위 메뉴의 하위 메뉴 조회 및 Grid 구성
         */
        this.fn_selectTopMenu = function(sTopMenuCd)
        {
            var objApp = nexacro.getApplication();
            var dsMenu = objApp.gdsMenu;

            if (!dsMenu) return;

            // 현재 선택한 최상위 메뉴 코드 저장
            this.fv_topMenuCd = sTopMenuCd;

            // 이전에 표시된 왼쪽 메뉴 데이터 초기화
            this.ds_menu.clearData();

            // 선택한 1레벨 메뉴에 속하는 2레벨 메뉴 조회
            for (var i = 0; i < dsMenu.rowcount; i++)
            {
                var nLevel    = Number(dsMenu.getColumn(i, "CHILD_MENU_LEVEL"));
                var sParentCd = dsMenu.getColumn(i, "PARENT_MENU_CD");
                var sChildCd  = dsMenu.getColumn(i, "CHILD_MENU_CD");

                // 2레벨 메뉴 중 선택한 최상위 메뉴의 하위 항목만 처리
                if (nLevel == 2 && sParentCd == sTopMenuCd)
                {
                    var nRow = this.ds_menu.addRow();

                    // 전역 Dataset의 메뉴 정보를 왼쪽 메뉴 Dataset에 복사
                    this.ds_menu.copyRow(nRow, dsMenu, i);

                    // Grid Tree의 최상위 항목으로 표시하기 위해 레벨을 0으로 변경
                    this.ds_menu.setColumn(nRow, "CHILD_MENU_LEVEL", 0);

                    // 현재 2레벨 메뉴에 속하는 3레벨 업무 메뉴 조회
                    for (var j = 0; j < dsMenu.rowcount; j++)
                    {
                        var nChildLevel    = Number(dsMenu.getColumn(j, "CHILD_MENU_LEVEL"));
                        var sChildParentCd = dsMenu.getColumn(j, "PARENT_MENU_CD");

                        if (nChildLevel == 3 && sChildParentCd == sChildCd)
                        {
                            var nChildRow = this.ds_menu.addRow();

                            // 3레벨 메뉴 정보를 왼쪽 메뉴 Dataset에 복사
                            this.ds_menu.copyRow(nChildRow, dsMenu, j);

                            // Grid Tree의 하위 항목으로 표시하기 위해 레벨을 1로 변경
                            this.ds_menu.setColumn(nChildRow, "CHILD_MENU_LEVEL", 1);
                        }
                    }
                }
            }

            // 메뉴 구성이 완료되면 레벨별 Grid 행 높이 적용
            this.fn_setMenuRowSize();
        };


        /*
         * 기능 : 메뉴 레벨별 Grid 행 높이 설정
         */
        this.fn_setMenuRowSize = function()
        {
            var grdMenu = this.divMenu.form.grdMenu;

            // 2레벨 메뉴는 32px, 3레벨 업무 메뉴는 28px 적용
            for (var i = 0; i < this.ds_menu.rowcount; i++)
            {
                var nLevel = Number(this.ds_menu.getColumn(i, "CHILD_MENU_LEVEL"));
                grdMenu.setRealRowSize(i, nLevel == 0 ? 32 : 28);
            }
        };


        /*
         * 기능 : 선택한 업무 메뉴의 MDI 탭 생성 및 화면 이동
         */
        this.fn_openMenu = function(sMenuCd, sMenuNm, sFormUrl)
        {
            // 메뉴 코드 또는 화면 URL이 없으면 업무 화면을 열지 않음
            if (this.gfn_isNull(sMenuCd) || this.gfn_isNull(sFormUrl)) return;

            var objApp      = nexacro.getApplication();
            var objMdiFrame = objApp.mainframe.VFrameSetMain.VFrameSet00.MdiFrame;

            // MDI 프레임 또는 업무 탭 생성 함수가 없으면 오류 표시
            if (!objMdiFrame || !objMdiFrame.form || !objMdiFrame.form.fn_openTab)
            {
                this.alert("MdiFrame을 찾을 수 없습니다.");
                return;
            }

            // 메뉴 코드, 메뉴명, 화면 URL을 전달하여 업무 탭 생성
            // 이미 열린 메뉴라면 Form_Mdi에서 기존 탭을 선택
            objMdiFrame.form.fn_openTab(sMenuCd, sMenuNm, sFormUrl);
        };


        /***************************************************************************************
         * 7. 이벤트
         ***************************************************************************************/

        /*
         * 기능 : 왼쪽 메뉴 로딩 이벤트
         */
        this.Form_Left_onload = function(obj, e)
        {
            // 화면 로딩 시 첫 번째 최상위 메뉴의 하위 메뉴 표시
            this.fn_init(obj, e);
        };


        /*
         * 기능 : 왼쪽 메뉴 선택 시 업무 탭 생성
         */
        this.divMenu_grdMenu_oncellclick = function(obj, e)
        {
            // Dataset 범위를 벗어난 행을 클릭한 경우 종료
            if (e.row < 0 || e.row >= this.ds_menu.rowcount) return;

            var nLevel = Number(this.ds_menu.getColumn(e.row, "CHILD_MENU_LEVEL"));

            // 2레벨 메뉴는 분류용이므로 업무 화면을 열지 않음
            if (nLevel == 0) return;

            // 선택한 3레벨 업무 메뉴의 코드, 이름, 화면 URL 조회
            var sMenuCd  = this.ds_menu.getColumn(e.row, "CHILD_MENU_CD");
            var sMenuNm  = this.ds_menu.getColumn(e.row, "CHILD_MENU_NM");
            var sFormUrl = this.ds_menu.getColumn(e.row, "CHILD_PAGE_ULR");

            // 조회한 메뉴 정보를 이용하여 업무 탭 생성 또는 기존 탭 선택
            this.fn_openMenu(sMenuCd, sMenuNm, sFormUrl);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Left_onload,this);
            this.divMenu.form.grdMenu.addEventHandler("oncellclick",this.divMenu_grdMenu_oncellclick,this);
        };
        this.loadIncludeScript("Form_Left.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

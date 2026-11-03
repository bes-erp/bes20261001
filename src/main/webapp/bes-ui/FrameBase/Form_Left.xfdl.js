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
            this.set_background("#FFFFFF");
            this.set_scrollbartype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(200,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("divMenu","0","0",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#FFFFFF");
            obj.getSetter("scrollbartype").set("none");
            this.addChild(obj.name, obj);

            obj = new Grid("grdMenu","8","12",null,null,"8","12",null,null,null,null,this.divMenu.form);
            obj.set_taborder("0");
            obj.set_binddataset("gdsMenu");
            obj.set_autofittype("col");
            obj.set_treeinitstatus("expand,all");
            obj.set_treeusecheckbox("false");
            obj.set_treeuseimage("false");
            obj.set_treeusebutton("use");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"170\"/></Columns><Rows><Row size=\"0\" band=\"head\"/><Row size=\"38\"/></Rows><Band id=\"head\"><Cell text=\"\"/></Band><Band id=\"body\"><Cell text=\"bind:MENU_NAME\" displaytype=\"treeitemcontrol\" edittype=\"tree\" treelevel=\"bind:MENU_LEVEL\"/></Band></Format></Formats>");
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
         * 설명            : Application 전역 Dataset(gdsMenu)을 이용한 계층형 메뉴 표시
         *---------------------------------------------------------------------------------------
         * 변경일            변경자            변경내역
         *---------------------------------------------------------------------------------------
         * 2026-11-03        Built1            전역 Dataset 기반 메뉴 트리 구성
         ***************************************************************************************/

        /***************************************************************************************
         * 1. FORM 변수 선언
         ***************************************************************************************/

        /***************************************************************************************
         * 2. FORM LOAD
         ***************************************************************************************/
        this.Form_Left_onload = function(obj, e)
        {
            // gdsMenu는 Application Variables > Datasets에서 정의한다.
            // Form 내부에 별도 Dataset이나 고정 메뉴 행을 만들지 않는다.
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


        /***************************************************************************************
         * 7. 이벤트
         ***************************************************************************************/
        this.divMenu_grdMenu_oncellclick = function(obj, e)
        {
            var nRow = e.row;
            var dsMenu = nexacro.getApplication().gdsMenu;

            if (!dsMenu || nRow < 0 || nRow >= dsMenu.rowcount) return;

            var sFormUrl = dsMenu.getColumn(nRow, "FORM_URL");

            // 상위 메뉴는 화면을 열지 않는다.
            if (!sFormUrl) return;

            // Application_Desktop.xadl의 WorkFrame 접근
            var objApp = nexacro.getApplication();
            var objWorkFrame =
                objApp.mainframe.VFrameSetMain.HFrameSet00.VFrameSet00.WorkFrame;

            if (!objWorkFrame)
            {
                this.alert("WorkFrame을 찾을 수 없습니다.");
                return;
            }

            // 왼쪽 메뉴와 상단 영역은 유지하고 업무 화면만 변경
            objWorkFrame.set_formurl(sFormUrl);
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

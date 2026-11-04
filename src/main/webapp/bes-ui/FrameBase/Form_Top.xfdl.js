(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Top");
            this.set_titletext("공통 상단 영역");
            this.set_background("#FFFFFF");
            this.set_scrollbartype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1080,50);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("sta_Brand","20","0","44","49",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("BES");
            obj.set_color("#24436D");
            obj.set_font("bold 22px Arial");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("sta_SystemName","84","0","260","49",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("Built1 Enterprise System");
            obj.set_color("#41556F");
            obj.set_font("12px Arial");
            this.addChild(obj.name, obj);

            obj = new Static("sta_UserName",null,"0","175","49","187",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("");
            obj.set_textAlign("right");
            obj.set_color("#52647A");
            obj.set_font("12px Arial");
            this.addChild(obj.name, obj);

            obj = new Button("btn_changePw",null,"0","90","49","92",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("패스워드 변경");
            obj.set_font("12px Arial");
            obj.set_color("#3478C0");
            obj.set_background("transparent");
            obj.set_border("0px none");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("sta_Separator",null,"0","8","49","84",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("|");
            obj.set_textAlign("center");
            obj.set_color("#B8C2CF");
            obj.set_font("12px Arial");
            this.addChild(obj.name, obj);

            obj = new Button("btn_logout",null,"0","70","49","14",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("로그아웃");
            obj.set_font("12px Arial");
            obj.set_color("#3478C0");
            obj.set_background("transparent");
            obj.set_border("0px none");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1080,50,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Top.xfdl", function() {
        /***************************************************************************************
         * 프로젝트        : Built1 Enterprise System 구축 프로젝트
         * 업무구분        : 공통 프레임
         * 파일명          : Form_Top.xfdl
         * 작성자          : Built1
         * 작성일          : 2026-11-03
         *
         * 화면            : BES 공통 상단 영역
         * 설명            : 시스템명, 사용자 환영 문구, 패스워드 변경 및 로그아웃
         *---------------------------------------------------------------------------------------
         * 변경일            변경자            변경내역
         *---------------------------------------------------------------------------------------
         * 2026-11-03        Built1            공통 상단 화면 구성
         * 2026-11-04        Built1            상단 디자인 및 사용자 환영 문구 개선
         * 2026-11-04        Built1            패스워드 변경 버튼 추가
         ***************************************************************************************/


        /***************************************************************************************
         * 1. FORM 변수 선언
         ***************************************************************************************/


        /***************************************************************************************
         * 2. FORM LOAD
         ***************************************************************************************/

        /*
         * 기능 : 상단 로그인 사용자 정보 표시
         */
        this.Form_Top_onload = function(obj, e)
        {
            var objApp = nexacro.getApplication();

            // 로그인 사용자 환영 문구 표시
            this.sta_UserName.set_text(objApp.gvUserId ? objApp.gvUserId + "님 환영합니다." : "");
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
         * 기능 : 로그아웃 처리 및 로그인 화면 이동
         */
        this.fn_logout = function()
        {
            var objApp      = nexacro.getApplication();
            var objFrameSet = objApp.mainframe.VFrameSetMain;

            if (!objFrameSet)
            {
                this.alert("메인 프레임을 찾을 수 없습니다.");
                return;
            }

            // 로그인 화면 정보 복원
            var objLoginFrame = objFrameSet.LoginFrame;

            if (objLoginFrame && objLoginFrame.form && objLoginFrame.form.fn_resetLogin)
            {
                objLoginFrame.form.fn_resetLogin();
            }

            // 로그인 사용자 정보 초기화
            objApp.gvUserId = "";
            this.sta_UserName.set_text("");

            // 로그인 화면 표시
            objFrameSet.set_separatesize("*,0");

            this.alert("로그아웃 되었습니다.");
        };


        /***************************************************************************************
         * 7. 이벤트
         ***************************************************************************************/

        /*
         * 기능 : 로그아웃 버튼 클릭
         */
        this.btn_logout_onclick = function(obj, e)
        {
            this.fn_logout();
        };


        /*
         * 기능 : 패스워드 변경 버튼 클릭
         */
        this.btn_changePw_onclick = function(obj, e)
        {
            this.alert("패스워드 변경 기능 개발 예정");
        };


        /*
         * 기능 : BES 로고 클릭 시 초기 업무 화면으로 이동
         */
        this.sta_Brand_onclick = function(obj, e)
        {
            var objApp = nexacro.getApplication();

            // 메인 화면 WorkFrame 접근
            var objWorkFrame = objApp.mainframe.VFrameSetMain.VFrameSet00.HFrameSet00.WorkFrame;

            if (!objWorkFrame)
            {
                this.alert("WorkFrame을 찾을 수 없습니다.");
                return;
            }

            // 초기 업무 화면으로 변경
            objWorkFrame.set_formurl("FrameBase::Form_Work.xfdl");
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Top_onload,this);
            this.sta_Brand.addEventHandler("onclick",this.sta_Brand_onclick,this);
            this.btn_changePw.addEventHandler("onclick",this.btn_changePw_onclick,this);
            this.btn_logout.addEventHandler("onclick",this.btn_logout_onclick,this);
        };
        this.loadIncludeScript("Form_Top.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

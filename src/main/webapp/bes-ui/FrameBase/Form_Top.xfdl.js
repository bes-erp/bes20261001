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
            obj = new Static("sta_Brand","20","0","72","49",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("BES");
            obj.set_color("#24436D");
            obj.set_font("bold 22px Arial");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("sta_SystemName","94","0","260","49",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("Built1 Enterprise System");
            obj.set_color("#41556F");
            obj.set_font("12px Arial");
            this.addChild(obj.name, obj);

            obj = new Static("sta_UserName",null,"0","120","49","82",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("");
            obj.set_textAlign("right");
            obj.set_color("#52647A");
            obj.set_font("12px Arial");
            this.addChild(obj.name, obj);

            obj = new Button("btn_logout",null,"0","60","49","18",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("로그아웃");
            obj.set_font("12px Arial");
            obj.set_color("#52647A");
            obj.set_background("transparent");
            obj.set_border("0px none");
            obj.set_textAlign("right");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("sta_BottomLine","0",null,null,"1","0","0",null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_background("#DCE3EC");
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
         * 설명            : 시스템명 및 사용자 정보 표시 영역 (로그인 정보 연동 전)
         *---------------------------------------------------------------------------------------
         * 변경일            변경자            변경내역
         *---------------------------------------------------------------------------------------
         * 2026-11-03        Built1            공통 상단 화면 구성
         ***************************************************************************************/

        /***************************************************************************************
         * 1. FORM 변수 선언
         ***************************************************************************************/

        /***************************************************************************************
         * 2. FORM LOAD
         ***************************************************************************************/

        /*
         * 기능 : 상단 로그인 사용자 아이디 표시
         */
        this.Form_Top_onload = function(obj, e)
        {
            var objApp = nexacro.getApplication();

            // 로그인 성공 시 저장한 사용자 아이디
            var sUserId = objApp.gvUserId || "";

            // 상단 사용자 정보 표시
            this.sta_UserName.set_text(sUserId);
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
            var objApp = nexacro.getApplication();
            var objFrameSet = objApp.mainframe.VFrameSetMain;

            if (!objFrameSet)
            {
                this.alert("메인 프레임을 찾을 수 없습니다.");
                return;
            }

            // 1. 로그인 화면 입력값 초기화
            var objLoginFrame = objFrameSet.LoginFrame;

            if (objLoginFrame && objLoginFrame.form)
            {
                var objLoginForm = objLoginFrame.form;

                if (objLoginForm.div_login)
                {
        			objLoginForm.div_login.form.edt_userId.set_value(null);
        			objLoginForm.div_login.form.edt_password.set_value(null);
                }

                if (objLoginForm.ds_login)
                {
                    objLoginForm.ds_login.clearData();
                }

                if (objLoginForm.ds_loginResult)
                {
                    objLoginForm.ds_loginResult.clearData();
                }
            }

            // 2. 로그인 사용자 정보 초기화
            objApp.gvUserId = "";
            this.sta_UserName.set_text("");

            // 3. 로그인 화면 표시 / 업무 화면 숨김
            objFrameSet.set_separatesize("*,0");

            // 4. 로그아웃 완료 알림
            this.alert("로그아웃 되었습니다.");
        };



        /*
         * 기능 : 로그인 입력 정보 초기화
         */
        this.fn_resetLogin = function()
        {
            this.div_login.form.edt_userId.set_value("");
            this.div_login.form.edt_password.set_value("");

            if (this.ds_login)
            {
                this.ds_login.clearData();
            }

            if (this.ds_loginResult)
            {
                this.ds_loginResult.clearData();
            }
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
         * 기능 : BES 로고 클릭 시 초기 업무 화면으로 이동
         */
        this.sta_Brand_onclick = function(obj, e)
        {
            var objApp = nexacro.getApplication();

            // 메인 화면의 WorkFrame 가져오기
            var objWorkFrame =
                objApp.mainframe.VFrameSetMain.HFrameSet00.VFrameSet00.WorkFrame;

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
            this.btn_logout.addEventHandler("onclick",this.btn_logout_onclick,this);
        };
        this.loadIncludeScript("Form_Top.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

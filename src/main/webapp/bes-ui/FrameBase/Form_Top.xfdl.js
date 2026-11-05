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
            this.set_cssclass("besTopForm");
            this.set_scrollbartype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1080,50);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new ImageViewer("img_Brand","20","13","24","24",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_image("theme://images_ifc/bes_icon_24_2x.png");
            obj.set_stretch("fit");
            obj.set_cssclass("besTopLogo");
            this.addChild(obj.name, obj);

            obj = new Static("sta_Brand","56","0","58","49",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("BES");
            obj.set_cssclass("besTopBrand");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("sta_SystemName","112","0","260","49",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("Built1 Enterprise System");
            obj.set_cssclass("besTopSystemName");
            this.addChild(obj.name, obj);

            obj = new Static("sta_UserName",null,"0","175","49","187",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("");
            obj.set_textAlign("right");
            obj.set_cssclass("besTopUserName");
            this.addChild(obj.name, obj);

            obj = new Button("btn_changePw",null,"0","90","49","92",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("패스워드 변경");
            obj.set_cssclass("besTopActionButton");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("sta_Separator",null,"0","8","49","84",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("|");
            obj.set_textAlign("center");
            obj.set_cssclass("besTopSeparator");
            this.addChild(obj.name, obj);

            obj = new Button("btn_logout",null,"0","70","49","14",null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("로그아웃");
            obj.set_cssclass("besTopActionButton");
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
         * 2026-11-05        Built1            BES 로고 클릭 시 MDI 홈 화면 연동
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

            // 전역 변수에 저장된 로그인 사용자 ID를 상단 환영 문구에 표시
            // 로그인 사용자 정보가 없으면 빈 문자열 표시
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

            // 메인 프레임이 존재하지 않으면 로그아웃 화면 전환 중단
            if (!objFrameSet)
            {
                this.alert("메인 프레임을 찾을 수 없습니다.");
                return;
            }

            // 로그인 화면 프레임 조회
            var objLoginFrame = objFrameSet.LoginFrame;

            // 로그인 화면에 남아 있는 인증 결과 및 메뉴 Dataset 초기화
            // 아이디 및 비밀번호 저장 설정은 기존 사용자 선택값으로 복원
            if (objLoginFrame && objLoginFrame.form && objLoginFrame.form.fn_resetLogin)
            {
                objLoginFrame.form.fn_resetLogin();
            }

            // 현재 로그인 사용자 정보를 전역 변수와 상단 화면에서 제거
            objApp.gvUserId = "";
            this.sta_UserName.set_text("");

            // 메인 화면을 숨기고 로그인 화면 표시
            objFrameSet.set_separatesize("*,0");

            // 로그아웃 완료 안내
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
            // 로그인 정보 초기화 및 로그인 화면 전환
            this.fn_logout();
        };


        /*
         * 기능 : 패스워드 변경 버튼 클릭
         */
        this.btn_changePw_onclick = function(obj, e)
        {
            // 패스워드 변경 기능은 추후 개발 예정
            this.alert("패스워드 변경 기능 개발 예정");
        };


        /*
         * 기능 : BES 로고 클릭 시 홈 화면 이동
         */
        this.sta_Brand_onclick = function(obj, e)
        {
            var objApp      = nexacro.getApplication();
            var objMdiFrame = objApp.mainframe.VFrameSetMain.VFrameSet00.MdiFrame;

            // MDI 프레임 또는 탭 선택 함수가 없으면 오류 표시
            if (!objMdiFrame || !objMdiFrame.form || !objMdiFrame.form.fn_selectTab)
            {
                this.alert("MdiFrame을 찾을 수 없습니다.");
                return;
            }

            // 홈을 선택하여 업무 탭 활성화 상태 해제
            // Form_TabWork에서 기존 Form_Work 홈 화면 표시
            // 열려 있는 업무 탭과 화면 데이터는 유지
            objMdiFrame.form.fn_selectTab("");
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

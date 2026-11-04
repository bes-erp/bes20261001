(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("SYS10000M");
            this.set_titletext("로그인");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_login", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "USER_ID","type" : "STRING","size" : "30"},{"id" : "PASSWORD","type" : "STRING","size" : "512"}]}});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_loginResult", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "RESULT_CD","type" : "STRING","size" : "10"},{"id" : "RESULT_DESCR","type" : "STRING","size" : "4000"}]}});
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("div_login","400","125","480","470",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#FFFFFF");
            obj.set_border("1px solid #DDE3EC");
            obj.set_borderRadius("12px");
            this.addChild(obj.name, obj);

            obj = new Static("sta_title","40","45","400","50",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("0");
            obj.set_text("BES");
            obj.set_font("bold 32px Arial");
            obj.set_color("#234E91");
            obj.set_textAlign("center");
            this.div_login.addChild(obj.name, obj);

            obj = new Static("sta_subTitle","40","96","400","24",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("1");
            obj.set_text("Built1 Enterprise System");
            obj.set_font("13px Arial");
            obj.set_color("#7B8794");
            obj.set_textAlign("center");
            this.div_login.addChild(obj.name, obj);

            obj = new Static("sta_id","65","155","350","25",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("2");
            obj.set_text("아이디");
            obj.set_font("bold 13px Arial");
            obj.set_color("#344054");
            this.div_login.addChild(obj.name, obj);

            obj = new Edit("edt_userId","65","185","350","42",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("3");
            obj.set_displaynulltext("아이디를 입력하세요");
            obj.set_font("14px Arial");
            obj.set_border("1px solid #CED4DA");
            obj.set_borderRadius("5px");
            this.div_login.addChild(obj.name, obj);

            obj = new Static("sta_pw","65","245","350","25",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("4");
            obj.set_text("비밀번호");
            obj.set_font("bold 13px Arial");
            obj.set_color("#344054");
            this.div_login.addChild(obj.name, obj);

            obj = new Edit("edt_password","65","275","350","42",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("5");
            obj.set_password("true");
            obj.set_displaynulltext("비밀번호를 입력하세요");
            obj.set_font("14px Arial");
            obj.set_border("1px solid #CED4DA");
            obj.set_borderRadius("5px");
            this.div_login.addChild(obj.name, obj);

            obj = new CheckBox("chk_saveId","65","330","100","25",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("6");
            obj.set_text("아이디 저장");
            obj.set_font("12px Arial");
            obj.set_color("#667085");
            this.div_login.addChild(obj.name, obj);

            obj = new CheckBox("chk_savePw","180","330","110","25",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("7");
            obj.set_text("비밀번호 저장");
            obj.set_font("12px Arial");
            obj.set_color("#667085");
            this.div_login.addChild(obj.name, obj);

            obj = new Button("btn_login","65","380","350","48",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("8");
            obj.set_text("로그인");
            obj.set_font("bold 16px Arial");
            obj.set_color("#FFFFFF");
            obj.set_background("#2454A6");
            obj.set_border("0px none");
            obj.set_borderRadius("5px");
            this.div_login.addChild(obj.name, obj);

            obj = new Static("sta_copyright","400","615","480","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("© BES. All rights reserved.");
            obj.set_color("#98A2B3");
            obj.set_font("12px Arial");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this.div_login.form
            obj = new Layout("default","",480,470,this.div_login.form,function(p){});
            this.div_login.form.addLayout(obj.name, obj);

            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("SYS10000M.xfdl", function() {
        /***************************************************************************************
         * 프로젝트        : Built1 Enterprise System 구축 프로젝트
         * 업무구분        : 시스템관리
         * 파일명          : SYS10000M.xfdl
         * 작성자          : Built1
         * 작성일          : 2026-11-02
         *
         * 화면            : 로그인
         * 설명            : 사용자 로그인 및 개인의 세션정보 등록
         *---------------------------------------------------------------------------------------
         * 변경일            변경자            변경내역
         *---------------------------------------------------------------------------------------
         * 2026-11-02        Built1            최초작성
         * 2026-11-04        Built1            공통 함수 적용 및 로그인 정보 저장 기능 추가
         ***************************************************************************************/


        /***************************************************************************************
         * 1. FORM 변수 선언
         ***************************************************************************************/

        this.fv_saveIdKey   = "BES_DEV_SAVE_ID";
        this.fv_userIdKey   = "BES_DEV_USER_ID";
        this.fv_savePwKey   = "BES_DEV_SAVE_PW";
        this.fv_passwordKey = "BES_DEV_PASSWORD";


        /***************************************************************************************
         * 2. FORM LOAD
         ***************************************************************************************/

        /*
         * 기능 : 화면 초기화
         */
        this.fn_init = function(obj, e)
        {
        	this.fn_centerLogin();
            this.fn_loadLoginInfo();
        };


        /***************************************************************************************
         * 3. 공통 버튼
         ***************************************************************************************/

        /*
         * 기능 : 로그인 처리
         */
        this.fn_login = function()
        {
            var sUserId       = this.div_login.form.edt_userId.value;
            var sPassword     = this.div_login.form.edt_password.value;

            // 아이디 필수값 확인
            if (this.gfn_isNull(sUserId))
            {
                this.alert("아이디를 입력해 주세요.");
                this.div_login.form.edt_userId.setFocus();
                return;
            }

            // 비밀번호 필수값 확인
            if (this.gfn_isNull(sPassword))
            {
                this.alert("비밀번호를 입력해 주세요.");
                this.div_login.form.edt_password.setFocus();
                return;
            }

            // 로그인 요청 데이터 설정
            this.ds_login.clearData();

            var nRow = this.ds_login.addRow();
            this.ds_login.setColumn(nRow, "USER_ID", sUserId);
            this.ds_login.setColumn(nRow, "PASSWORD", sPassword);

            // 로그인 Transaction 설정
            var sSvcID        = "login";
            var sSvcURL       = "svcUrl::sys/SYS10000M/login.do";
            var sInDatasets   = "dsLogin=ds_login";
            var sOutDatasets  = "ds_loginResult=outLogin";
            var sArgument     = "";
            var sCallbackFunc = "fn_callBack";

            // 공통 Transaction 호출
            this.gfn_transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc);
        };


        /***************************************************************************************
         * 4. TRANSACTION, CALLBACK
         ***************************************************************************************/

        /*
         * 기능 : 로그인 Transaction 결과 처리
         */
        this.fn_callBack = function(sSvcID, nErrorCode, sErrorMsg)
        {
            if (sSvcID != "login") return;

            // 로그인 요청 데이터 삭제
            this.ds_login.clearData();

            // Transaction 오류 확인
            if (nErrorCode != 0)
            {
                this.div_login.form.edt_password.set_value(null);
                this.alert("로그인 요청 오류: " + sErrorMsg);
                return;
            }

            // 로그인 결과 확인
            if (this.ds_loginResult.rowcount == 0)
            {
                this.div_login.form.edt_password.set_value(null);
                this.alert("로그인 결과가 없습니다.");
                return;
            }

            var sResultCd  = this.ds_loginResult.getColumn(0, "RESULT_CD");
            var sResultMsg = this.ds_loginResult.getColumn(0, "RESULT_DESCR");

            // 로그인 성공
            if (sResultCd == "S")
            {
                var sUserId = this.div_login.form.edt_userId.value;
                var objApp  = nexacro.getApplication();

                // 로그인 정보 저장
                this.fn_saveLoginInfo();

                // 로그인 사용자 정보 설정
                objApp.gvUserId = sUserId;

                // 상단 프레임 사용자 정보 표시
                var objTopFrame = objApp.mainframe.VFrameSetMain.VFrameSet00.TopFrame;

                if (objTopFrame && objTopFrame.form && objTopFrame.form.sta_UserName)
        		{
        			objTopFrame.form.sta_UserName.set_text(sUserId + "님 환영합니다.");
        		}

                // 메인 화면 이동
                this.fn_goMain();
            }
            else
            {
                // 로그인 실패 처리
                this.div_login.form.edt_password.set_value(null);
                this.alert(sResultMsg || "로그인에 실패했습니다.");
                this.div_login.form.edt_password.setFocus();
            }
        };


        /***************************************************************************************
         * 5. 팝업 호출 및 콜백
         ***************************************************************************************/


        /***************************************************************************************
         * 6. 기타 함수
         ***************************************************************************************/

        /*
         * 기능 : 로그인 정보 저장
         */
        this.fn_saveLoginInfo = function()
        {
            var objLogin = this.div_login.form;
            var bSaveId  = (objLogin.chk_saveId.value == 1);
            var bSavePw  = (objLogin.chk_savePw.value == 1);

            // 아이디 저장
            if (bSaveId)
            {
                nexacro.setPrivateProfile(this.fv_saveIdKey, "1");
                nexacro.setPrivateProfile(this.fv_userIdKey, objLogin.edt_userId.value);
            }
            else
            {
                nexacro.removePrivateProfile(this.fv_saveIdKey);
                nexacro.removePrivateProfile(this.fv_userIdKey);
            }

            // 비밀번호 저장
            if (bSavePw)
            {
                nexacro.setPrivateProfile(this.fv_savePwKey, "1");
                nexacro.setPrivateProfile(this.fv_passwordKey, objLogin.edt_password.value);
            }
            else
            {
                nexacro.removePrivateProfile(this.fv_savePwKey);
                nexacro.removePrivateProfile(this.fv_passwordKey);
            }
        };


        /*
         * 기능 : 저장된 로그인 정보 조회
         */
        this.fn_loadLoginInfo = function()
        {
            var objLogin = this.div_login.form;
            var sSaveId  = nexacro.getPrivateProfile(this.fv_saveIdKey);
            var sSavePw  = nexacro.getPrivateProfile(this.fv_savePwKey);
            var bSaveId  = (sSaveId == "1");
            var bSavePw  = (sSavePw == "1");

            // 저장 여부 체크박스 설정
            objLogin.chk_saveId.set_value(bSaveId ? 1 : 0);
            objLogin.chk_savePw.set_value(bSavePw ? 1 : 0);

            // 아이디 조회
            if (bSaveId)
            {
                objLogin.edt_userId.set_value(nexacro.getPrivateProfile(this.fv_userIdKey));
            }
            else
            {
                objLogin.edt_userId.set_value(null);
            }

            // 비밀번호 조회
            if (bSavePw)
            {
                objLogin.edt_password.set_value(nexacro.getPrivateProfile(this.fv_passwordKey));
            }
            else
            {
                objLogin.edt_password.set_value(null);
            }
        };


        /*
         * 기능 : 로그아웃 후 로그인 정보 초기화
         */
        this.fn_resetLogin = function()
        {
            this.ds_login.clearData();
            this.ds_loginResult.clearData();
            this.fn_loadLoginInfo();
        };


        /*
         * 기능 : 로그인 성공 후 메인 프레임 전환
         */
        this.fn_goMain = function()
        {
            var objApp       = nexacro.getApplication();
            var objMainFrame = objApp.mainframe.VFrameSetMain;

            if (!objMainFrame)
            {
                this.alert("메인 프레임을 찾을 수 없습니다.");
                return;
            }

            objMainFrame.set_separatesize("0,*");
        };

        /*
         * 기능 : 로그인 화면 중앙 정렬
         */
        this.fn_centerLogin = function()
        {
            var objApp        = nexacro.getApplication();
            var objLoginFrame = objApp.mainframe.VFrameSetMain.LoginFrame;

            if (!objLoginFrame) return;

            // 공통 함수를 이용한 로그인 Div 중앙 정렬
            this.gfn_center(this.div_login, this, 0, -25);

            // 하단 문구 위치 설정
            var nLeft = this.div_login.getOffsetLeft();
            var nTop  = this.div_login.getOffsetTop()
                      + this.div_login.getOffsetHeight() + 20;

            this.sta_copyright.move(nLeft, nTop);
        };

        /***************************************************************************************
         * 7. 이벤트
         ***************************************************************************************/

        /*
         * 기능 : 화면 로딩 이벤트
         */
        this.SYS10000M_onload = function(obj, e)
        {
            this.fn_init(obj, e);
        };


        /*
         * 기능 : 화면 크기 변경 이벤트
         */
        this.SYS10000M_onsize = function(obj, e)
        {
            this.fn_centerLogin();
        };


        /*
         * 기능 : 로그인 버튼 클릭 이벤트
         */
        this.btn_login_onclick = function(obj, e)
        {
            this.fn_login();
        };


        /*
         * 기능 : 비밀번호 입력 후 Enter 키 이벤트
         */
        this.edt_password_onkeydown = function(obj, e)
        {
            if (e.keycode == 13)
            {
                this.fn_login();
            }
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.SYS10000M_onload,this);
            this.addEventHandler("onsize",this.SYS10000M_onsize,this);
            this.div_login.form.edt_password.addEventHandler("onkeydown",this.edt_password_onkeydown,this);
            this.div_login.form.btn_login.addEventHandler("onclick",this.btn_login_onclick,this);
        };
        this.loadIncludeScript("SYS10000M.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Login");
            this.set_titletext("BES 로그인");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsLoginResult", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "RESULT_CD","type" : "STRING","size" : "10"},{"id" : "RESULT_DESCR","type" : "STRING","size" : "4000"}]}});
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("divLogin","400","125","480","470",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#FFFFFF");
            obj.set_border("1px solid #DDE3EC");
            obj.set_borderRadius("12px");
            this.addChild(obj.name, obj);

            obj = new Static("staTitle","40","45","400","50",null,null,null,null,null,null,this.divLogin.form);
            obj.set_taborder("0");
            obj.set_text("BES");
            obj.set_font("bold 32px Arial");
            obj.set_color("#234E91");
            obj.set_textAlign("center");
            this.divLogin.addChild(obj.name, obj);

            obj = new Static("staSubTitle","40","96","400","24",null,null,null,null,null,null,this.divLogin.form);
            obj.set_taborder("1");
            obj.set_text("Business Enterprise System");
            obj.set_font("13px Arial");
            obj.set_color("#7B8794");
            obj.set_textAlign("center");
            this.divLogin.addChild(obj.name, obj);

            obj = new Static("staId","65","155","350","25",null,null,null,null,null,null,this.divLogin.form);
            obj.set_taborder("2");
            obj.set_text("아이디");
            obj.set_font("bold 13px Arial");
            obj.set_color("#344054");
            this.divLogin.addChild(obj.name, obj);

            obj = new Edit("edtUserId","65","185","350","42",null,null,null,null,null,null,this.divLogin.form);
            obj.set_taborder("3");
            obj.set_displaynulltext("아이디를 입력하세요");
            obj.set_font("14px Arial");
            obj.set_border("1px solid #CED4DA");
            obj.set_borderRadius("5px");
            this.divLogin.addChild(obj.name, obj);

            obj = new Static("staPw","65","245","350","25",null,null,null,null,null,null,this.divLogin.form);
            obj.set_taborder("4");
            obj.set_text("비밀번호");
            obj.set_font("bold 13px Arial");
            obj.set_color("#344054");
            this.divLogin.addChild(obj.name, obj);

            obj = new Edit("edtPassword","65","275","350","42",null,null,null,null,null,null,this.divLogin.form);
            obj.set_taborder("5");
            obj.set_password("true");
            obj.set_displaynulltext("비밀번호를 입력하세요");
            obj.set_font("14px Arial");
            obj.set_border("1px solid #CED4DA");
            obj.set_borderRadius("5px");
            this.divLogin.addChild(obj.name, obj);

            obj = new CheckBox("chkSaveId","65","330","150","25",null,null,null,null,null,null,this.divLogin.form);
            obj.set_taborder("6");
            obj.set_text("아이디 저장");
            obj.set_font("12px Arial");
            obj.set_color("#667085");
            this.divLogin.addChild(obj.name, obj);

            obj = new Button("btnLogin","65","380","350","48",null,null,null,null,null,null,this.divLogin.form);
            obj.set_taborder("7");
            obj.set_text("로그인");
            obj.set_font("bold 16px Arial");
            obj.set_color("#FFFFFF");
            obj.set_background("#2454A6");
            obj.set_border("0px none");
            obj.set_borderRadius("5px");
            this.divLogin.addChild(obj.name, obj);

            obj = new Static("staCopyright","400","615","480","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("© BES. All rights reserved.");
            obj.set_color("#98A2B3");
            obj.set_font("12px Arial");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this.divLogin.form
            obj = new Layout("default","",480,470,this.divLogin.form,function(p){});
            this.divLogin.form.addLayout(obj.name, obj);

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
        this.registerScript("Form_Login.xfdl", function() {
        /************************************************************************
         * Form Name : Form_Login
         * Description : BES 로그인 화면
         ************************************************************************/
        // 화면 최초 로딩
        this.Form_Login_onload = function(obj, e)
        {
            this.fn_centerLogin();
            this.divLogin.form.edtUserId.setFocus();
        };

        // 로그인 영역 중앙 정렬
        this.fn_centerLogin = function()
        {
            // 현재 Form 크기
            var nFormWidth  = this.getOffsetWidth();
            var nFormHeight = this.getOffsetHeight();

            // 로그인 박스 크기
            var nLoginWidth  = this.divLogin.getOffsetWidth();
            var nLoginHeight = this.divLogin.getOffsetHeight();

            // 저작권 문구까지 포함한 전체 영역 높이
            var nGap = 20;
            var nCopyrightHeight = this.staCopyright.getOffsetHeight();

            var nTotalHeight = nLoginHeight + nGap + nCopyrightHeight;

            // 중앙 위치 계산
            var nLeft = Math.max(0, Math.floor((nFormWidth - nLoginWidth) / 2));
            var nTop  = Math.max(0, Math.floor((nFormHeight - nTotalHeight) / 2));

            // 로그인 박스 이동
            this.divLogin.move(nLeft, nTop);

            // 저작권 문구도 함께 이동
            this.staCopyright.move(
                nLeft,
                nTop + nLoginHeight + nGap
            );
        };

        // 화면 크기 변경 시 다시 중앙 정렬
        this.Form_Login_onsize = function(obj, e)
        {
            this.fn_centerLogin();
        };

        // 로그인 버튼 클릭
        this.btnLogin_onclick = function(obj, e)
        {
            this.fn_login();
        };

        // 비밀번호 입력 후 Enter
        this.edtPassword_onkeydown = function(obj, e)
        {
            if (e.keycode == 13)
            {
                this.fn_login();
            }
        };

        // 로그인 처리
        this.fn_login = function()
        {
            var sUserId = this.divLogin.form.edtUserId.value;
            var sPassword = this.divLogin.form.edtPassword.value;

            // 아이디 필수값 확인
            if (this.gfn_isEmpty(sUserId))
            {
                this.alert("아이디를 입력해 주세요.");
                this.divLogin.form.edtUserId.setFocus();
                return;
            }

            // 비밀번호 필수값 확인
            if (this.gfn_isEmpty(sPassword))
            {
                this.alert("비밀번호를 입력해 주세요.");
                this.divLogin.form.edtPassword.setFocus();
                return;
            }

            // 로그인 요청용 Dataset
            if (!this.objects["dsLogin"])
            {
                var ds = new Dataset("dsLogin", this);
                ds.addColumn("USER_ID", "STRING", 30);
                ds.addColumn("PASSWORD", "STRING", 512);
                this.addChild("dsLogin", ds);
            }

            this.dsLogin.clearData();

            var nRow = this.dsLogin.addRow();

            this.dsLogin.setColumn(nRow, "USER_ID", sUserId);
            this.dsLogin.setColumn(nRow, "PASSWORD", sPassword);

            var sSvcId    = "login";
            var sSvcURL   = "svcUrl::com/login/login.do";
            var sInData   = "dsLogin=dsLogin";
            var sOutData = "dsLoginResult=outLogin";
            var sArgument = "";
            var sCallback = "fn_loginCallback";

            this.transaction(
                sSvcId,
                sSvcURL,
                sInData,
                sOutData,
                sArgument,
                sCallback
            );
        };

        // 로그인 결과 Callback
        this.fn_loginCallback = function(sSvcId, nErrorCode, sErrorMsg)
        {
            if (sSvcId != "login")
            {
                return;
            }

            if (nErrorCode != 0)
            {
                this.alert("로그인 요청 오류: " + sErrorMsg);
                return;
            }

            if (!this.dsLoginResult ||
                this.dsLoginResult.rowcount == 0)
            {
                this.alert("로그인 결과가 없습니다.");
                return;
            }

            var sResultCd = this.dsLoginResult.getColumn(0, "RESULT_CD");
            var sResultMsg = this.dsLoginResult.getColumn(0, "RESULT_DESCR");

            if (sResultCd == "S")
            {
                // 비밀번호 데이터 삭제
                this.dsLogin.clearData();
                this.divLogin.form.edtPassword.set_value("");

                this.alert("로그인에 성공했습니다.");

        		// 로그인 성공 후 화면 전환
        		this.fn_goMain();
            }
            else
            {
                this.divLogin.form.edtPassword.set_value("");
                this.alert(sResultMsg || "로그인에 실패했습니다.");
            }
        };


        // 공백 및 NULL 체크
        this.gfn_isEmpty = function(value)
        {
            if (value === null || value === undefined)
            {
                return true;
            }

            return String(value).trim().length === 0;
        };

        // 로그인 성공 후 업무 화면 이동
        this.fn_goMain = function()
        {
        	var objFrame = this.getOwnerFrame();

        	// 현재 Form이 들어 있는 Frame의 화면 변경
        	objFrame.set_formurl("FrameBase/Form_Work.xfdl");
        }
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Login_onload,this);
            this.addEventHandler("onsize",this.Form_Login_onsize,this);
            this.divLogin.form.edtPassword.addEventHandler("onkeydown",this.edtPassword_onkeydown,this);
            this.divLogin.form.btnLogin.addEventHandler("onclick",this.btnLogin_onclick,this);
        };
        this.loadIncludeScript("Form_Login.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

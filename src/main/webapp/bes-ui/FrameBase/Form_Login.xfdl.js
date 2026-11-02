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
            obj.set_text("Business Enterprise System");
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

            obj = new CheckBox("chk_saveId","65","330","150","25",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("6");
            obj.set_text("아이디 저장");
            obj.set_font("12px Arial");
            obj.set_color("#667085");
            this.div_login.addChild(obj.name, obj);

            obj = new Button("btn_login","65","380","350","48",null,null,null,null,null,null,this.div_login.form);
            obj.set_taborder("7");
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
        this.registerScript("Form_Login.xfdl", function() {
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
            this.fn_centerLogin();
            this.div_login.form.edt_userId.setFocus();
        };


        /***************************************************************************************
         * 3. 공통 버튼
         ***************************************************************************************/

        /*
         * 기능 : 로그인 처리
         */
        this.fn_login = function()
        {
            var sUserId = this.div_login.form.edt_userId.value;
            var sPassword = this.div_login.form.edt_password.value;

            // 아이디 필수값 확인
            if (this.fn_isEmpty(sUserId))
            {
                this.alert("아이디를 입력해 주세요.");
                this.div_login.form.edt_userId.setFocus();
                return;
            }

            // 비밀번호 필수값 확인
            if (this.fn_isEmpty(sPassword))
            {
                this.alert("비밀번호를 입력해 주세요.");
                this.div_login.form.edt_password.setFocus();
                return;
            }

            // 로그인 요청 Dataset 생성
            if (!this.objects["ds_login"])
            {
                var dsLogin = new Dataset("ds_login", this);

                dsLogin.addColumn("USER_ID", "STRING", 30);
                dsLogin.addColumn("PASSWORD", "STRING", 512);

                this.addChild("ds_login", dsLogin);
            }

            // 로그인 요청 데이터 설정
            this.ds_login.clearData();

            var nRow = this.ds_login.addRow();

            this.ds_login.setColumn(nRow, "USER_ID", sUserId);
            this.ds_login.setColumn(nRow, "PASSWORD", sPassword);

            // 로그인 Transaction 설정
            var sSvcId = "login";
            var sSvcURL = "svcUrl::sys/SYS10000M/login.do";
            var sInData = "dsLogin=ds_login";
            var sOutData = "ds_loginResult=outLogin";
            var sArgument = "";
            var sCallback = "fn_callBack";

            // 로그인 요청
            this.transaction(
                sSvcId,
                sSvcURL,
                sInData,
                sOutData,
                sArgument,
                sCallback
            );
        };


        /***************************************************************************************
         * 4. TRANSACTION, CALLBACK
         ***************************************************************************************/

        /*
         * 기능 : 로그인 Transaction 결과 처리
         */
        this.fn_callBack = function(sSvcId, nErrorCode, sErrorMsg)
        {
            if (sSvcId != "login")
            {
                return;
            }

            // 로그인 요청 데이터 삭제
            if (this.ds_login)
            {
                this.ds_login.clearData();
            }

            // 비밀번호 입력값 삭제
            this.div_login.form.edt_password.set_value("");

            // Transaction 오류 확인
            if (nErrorCode != 0)
            {
                this.alert("로그인 요청 오류: " + sErrorMsg);
                return;
            }

            // 로그인 결과 데이터 확인
            if (!this.ds_loginResult ||
                this.ds_loginResult.rowcount == 0)
            {
                this.alert("로그인 결과가 없습니다.");
                return;
            }

            var sResultCd = this.ds_loginResult.getColumn(0, "RESULT_CD");
            var sResultMsg = this.ds_loginResult.getColumn(0, "RESULT_DESCR");

            // 로그인 성공
            if (sResultCd == "S")
            {
                this.alert("로그인에 성공했습니다.");

                // 업무 화면 이동
                this.fn_goMain();
            }
            else
            {
                // 로그인 실패 메시지
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
         * 기능 : 로그인 화면 중앙 정렬
         */
        this.fn_centerLogin = function()
        {
            // Form 크기
            var nFormWidth = this.getOffsetWidth();
            var nFormHeight = this.getOffsetHeight();

            // 로그인 영역 크기
            var nLoginWidth = this.div_login.getOffsetWidth();
            var nLoginHeight = this.div_login.getOffsetHeight();

            // 저작권 문구 포함 높이
            var nGap = 20;
            var nCopyrightHeight = this.sta_copyright.getOffsetHeight();

            var nTotalHeight = nLoginHeight + nGap + nCopyrightHeight;

            // 중앙 위치 계산
            var nLeft = Math.max(
                0,
                Math.floor((nFormWidth - nLoginWidth) / 2)
            );

            var nTop = Math.max(
                0,
                Math.floor((nFormHeight - nTotalHeight) / 2)
            );

            // 로그인 영역 이동
            this.div_login.move(nLeft, nTop);

            // 저작권 문구 이동
            this.sta_copyright.move(
                nLeft,
                nTop + nLoginHeight + nGap
            );
        };

        /*
         * 기능 : 공백 및 NULL 확인
         */
        this.fn_isEmpty = function(value)
        {
            if (value === null || value === undefined)
            {
                return true;
            }

            return String(value).trim().length === 0;
        };

        /*
         * 기능 : 로그인 성공 후 업무 화면 이동
         */
        this.fn_goMain = function()
        {
            var objFrame = this.getOwnerFrame();

            // 현재 Frame의 화면 변경
            objFrame.set_formurl("FrameBase/Form_Work.xfdl");
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
        this.loadIncludeScript("Form_Login.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

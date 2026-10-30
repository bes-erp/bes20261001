(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Work");
            this.set_titletext("Form_Work");
            if (Form == this.constructor)
            {
                this._setFormPosition(1080,670);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_search", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "CODE_TYPE","type" : "STRING","size" : "256"},{"id" : "CODE_TYPE_NM","type" : "STRING","size" : "256"},{"id" : "CODE","type" : "STRING","size" : "256"},{"id" : "CODE_NM","type" : "STRING","size" : "256"}]}});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_code_type", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "CODE_TYPE","type" : "STRING","size" : "256"},{"id" : "CODE_TYPE_NM","type" : "STRING","size" : "256"},{"id" : "CODE_TYPE_NM_S","type" : "STRING","size" : "256"},{"id" : "START_DATE","type" : "STRING","size" : "256"},{"id" : "END_DATE","type" : "STRING","size" : "256"},{"id" : "CREATE_TYPE_CD","type" : "STRING","size" : "256"},{"id" : "REMARK","type" : "STRING","size" : "256"},{"id" : "CREATE_DATE","type" : "STRING","size" : "256"},{"id" : "CREATE_BY","type" : "STRING","size" : "256"},{"id" : "UPDATE_DATE","type" : "STRING","size" : "256"},{"id" : "UPDATE_BY","type" : "STRING","size" : "256"}]}});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_code", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "CODE_TYPE","type" : "STRING","size" : "256"},{"id" : "CODE","type" : "STRING","size" : "256"},{"id" : "CODE_NM","type" : "STRING","size" : "256"},{"id" : "CODE_NM_S","type" : "STRING","size" : "256"},{"id" : "START_DATE","type" : "STRING","size" : "256"},{"id" : "END_DATE","type" : "STRING","size" : "256"},{"id" : "SORT_ORDER","type" : "STRING","size" : "256"},{"id" : "ATTR_CHR1","type" : "STRING","size" : "256"},{"id" : "ATTR_CHR2","type" : "STRING","size" : "256"},{"id" : "ATTR_CHR3","type" : "STRING","size" : "256"},{"id" : "ATTR_CHR4","type" : "STRING","size" : "256"},{"id" : "ATTR_CHR5","type" : "STRING","size" : "256"},{"id" : "ATTR_NUM1","type" : "STRING","size" : "256"},{"id" : "ATTR_NUM2","type" : "STRING","size" : "256"},{"id" : "ATTR_NUM3","type" : "STRING","size" : "256"},{"id" : "ATTR_NUM4","type" : "STRING","size" : "256"},{"id" : "ATTR_NUM5","type" : "STRING","size" : "256"},{"id" : "ATTR_DATE1","type" : "STRING","size" : "256"},{"id" : "ATTR_DATE2","type" : "STRING","size" : "256"},{"id" : "ATTR_DATE3","type" : "STRING","size" : "256"},{"id" : "ATTR_DATE4","type" : "STRING","size" : "256"},{"id" : "ATTR_DATE5","type" : "STRING","size" : "256"},{"id" : "REMARK","type" : "STRING","size" : "256"},{"id" : "CREATE_DATE","type" : "STRING","size" : "256"},{"id" : "CREATE_BY","type" : "STRING","size" : "256"},{"id" : "UPDATE_DATE","type" : "STRING","size" : "256"},{"id" : "UPDATE_BY","type" : "STRING","size" : "256"}]}});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search_batch_job", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "STATE","type" : "STRING","size" : "256"},{"id" : "JOB_NAME","type" : "STRING","size" : "256"},{"id" : "JOB_ACTION","type" : "STRING","size" : "256"},{"id" : "COMMENTS","type" : "STRING","size" : "256"},{"id" : "START_DATE","type" : "STRING","size" : "256"},{"id" : "REPEAT_INTERVAL","type" : "STRING","size" : "256"},{"id" : "RUN_COUNT","type" : "STRING","size" : "256"},{"id" : "FAILURE_COUNT","type" : "STRING","size" : "256"},{"id" : "RETRY_COUNT","type" : "STRING","size" : "256"}]}});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_batch_job", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "STATE","type" : "STRING","size" : "256"},{"id" : "JOB_NAME","type" : "STRING","size" : "256"},{"id" : "JOB_ACTION","type" : "STRING","size" : "256"},{"id" : "COMMENTS","type" : "STRING","size" : "256"},{"id" : "START_DATE","type" : "STRING","size" : "256"},{"id" : "REPEAT_INTERVAL","type" : "STRING","size" : "256"},{"id" : "RUN_COUNT","type" : "STRING","size" : "256"},{"id" : "FAILURE_COUNT","type" : "STRING","size" : "256"},{"id" : "RETRY_COUNT","type" : "STRING","size" : "256"}]}});
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_cbo_repeat_cd", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "CODE","type" : "STRING","size" : "256"},{"id" : "CODE_NM","type" : "STRING","size" : "256"}]},"Rows" : [{"CODE_NM" : "분단위","CODE" : "RT100"},{"CODE" : "RT110","CODE_NM" : "시간단위"}]});
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btn_search","20","20","120","40",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("조회");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_code_type","20","75","470","215",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("ds_code_type");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"149\"/><Column size=\"149\"/><Column size=\"93\"/><Column size=\"91\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"CODE_TYPE\"/><Cell col=\"1\" text=\"CODE_TYPE_NM\"/><Cell col=\"2\" text=\"START_DATE\"/><Cell col=\"3\" text=\"END_DATE\"/><Cell col=\"4\" text=\"CREATE_TYPE_CD\"/></Band><Band id=\"body\"><Cell text=\"bind:CODE_TYPE\"/><Cell col=\"1\" text=\"bind:CODE_TYPE_NM\"/><Cell col=\"2\" text=\"bind:START_DATE\"/><Cell col=\"3\" text=\"bind:END_DATE\"/><Cell col=\"4\" text=\"bind:CREATE_TYPE_CD\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("btn_alert","930","20","120","40",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("alert test");
            this.addChild(obj.name, obj);

            obj = new Button("btn_createBatchJob","20","310","120","40",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("배치작업생성(C)");
            obj.getSetter("executeTypeCd").set("C");
            this.addChild(obj.name, obj);

            obj = new Button("btn_searchBatchJobList","150","310","120","40",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("배치작업조회");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_batchJob","20","490","1040","170",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_binddataset("ds_batch_job");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"99\"/><Column size=\"189\"/><Column size=\"301\"/><Column size=\"216\"/><Column size=\"151\"/><Column size=\"364\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"STATE\"/><Cell col=\"1\" text=\"JOB_NAME\"/><Cell col=\"2\" text=\"JOB_ACTION\"/><Cell col=\"3\" text=\"COMMENTS\"/><Cell col=\"4\" text=\"START_DATE\"/><Cell col=\"5\" text=\"REPEAT_INTERVAL\"/><Cell col=\"6\" text=\"RUN_COUNT\"/><Cell col=\"7\" text=\"FAILURE_COUNT\"/><Cell col=\"8\" text=\"RETRY_COUNT\"/></Band><Band id=\"body\"><Cell text=\"bind:STATE\"/><Cell col=\"1\" text=\"bind:JOB_NAME\"/><Cell col=\"2\" text=\"bind:JOB_ACTION\"/><Cell col=\"3\" text=\"bind:COMMENTS\"/><Cell col=\"4\" text=\"bind:START_DATE\"/><Cell col=\"5\" text=\"bind:REPEAT_INTERVAL\"/><Cell col=\"6\" text=\"bind:RUN_COUNT\"/><Cell col=\"7\" text=\"bind:FAILURE_COUNT\"/><Cell col=\"8\" text=\"bind:RETRY_COUNT\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_jobName","437","310","290","17",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_value("BGF_BSYS_LOG_HISTORY_M0002");
            obj.set_inputmode("upper");
            obj.set_text("BGF_BSYS_LOG_HISTORY_M0002");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_jobActionName","437","329","290","20",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_value("bsys_log_pkg.history_p");
            obj.set_inputmode("lower");
            obj.set_text("bsys_log_pkg.history_p");
            this.addChild(obj.name, obj);

            obj = new Calendar("cal_startDate","437","351","201","20",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_editformat("yyyy-MM-dd");
            obj.set_dateformat("yyyy-MM-dd");
            this.addChild(obj.name, obj);

            obj = new Static("stc_job_name","270","311","162","14",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("배치작업명");
            obj.set_textAlign("right");
            this.addChild(obj.name, obj);

            obj = new Static("stc_job_action_name","270","332","162","14",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("실행 프로그램 스크립트");
            obj.set_textAlign("right");
            this.addChild(obj.name, obj);

            obj = new Static("stc_start_date","270","354","162","14",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("배치작업 시작일시");
            obj.set_textAlign("right");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("msk_startTime","640","351","87","20",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_format("##:##:##");
            obj.set_type("string");
            this.addChild(obj.name, obj);

            obj = new Button("btn_stopBatchJob","20","352","120","40",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("배치작업중지(S)");
            obj.getSetter("executeTypeCd").set("S");
            this.addChild(obj.name, obj);

            obj = new Button("btn_enableBatchJob","20","394","120","40",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("스케줄 활성화(E)");
            obj.getSetter("executeTypeCd").set("E");
            this.addChild(obj.name, obj);

            obj = new Button("btn_disableBatchJob","20","436","120","40",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("스케줄 비활성화(D)");
            obj.getSetter("executeTypeCd").set("D");
            this.addChild(obj.name, obj);

            obj = new Button("btn_changeBatchJob","150","436","120","40",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("스케줄 주기변경(U)");
            obj.getSetter("executeTypeCd").set("U");
            this.addChild(obj.name, obj);

            obj = new Button("btn_dropBatchJob","150","394","120","40",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("배치작업 삭제(X)");
            obj.getSetter("executeTypeCd").set("X");
            this.addChild(obj.name, obj);

            obj = new Static("stc_repeat_cd","270","376","162","14",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_text("반복유형코드");
            obj.set_textAlign("right");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_repeat_cd","437","373","123","20",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_innerdataset("ds_cbo_repeat_cd");
            obj.set_datacolumn("CODE_NM");
            obj.set_codecolumn("CODE");
            obj.set_text("시간단위");
            obj.set_value("RT110");
            obj.set_index("1");
            this.addChild(obj.name, obj);

            obj = new Static("stc_interval","270","398","162","14",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_text("반복간격");
            obj.set_textAlign("right");
            this.addChild(obj.name, obj);

            obj = new Spin("spn_interval","437","395","123","20",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_min("1");
            obj.set_max("1000");
            obj.set_value("1");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_code","498","75","552","215",null,null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_binddataset("ds_code");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"CODE_TYPE\"/><Cell col=\"1\" text=\"CODE\"/><Cell col=\"2\" text=\"CODE_NM\"/><Cell col=\"3\" text=\"CODE_NM_S\"/><Cell col=\"4\" text=\"START_DATE\"/><Cell col=\"5\" text=\"END_DATE\"/><Cell col=\"6\" text=\"SORT_ORDER\"/><Cell col=\"7\" text=\"ATTR_CHR1\"/><Cell col=\"8\" text=\"ATTR_NUM1\"/><Cell col=\"9\" text=\"ATTR_DATE1\"/><Cell col=\"10\" text=\"CREATE_DATE\"/></Band><Band id=\"body\"><Cell text=\"bind:CODE_TYPE\"/><Cell col=\"1\" text=\"bind:CODE\"/><Cell col=\"2\" text=\"bind:CODE_NM\"/><Cell col=\"3\" text=\"bind:CODE_NM_S\"/><Cell col=\"4\" text=\"bind:START_DATE\"/><Cell col=\"5\" text=\"bind:END_DATE\"/><Cell col=\"6\" text=\"bind:SORT_ORDER\"/><Cell col=\"7\" text=\"bind:ATTR_CHR1\"/><Cell col=\"8\" text=\"bind:ATTR_NUM1\"/><Cell col=\"9\" text=\"bind:ATTR_DATE1\"/><Cell col=\"10\" text=\"bind:CREATE_DATE\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_code_type","257","30","160","20",null,null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_inputmode("upper");
            this.addChild(obj.name, obj);

            obj = new Static("stc_code_type","160","33","92","14",null,null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_text("코드유형");
            obj.set_textAlign("right");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1080,670,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","edt_code_type","value","ds_search","code_type");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Work.xfdl", function() {
        //화면 오픈시
        this.Form_Work_onload = function(obj,e)
        {
        	    //공통함수 등록 여부 확인
            trace("## gfn_getDate : " + typeof this.gfn_getDate);
            trace("## gfn_isNull  : " + typeof this.gfn_isNull);

        	//데이터셋 초기화
        	this.ds_search.clearData();
        	this.ds_search.addRow();

            //화면 초기값 초기화
        	this.cal_startDate.set_value(this.gfn_getDate("yyyymmdd"));
        	this.msk_startTime.set_value("000000");

        	//콤보박스 값 초기화
        	//this.gfn_code(this, "cbo_repeat_cd", "ds_cbo_repeat_cd", "REPEAT_TYPE_CD", "A");		//반복유형코드
        };

        //코드유형 조회
        this.btn_search_onclick = function(obj,e)
        {
        	var sUserId = "1234";

        	var sSvcID 			= "selectCodeList";                             					//서비스ID
        	var sSvcURL			= "http://localhost:8011/bes/com/COM10000M/selectCodeList.do";						//서비스URL
        	var sInDatasets 	= "inSearch=ds_search";												//인풋데이터셋   : 이클립스=넥사크로
        	var sOutDatasets 	= "ds_code_type=outSelectCodeTypeList ds_code=outSelectCodeList";	//아웃풋데이터셋 : 넥사크로=이클립스
        	var sArgument 		= "userId=" + sUserId; //pp.userId;									//매개변수
        	var sCallbackFunc 	= "fn_callback";													//콜백함수

        	trace(this.ds_search.saveXML());
        	// 공통코드 조회
        	this.gfn_transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc);
        };

        //배치작업 목록 조회
        this.btn_searchBatchJobList_onclick = function(obj,e)
        {
        	var sUserId = "1234";
        	var sState	= ""; //SCHEDULED, DISABLED
        	var sJobName = "BGF_";

        	this.ds_search_batch_job.clearData();
        	var nRow = this.ds_search_batch_job.addRow();
        	this.ds_search_batch_job.setColumn(nRow, "state"	, sState);
        	this.ds_search_batch_job.setColumn(nRow, "job_name"	, sJobName);

        	var sSvcID 			= "selectBatchJobList";                             //서비스ID
        	var sSvcURL			= "svcUrl::sys/SYS10000M/selectBatchJobList.do";	//서비스URL
        	var sInDatasets 	= "inSearch=ds_search_batch_job";					//인풋데이터셋   : 이클립스=넥사크로
        	var sOutDatasets 	= "ds_batch_job=outSelectBatchJobList";				//아웃풋데이터셋 : 넥사크로=이클립스
        	var sArgument 		= "userId=" + sUserId; 								//매개변수
        	var sCallbackFunc 	= "fn_callback";									//콜백함수

        	//공통코드 조회
        	this.gfn_transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc);

        };

        //배치작업
        this.btn_createBatchJob_onclick = function(obj,e)
        {
        	var sUserId        = "1234";
        	var sJobActionName = "";
        	var sStartDateTime = "";
        	var sExceuteTypeCd = "";

        	var sRepeatInterval = 'FREQ=MINUTELY;INTERVAL=2';
        	var sActiveYn       = "Y";
        	var sAutoDropYn 	= "N";
        	var sDescription 	= '[시스템관리] 로그정보 백업';
        	var sforceYn 		= "N";  //Y(강제중지), N(일반중지)

        	if (this.gfn_isNull(this.edt_jobName.value)) {
        		this.edt_jobName.setFocus();
        		alert("배치작업명은 필수 항목입니다.\n[예시] BGF_BSYS_LOG_HISTORY_BACKUP");
        		return;
        	}

        	//배치작업 C(생성),
        	sExceuteTypeCd = obj.executeTypeCd;

        	if (sExceuteTypeCd == "C") {

        		if (this.gfn_isNull(this.edt_jobActionName.value)) {
        			this.edt_jobActionName.setFocus();
        			alert("배치 프로그램 스크립트는 필수 항목입니다.\n[예시] begin bsys_log_pkg.histroy_p(p_history_date => '20261020020000')); end;");
        			return;
        		}

        		if (this.gfn_isNull(this.cal_startDate.value) && this.gfn_isNull(this.msk_startTime.value)) {
        			this.cal_startDate.setFocus();
        			alert("배치작업 시작일자는 필수 항목입니다.\n[예시] 20261020020000");
        			return;
        		}

        		if (this.gfn_isNull(sRepeatInterval)) {
        			alert("배치작업 반복주기는 필수 항목입니다.\n[예시] FREQ=MINUTELY;INTERVAL=2");
        			return;
        		}

        		if (this.gfn_isNull(sDescription)) {
        			alert("배치작업 설명은 필수 항목입니다.\n[예시] [시스템관리] 로그정보 백업");
        			return;
        		}

        		//값 할당
        		sStartDateTime = this.cal_startDate.value + this.msk_startTime.value;
        		sJobActionName = "begin "
        						   + this.edt_jobActionName.value
        						   + "( "
        						   + " p_history_date => '" + sStartDateTime + "'"
        						   + "); "
        						   + "end; ";
        	}

        	this.ds_batch_job.clearData();
        	var nRow = this.ds_batch_job.addRow();
        	this.ds_batch_job.setColumn(nRow, "p_job_name"       	, this.edt_jobName.value);
        	this.ds_batch_job.setColumn(nRow, "p_job_action_name"	, sJobActionName);
        	this.ds_batch_Job.setColumn(nRow, "p_repeat_interval"	, sRepeatInterval);
        	this.ds_batch_Job.setColumn(nRow, "p_start_date"		, sStartDateTime);
        	this.ds_batch_Job.setColumn(nRow, "p_active_yn"			, sActiveYn);
        	this.ds_batch_Job.setColumn(nRow, "p_auto_drop_yn"		, sAutoDropYn);
        	this.ds_batch_Job.setColumn(nRow, "p_description"		, sDescription);
        	this.ds_batch_Job.setColumn(nRow, "p_force"				, sforceYn);
        	this.ds_batch_Job.setColumn(nRow, "o_result_cd"			, null);
        	this.ds_batch_Job.setColumn(nRow, "o_result_descr"		, null);

        	var sSvcID 			= "executeBatchJob";                      					//서비스ID
        	var sSvcURL			= "svcUrl::sys/SYS10000M/executeBatchJob.do";				//서비스URL
        	var sInDatasets 	= "inParam=ds_batch_Job";									//인풋데이터셋   : 이클립스=넥사크로
        	var sOutDatasets 	= "ds_batch_Job=outExecuteResult";							//아웃풋데이터셋 : 넥사크로=이클립스
        	var sArgument 		= "userId="        + nexacro.wrapQuote(sUserId);			//매개변수 		 : 사용자ID
        	    sArgument      += "executeTypeCd=" + nexacro.wrapQuote(sExceuteTypeCd);		//매개변수 		 : 배치유형코드
        	var sCallbackFunc 	= "fn_callback";											//콜백함수

        	// 공통코드 조회
        	this.gfn_transaction(sSvcID, sSvcURL, sInDatasets, sOutDatasets, sArgument, sCallbackFunc);
        };

        //콜백
        this.fn_callback = function(sSvcID, nErrCd, sErrMsg)
        {
        	if(nErrCd < 0) {
        		alert(sErrMsg);
        		return;
        	}

        	switch(sSvcID) {

        		//코드유형 조회
        		case "selectCodeList":

        			//trace("###########################################################");
        			//trace(this.ds_code_type.saveXML());
        			//trace("###########################################################");

        			var nCnt = this.ds_code_type.rowcount;
        			if (nCnt == 0) {
        				alert("조회조건에 일치하는 데이터가 존재하지 않습니다.");
        				//this.gfn_msgBox('MSG-A-10030'); //조회조건에 일치하는 데이터가 존재하지 않습니다.
        			}
        			break;

        		//배치작업 목록 조회
        		case "selectBatchJobList":
        			var nCnt = this.ds_batch_job.rowcount;
        			if (nCnt == 0) {
        				alert("조회조건에 일치하는 데이터가 존재하지 않습니다.");
        				//this.gfn_msgBox('MSG-A-10030'); //조회조건에 일치하는 데이터가 존재하지 않습니다.
        			}
        			break;

        		//배치작업
        		case "executeBatchJob":

                    // 서버응답 Dataset 확인
                    var dsResult = this.ds_batch_Job;

                    if (!dsResult || dsResult.getRowCount() < 1) {
                        this.alert("배치작업 생성 요청은 응답되었으나 처리 결과 데이터가 없습니다.");
                        return;
                    }

                    // 서버에서 반환한 업무 처리 결과
                    var sResultCd    = dsResult.getColumn(0, "o_result_cd");
                    var sResultDescr = dsResult.getColumn(0, "o_result_descr");

                    // 3. 업무 처리 결과 확인
                    this.alert(sResultDescr);
                    break;

        	}
        };

        this.btn_alert_onclick = function(obj,e)
        {
        	alert("sssssss => " + this.gfn_getDate('yyyy-mm-dd'));
        };

        //콤보박스 아이템 변경
        this.cbo_repeat_cd_onitemchanged = function(obj,e)
        {
        	if (obj.value == "RT100" || obj.value == "RT110") {
        	    this.spn_interval.set_value(1);
        		this.spn_interval.set_readonly(false);
        	} else {
        		this.spn_interval.set_value(null);
        		this.spn_interval.set_readonly(true);
        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Work_onload,this);
            this.btn_search.addEventHandler("onclick",this.btn_search_onclick,this);
            this.btn_alert.addEventHandler("onclick",this.btn_alert_onclick,this);
            this.btn_createBatchJob.addEventHandler("onclick",this.btn_createBatchJob_onclick,this);
            this.btn_searchBatchJobList.addEventHandler("onclick",this.btn_searchBatchJobList_onclick,this);
            this.btn_stopBatchJob.addEventHandler("onclick",this.btn_createBatchJob_onclick,this);
            this.btn_enableBatchJob.addEventHandler("onclick",this.btn_createBatchJob_onclick,this);
            this.btn_disableBatchJob.addEventHandler("onclick",this.btn_createBatchJob_onclick,this);
            this.btn_changeBatchJob.addEventHandler("onclick",this.btn_createBatchJob_onclick,this);
            this.btn_dropBatchJob.addEventHandler("onclick",this.btn_createBatchJob_onclick,this);
            this.cbo_repeat_cd.addEventHandler("onitemchanged",this.cbo_repeat_cd_onitemchanged,this);
        };
        this.loadIncludeScript("Form_Work.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

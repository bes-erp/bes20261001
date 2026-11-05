(function()
{
    return function()
    {
        this.on_loadAppVariables = function()
        {		
            var obj = null;
            
			// global dataobject
		
            // global dataset
            obj = new Dataset("gdsMenu", this);
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "MENU_ID","type" : "STRING","size" : "256"},{"id" : "PARENT_ID","type" : "STRING","size" : "256"},{"id" : "MENU_NAME","type" : "STRING","size" : "256"},{"id" : "FORM_URL","type" : "STRING","size" : "256"},{"id" : "MENU_LEVEL","type" : "INT","size" : "4"}]},"Rows" : [{"MENU_ID" : "SYS","PARENT_ID" : "","MENU_NAME" : "시스템관리","FORM_URL" : "","MENU_LEVEL" : "0"},{"MENU_ID" : "SYS11000M","PARENT_ID" : "SYS","MENU_NAME" : "로그정보","FORM_URL" : "","MENU_LEVEL" : "1"},{"MENU_ID" : "SYS12000M","PARENT_ID" : "SYS","MENU_NAME" : "배치관리","FORM_URL" : "","MENU_LEVEL" : "1"},{"MENU_ID" : "COM","PARENT_ID" : "","MENU_NAME" : "공통관리","FORM_URL" : "","MENU_LEVEL" : "0"},{"MENU_ID" : "COM10000M","PARENT_ID" : "COM","MENU_NAME" : "코드등록","FORM_URL" : "Com::COM10000M.xfdl","MENU_LEVEL" : "1"},{"MENU_ID" : "COM11000M","PARENT_ID" : "COM","MENU_NAME" : "사용자등록","FORM_URL" : "Com::COM11000M.xfdl","MENU_LEVEL" : "1"},{"MENU_ID" : "COM11010M","PARENT_ID" : "COM","MENU_NAME" : "권한등록","FORM_URL" : "","MENU_LEVEL" : "1"},{"MENU_ID" : "COM11020M","PARENT_ID" : "COM","MENU_NAME" : "메뉴등록","FORM_URL" : "Com::COM11020M.xfdl","MENU_LEVEL" : "1"},{"MENU_ID" : "COM12000M","PARENT_ID" : "COM","MENU_NAME" : "메시지등록","FORM_URL" : "Com::COM12000M.xfdl","MENU_LEVEL" : "1"}]});
            this._addDataset(obj.name, obj);
            
            // global variable
            this._addVariable("gvUserId","");
            
            obj = null;
        };
        
        // property, event, createMainFrame
        this.on_initApplication = function()
        {
            // properties
            this.set_id("Application_Desktop");
            this.set_screenid("Desktop_screen");

            if (this._is_attach_childframe)
            	return;
            
            // frame
            var mainframe = this.createMainFrame("mainframe","0","0","1280","720",null,null,this);
            mainframe.set_showtitlebar("true");
            mainframe.set_showstatusbar("true");
            mainframe.set_titletext("Built1 Enterprise System");
            mainframe.on_createBodyFrame = this.mainframe_createBodyFrame;
            // tray

        };
        
        this.loadPreloadList = function()
        {

        };
        
        this.mainframe_createBodyFrame = function()
        {
            var obj = new ChildFrame("QuickViewFrame", null, null, null, null, null, null, "", this);
            
            obj.set_showtitlebar("false");
            obj.set_showstatusbar("false");
            obj.set_border("0px none");
			
            this.addChild(obj.name, obj);
            obj.set_formurl(nexacro._quickview_formurl);
            this.frame = obj;
            
            obj = null;
        };
        
        this.on_initEvent = function()
        {
        };
		// script Compiler

		this.checkLicense("");
        
        this.loadPreloadList();

        this.loadIncludeScript("Application_Desktop.xadl");
    };
}
)();

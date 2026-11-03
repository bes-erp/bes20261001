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
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "MENU_ID","type" : "STRING","size" : "256"},{"id" : "PARENT_ID","type" : "STRING","size" : "256"},{"id" : "MENU_NAME","type" : "STRING","size" : "256"},{"id" : "FORM_URL","type" : "STRING","size" : "256"},{"id" : "MENU_LEVEL","type" : "INT","size" : "4"}]},"Rows" : [{"MENU_ID" : "SYS","PARENT_ID" : "","MENU_NAME" : "시스템관리","FORM_URL" : "","MENU_LEVEL" : "0"},{"MENU_ID" : "SYS11000M","PARENT_ID" : "SYS","MENU_NAME" : "로그정보","FORM_URL" : "","MENU_LEVEL" : "1"},{"MENU_ID" : "SYS12000M","PARENT_ID" : "SYS","MENU_NAME" : "배치관리","FORM_URL" : "","MENU_LEVEL" : "1"},{"MENU_ID" : "COM","PARENT_ID" : "","MENU_NAME" : "공통관리","FORM_URL" : "","MENU_LEVEL" : "0"},{"MENU_ID" : "COM10000M","PARENT_ID" : "COM","MENU_NAME" : "코드등록","FORM_URL" : "Com::COM10000M.xfdl","MENU_LEVEL" : "1"},{"MENU_ID" : "COM11000M","PARENT_ID" : "COM","MENU_NAME" : "사용자등록","FORM_URL" : "Com::COM11000M.xfdl","MENU_LEVEL" : "1"},{"MENU_ID" : "COM11010M","PARENT_ID" : "COM","MENU_NAME" : "권한등록","FORM_URL" : "","MENU_LEVEL" : "1"},{"MENU_ID" : "COM11020M","PARENT_ID" : "COM","MENU_NAME" : "메뉴등록","FORM_URL" : "Com::COM11020M.xfdl","MENU_LEVEL" : "1"},{"MENU_ID" : "COM12000M","PARENT_ID" : "COM","MENU_NAME" : "메시지등록","FORM_URL" : "","MENU_LEVEL" : "1"}]});
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
            var frame0 = new VFrameSet("VFrameSetMain",null,null,null,null,null,null,this);
            frame0.set_separatesize("*,0");
            this.addChild(frame0.name, frame0);
            this.frame=frame0;

            var frame1 = new ChildFrame("LoginFrame",null,null,null,null,null,null,"Sys::SYS10000M.xfdl",frame0);
            frame1.set_showtitlebar("false");
            frame1.set_showstatusbar("false");
            frame1.set_dragmovetype("none");
            frame0.addChild(frame1.name, frame1);
            frame1.set_formurl("Sys::SYS10000M.xfdl");


            var frame2 = new HFrameSet("HFrameSet00",null,null,null,null,null,null,frame0);
            frame2.set_separatesize("200,*");
            frame0.addChild(frame2.name, frame2);

            var frame3 = new ChildFrame("LeftFrame",null,null,null,null,null,null,"FrameBase::Form_Left.xfdl",frame2);
            frame3.set_showtitlebar("false");
            frame3.set_showstatusbar("false");
            frame3.set_dragmovetype("none");
            frame2.addChild(frame3.name, frame3);
            frame3.set_formurl("FrameBase::Form_Left.xfdl");


            var frame4 = new VFrameSet("VFrameSet00",null,null,null,null,null,null,frame2);
            frame4.set_separatesize("50,*");
            frame2.addChild(frame4.name, frame4);

            var frame5 = new ChildFrame("TopFrame",null,null,null,null,null,null,"FrameBase::Form_Top.xfdl",frame4);
            frame5.set_showtitlebar("false");
            frame5.set_showstatusbar("false");
            frame5.set_dragmovetype("none");
            frame4.addChild(frame5.name, frame5);
            frame5.set_formurl("FrameBase::Form_Top.xfdl");


            var frame6 = new ChildFrame("WorkFrame",null,null,null,null,null,null,"FrameBase::Form_Work.xfdl",frame4);
            frame6.set_showtitlebar("false");
            frame6.set_showstatusbar("false");
            frame6.set_dragmovetype("none");
            frame4.addChild(frame6.name, frame6);
            frame6.set_formurl("FrameBase::Form_Work.xfdl");
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

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
            obj._setContents({"ColumnInfo" : {"Column" : [ {"id" : "MENU_ID","type" : "STRING","size" : "256"},{"id" : "PARENT_MENU_CD","type" : "STRING","size" : "256"},{"id" : "CHILD_MENU_CD","type" : "STRING","size" : "256"},{"id" : "CHILD_MENU_NM","type" : "STRING","size" : "256"},{"id" : "CHILD_PAGE_ULR","type" : "STRING","size" : "256"},{"id" : "CHILD_MENU_LEVEL","type" : "INT","size" : "256"},{"id" : "CHILD_MENU_SEQ","type" : "INT","size" : "256"},{"id" : "USER_YN","type" : "STRING","size" : "256"},{"id" : "BTN_SEARCH_YN","type" : "STRING","size" : "256"},{"id" : "BTN_SEARCH_INIT_YN","type" : "STRING","size" : "256"},{"id" : "BTN_SAVE_YN","type" : "STRING","size" : "256"},{"id" : "BTN_ADD_ROW_YN","type" : "STRING","size" : "256"},{"id" : "BTN_DEL_ROW_YN","type" : "STRING","size" : "256"},{"id" : "BTN_EXCEL_DOWN_YN","type" : "STRING","size" : "256"},{"id" : "BTN_EXCEL_UP_YN","type" : "STRING","size" : "256"},{"id" : "BTN_PRINT_YN","type" : "STRING","size" : "256"},{"id" : "BTN_BATCH_YN","type" : "STRING","size" : "256"},{"id" : "REMARK","type" : "STRING","size" : "256"},{"id" : "CREATE_DATE","type" : "STRING","size" : "256"},{"id" : "CREATE_BY","type" : "STRING","size" : "256"},{"id" : "UPDATE_DATE","type" : "STRING","size" : "256"},{"id" : "UPDATE_BY","type" : "STRING","size" : "256"}]}});
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
            frame0.set_border("0px none");
            this.addChild(frame0.name, frame0);
            this.frame=frame0;

            var frame1 = new ChildFrame("LoginFrame",null,null,null,null,null,null,"sys::SYS10000M.xfdl",frame0);
            frame1.set_showtitlebar("false");
            frame1.set_showstatusbar("false");
            frame1.set_dragmovetype("none");
            frame0.addChild(frame1.name, frame1);
            frame1.set_formurl("sys::SYS10000M.xfdl");


            var frame2 = new VFrameSet("VFrameSet00",null,null,null,null,null,null,frame0);
            frame2.set_separatesize("50,42,30,*");
            frame2.set_border("0px none");
            frame0.addChild(frame2.name, frame2);

            var frame3 = new ChildFrame("TopFrame",null,null,null,null,null,null,"FrameBase::Form_Top.xfdl",frame2);
            frame3.set_showtitlebar("false");
            frame3.set_showstatusbar("false");
            frame3.set_border("0px none");
            frame3.set_dragmovetype("none");
            frame2.addChild(frame3.name, frame3);
            frame3.set_formurl("FrameBase::Form_Top.xfdl");


            var frame4 = new ChildFrame("MenuFrame",null,null,null,null,null,null,"FrameBase::Form_Menu.xfdl",frame2);
            frame4.set_showtitlebar("false");
            frame4.set_showstatusbar("false");
            frame4.set_border("0px none");
            frame4.set_dragmovetype("none");
            frame2.addChild(frame4.name, frame4);
            frame4.set_formurl("FrameBase::Form_Menu.xfdl");


            var frame5 = new ChildFrame("MdiFrame",null,null,null,null,null,null,"FrameBase::Form_Mdi.xfdl",frame2);
            frame5.set_showtitlebar("false");
            frame5.set_showstatusbar("false");
            frame5.set_border("0px none");
            frame5.set_dragmovetype("none");
            frame2.addChild(frame5.name, frame5);
            frame5.set_formurl("FrameBase::Form_Mdi.xfdl");


            var frame6 = new HFrameSet("HFrameSet00",null,null,null,null,null,null,frame2);
            frame6.set_separatesize("200,*");
            frame6.set_border("0px none");
            frame2.addChild(frame6.name, frame6);

            var frame7 = new ChildFrame("LeftFrame",null,null,null,null,null,null,"FrameBase::Form_Left.xfdl",frame6);
            frame7.set_showtitlebar("false");
            frame7.set_showstatusbar("false");
            frame7.set_border("0px none");
            frame7.set_dragmovetype("none");
            frame6.addChild(frame7.name, frame7);
            frame7.set_formurl("FrameBase::Form_Left.xfdl");


            var frame8 = new ChildFrame("WorkFrame",null,null,null,null,null,null,"FrameBase::Form_TabWork.xfdl",frame6);
            frame8.set_showtitlebar("false");
            frame8.set_showstatusbar("false");
            frame8.set_border("0px none");
            frame8.set_dragmovetype("none");
            frame6.addChild(frame8.name, frame8);
            frame8.set_formurl("FrameBase::Form_TabWork.xfdl");
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

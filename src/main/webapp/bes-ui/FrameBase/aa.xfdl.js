(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Work");
            this.set_titletext("Detail");
            this.getSetter("classname").set("Work");
            this.getSetter("inheritanceid").set("");
            this.getSetter("position").set("absolute");
            if (Form == this.constructor)
            {
                this._setFormPosition(1420,850);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static08","30","58",null,"50","30",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_cssclass("sta_WFSA_BG");
            this.addChild(obj.name, obj);

            obj = new Button("btn_WF_crud",null,"121","70","34","30",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("Save");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("button_WF_blue");
            this.addChild(obj.name, obj);

            obj = new Button("btn_WF_crud00",null,"121","70","34","105",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("Delete");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("button_WF_gray");
            this.addChild(obj.name, obj);

            obj = new Button("btn_WF_crud01",null,"121","70","34","180",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("Add");
            obj.getSetter("position").set("absolute");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WF_SearchBox","30","71",null,"40","-30",null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WF_SearchBox");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFSA_LabelP","45","65","60","34",null,null,null,null,null,null,this);
            obj.set_text("Project :");
            obj.getSetter("position").set("absolute");
            obj.getSetter("wordwrap").set("none");
            this.addChild(obj.name, obj);

            obj = new Button("btn_WF_search","488","66","70","34",null,null,null,null,null,null,this);
            obj.set_taborder("42");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("button_WF_white");
            obj.set_text("Search");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","103","66","90","34",null,null,null,null,null,null,this);
            obj.set_taborder("44");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("input_point");
            obj.set_background("#ffffff");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit01","198","66","270","34",null,null,null,null,null,null,this);
            obj.set_taborder("45");
            obj.getSetter("position").set("absolute");
            obj.set_background("#ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label12","30","398","260","34",null,null,null,null,null,null,this);
            obj.set_text("Period of Subcontracting Construction");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label13","289","398","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label14","588","398","260","34",null,null,null,null,null,null,this);
            obj.set_text("Tax/Tax-free");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label15","847","398",null,"34","30",null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label16","30","431","260","34",null,null,null,null,null,null,this);
            obj.set_text("Construction execution");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label21","289","431","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label22","588","431","260","34",null,null,null,null,null,null,this);
            obj.set_text("Contruction date");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label23","847","431",null,"34","30",null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label24","30","464","260","34",null,null,null,null,null,null,this);
            obj.set_text("Contruction method");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label25","289","464","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label26","588","464","260","34",null,null,null,null,null,null,this);
            obj.set_text("Contruction director");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label27","847","464",null,"34","30",null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label28","30","497","260","34",null,null,null,null,null,null,this);
            obj.set_text("Contruction place");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label35","289","497","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label36","588","497","260","34",null,null,null,null,null,null,this);
            obj.set_text("Bid director");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label37","847","497",null,"34","30",null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label38","30","530","260",null,null,"30",null,null,null,null,this);
            obj.set_text("Construction outline");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label39","289","530","300",null,null,"30",null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label40","588","530","260",null,null,"30",null,null,null,null,this);
            obj.set_text("Remarks");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label41","847","530",null,null,"30","30",null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","299","401","130","28",null,null,null,null,null,null,this);
            obj.set_taborder("51");
            obj.getSetter("position").set("absolute");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_value("20110615");
            obj.set_cssclass("input_point");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","449","401","130","28",null,null,null,null,null,null,this);
            obj.set_taborder("52");
            obj.set_value("20110615");
            obj.set_text("2011-06-15");
            obj.set_dateformat("yyyy-MM-dd");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("input_point");
            this.addChild(obj.name, obj);

            obj = new Radio("Radio00","299","438","209","20",null,null,null,null,null,null,this);
            obj.set_taborder("53");
            obj.getSetter("position").set("absolute");
            obj.set_innerdataset("ds_radio_00");
            obj.set_codecolumn("Column0");
            obj.set_datacolumn("Column1");
            obj.set_columncount("2");
            this.addChild(obj.name, obj);

            obj = new Radio("Radio01","299","471","209","20",null,null,null,null,null,null,this);
            obj.set_taborder("54");
            obj.set_columncount("2");
            obj.set_innerdataset("ds_radio_01");
            obj.set_codecolumn("Column0");
            obj.set_datacolumn("Column1");
            obj.getSetter("position").set("absolute");
            obj.set_value("1");
            obj.set_index("1");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit02","299","500","280","28",null,null,null,null,null,null,this);
            obj.set_taborder("55");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("input_point");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit05","857","401",null,"28","40",null,null,null,null,null,this);
            obj.set_taborder("56");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("input_point");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar02","857","434","130","28",null,null,null,null,null,null,this);
            obj.set_taborder("57");
            obj.set_value("20110615");
            obj.set_text("2011-06-15");
            obj.set_dateformat("yyyy-MM-dd");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("input_point");
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00","997","434","60","28",null,null,null,null,null,null,this);
            obj.set_taborder("58");
            obj.getSetter("position").set("absolute");
            obj.set_text("24");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit06","857","467",null,"28","40",null,null,null,null,null,this);
            obj.set_taborder("60");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("input_point");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit07","857","500",null,"28","40",null,null,null,null,null,this);
            obj.set_taborder("61");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("input_point");
            this.addChild(obj.name, obj);

            obj = new Button("btn_WFSA_Search00",null,"468","26","26","42",null,null,null,null,null,this);
            obj.set_taborder("62");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("btn_WFDA_Search");
            this.addChild(obj.name, obj);

            obj = new Button("btn_WFSA_Search01",null,"501","26","26","42",null,null,null,null,null,this);
            obj.set_taborder("63");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("btn_WFDA_Search");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","299","533","280",null,null,"33",null,null,null,null,this);
            obj.set_taborder("64");
            obj.getSetter("position").set("absolute");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea01","857","533",null,null,"40","33",null,null,null,null,this);
            obj.set_taborder("65");
            obj.getSetter("position").set("absolute");
            this.addChild(obj.name, obj);

            obj = new Static("Static04","1062","434","58","28",null,null,null,null,null,null,this);
            obj.set_text("O\'clock ");
            obj.getSetter("position").set("absolute");
            this.addChild(obj.name, obj);

            obj = new Static("Static06","334","404","1","20",null,null,null,null,null,null,this);
            obj.set_text("~");
            obj.getSetter("position").set("absolute");
            this.addChild(obj.name, obj);

            obj = new Static("st_progress","30","18","800","30",null,null,null,null,null,null,this);
            obj.set_taborder("80");
            obj.set_text("location");
            obj.set_cssclass("sta_WF_progress");
            this.addChild(obj.name, obj);

            obj = new Button("btn_WFSA_Search02","160","68","30","30",null,null,null,null,null,null,this);
            obj.set_taborder("43");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("btn_WFDA_Search");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WF_TitleLev1","30","118","300","40",null,null,null,null,null,null,this);
            obj.set_text("Basic Information");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WF_subtitP");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label17","30","165","240","34",null,null,null,null,null,null,this);
            obj.set_text("Processing Status");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label18","269","165","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label19","568","165","240","34",null,null,null,null,null,null,this);
            obj.set_text("Returning Reason");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label20","807","165",null,"34","30",null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label29","30","198","240","34",null,null,null,null,null,null,this);
            obj.set_text("Project ");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label30","269","198","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label31","568","198","240","34",null,null,null,null,null,null,this);
            obj.set_text("Order Number");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label32","807","198","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label33","1105","198","240","34",null,null,null,null,null,null,this);
            obj.set_text("Construction Type");
            obj.getSetter("wordwrap").set("none");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label34","1344","198",null,"34","30",null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit03","279","168","280","28",null,null,null,null,null,null,this);
            obj.set_taborder("49");
            obj.getSetter("position").set("absolute");
            obj.set_value("Writing");
            obj.set_readonly("true");
            obj.set_cssclass("readonly");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit04","817","168",null,"28","40",null,null,null,null,null,this);
            obj.set_taborder("50");
            obj.getSetter("position").set("absolute");
            obj.set_readonly("true");
            obj.set_value("Review");
            obj.set_cssclass("readonly");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label00","30","231","240","34",null,null,null,null,null,null,this);
            obj.set_text("Subcontracting Construction Name");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label01","269","231","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label02","568","231","240","34",null,null,null,null,null,null,this);
            obj.set_text("Contract Amount");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label03","807","231","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label04","1105","231","240","34",null,null,null,null,null,null,this);
            obj.set_text("Percentage of Contract");
            obj.getSetter("wordwrap").set("none");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label05","1344","231",null,"34","30",null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label06","30","264","240","34",null,null,null,null,null,null,this);
            obj.set_text("Executive Amount ");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label07","269","264","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label08","568","264","240","34",null,null,null,null,null,null,this);
            obj.set_text("Percentage of Order");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label09","807","264","300","34",null,null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label10","1105","264","240","34",null,null,null,null,null,null,this);
            obj.set_text("Order Type");
            obj.getSetter("wordwrap").set("none");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WFDA_labelB");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WFDA_Label11","1344","264",null,"34","30",null,null,null,null,null,this);
            obj.getSetter("position").set("absolute");
            obj.set_text("");
            obj.set_cssclass("sta_WFDA_B");
            this.addChild(obj.name, obj);

            obj = new Static("sta_WF_TitleLev00","30","348","400","40",null,null,null,null,null,null,this);
            obj.set_text("Detailed Information");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("sta_WF_subtitP");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit08","279","201","280","28",null,null,null,null,null,null,this);
            obj.set_taborder("66");
            obj.getSetter("position").set("absolute");
            obj.set_readonly("true");
            obj.set_value("Project");
            obj.set_cssclass("readonly");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit09","279","234","280","28",null,null,null,null,null,null,this);
            obj.set_taborder("67");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("input_point");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit01","817","234","260","28",null,null,null,null,null,null,this);
            obj.set_taborder("70");
            obj.getSetter("position").set("absolute");
            obj.set_readonly("true");
            obj.set_value("1234567890");
            obj.getSetter("mask").set(",");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit02","817","267","260","28",null,null,null,null,null,null,this);
            obj.set_taborder("71");
            obj.getSetter("position").set("absolute");
            obj.set_readonly("true");
            obj.set_value("59.8");
            obj.set_cssclass("readonly");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit11","1354","201",null,"28","40",null,null,null,null,null,this);
            obj.set_taborder("72");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("input_point");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit03","279","267","260","28",null,null,null,null,null,null,this);
            obj.set_taborder("75");
            obj.set_value("1234567890");
            obj.set_text("1,234,567,890");
            obj.set_readonly("true");
            obj.getSetter("mask").set(",");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("readonly");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","1084","236","15","25",null,null,null,null,null,null,this);
            obj.set_text("\\");
            obj.getSetter("position").set("absolute");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","1084","269","15","25",null,null,null,null,null,null,this);
            obj.set_text("%");
            obj.getSetter("position").set("absolute");
            this.addChild(obj.name, obj);

            obj = new Static("Static02","545","269","15","25",null,null,null,null,null,null,this);
            obj.set_text("\\");
            obj.getSetter("position").set("absolute");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit04","1354","234",null,"28","58",null,null,null,null,null,this);
            obj.set_taborder("76");
            obj.set_value("59.8");
            obj.set_text("59.8");
            obj.set_readonly("true");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("readonly");
            this.addChild(obj.name, obj);

            obj = new Static("Static03",null,"236","15","25","38",null,null,null,null,null,this);
            obj.set_text("%");
            obj.getSetter("position").set("absolute");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit10","817","201","280","28",null,null,null,null,null,null,this);
            obj.set_taborder("77");
            obj.set_value("2011-05-01-25");
            obj.set_readonly("true");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("readonly");
            obj.set_text("테마프로젝트");
            this.addChild(obj.name, obj);

            obj = new Combo("Combo02","1354","267",null,"28","40",null,null,null,null,null,this);
            obj.set_taborder("78");
            obj.getSetter("position").set("absolute");
            obj.set_readonly("true");
            obj.set_displaynulltext("Head Office");
            obj.set_cssclass("readonly");
            obj.set_value("");
            obj.set_index("-1");
            this.addChild(obj.name, obj);

            obj = new Static("Static10","433","401","11","28",null,null,null,null,null,null,this);
            obj.set_taborder("87");
            obj.set_text("~");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",this._adjust_width,this._adjust_height,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("aa.xfdl", function() {
        /***************************************************************************************
         * 프로젝트        : Built1 Enterprise System 구축 프로젝트
         * 업무구분        : 시스템관리
         * 파일명          : SYS10000M.xfdl
         * 작성자          : Built1
         * 작성일          : 2026-10-01
         *
         * 화면            : 로그인
         * 설명            : 사용자 로그인 및 개인의 세션정보 등록
         *---------------------------------------------------------------------------------------
         * 변경일            변경자            변경내역
         *---------------------------------------------------------------------------------------
         * 2026-10-01        Built1            최초작성
         ***************************************************************************************/



        /***************************************************************************************
         * 1. FORM 변수 선언
         **************************************************************************************/


        /***************************************************************************************
         * 2. FORM LOAD
         **************************************************************************************/
        this.fn_init = function (obj, e)
        {

        };


        /***************************************************************************************
         * 3. 공통 버튼
         **************************************************************************************/
        /*
         * 기능 : 검색
         */
        this.fn_search = function(obj,e)
        {

        };


        /*
         * 기능 : 검색 초기화
         */
        this.fn_searchClear = function(obj,e)
        {

        };


        /*
         * 기능 : 신규
         */
        this.fn_new = function(obj,e)
        {

        };


        /*
         * 기능 : 저장
         */
        this.fn_save = function(obj,e)
        {

        };


        /*
         * 기능 : 삭제
         */
        this.fn_delelete = function(obj,e)
        {

        };


        /*
         * 기능 : 도움말
         */
        this.fn_help = function(obj,e)
        {

        };


        /*
         * 기능 : 출력
         */
        this.fn_print = function(obj,e)
        {

        };


        /*
         * 기능 : 초기화
         */
        this.fn_reset = function(obj,e)
        {

        };


        /***************************************************************************************
         * 4. TRANSACTION, CALLBACK
         **************************************************************************************/
        this.fn_callBack = function (sSvcID, nErrCd, sErrMsg)
        {

        };


        /***************************************************************************************
         * 5. 팝업 호출 및 콜백
         **************************************************************************************/


        /***************************************************************************************
         * 6. 기타 함수
         **************************************************************************************/


        /***************************************************************************************
         * 7. 이벤트
         **************************************************************************************/


        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.fn_init,this);
        };
        this.loadIncludeScript("aa.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

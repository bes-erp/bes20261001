(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Mdi");
            this.set_titletext("업무 탭 영역");
            this.set_cssclass("besMdiForm");
            this.set_scrollbartype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,30);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Button("btn_home","0","0","42","30",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("⌂");
            obj.set_cssclass("besMdiHome");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1280,30,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Mdi.xfdl", function() {
        /***************************************************************************************
         * 프로젝트        : Built1 Enterprise System 구축 프로젝트
         * 업무구분        : 공통 프레임
         * 파일명          : Form_Mdi.xfdl
         * 작성자          : Built1
         * 작성일          : 2026-11-05
         *
         * 화면            : 업무 탭 영역
         * 설명            : 업무 화면 탭 생성, 선택, 닫기 및 화면 컨테이너 연동
         *---------------------------------------------------------------------------------------
         * 변경일            변경자            변경내역
         *---------------------------------------------------------------------------------------
         * 2026-11-05        Built1            최초작성 및 동적 탭 기능 추가
         * 2026-11-05        Built1            홈 화면 이동 및 상단·왼쪽 메뉴 연동
         ***************************************************************************************/


        /***************************************************************************************
         * 1. FORM 변수 선언
         ***************************************************************************************/

        // 현재 열려 있는 업무 탭 정보 관리
        this.fv_tabList = [];

        // 현재 선택된 업무 메뉴 코드 (빈 문자열은 홈 화면)
        this.fv_activeMenuCd = "";


        /***************************************************************************************
         * 2. FORM LOAD
         ***************************************************************************************/

        /*
         * 기능 : 업무 탭 초기화
         */
        this.fn_init = function(obj, e)
        {
            // 열린 업무 탭 목록 및 활성 메뉴 코드 초기화
            this.fv_tabList      = [];
            this.fv_activeMenuCd = "";
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
         * 기능 : 업무 화면 컨테이너 조회
         */
        this.fn_getWorkForm = function()
        {
            var objApp       = nexacro.getApplication();
            var objWorkFrame = objApp.mainframe.VFrameSetMain.VFrameSet00.HFrameSet00.WorkFrame;

            // WorkFrame 또는 연결된 Form이 없으면 null 반환
            if (!objWorkFrame || !objWorkFrame.form) return null;

            // Form_TabWork.xfdl의 Form 객체 반환
            return objWorkFrame.form;
        };


        /*
         * 기능 : 업무 탭 생성 및 화면 열기
         */
        this.fn_openTab = function(sMenuCd, sMenuNm, sFormUrl)
        {
            // 메뉴 코드 또는 업무 화면 URL이 없으면 종료
            if (!sMenuCd || !sFormUrl) return;

            // 업무 화면을 관리하는 Form_TabWork 조회
            var objWorkForm = this.fn_getWorkForm();

            // 업무 화면 컨테이너 또는 화면 생성 함수가 없으면 오류 표시
            if (!objWorkForm || !objWorkForm.fn_openPage)
            {
                this.alert("업무 화면 컨테이너를 찾을 수 없습니다.");
                return;
            }

            // 이미 열려 있는 업무 탭인지 확인
            for (var i = 0; i < this.fv_tabList.length; i++)
            {
                if (this.fv_tabList[i].menuCd == sMenuCd)
                {
                    // 기존 탭이 있으면 중복 생성하지 않고 해당 탭 활성화
                    this.fn_selectTab(sMenuCd);
                    return;
                }
            }

            // Form_TabWork에 신규 업무 화면 Div 생성 요청
            objWorkForm.fn_openPage(sMenuCd, sMenuNm, sFormUrl);

            // 생성한 업무 탭 정보를 목록에 추가
            this.fv_tabList.push({ menuCd: sMenuCd, menuNm: sMenuNm, formUrl: sFormUrl });

            // 신규 업무 탭 활성화 및 탭 버튼 갱신
            this.fn_selectTab(sMenuCd);
        };


        /*
         * 기능 : 업무 탭 버튼 동적 생성
         */
        this.fn_createTabs = function()
        {
            // 기존에 동적으로 생성한 업무 탭 및 닫기 버튼 제거
            // 홈 버튼은 제거 대상에서 제외
            for (var i = this.components.length - 1; i >= 0; i--)
            {
                var objComp = this.components[i];

                if (objComp.name.indexOf("btn_tab_") == 0 || objComp.name.indexOf("btn_close_") == 0)
                {
                    this.removeChild(objComp.name);
                    objComp.destroy();
                }
            }

            // 홈 버튼 오른쪽부터 업무 탭 배치
            var nLeft     = 42;
            var nTabWidth = 155;

            // 열린 업무 화면 수만큼 탭 버튼 생성
            for (var i = 0; i < this.fv_tabList.length; i++)
            {
                var objInfo = this.fv_tabList[i];

                // 업무 탭 버튼 ID 생성
                var sTabId = "btn_tab_" + i;

                // 업무 탭 버튼 동적 생성 (높이 30px)
                var objTab = new nexacro.Button(sTabId, nLeft, 0, nTabWidth, 30, null, null, null, null, null, null, this);

                // 생성한 버튼을 현재 Form에 등록
                this.addChild(sTabId, objTab);

                // 메뉴명 표시 및 선택 상태에 따른 CSS 적용
                objTab.set_text(objInfo.menuNm);
                objTab.set_cssclass(objInfo.menuCd == this.fv_activeMenuCd ? "besMdiTabSelected" : "besMdiTab");
                objTab.set_cursor("pointer");

                // 탭 클릭 시 업무 메뉴를 식별하기 위한 메뉴 코드 저장
                objTab.menuCd = objInfo.menuCd;

                // 업무 탭 클릭 이벤트 연결 및 버튼 표시
                objTab.addEventHandler("onclick", this.fn_tab_onclick, this);
                objTab.show();

                // 업무 탭 오른쪽에 표시할 닫기 버튼 ID 생성
                var sCloseId = "btn_close_" + i;

                // 닫기 버튼 동적 생성 (22px × 22px)
                var objClose = new nexacro.Button(sCloseId, nLeft + nTabWidth - 28, 4, 22, 22, null, null, null, null, null, null, this);

                // 생성한 닫기 버튼을 현재 Form에 등록
                this.addChild(sCloseId, objClose);

                // 닫기 문자 및 CSS 적용
                objClose.set_text("×");
                objClose.set_cssclass("besMdiTabClose");
                objClose.set_cursor("pointer");

                // 닫기 대상 업무 메뉴 코드 저장
                objClose.menuCd = objInfo.menuCd;

                // 닫기 버튼 클릭 이벤트 연결 및 표시
                objClose.addEventHandler("onclick", this.fn_close_onclick, this);
                objClose.show();

                // 다음 업무 탭의 시작 위치 계산
                nLeft += nTabWidth;
            }
        };


        /*
         * 기능 : 선택한 업무 탭 활성화 및 상단·왼쪽 메뉴 연동
         */
        this.fn_selectTab = function(sMenuCd)
        {
            var objApp      = nexacro.getApplication();
            var objWorkForm = this.fn_getWorkForm();

            // 업무 화면 컨테이너 또는 화면 선택 함수가 없으면 종료
            if (!objWorkForm || !objWorkForm.fn_selectPage) return;

            // 현재 활성화된 업무 메뉴 코드 저장
            this.fv_activeMenuCd = sMenuCd;

            // Form_TabWork에서 선택한 업무 화면 표시
            // 빈 문자열을 전달하면 홈 화면(Form_Work) 표시
            objWorkForm.fn_selectPage(sMenuCd);

            // 홈 화면이 아닌 경우 해당 업무 메뉴의 최상위 메뉴 조회
            if (sMenuCd)
            {
                var dsMenu     = objApp.gdsMenu;
                var sParentCd  = "";
                var sTopMenuCd = "";

                if (dsMenu)
                {
                    // 선택한 3레벨 업무 메뉴의 2레벨 상위 메뉴 코드 조회
                    for (var i = 0; i < dsMenu.rowcount; i++)
                    {
                        if (dsMenu.getColumn(i, "CHILD_MENU_CD") == sMenuCd)
                        {
                            sParentCd = dsMenu.getColumn(i, "PARENT_MENU_CD");
                            break;
                        }
                    }

                    // 2레벨 메뉴의 상위에 있는 1레벨 최상위 메뉴 코드 조회
                    for (var i = 0; i < dsMenu.rowcount; i++)
                    {
                        if (dsMenu.getColumn(i, "CHILD_MENU_CD") == sParentCd)
                        {
                            sTopMenuCd = dsMenu.getColumn(i, "PARENT_MENU_CD");
                            break;
                        }
                    }

                    // 최상위 메뉴 코드가 확인되면 상단 메뉴 및 왼쪽 메뉴 변경
                    if (sTopMenuCd)
                    {
                        var objMenuFrame = objApp.mainframe.VFrameSetMain.VFrameSet00.MenuFrame;

                        if (objMenuFrame && objMenuFrame.form && objMenuFrame.form.fn_selectTopMenu)
                        {
                            // Form_Menu에서 상단 메뉴 선택 상태 변경
                            // Form_Left의 fn_selectTopMenu도 함께 호출되어 왼쪽 메뉴 갱신
                            objMenuFrame.form.fn_selectTopMenu(sTopMenuCd);
                        }
                    }
                }
            }

            // 현재 활성 메뉴 코드에 맞게 업무 탭 버튼 다시 생성
            this.fn_createTabs();
        };


        /*
         * 기능 : 업무 탭 닫기
         */
        this.fn_closeTab = function(sMenuCd)
        {
            var nCloseIndex = -1;

            // 닫기 요청한 업무 탭의 목록 인덱스 조회
            for (var i = 0; i < this.fv_tabList.length; i++)
            {
                if (this.fv_tabList[i].menuCd == sMenuCd)
                {
                    nCloseIndex = i;
                    break;
                }
            }

            // 열린 탭 목록에 해당 메뉴가 없으면 종료
            if (nCloseIndex < 0) return;

            // 닫는 탭이 현재 활성화된 탭인지 확인
            var bActive     = (this.fv_activeMenuCd == sMenuCd);
            var objWorkForm = this.fn_getWorkForm();

            // Form_TabWork에서 해당 업무 화면 Div 제거
            // 화면을 닫으면 해당 화면의 입력 데이터 및 상태도 제거됨
            if (objWorkForm)
            {
                objWorkForm.fn_closePage(sMenuCd);
            }

            // 열린 업무 탭 관리 목록에서 해당 메뉴 삭제
            this.fv_tabList.splice(nCloseIndex, 1);

            if (bActive)
            {
                // 현재 선택된 탭을 닫은 경우 다음에 표시할 탭 결정
                var sNextMenuCd = "";

                if (this.fv_tabList.length > 0)
                {
                    // 닫힌 탭의 위치를 기준으로 다음 탭 또는 마지막 탭 선택
                    var nNextIndex = Math.min(nCloseIndex, this.fv_tabList.length - 1);
                    sNextMenuCd = this.fv_tabList[nNextIndex].menuCd;
                }

                // 선택할 탭이 없으면 홈 화면으로 이동
                this.fn_selectTab(sNextMenuCd);
            }
            else
            {
                // 비활성 탭을 닫은 경우 현재 화면은 유지하고 탭 버튼만 갱신
                this.fn_createTabs();
            }
        };


        /***************************************************************************************
         * 7. 이벤트
         ***************************************************************************************/

        /*
         * 기능 : 업무 탭 영역 로딩 이벤트
         */
        this.Form_Mdi_onload = function(obj, e)
        {
            // 업무 탭 관리 변수 초기화
            this.fn_init(obj, e);
        };


        /*
         * 기능 : 홈 버튼 클릭 시 홈 화면 이동
         */
        this.btn_home_onclick = function(obj, e)
        {
            // 업무 탭을 닫지 않고 홈 화면 표시
            this.fn_selectTab("");
        };


        /*
         * 기능 : 업무 탭 클릭 이벤트
         */
        this.fn_tab_onclick = function(obj, e)
        {
            // 클릭한 탭에 저장된 메뉴 코드로 업무 화면 전환
            this.fn_selectTab(obj.menuCd);
        };


        /*
         * 기능 : 업무 탭 닫기 이벤트
         */
        this.fn_close_onclick = function(obj, e)
        {
            // 클릭한 닫기 버튼에 저장된 메뉴 코드로 업무 탭 제거
            this.fn_closeTab(obj.menuCd);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Mdi_onload,this);
            this.btn_home.addEventHandler("onclick",this.btn_home_onclick,this);
        };
        this.loadIncludeScript("Form_Mdi.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();

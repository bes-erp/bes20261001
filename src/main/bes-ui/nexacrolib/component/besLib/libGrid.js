var pForm 	= nexacro.Form.prototype;

/*
 ===============================================================================
 ==  Util 관련 공통 함수
 ===============================================================================
 ● this.gfn_gridComboDropdown           :  그리드 콤보 셀 클릭 시 드롭다운 목록 즉시 편비 상태로 전환 함수
*/


/**
 * @description     그리드 콤보 셀 클릭 시 드롭다운 목록 즉시 편비 상태로 전환 함수
 * @param           {objGrid    : object                        }   대상 그리드         : obj
 * @param           {e          : nexacro.GridClickEventInfo    }   셀 클릭 이벤트 정보 : e
 * @example         this.grd_message_oncellclick = function(obj, e)
 *                  {
 *                      this.gfn_gridComboDropdown(obj, e);
 *                  };
 */
pForm.gfn_gridComboDropdown = function(objGrid, e)
{
    if (objGrid.getCellProperty("body", e.cell, "edittype") == "combo") 
    {
        objGrid.dropdownCombo();
    }
};

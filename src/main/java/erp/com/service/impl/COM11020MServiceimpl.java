package erp.com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nexacro.java.xapi.data.DataSet;

import erp.com.service.COM11020MService;
import lombok.extern.slf4j.Slf4j;

/**
 * =====================================================================================
 * @packageName     : erp.com.service.impl
 * @fileName        : COM11020MServiceimpl.java
 * @author          : Built1
 * @date            : 2026.11.04
 * @description     : 메뉴정보 조회 및 저장을 처리하는 서비스 구현체 클래스
 * =====================================================================================
 * 수정일자          수정자             수정내용
 * -------------------------------------------------------------------------------------
 * 2026.11.04        Built1             최초 생성
 * 2026.11.05        Built1             공통 프레임 메뉴 조회 기능 추가
 * 2026.11.10        Built1             메뉴정보 등록, 수정, 삭제 기능 추가
 */
@Slf4j
@Service
public class COM11020MServiceimpl implements COM11020MService {

    @Resource
    private COM11020MMapper mapper;

    /**
     * @methodName      : selectMenuList
     * @author          : Built1
     * @date            : 2026.11.04
     * @description     : 메뉴등록 화면의 조회조건에 따른 메뉴정보 목록 조회
     * @param menuText  메뉴코드 또는 메뉴명
     * @param userYn    사용여부
     * @return          메뉴정보 목록
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> selectMenuList(String menuText, String userYn) throws Exception {

        // 메뉴 조회조건 변수 선언
        Map<String, Object> paramMap = new HashMap<>();

        // 메뉴 조회조건 설정
        paramMap.put("menuText", menuText == null ? "" : menuText.trim());
        paramMap.put("userYn", userYn == null ? "" : userYn.trim());

        // 메뉴정보 조회 결과 리턴
        return mapper.selectMenuList(paramMap);
    }

    /**
     * @methodName      : selectFrameMenuList
     * @author          : Built1
     * @date            : 2026.11.05
     * @description     : 공통 프레임에서 사용할 활성 메뉴정보 목록 조회
     * @return          사용 가능한 메뉴정보 목록
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> selectFrameMenuList() throws Exception {

        // 공통 프레임 메뉴정보 조회
        return mapper.selectFrameMenuList();
    }

    /**
     * @methodName      : saveMenuList
     * @author          : Built1
     * @date            : 2026.11.10
     * @description     : RowType에 따라 메뉴정보 등록, 수정, 삭제 처리
     * @param inMenu    변경된 메뉴정보 Dataset
     * @return          저장 처리 건수
     * @throws Exception
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int saveMenuList(DataSet inMenu) throws Exception {

        int saveCount = 0;

        if (inMenu == null) {
            throw new IllegalArgumentException("메뉴정보 Dataset이 없습니다.");
        }

        // 삭제된 메뉴정보 처리
        for (int i = 0; i < inMenu.getRemovedRowCount(); i++) {

            Map<String, Object> paramMap = new HashMap<>();

            Object menuId = inMenu.getRemovedData(i, "MENU_ID");

            if (menuId == null || menuId.toString().trim().isEmpty()) {
                throw new IllegalArgumentException("삭제할 메뉴 ID가 없습니다.");
            }

            paramMap.put("MENU_ID", menuId);

            int count = mapper.deleteMenu(paramMap);

            if (count != 1) {
                throw new IllegalStateException("메뉴 삭제 대상이 없거나 중복되었습니다.");
            }

            saveCount += count;
        }

        // 신규 등록 및 수정 처리
        for (int i = 0; i < inMenu.getRowCount(); i++) {

            int rowType = inMenu.getRowType(i);

            if (rowType != DataSet.ROW_TYPE_INSERTED && rowType != DataSet.ROW_TYPE_UPDATED) {
                continue;
            }

            Map<String, Object> paramMap = new HashMap<>();

            // Dataset 컬럼을 Map으로 변환
            for (int j = 0; j < inMenu.getColumnCount(); j++) {
                String columnName = inMenu.getColumn(j).getName();
                paramMap.put(columnName, inMenu.getObject(i, j));
            }

            // 필수값 검증
            validateMenu(paramMap);

            int count;

            if (rowType == DataSet.ROW_TYPE_INSERTED) {

                // 신규 메뉴 등록
                count = mapper.insertMenu(paramMap);

            } else {

                // 기존 메뉴 수정
                Object menuId = paramMap.get("MENU_ID");

                if (menuId == null || menuId.toString().trim().isEmpty()) {
                    throw new IllegalArgumentException("수정할 메뉴 ID가 없습니다.");
                }

                count = mapper.updateMenu(paramMap);
            }

            if (count != 1) {
                throw new IllegalStateException("메뉴 저장 처리 건수가 올바르지 않습니다.");
            }

            saveCount += count;
        }

        return saveCount;
    }

    /**
     * @methodName      : validateMenu
     * @author          : Built1
     * @date            : 2026.11.10
     * @description     : 메뉴정보 필수 입력값 검증
     * @param paramMap  메뉴정보
     * @return          없음
     */
    private void validateMenu(Map<String, Object> paramMap) {

        String[] requiredColumns = {"PARENT_MENU_CD", "CHILD_MENU_CD", "CHILD_MENU_NM", "CHILD_MENU_LEVEL", "CHILD_MENU_SEQ"};

        for (String column : requiredColumns) {

            Object value = paramMap.get(column);

            if (value == null || value.toString().trim().isEmpty()) {
                throw new IllegalArgumentException("메뉴 필수값이 누락되었습니다: " + column);
            }
        }
    }
}
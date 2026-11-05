package erp.com.service;

import java.util.List;
import java.util.Map;

/**
 * =====================================================================================
 * @packageName     : erp.com.service
 * @fileName        : COM11020MService.java
 * @author          : Built1
 * @date            : 2026.11.04
 * @description     : 메뉴정보 조회를 처리하는 서비스 인터페이스
 * =====================================================================================
 * 수정일자          수정자             수정내용
 * -------------------------------------------------------------------------------------
 * 2026.11.04        Built1             최초 생성
 * 2026.11.05        Built1             공통 프레임 메뉴 조회 메소드 추가
 */
public interface COM11020MService {

    /**
     * @methodName      : selectMenuList
     * @author          : Built1
     * @date            : 2026.11.04
     * @description     : 메뉴등록 화면의 메뉴정보 목록을 조회하는 메소드
     * @param menuText  메뉴코드 또는 메뉴명
     * @param userYn    사용여부
     * @return          메뉴정보 목록
     * @throws Exception
     */
    public abstract List<Map<String, Object>> selectMenuList(String menuText, String userYn) throws Exception;

    /**
     * @methodName      : selectFrameMenuList
     * @author          : Built1
     * @date            : 2026.11.05
     * @description     : 공통 프레임에 표시할 메뉴정보 목록을 조회하는 메소드
     * @return          사용 가능한 메뉴정보 목록
     * @throws Exception
     */
    public abstract List<Map<String, Object>> selectFrameMenuList() throws Exception;
}

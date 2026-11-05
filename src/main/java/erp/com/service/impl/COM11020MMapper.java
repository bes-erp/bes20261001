package erp.com.service.impl;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

/**
 * =====================================================================================
 * @packageName     : erp.com.service.impl
 * @fileName        : COM11020MMapper.java
 * @author          : Built1
 * @date            : 2026.11.04
 * @description     : 메뉴정보 조회 SQL을 호출하는 Mapper 인터페이스
 * =====================================================================================
 * 수정일자          수정자             수정내용
 * -------------------------------------------------------------------------------------
 * 2026.11.04        Built1             최초 생성
 * 2026.11.05        Built1             공통 프레임 메뉴 조회 메소드 추가
 */
@Mapper
public interface COM11020MMapper {

    /**
     * @methodName      : selectMenuList
     * @author          : Built1
     * @date            : 2026.11.04
     * @description     : 메뉴등록 화면의 메뉴정보 목록 조회
     * @param paramMap  메뉴 조회조건
     * @return          메뉴정보 목록
     */
    public abstract List<Map<String, Object>> selectMenuList(Map<String, Object> paramMap);

    /**
     * @methodName      : selectFrameMenuList
     * @author          : Built1
     * @date            : 2026.11.05
     * @description     : 공통 프레임에서 사용할 활성 메뉴정보 목록 조회
     * @return          사용 가능한 메뉴정보 목록
     */
    public abstract List<Map<String, Object>> selectFrameMenuList();
}

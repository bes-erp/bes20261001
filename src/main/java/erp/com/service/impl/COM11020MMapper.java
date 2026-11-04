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
* @description     : 메뉴정보 조회 SQL을 호출하는 Mapper 인터페이스 클래스
* =====================================================================================
* 수정일자          수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.04        Built1             최초 생성
*/
@Mapper
public interface COM11020MMapper {

    /**
    * @methodName      : selectMenuList
    * @author          : built1
    * @date            : 2026.11.04
    * @description     : 메뉴정보 목록을 조회하는 메소드
    * @param paramMap
    * @return
    */
    public abstract List<Map<String, Object>> selectMenuList(Map<String, Object> paramMap);
}
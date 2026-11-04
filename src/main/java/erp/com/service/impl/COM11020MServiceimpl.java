package erp.com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.com.service.COM11020MService;
import lombok.extern.slf4j.Slf4j;

/**
* =====================================================================================
* @packageName     : erp.com.service.impl
* @fileName        : COM11020MServiceimpl.java
* @author          : Built1
* @date            : 2026.11.04
* @description     : 메뉴정보 조회를 처리하는 구현체 클래스
* =====================================================================================
* 수정일자          수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.04        Built1             최초 생성
*/
@Slf4j
@Service
public class COM11020MServiceimpl implements COM11020MService {

    @Resource
    private COM11020MMapper mapper;

    /**
    * @methodName      : selectMenuList
    * @author          : built1
    * @date            : 2026.11.04
    * @description     : 메뉴정보 목록을 조회하는 상속메소드
    * @param menuText
    * @param userYn
    * @return
    * @throws Exception
    */
    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> selectMenuList(String menuText, String userYn) throws Exception {

        // 메뉴 조회조건 변수 선언
        Map<String, Object> paramMap = new HashMap<>();

        // 메뉴 조회조건 설정
        paramMap.put("menuText", menuText == null ? "" : menuText.trim());
        paramMap.put("userYn", userYn == null ? "" : userYn.trim());

        // 메뉴정보 조회 결과 리턴
        return mapper.selectMenuList(paramMap);
    }
}
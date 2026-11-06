package erp.com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import erp.com.service.COM12000MService;
import lombok.extern.slf4j.Slf4j;

/**
* =====================================================================================
* @packageName    		: erp.com.service.impl
* @fileName       		: COM12000MServiceimpl.java
* @author         		: Built1
* @date           		: 2026.11.05
* @description    		: 메시지 데이터를 조회/저장하는 구현체 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.04        	Built1             최초 생성
* 2026.11.05        	Built1             수정
*/
@Slf4j
@Service
public class COM12000MServiceimpl implements COM12000MService {

    @Resource
    private COM12000MMapper mapper;

    /**
    * @methodName     		: selectMessageList
    * @author         		: built1
    * @date           		: 2026.11.05
    * @description    		: 메시지 데이터를 조회하는 상속메소드
    * @param searchParamMap
    * @param userId
    * @return
    * @throws Exception
    */
    @Override
    public List<Map<String, Object>> selectMessageList(Map<String, Object> searchParamMap, String userId) throws Exception {

        // 검색조건(데이터셋 및 매개변수) 병합처리를 위한 변수(Map) 선언
        Map<String, Object> mapperParamMap = new HashMap<>();

        // 검색조건 복사
        if (searchParamMap != null) {
            mapperParamMap.putAll(searchParamMap);
        }

        // 사용자 ID 추가
        mapperParamMap.put("user_id", userId);

        // 메시지 목록 조회 및 결과 리턴
        return mapper.selectMessageList(mapperParamMap);
    }

}

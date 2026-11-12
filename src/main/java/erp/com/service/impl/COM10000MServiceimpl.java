package erp.com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import erp.com.service.COM10000MService;
import erp.core.exh.DbException;
import lombok.extern.slf4j.Slf4j;

// 클래스 이름 없이 바로 쓸 수 있게 : static 
// 예. SessionUserInfo.getUserId() ==> getUserId() 
import static erp.core.util.SessionUserInfo.*;

/**
* =====================================================================================
* @packageName    		: erp.com.service.impl
* @fileName       		: SYS10000MServiceimpl.java
* @author         		: Built1
* @date           		: 2026.10.15
* @description    		: 코드유형 데이터를 조회/저장하는 구현체 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.10.15        	Built1             최초 생성
*/
@Slf4j
@Service
public class COM10000MServiceimpl implements COM10000MService {

	@Resource
	private COM10000MMapper mapper;
	
	/**
	* @methodName     		: selectCodeTypeList
	* @author         		: built1
	* @date           		: 2026.10.15
	* @description    		: 코드유형 및 코드 데이터를 조회하는 구현메소드
	* @param searchParamMap : 화면에서 전달한 검색조건
	* @param userId         : 사용자ID
	* @return               : selectCodeTypeList(코드유형), selectCodeList(코드)
	* @throws Exception
	*/
	@Override
	public Map<String, Object> selectCodeTypeList(Map<String, Object> searchParamMap, String userId) throws Exception {
		
		// 검색조건(데이터셋 및 매개변수) 병합처리를 위한 변수(Map) 선언
		Map<String, Object> mapperParamMap = new HashMap<>();
		
		// 검색조건 복사
        if (searchParamMap != null) {
            mapperParamMap.putAll(searchParamMap);
        }

        // 사용자 ID 추가
        //mapperParamMap.put("user_id", userId);
    	
        // 사용자 ID 추가 : 세션에 존재하는 사용자ID
    	log.debug("## [ getUserId()             ] : {}", getUserId());    	
        mapperParamMap.put("user_id", getUserId());
        
        
        // 코드유형 및 코드 조회
        try {			
        	List<Map<String, Object>> selectCodeTypeList = mapper.selectCodeTypeList(mapperParamMap);
        	List<Map<String, Object>> selectCodeList     = mapper.selectCodeList(mapperParamMap);
        	
        	//조회결과(코드유형 및 코드) 병합하기 위한 변수(Map) 선언
        	Map<String, Object> resultMap = new HashMap<>();
        	resultMap.put("selectCodeTypeList", selectCodeTypeList);
        	resultMap.put("selectCodeList"    , selectCodeList);
        	
        	return resultMap;
		} catch (DataAccessException e) {
			throw new DbException(e);
		}
		
	}

}

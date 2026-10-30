package erp.com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import erp.com.service.COM10000MService;
import lombok.extern.slf4j.Slf4j;

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
	* @description    		: 코드유형 데이터를 조회하는 상속메소드
	* @param searchParamMap
	* @param userId
	* @return
	* @throws Exception
	*/
	@Override
	public Map<String, Object> selectCodeTypeList(Map<String, Object> searchParamMap, String userId) throws Exception {
		
		//검색조건(데이터셋 및 매개변수) 병합처리를 위한 변수(Map) 선언
		Map<String, Object> mapperParamMap = new HashMap<>();
		
		//검색조건 복사
        if (searchParamMap != null) {
            mapperParamMap.putAll(searchParamMap);
        }

        //사용자 ID 추가
        mapperParamMap.put("user_id", userId);
        
        
        //코드유형 및 코드 조회
        List<Map<String, Object>> selectCodeTypeList = mapper.selectCodeTypeList(mapperParamMap);
        List<Map<String, Object>> selectCodeList     = mapper.selectCodeList(mapperParamMap);
        
        
        //조회결과(코드유형 및 코드) 병합하기 위한 변수(Map) 선언
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("selectCodeTypeList", selectCodeTypeList);
        resultMap.put("selectCodeList"    , selectCodeList);
        
		
		return resultMap;
	}

	/**
	* @methodName     		: selectComboCodeList
	* @author         		: built1
	* @date           		: 2026.10.21
	* @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 메소드
	* @param codeType
	* @param selType
	* @return
	* @throws Exception
	*/
	@Override
	public List<Map<String, Object>> selectComboCodeList(String codeType, String selType) throws Exception {
		
		//매퍼로 전달할 변수(Map) 선언
		Map<String, Object> mapperParamMap = new HashMap<>();
		
		//매퍼로 전달할 Map 변수에 매개변수 할당
		mapperParamMap.put("code_type", codeType);
		mapperParamMap.put("sel_type" , selType);
		
		//코드 조회 및 결과 리턴		
		return mapper.selectComboCodeList(mapperParamMap);
	}

}

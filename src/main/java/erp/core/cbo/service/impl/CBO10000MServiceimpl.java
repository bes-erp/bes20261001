package erp.core.cbo.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import erp.core.cbo.service.CBO10000MService;
import lombok.extern.slf4j.Slf4j;

/**
* =====================================================================================
* @packageName    		: erp.core.cbo.service.impl
* @fileName       		: CBO10000MServiceimpl.java
* @author         		: Built1
* @date           		: 2026.11.05
* @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.05        	Built1             최초 생성
*/
@Slf4j
@Service
public class CBO10000MServiceimpl implements CBO10000MService {

	@Resource
	private CBO10000MMapper mapper;
	
	/**
	* @methodName     		: selectComboCodeList
	* @author         		: built1
	* @date           		: 2026.11.05
	* @description    		: [콤보박스] 코드유형에 따른 코드 데이터를 조회하는 메소드
	* @param codeType
	* @param activeType
	* @param addAllRow
	* @return
	* @throws Exception
	*/
	@Override
	public List<Map<String, Object>> selectComboCodeList(String codeType, String activeType, String addAllRow) throws Exception {
		
		//매퍼로 전달할 변수(Map) 선언
		Map<String, Object> mapperParamMap = new HashMap<>();
		
		//매퍼로 전달할 Map 변수에 매개변수 할당
		mapperParamMap.put("code_type", codeType.toUpperCase());
		mapperParamMap.put("active_type" , activeType.toUpperCase());
		mapperParamMap.put("add_all_row" , addAllRow.toUpperCase());
		
		//코드 조회 및 결과 리턴		
		return mapper.selectComboCodeList(mapperParamMap);
	}

}

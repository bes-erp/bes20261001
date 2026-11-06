package erp.core.msg.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import erp.core.msg.service.MSG10000MService;
import lombok.extern.slf4j.Slf4j;

/**
* =====================================================================================
* @packageName    		: erp.core.msg.service.impl
* @fileName       		: MSG10000MServiceimpl.java
* @author         		: Built1
* @date           		: 2026.11.06
* @description    		: [메시지] 데이터를 조회하는 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.06        	Built1             최초 생성
*/
@Slf4j
@Service
public class MSG10000MServiceimpl implements MSG10000MService {

	@Resource
	private MSG10000MMapper mapper;
	
	/**
	* @methodName     		: selectMessageList
	* @author         		: built1
	* @date           		: 2026.11.06
	* @description    		: [메시지] 데이터를 조회하는 상속메소드
	* @return
	* @throws Exception
	*/
	@Override
	public List<Map<String, Object>> selectMessageList() throws Exception {
		
		//메시지 데이터 조회 및 결과 리턴		
		return mapper.selectMessageList();
	}

}

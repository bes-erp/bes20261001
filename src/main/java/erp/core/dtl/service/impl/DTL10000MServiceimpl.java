package erp.core.dtl.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import erp.core.dtl.service.DTL10000MService;
import erp.core.exh.DbException;
import lombok.extern.slf4j.Slf4j;

/**
* =====================================================================================
* @packageName    		: erp.core.dtl.service.impl
* @fileName       		: DTL10000MServiceimpl.java
* @author         		: Built1
* @date           		: 2026.11.10
* @description    		: [날짜] 데이터를 조회하는 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.10        	Built1             최초 생성
*/
@Slf4j
@Service
public class DTL10000MServiceimpl implements DTL10000MService {

	@Resource
	private DTL10000MMapper mapper;
		
	/**
	* @methodName     		: selectDateList
	* @author         		: built1
	* @date           		: 2026.11.10
	* @description    		: [날짜] 데이터를 조회하는 구현메소드
	* @return
	* @throws Exception
	*/
	@Override
	public List<Map<String, Object>> selectDateList() throws Exception {
		
		// 메시지 데이터 조회 및 결과 리턴
		try {
			return mapper.selectDateList();			
		} catch (DataAccessException e) {
			throw new DbException(e);
		}
	}

}

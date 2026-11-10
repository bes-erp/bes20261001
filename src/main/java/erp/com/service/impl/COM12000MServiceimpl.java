package erp.com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import erp.com.service.COM12000MService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import com.nexacro.java.xapi.data.DataSet;

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
* 2026.11.10			Built1			   데이터 저장 기능 추가
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

	/**
	* @methodName     		: saveMessage
	* @author         		: built1
	* @date           		: 2026.11.10
	* @description    		: 메시지 데이터를 등록, 수정, 삭제하는 메소드
	* @param messageList
	* @param userId
	* @return
	* @throws Exception
	*/
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int saveMessage(List<Map<String, Object>> messageList, String userId) throws Exception {
	
	    if (messageList == null || messageList.isEmpty()) {
	        return 0;
	    }
	
	    int nSaveCnt = 0;
	
	    for (Map<String, Object> message : messageList) {
	
	        Object objRowType = message.get("DataSetRowType");
	        
	        log.debug("## [ 저장 RowType ] : {}", objRowType);
	
	        if (!(objRowType instanceof Number)) {
	            throw new IllegalArgumentException("메시지 행 상태를 확인할 수 없습니다.");
	        }
	
	        int nRowType = ((Number) objRowType).intValue();
	
	        Map<String, Object> mapperParamMap = new HashMap<>(message);
	        mapperParamMap.put("user_id", userId);
	
	        int nResult = 0;
	
	        switch (nRowType) {
			    case DataSet.ROW_TYPE_NORMAL:
			        continue;
			
			    case DataSet.ROW_TYPE_INSERTED:
			        nResult = mapper.insertMessage(mapperParamMap);
			        break;
			
			    case DataSet.ROW_TYPE_UPDATED:
			        nResult = mapper.updateMessage(mapperParamMap);
			        break;
			
			    case DataSet.ROW_TYPE_DELETED:
			        nResult = mapper.deleteMessage(mapperParamMap);
			        break;
			
			    default:
			        throw new IllegalArgumentException("지원하지 않는 행 상태입니다: " + nRowType);
			}		
	
	        if (nResult != 1) {
	            throw new IllegalStateException("메시지 저장 처리 건수가 올바르지 않습니다.");
	        }
	
	        nSaveCnt += nResult;
	    }
	
	    return nSaveCnt;
	}

}


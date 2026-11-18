package erp.core.util;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

import javax.annotation.Resource;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import erp.core.msg.service.MSG10000MService;
import lombok.extern.slf4j.Slf4j;

/**
* =====================================================================================
* @packageName    		: erp.core.util
* @fileName       		: MessageStore.java
* @author         		: Built1
* @date           		: 2026.11.17
* @description    		: 서버판 gds_message 클래스
*                         서버 기동 시 메시지 전체를 메모리에 적재하고,
*                         이후에는 DB 조회 없이 메모리에서 찾는다.
*                         - messageList  : 조회 결과 원본 (넥사크로 gds_message 전달용)
*                         - messageIndex : MESSAGE_NUM -> 메시지 1건 (서버 조회용)
* @Class process 
*  1. 객체생성           : 스프링이 @Component가 붙은 MessageStore 객체(Bean)를 생성
*  2. 의존성주입         : @Resource로 MSG10000MService를 주입
*  3. 스프링구현여부확인 : 스프링이 MessageStore가 InitializingBean을 구현했는지 확인
*  4. 자동호출           : 구현했으므로 afterPropertiesSet()을 자동으로 호출(서버 기동 시 스프링이 자동으로 1회)
*  5. 실데이터적재       : afterPropertiesSet() 내 함수 reload()가 DB를 조회하여 List와 Map에 데이터를 적재                         
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.17        	Built1             최초 생성
*/
@Slf4j
@Component
public class MessageStore implements InitializingBean {

	// 메시지번호 컬럼명 (DB 컬럼명은 대문자)
	public static final String COL_MESSAGE_NUM = "MESSAGE_NUM";

	@Resource
	private MSG10000MService service;

	// 메시지 보관 변수 : 재적재 중에도 조회가 끊기지 않도록 전체 교체
	private final AtomicReference<List<Map<String, Object>>>        messageList  = new AtomicReference<>(Collections.emptyList());  // 넥사크로 전달할 데이터
	private final AtomicReference<Map<String, Map<String, Object>>> messageIndex = new AtomicReference<>(Collections.emptyMap());	// 자바에서 조회시 사용할 데이터

	/**
	* @methodName     		: afterPropertiesSet
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 서버 기동 시 메시지를 1회 적재하는 메소드
	* @throws Exception
	*/
	@Override
	public void afterPropertiesSet() throws Exception {
		reload();
	}

	/**
	* @methodName     		: reload
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 메시지를 DB에서 다시 조회하여 메모리에 적재하는 메소드
	*                         (메시지 관리 화면에서 저장 후 호출)
	* @return               : 적재 건수
	* @throws Exception
	*/
	public synchronized int reload() throws Exception {

		// 메시지 전체 조회 (기존 로그인 화면 조회 서비스 재사용)
		List<Map<String, Object>> selectMessageList = service.selectMessageList();

		// 메시지번호(MESSAGE_NUM)를 키로 하는 인덱스 생성
		Map<String, Map<String, Object>> newIndex = new HashMap<>(selectMessageList.size() * 2);
		for (Map<String, Object> row : selectMessageList) {
			Object messageNum = row.get(COL_MESSAGE_NUM);
			if (messageNum != null) {
				newIndex.put(messageNum.toString(), Collections.unmodifiableMap(row));
			}
		}

		// 기존 데이터를 새 데이터로 교체 (수정 불가)
		messageList.set(Collections.unmodifiableList(selectMessageList));
		messageIndex.set(Collections.unmodifiableMap(newIndex));

		log.info("## [ MessageStore reload      ] : {}건 적재 완료", selectMessageList.size());

		return selectMessageList.size();
	}

	/**
	* @methodName     		: getMessageList
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 메시지 전체 목록을 반환하는 메소드 (로그인 화면 gds_message 전달용)
	* @return               : 메시지 목록 (조회 결과 원본)
	*/
	public List<Map<String, Object>> getMessageList() {
		return messageList.get();
	}

	/**
	* @methodName     		: find
	* @author         		: Built1
	* @date           		: 2026.11.17
	* @description    		: 메시지번호로 메시지 1건을 찾는 메소드
	*                         (gds_message.findRow("MESSAGE_NUM", messageNum)에 해당)
	* @param messageNum     : 메시지번호
	* @return               : 메시지 1건 (없으면 null)
	*/
	public Map<String, Object> find(String messageNum) {
		return messageIndex.get().get(messageNum);
	}

}
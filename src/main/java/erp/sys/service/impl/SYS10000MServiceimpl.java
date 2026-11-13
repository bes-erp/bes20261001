package erp.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.core.exh.DbException;
import erp.sys.service.SYS10000MService;
import lombok.extern.slf4j.Slf4j;

/**
 * =====================================================================================
 * @packageName     : erp.sys.service.impl
 * @fileName        : SYS10000MServiceimpl.java
 * @author          : Built1
 * @date            : 2026.11.02
 * @description     : 사용자 로그인 인증을 처리하는 구현체 클래스
 * =====================================================================================
 * 수정일자          수정자             수정내용
 * -------------------------------------------------------------------------------------
 * 2026.11.02        Built1             최초 생성
 */
@Slf4j
@Service
public class SYS10000MServiceimpl implements SYS10000MService {

    @Resource
    private SYS10000MMapper mapper;

    /**
     * @methodName      	: login
     * @author          	: Built1
     * @date            	: 2026.11.02
     * @description     	: 사용자 로그인 인증을 처리하는 구현메소드
     * @param loginParamMap : 로그인 요청정보
     * @return              : 로그인 인증 결과
     * @throws Exception
     */
    @Override
    @Transactional
    public Map<String, Object> login(Map<String, Object> loginParamMap) throws Exception {

        // 로그인 결과 변수 선언
        Map<String, Object> resultMap = new HashMap<>();

        // 로그인 요청 데이터 검증
        if (loginParamMap == null
                || loginParamMap.get("USER_ID") == null
                || loginParamMap.get("PASSWORD") == null
                || loginParamMap.get("USER_ID").toString().trim().isEmpty()
                || loginParamMap.get("PASSWORD").toString().isEmpty()) {

            resultMap.put("RESULT_CD", "F");
            resultMap.put("RESULT_DESCR", "아이디와 비밀번호를 입력해 주세요.");

            return resultMap;
        }

        try {
        	// DB 패키지 호출용 변수 선언
        	Map<String, Object> mapperParamMap = new HashMap<>();
        	
        	// 로그인 요청 데이터 설정
        	mapperParamMap.put("user_id", loginParamMap.get("USER_ID"));
        	mapperParamMap.put("password", loginParamMap.get("PASSWORD"));
        	mapperParamMap.put("result_cd", null);
        	mapperParamMap.put("result_descr", null);
        	
        	// 사용자 로그인 인증 패키지 호출
        	mapper.loginPassword(mapperParamMap);
        	
        	// 로그인 인증 결과 설정
        	resultMap.put("RESULT_CD", mapperParamMap.get("result_cd"));
        	resultMap.put("RESULT_DESCR", mapperParamMap.get("result_descr"));
        	
        	// 로그인 결과 리턴
        	return resultMap;			
		} catch (Exception e) {
			throw new DbException(e);
		}
    }

	/**
	* @methodName     		: selectLoginUserInfo
	* @author         		: built1
	* @date           		: 2026.11.11
	* @description    		: 사용자정보를 조회하는 구현메소드
	* @param 				: loginParamMap(사용자ID)
	* @return				: 사용자정보
	*/
	@Override
	public Map<String, Object> selectLoginUserInfo(Map<String, Object> loginParamMap) {
		try {
			return mapper.selectLoginUserInfo(loginParamMap);			
		} catch (Exception e) {
			throw new DbException(e);
		}
	}
	
	/**
	* @methodName     		: selectProfileList
	* @author         		: built1
	* @date           		: 2026.11.13
	* @description    		: [시스템관리] 프로파일 전체 목록을 조회하는 구현메소드
	* @return				: 프로파일목록
	*/
	@Override
	public List<Map<String, Object>> selectProfileList() {
		try {
			return mapper.selectProfileList();			
		} catch (Exception e) {
			throw new DbException(e);
		}
	}
}

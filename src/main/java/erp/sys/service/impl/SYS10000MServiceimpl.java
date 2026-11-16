package erp.sys.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.com.service.impl.COM11020MMapper;
import erp.core.util.PasswordHasher;
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
 * 2026.11.16        Built1             비밀번호 검증 WAS 이관 (PL/SQL login_password_p 사용 중지)
 *                                      Map 키 대문자 규칙 적용, 미사용 login 메소드 삭제
 */
@Slf4j
@Service
public class SYS10000MServiceimpl implements SYS10000MService {

    /** 로그인 결과코드 : 성공 */
    private static final String RESULT_SUCCESS = "S";

    /** 로그인 결과코드 : 실패 */
    private static final String RESULT_FAIL    = "F";

    /** 로그인 실패 공통 메시지 (ID 존재 여부를 노출하지 않음) */
    private static final String MSG_LOGIN_FAIL = "사용자ID 또는 비밀번호가 올바르지 않습니다.";

    @Resource
    private SYS10000MMapper mapper;

    @Resource
    private COM11020MMapper menuMapper;

    /**
     * @methodName          : checkLogin
     * @author              : Built1
     * @date                : 2026.11.16
     * @description         : 로그인 비밀번호 검증 및 결과 기록
     *                        1) 해시·계정상태 조회  2) 계정상태 확인  3) PBKDF2 검증(Java)
     *                        4) 결과 기록(login_result_p : 실패 횟수, 계정 잠금)
     * @param userId        : 사용자ID
     * @param password      : 입력 비밀번호(평문)
     * @return              : RESULT_CD(S:성공, F:실패), RESULT_DESCR(결과메시지)
     * @throws Exception
     */
    @Override
    @Transactional
    public Map<String, Object> checkLogin(String userId, String password) throws Exception {

        // 1. 저장된 비밀번호 해시와 계정 상태 조회 (PASSWORD, USER_YN, LOCK_YN)
        Map<String, Object> user = mapper.selectLoginPassword(userId);

        // 2-1. 미등록 사용자 : 등록 사용자와 응답 시간을 맞추기 위해 더미 검증 수행
        if (user == null) {
            PasswordHasher.dummyVerify(password);
            return result(RESULT_FAIL, MSG_LOGIN_FAIL);
        }

        // 2-2. 사용 종료 계정 (실패 횟수 증가 없음)
        if (!"Y".equals(user.get("USER_YN"))) {
            return result(RESULT_FAIL, "종료된 사용자 계정입니다.");
        }

        // 2-3. 잠긴 계정 (실패 횟수 증가 없음)
        if ("Y".equals(user.get("LOCK_YN"))) {
            return result(RESULT_FAIL, "사용자 계정이 잠겼습니다. 관리자에게 문의해 주세요.");
        }

        // 3. 비밀번호 검증 (Java PBKDF2-SHA256, PL/SQL encode_f 저장 형식과 호환)
        boolean isMatch = PasswordHasher.verify(password, (String) user.get("PASSWORD"));

        // 4. 검증 결과 기록 (bcom.com_user_pkg.login_result_p)
        //    OUT 파라미터 RESULT_CD, RESULT_DESCR는 paramMap에 채워져 돌아옴
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("USER_ID",    userId);
        paramMap.put("SUCCESS_YN", isMatch ? "Y" : "N");

        mapper.loginResult(paramMap);

        log.debug("## [ LOGIN ] 검증 결과 : {} / {}", userId, paramMap.get("RESULT_CD"));

        return result((String) paramMap.get("RESULT_CD"), (String) paramMap.get("RESULT_DESCR"));
    }

    /**
     * @methodName          : selectLoginUserInfo
     * @author              : Built1
     * @date                : 2026.11.16
     * @description         : 로그인 사용자정보(세션정보) 조회
     * @param paramMap      : USER_ID, LANG_CD
     * @return              : 사용자정보 (1건)
     */
    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> selectLoginUserInfo(Map<String, Object> paramMap) {
        return mapper.selectLoginUserInfo(paramMap);
    }

    /**
     * @methodName          : selectAllData
     * @author              : Built1
     * @date                : 2026.11.16
     * @description         : 로그인 후 사용자정보(세션정보), 시스템 프로파일, 메뉴정보 일괄 조회
     * @param paramMap      : USER_ID, LANG_CD
     * @return              : COM_USER_INFO(Map), SYS_PROFILE_LIST(List), COM_USER_MENU_LIST(List)
     */
    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> selectAllData(Map<String, Object> paramMap) {

        Map<String, Object> allDataMap = new HashMap<>();

        // 사용자정보 조회 (1건) : 세션 데이터로 사용
        allDataMap.put("comUserInfo", mapper.selectLoginUserInfo(paramMap));

        // 시스템 프로파일 조회 (목록)
        allDataMap.put("sysProfileList", mapper.selectProfileList());

        // 메뉴정보 조회 (목록)
        // TODO 사용자 → 권한 → 권한별 메뉴 조회로 변경 예정
        Map<String, Object> menuParamMap = new HashMap<>();
        menuParamMap.put("USER_ID", paramMap.get("USER_ID"));
        menuParamMap.put("USER_YN", "Y");

        allDataMap.put("comUserMenuList", mapper.selectMenuList(menuParamMap));

        return allDataMap;
    }

    /**
     * @methodName          : result
     * @description         : 로그인 결과 Map 생성
     * @param resultCd      : 결과코드 (S:성공, F:실패)
     * @param resultDescr   : 결과메시지
     * @return              : RESULT_CD, RESULT_DESCR
     */
    private Map<String, Object> result(String resultCd, String resultDescr) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("RESULT_CD",    resultCd);
        resultMap.put("RESULT_DESCR", resultDescr);

        return resultMap;
    }
}

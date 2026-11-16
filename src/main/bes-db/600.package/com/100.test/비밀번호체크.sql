-- ============================================================================
-- bcom.com_user_pkg 검증 스크립트
--   SQL Developer 에서 F5(스크립트 실행)로 실행
--   마지막에 rollback 하므로 테스트 계정 데이터는 원래대로 돌아감
--   v_user 에 실제 존재하는 테스트 계정을 지정할 것
-- ============================================================================

set serveroutput on

-- 1. 컴파일 오류 확인 (결과가 없어야 정상)
select name, type, line, position, text
  from all_errors
 where owner = 'BCOM'
   and name  = 'COM_USER_PKG'
 order by type, sequence;

-- 2. 패키지 상태 확인 (PACKAGE, PACKAGE BODY 모두 VALID 여야 정상)
select object_type, status, last_ddl_time
  from all_objects
 where owner       = 'BCOM'
   and object_name = 'COM_USER_PKG';

-- 3. 동작 확인
declare
    v_user      varchar2(50) := 'TEST01';     -- 테스트 계정
    v_cd        varchar2(10);
    v_msg       varchar2(200);
    v_fail      number;
    v_lock      varchar2(1);
    v_pw        varchar2(512);
    v_pass      pls_integer := 0;
    v_total     pls_integer := 0;

    procedure chk(p_name varchar2, p_ok boolean) is
    begin
        v_total := v_total + 1;
        if p_ok then v_pass := v_pass + 1; end if;
        dbms_output.put_line(case when p_ok then 'PASS ' else 'FAIL ' end || p_name);
    end;

    procedure load is
    begin
        select nvl(login_fail_count, 0), nvl(lock_yn, 'N'), password
          into v_fail, v_lock, v_pw
          from bcom.com_user
         where user_id = v_user;
    end;
begin
    -- 3-1. 미등록 사용자 : 성공(Y)으로 넘어와도 F
    bcom.com_user_pkg.login_result_p('NO_SUCH_USER_X', 'Y', v_cd, v_msg);
    chk('미등록 사용자 Y → F', v_cd = 'F');

    -- 3-2. 실패 1회 : 횟수 +1
    update bcom.com_user set login_fail_count = 0, lock_yn = 'N' where user_id = v_user;
    bcom.com_user_pkg.login_result_p(v_user, 'N', v_cd, v_msg);
    load;
    chk('실패 1회 → F, 실패 횟수 1', v_cd = 'F' and v_fail = 1);

    -- 3-3. 성공 : 횟수 초기화
    bcom.com_user_pkg.login_result_p(v_user, 'Y', v_cd, v_msg);
    load;
    chk('성공 → S, 실패 횟수 0', v_cd = 'S' and v_fail = 0);

    -- 3-4. 5회 실패 : 잠금
    for i in 1 .. 5 loop
        bcom.com_user_pkg.login_result_p(v_user, 'N', v_cd, v_msg);
    end loop;
    load;
    chk('5회 실패 → 잠금 Y, 잠금 메시지', v_lock = 'Y' and v_msg like '%잠겼%');

    -- 3-5. 비밀번호 변경 : 저장 형식 확인 (약 7초 소요)
    bcom.com_user_pkg.change_password_p(v_user, 'Test1234!', 'TEST', v_cd, v_msg);
    load;
    chk('비밀번호 변경 → S', v_cd = 'S');
    chk('저장 형식 PBKDF2-SHA256$210000$SALT32$HASH64',
        regexp_like(v_pw, '^PBKDF2-SHA256\$210000\$[0-9A-F]{32}\$[0-9A-F]{64}$'));

    -- 3-6. 비밀번호 규칙
    bcom.com_user_pkg.change_password_p(v_user, 'short', 'TEST', v_cd, v_msg);
    chk('8자 미만 비밀번호 → F', v_cd = 'F');

    dbms_output.put_line('결과 : ' || v_pass || ' / ' || v_total);

    -- 테스트 데이터 원복
    rollback;
end;
/

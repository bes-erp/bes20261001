PL/SQL Developer Test script 3.0
7
BEGIN
    -- Call the procedure
    COM_USER_PKG.LOGIN_PASSWORD_P(P_USER_ID      => :P_USER_ID
                                 ,P_PASSWORD     => :P_PASSWORD
                                 ,P_RESULT_CD    => :P_RESULT_CD
                                 ,P_RESULT_DESCR => :P_RESULT_DESCR);
END;
4
p_user_id
1
TEST01
5
p_password
1
Test1234!
5
p_result_cd
1
S
5
p_result_descr
1
로그인에 성공했습니다.
5
0

PL/SQL Developer Test script 3.0
8
begin
  -- Call the procedure
  bcom.com_user_pkg.change_password_p(p_user_id => :p_user_id,
                                      p_password => :p_password,
                                      p_update_by => :p_update_by,
                                      p_result_cd => :p_result_cd,
                                      p_result_descr => :p_result_descr);
end;
5
p_user_id
1
TEST01
5
p_password
1
test1234!
5
p_update_by
1
ADMIN
5
p_result_cd
1
S
5
p_result_descr
1
비밀번호가 변경되었습니다.
5
0

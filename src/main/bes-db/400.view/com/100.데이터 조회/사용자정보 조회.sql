-- 데이터 조회
select cuiv.user_id
      ,cuiv.user_nm
      ,cuiv.emp_id
      ,cuiv.emp_num
      ,cuiv.emp_nm
      ,cuiv.company_cd
      ,cuiv.company_nm
      ,cuiv.dept_cd
      ,cuiv.dept_nm
      ,cuiv.grade_cd
      ,cuiv.grade_nm
      ,cuiv.job_cd
      ,cuiv.job_nm
      ,cuiv.position_cd
      ,cuiv.position_nm
      ,cuiv.hire_date
      ,cuiv.retire_date
      ,cuiv.supervisor_emp_id
      ,cuiv.supervisor_emp_num
      ,cuiv.supervisor_emp_nm
  from com_user_info_v cuiv
 where 1=1;

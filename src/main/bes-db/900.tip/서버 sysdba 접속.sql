-- 서버 : bes
sqlplus sys@//210.112.232.44:1531/bes as sysdba


-- 로컬 서버 : orcl
sqlplus / as sysdba
alter user system identified by "manager";
alter user bsys identified by "bsys";
alter user bcom identified by "bcom";
grant execute on sys.dbms_crypto to bsys;
grant execute on sys.dbms_crypto to bcom;


SELECT instance_name, host_name, version, status
  FROM v$instance;
  
SELECT SYS_CONTEXT('USERENV', 'SERVER_HOST') AS server_host,
       SYS_CONTEXT('USERENV', 'DB_NAME')     AS db_name,
       SYS_CONTEXT('USERENV', 'SERVICE_NAME') AS service_name,
       SYS_CONTEXT('USERENV', 'IP_ADDRESS')  AS client_ip,
       SYS_CONTEXT('USERENV', 'HOST')        AS client_host
  FROM dual;
  
select df.status    as "상태"
      ,df.enabled   as "읽기쓰기"
      ,df.name      as "파일경로"
      ,ts.name      as "테이블스페이스명"
  from v$datafile df
       inner join v$tablespace ts on ts.ts# = df.ts#
 where 1=1
   and ts.name like 'bes_%'
;

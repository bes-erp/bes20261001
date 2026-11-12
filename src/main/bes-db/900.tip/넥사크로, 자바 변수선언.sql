with col as (
    select c.owner
         , c.table_name
         , c.column_id
         , c.column_name
         , c.data_type
         , c.data_precision
         , c.data_scale
         , c.char_length
         , replace(initcap(c.column_name), '_', '') as pascal_nm
         -- 타입별 접두어
         , case
             when c.data_type in ('VARCHAR2','NVARCHAR2','CHAR','NCHAR','CLOB','NCLOB','LONG','ROWID') then 's'
             when c.data_type in ('NUMBER','FLOAT','BINARY_FLOAT','BINARY_DOUBLE')                     then 'n'
             when c.data_type = 'DATE' or c.data_type like 'TIMESTAMP%'                                then 'd'
             when c.data_type in ('BLOB','RAW','LONG RAW')                                             then 'o'
             else                                                                                           's'
           end as prefix
      from all_tab_columns c
     where 1=1
       and (c.owner, c.table_name) in (
                                       select table_owner, table_name
                                         from all_synonyms
                                        where 1=1
                                          and synonym_name = upper('COM_USER_INFO_V')   -- << 요기 바꿔주면 되요 >>
                                          and owner        in (user, 'PUBLIC')
                                       )
)
select owner                     as "소유자"
     , table_name                as "오브젝트명"
     , column_id                 as "컬럼순서"
     , column_name               as "넥사크로-데이터셋"
     , prefix || pascal_nm       as "넥사크로변수"
     , prefix || pascal_nm       as "자바변수"
     , data_type || case when data_type in ('VARCHAR2','NVARCHAR2','CHAR','NCHAR') then '(' || char_length || ')'
                         when data_type = 'NUMBER' and data_precision is not null  then '(' || data_precision || nvl2(nullif(data_scale, 0), ',' || data_scale, '') || ')'
                    end          as "데이터유형"
  from col
 order by column_id;

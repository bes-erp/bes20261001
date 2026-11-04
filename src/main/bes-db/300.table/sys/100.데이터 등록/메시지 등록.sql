select sm.*
      ,sm.rowid
  from sys_message sm
 where 1=1
 order by sm.message_num
;

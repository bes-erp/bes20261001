package erp.core.exh;

/**
* =====================================================================================
* @packageName    		: erp.core.exh
* @fileName       		: DbException.java
* @author         		: Built1
* @date           		: 2026.11.07
* @description    		: 데이테베이스 오류내역을 사용자 메시지로 전환하는 클래스
* =====================================================================================
* 수정일자         		수정자             수정내용
* -------------------------------------------------------------------------------------
* 2026.11.07        	Built1             최초 생성
*/
public class DbException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	/**
	 * @description    		: 부모 클래스(DataAccessException)의 생성자를 호출
	 * @param e
	 */
	public DbException(Exception e) {
        super(getErrorMessage(e));
    }
	
	/**
	* @methodName     		: getErrorMessage
	* @author         		: built1
	* @date           		: 2026.11.07
	* @description    		: 데이테베이스 오류내역을 사용자 메시지로 전환하는 함수
	* @param e
	* @return
	*/
	private static String getErrorMessage(Exception e) {

        String sMessage = e.getMessage();

        if (sMessage != null) {
            if (sMessage.contains("ORA-00001")) {
                return "이미 등록된 데이터입니다.";
            }

            if (sMessage.contains("ORA-00904")) {
                return "테이블과 불일치하는 컬럼이 존재합니다.";
            }

            if (sMessage.contains("ORA-00942")) {
                return "테이블 또는 뷰가 존재하지 않습니다.";
            }
            
            if (sMessage.contains("ORA-01407")) {
                return "필수 항목을 입력하시기 바랍니다.";
            }

            if (sMessage.contains("ORA-02292")) {
                return "참조 데이터가 존재하여 삭제할 수 없습니다.";
            }

            if (sMessage.contains("ORA-12899")) {
                return "입력 가능한 길이를 초과하였습니다.";
            }
        }

        return "시스템 오류가 발생하였습니다.\n관리자에게 문의하시기 바랍니다.";
    }
}


package erp.com.service.impl;

import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface LoginMapper {
    void loginPassword(Map<String, Object> paramMap);
}

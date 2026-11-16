package erp.core.util;

import java.security.MessageDigest;
import java.security.SecureRandom;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.apache.commons.codec.binary.Hex;

public final class PasswordHasher {

	    private static final String ALGORITHM   = "PBKDF2-SHA256";
	    private static final int    ITERATIONS  = 210000;
	    private static final int    SALT_LENGTH = 16;
	    private static final int    HASH_LENGTH = 32;

	    private static final SecureRandom RANDOM = new SecureRandom();

	    // 미등록 사용자도 동일한 시간이 걸리도록 하는 더미 해시
	    private static final String DUMMY_HASH = encode("dummy-password-for-timing");

	    private PasswordHasher() {}

	    /** 비밀번호 저장 문자열 생성 */
	    public static String encode(String password) {
	        byte[] salt = new byte[SALT_LENGTH];
	        RANDOM.nextBytes(salt);
	        byte[] hash = pbkdf2(password, salt, ITERATIONS, HASH_LENGTH);

	        return ALGORITHM
	             + "$" + ITERATIONS
	             + "$" + Hex.encodeHexString(salt, false)
	             + "$" + Hex.encodeHexString(hash, false);
	    }

	    /** 저장된 비밀번호 검증 */
	    public static boolean verify(String password, String stored) {
	        if (password == null || stored == null) {
	            return false;
	        }
	        try {
	            String[] parts = stored.split("\\$");
	            if (parts.length != 4 || !ALGORITHM.equals(parts[0])) {
	                return false;
	            }

	            int iterations = Integer.parseInt(parts[1]);
	            if (iterations < 100000 || iterations > 2000000) {
	                return false;
	            }

	            byte[] salt     = Hex.decodeHex(parts[2]);
	            byte[] expected = Hex.decodeHex(parts[3]);
	            byte[] actual   = pbkdf2(password, salt, iterations, expected.length);

	            return MessageDigest.isEqual(expected, actual);   // 타이밍 공격 방지 비교
	        } catch (Exception e) {
	            return false;
	        }
	    }

	    /** 미등록 사용자 처리용 (응답 시간 균일화) */
	    public static void dummyVerify(String password) {
	        verify(password == null ? "" : password, DUMMY_HASH);
	    }

	    private static byte[] pbkdf2(String password, byte[] salt, int iterations, int length) {
	        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iterations, length * 8);
	        try {
	            return SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256")
	                                   .generateSecret(spec)
	                                   .getEncoded();
	        } catch (Exception e) {
	            throw new IllegalStateException("PBKDF2 계산 실패", e);
	        } finally {
	            spec.clearPassword();
	        }
	    }
}

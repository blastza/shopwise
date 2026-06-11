package com.shopwise.auth.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class JwtUtilTest {

    private JwtUtil jwtUtil;

    private static final String SECRET =
            "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

    private static final long EXPIRATION = 86400000L; // 24 hours

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil(SECRET, EXPIRATION);
    }

    @Test
    @DisplayName("Should generate a non-null token")
    void shouldGenerateToken() {
        String token = jwtUtil.generateToken("test@shopwise.com", "CUSTOMER");
        assertThat(token).isNotNull().isNotEmpty();
    }

    @Test
    @DisplayName("Should extract correct email from token")
    void shouldExtractEmail() {
        String email = "lda@shopwise.com";
        String token = jwtUtil.generateToken(email, "CUSTOMER");

        String extracted = jwtUtil.extractEmail(token);

        assertThat(extracted).isEqualTo(email);
    }

    @Test
    @DisplayName("Should extract correct role from token")
    void shouldExtractRole() {
        String token = jwtUtil.generateToken("admin@shopwise.com", "ADMIN");

        String role = jwtUtil.extractRole(token);

        assertThat(role).isEqualTo("ADMIN");
    }

    @Test
    @DisplayName("Should return true for a valid token")
    void shouldValidateValidToken() {
        String token = jwtUtil.generateToken("test@shopwise.com", "CUSTOMER");

        boolean isValid = jwtUtil.isTokenValid(token);

        assertThat(isValid).isTrue();
    }

    @Test
    @DisplayName("Should return false for a tampered token")
    void shouldRejectTamperedToken() {
        String token = jwtUtil.generateToken("test@shopwise.com", "CUSTOMER");
        String tampered = token + "tampered";

        boolean isValid = jwtUtil.isTokenValid(tampered);

        assertThat(isValid).isFalse();
    }

    @Test
    @DisplayName("Should return false for an expired token")
    void shouldRejectExpiredToken() {
        // Create JwtUtil with 1ms expiration — expires instantly
        JwtUtil shortLivedJwt = new JwtUtil(SECRET, 1L);
        String token = shortLivedJwt.generateToken("test@shopwise.com", "CUSTOMER");

        // Wait for it to expire
        try { Thread.sleep(10); } catch (InterruptedException ignored) {}

        boolean isValid = shortLivedJwt.isTokenValid(token);

        assertThat(isValid).isFalse();
    }
}

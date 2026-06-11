package com.shopwise.auth.security;

import com.shopwise.auth.dto.AuthResponse;
import com.shopwise.auth.dto.LoginRequest;
import com.shopwise.auth.dto.RegisterRequest;
import com.shopwise.auth.model.User;
import com.shopwise.auth.repository.UserRepository;
import com.shopwise.auth.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User existingUser;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setEmail("lda@shopwise.com");
        registerRequest.setPassword("password123");
        registerRequest.setFirstName("Lda");
        registerRequest.setLastName("Muleli");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("lda@shopwise.com");
        loginRequest.setPassword("password123");

        existingUser = User.builder()
                .email("lda@shopwise.com")
                .passwordHash("hashed_password")
                .firstName("Lda")
                .lastName("Muleli")
                .role(User.Role.CUSTOMER)
                .build();
    }

    @Test
    @DisplayName("Should register a new user and return token")
    void shouldRegisterNewUser() {
        // Arrange — set up what mocks should return
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashed_password");
        when(userRepository.save(any(User.class))).thenReturn(existingUser);
        when(jwtUtil.generateToken(anyString(), anyString())).thenReturn("mock.jwt.token");

        // Act — call the method we're testing
        AuthResponse response = authService.register(registerRequest);

        // Assert — verify the result
        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("mock.jwt.token");
        assertThat(response.getEmail()).isEqualTo("lda@shopwise.com");
        assertThat(response.getRole()).isEqualTo("CUSTOMER");

        // Verify save was called exactly once
        verify(userRepository, times(1)).save(any(User.class));
        // Verify password was hashed
        verify(passwordEncoder, times(1)).encode("password123");
    }

    @Test
    @DisplayName("Should throw exception when email already exists")
    void shouldThrowWhenEmailAlreadyExists() {
        // Arrange
        when(userRepository.existsByEmail("lda@shopwise.com")).thenReturn(true);

        // Act & Assert — expect an exception
        assertThatThrownBy(() -> authService.register(registerRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Email already registered");

        // Verify save was NEVER called
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Should login successfully with correct credentials")
    void shouldLoginWithCorrectCredentials() {
        // Arrange
        when(userRepository.findByEmail("lda@shopwise.com"))
                .thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches("password123", "hashed_password"))
                .thenReturn(true);
        when(jwtUtil.generateToken(anyString(), anyString()))
                .thenReturn("mock.jwt.token");

        // Act
        AuthResponse response = authService.login(loginRequest);

        // Assert
        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("mock.jwt.token");
        assertThat(response.getEmail()).isEqualTo("lda@shopwise.com");
    }

    @Test
    @DisplayName("Should throw exception for wrong password")
    void shouldThrowForWrongPassword() {
        // Arrange
        when(userRepository.findByEmail("lda@shopwise.com"))
                .thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches(anyString(), anyString()))
                .thenReturn(false); // Wrong password

        // Act & Assert
        assertThatThrownBy(() -> authService.login(loginRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Invalid email or password");
    }

    @Test
    @DisplayName("Should throw exception for non-existent email")
    void shouldThrowForNonExistentEmail() {
        // Arrange
        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.empty()); // User not found

        // Act & Assert
        assertThatThrownBy(() -> authService.login(loginRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Invalid email or password");
    }
}

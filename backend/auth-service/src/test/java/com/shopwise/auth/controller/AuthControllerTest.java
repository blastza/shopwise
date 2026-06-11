package com.shopwise.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopwise.auth.config.SecurityConfig;
import com.shopwise.auth.dto.AuthResponse;
import com.shopwise.auth.dto.LoginRequest;
import com.shopwise.auth.dto.RegisterRequest;
import com.shopwise.auth.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@Import(SecurityConfig.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AuthService authService;

    @Test
    @DisplayName("POST /api/auth/register should return 201 with token")
    void shouldRegisterAndReturn201() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("lda@shopwise.com");
        request.setPassword("password123");
        request.setFirstName("Lda");
        request.setLastName("Muleli");

        AuthResponse mockResponse = AuthResponse.builder()
                .token("mock.jwt.token")
                .email("lda@shopwise.com")
                .role("CUSTOMER")
                .firstName("Lda")
                .lastName("Muleli")
                .build();

        when(authService.register(any(RegisterRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").value("mock.jwt.token"))
                .andExpect(jsonPath("$.email").value("lda@shopwise.com"))
                .andExpect(jsonPath("$.role").value("CUSTOMER"));
    }

    @Test
    @DisplayName("POST /api/auth/register should return 400 for invalid email")
    void shouldReturn400ForInvalidEmail() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("not-an-email");
        request.setPassword("password123");
        request.setFirstName("Lda");
        request.setLastName("Muleli");

        mockMvc.perform(post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /api/auth/register should return 400 for short password")
    void shouldReturn400ForShortPassword() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("lda@shopwise.com");
        request.setPassword("short");
        request.setFirstName("Lda");
        request.setLastName("Muleli");

        mockMvc.perform(post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /api/auth/login should return 200 with token")
    void shouldLoginAndReturn200() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("lda@shopwise.com");
        request.setPassword("password123");

        AuthResponse mockResponse = AuthResponse.builder()
                .token("mock.jwt.token")
                .email("lda@shopwise.com")
                .role("CUSTOMER")
                .firstName("Lda")
                .lastName("Muleli")
                .build();

        when(authService.login(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.email").value("lda@shopwise.com"));
    }

    @Test
    @DisplayName("GET /api/auth/health should return UP")
    void shouldReturnHealthStatus() throws Exception {
        mockMvc.perform(get("/api/auth/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"));
    }
}

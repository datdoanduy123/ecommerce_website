package com.local.Ecommercial.controller;

import com.local.Ecommercial.customer.CustomerResponse;
import com.local.Ecommercial.dto.AuthRequest;
import com.local.Ecommercial.dto.AuthResponse;
import com.local.Ecommercial.dto.JwtGenerateRequest;
import com.local.Ecommercial.repository.UserRepository;
import com.local.Ecommercial.user.Role;
import com.local.Ecommercial.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final WebClient jwtWebClient;
    private final WebClient customerServiceWebClient;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody AuthRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        String token = jwtWebClient.post()
                .uri("/generate")
                .bodyValue(new JwtGenerateRequest(user.getId(), user.getUsername(), user.getRole().name()))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return new AuthResponse(token, user.getRole().name(), null);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Bad credentials");
        }

        // Gọi JWT service để tạo token
        String token = jwtWebClient.post()
                .uri("/generate")
                .bodyValue(new JwtGenerateRequest(user.getId(), user.getUsername(), user.getRole().name()))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        CustomerResponse customer = null;

        // Nếu user là USER, gọi sang customer-service để lấy thông tin
        if (user.getRole() == Role.USER) {
            customer = customerServiceWebClient
                    .get()
                    .uri("/user/{id}", user.getId())
                    .retrieve()
                    .bodyToMono(CustomerResponse.class)
                    .block();
        }

        return new AuthResponse(token, user.getRole().name(), customer);
    }

}

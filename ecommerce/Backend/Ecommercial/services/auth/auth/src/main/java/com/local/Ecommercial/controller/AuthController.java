package com.local.Ecommercial.controller;

import com.local.Ecommercial.customer.CustomerRequest;
import com.local.Ecommercial.customer.CustomerResponse;
import com.local.Ecommercial.dto.AuthRequest;
import com.local.Ecommercial.dto.AuthResponse;
import com.local.Ecommercial.repository.UserRepository;
import com.local.Ecommercial.security.JwtUtil;
import com.local.Ecommercial.user.Role;
import com.local.Ecommercial.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;


@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    private final WebClient customerServiceWebClient; // <== Khai báo biến này


    public AuthController(
            UserRepository userRepository,
            JwtUtil jwtUtil,
            BCryptPasswordEncoder passwordEncoder,
            WebClient customerServiceWebClient // <== Inject qua constructor
    ) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.customerServiceWebClient = customerServiceWebClient;
    }


    @PostMapping("/register")
    public AuthResponse register(@RequestBody AuthRequest request) {
        // Lưu user vào DB auth-service
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        User savedUser = userRepository.save(user);

        // Tạo CustomerRequest
        CustomerRequest customerRequest = new CustomerRequest(
                savedUser.getId(),
                request.getUsername(),
                request.getEmail(),
                request.getPhoneNumber(),
                request.getDateOfBirth(),
                request.getAddress()
        );

        // Gửi POST sang customer-service
        customerServiceWebClient.post()
                .bodyValue(customerRequest)
                .retrieve()
                .toBodilessEntity()
                .block();  // block() để chạy đồng bộ

        // Phản hồi client
        return new AuthResponse(
                jwtUtil.generateToken(savedUser),
                savedUser.getRole().name(),
                null

        );
    }


    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Bad credentials");
        }
        CustomerResponse customer = null;
        if (user.getRole() == Role.USER) {
            customer = customerServiceWebClient
                    .get()
                    .uri("/user/{id}", user.getId())
                    .retrieve()
                    .bodyToMono(CustomerResponse.class)
                    .block();
        }

        return new AuthResponse(jwtUtil.generateToken(user), user.getRole().name(), customer);
    }

}
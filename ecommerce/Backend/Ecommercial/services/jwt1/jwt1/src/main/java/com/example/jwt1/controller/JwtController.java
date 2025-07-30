package com.example.jwt1.controller;

import com.example.jwt1.dto.JwtGenerateRequest;
import com.example.jwt1.dto.JwtValidateRequest;
import com.example.jwt1.dto.JwtValidateResponse;
import com.example.jwt1.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/jwt")
@RequiredArgsConstructor
public class JwtController {
    private final JwtService jwtService;

    @PostMapping("/generate")
    public String generate(@RequestBody JwtGenerateRequest request) {
        return jwtService.generateToken(request.getUserId(), request.getUsername(), request.getRole());
    }

    @PostMapping("/validate")
    public JwtValidateResponse validate(@RequestBody JwtValidateRequest request) {
        var claims = jwtService.extractAllClaims(request.getToken());
        Long userId = claims.get("userId", Long.class);
        String username = claims.getSubject();
        String role = claims.get("role", String.class);
        return new JwtValidateResponse(userId, username, role);
    }
}

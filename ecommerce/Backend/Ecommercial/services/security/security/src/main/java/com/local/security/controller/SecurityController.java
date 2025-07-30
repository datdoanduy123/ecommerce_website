package com.local.security.controller;

import com.local.security.dto.JwtGenerateRequest;
import com.local.security.dto.JwtValidateRequest;
import com.local.security.dto.JwtValidateResponse;
import com.local.security.service.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/jwt")
@RequiredArgsConstructor
public class SecurityController {

    private final SecurityService jwtService;

    @PostMapping("/generate")
    public String generate(@RequestBody JwtGenerateRequest request) {
        return jwtService.generateToken(request.getUserId(), request.getRole());
    }

    @PostMapping("/validate")
    public JwtValidateResponse validate(@RequestBody JwtValidateRequest request) {
        String userId = jwtService.validateTokenAndExtractUserId(request.getToken());
        String role = jwtService.extractRole(request.getToken());
        return new JwtValidateResponse(userId, role);
    }
}

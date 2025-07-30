package com.example.jwt1.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtValidateResponse {
    private Long userId;
    private String username;
    private String role;
}

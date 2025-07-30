package com.example.jwt1.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtGenerateRequest {
    private Long userId;
    private String username;
    private String role;
}

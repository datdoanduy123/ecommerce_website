package com.local.security.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtValidateResponse{
    private Long userId;
    private String role;

    public JwtValidateResponse(String userId, String role) {
        this.userId = Long.parseLong(userId);
        this.role = role;
    }
}

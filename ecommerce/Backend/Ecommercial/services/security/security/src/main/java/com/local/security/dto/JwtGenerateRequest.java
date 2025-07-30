package com.local.security.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtGenerateRequest {
        Long userId;
        String role;
}

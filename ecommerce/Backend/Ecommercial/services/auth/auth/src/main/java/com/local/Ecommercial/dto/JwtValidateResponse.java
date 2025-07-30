package com.local.Ecommercial.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class JwtValidateResponse{
    private Long userId;
    private String username;
    private String role;


}

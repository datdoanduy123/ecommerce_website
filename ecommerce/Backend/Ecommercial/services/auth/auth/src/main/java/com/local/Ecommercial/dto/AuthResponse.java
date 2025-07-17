package com.local.Ecommercial.dto;


import com.local.Ecommercial.customer.CustomerResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String role;
    private CustomerResponse customer;
}
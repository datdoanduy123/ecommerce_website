package com.local.Ecommercial.dto;

import com.local.Ecommercial.user.Address;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AuthRequest {
    private String username;
    private String password;

    private String email;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private Address address;

}
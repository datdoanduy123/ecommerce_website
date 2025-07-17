package com.local.Ecommercial.customer;

import com.local.Ecommercial.user.Address;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record CustomerRequest (
        Long userId,
        String username,
        String email,
        String phoneNumber,
        LocalDate dateOfBirth,
        Address address )
{}

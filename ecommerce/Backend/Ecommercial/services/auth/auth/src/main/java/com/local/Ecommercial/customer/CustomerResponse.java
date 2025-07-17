package com.local.Ecommercial.customer;

import com.local.Ecommercial.user.Address;

import java.time.LocalDate;

public record CustomerResponse(
        Long userId,
        String username,
        String email,
        String phoneNumber,
        LocalDate dateOfBirth,
        Address address
        ) {
}

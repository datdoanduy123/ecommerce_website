    package com.local.Ecommercial.dto;

    import com.local.Ecommercial.customer.Address;

    import java.time.LocalDate;
    import java.time.LocalDateTime;

    public record CustomerRequest(
            Integer userId,
            String username,
            String email,
            String phoneNumber,
            LocalDate dateOfBirth,
            Address address
    ) {
    }

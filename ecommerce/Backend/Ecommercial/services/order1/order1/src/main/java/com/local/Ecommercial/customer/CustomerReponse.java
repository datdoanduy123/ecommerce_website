package com.local.Ecommercial.customer;

import java.time.LocalDate;

public record CustomerReponse(
        Integer id,
        String username,
        String phoneNumber,
        LocalDate dateOfBirth,
        Address address
) {
}

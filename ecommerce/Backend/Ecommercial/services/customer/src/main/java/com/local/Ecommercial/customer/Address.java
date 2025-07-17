package com.local.Ecommercial.customer;

import jakarta.persistence.Embeddable;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Embeddable

public class Address {
    private String houseNumber;
    private String city;
    private String street;

}

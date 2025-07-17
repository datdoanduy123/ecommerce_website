package com.local.Ecommercial.user;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Address {
    private String houseNumber;
    private String city;
    private String street;

}
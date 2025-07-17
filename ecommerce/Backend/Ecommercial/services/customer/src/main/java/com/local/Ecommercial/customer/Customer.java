package com.local.Ecommercial.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "customers") // tên bảng
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Customer {

    @Id
    private Integer userId;

    private String username;
    private String email;
    private String phoneNumber;
    private LocalDate dateOfBirth;

    @Embedded
    private Address address;

}

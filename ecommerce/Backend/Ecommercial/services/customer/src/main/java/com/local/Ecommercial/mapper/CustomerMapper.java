package com.local.Ecommercial.mapper;

import com.local.Ecommercial.customer.Customer;
import com.local.Ecommercial.dto.CustomerReponse;
import com.local.Ecommercial.dto.CustomerRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerMapper {
    public Customer toCustomer(CustomerRequest request) {
        if(request == null){
            return null;
        }
        return Customer.builder()
                .userId(request.userId())
                .username(request.username())
                .email(request.email())
                .phoneNumber(request.phoneNumber())
                .address(request.address())
                .dateOfBirth(request.dateOfBirth())
                .build();
    }

    public CustomerReponse fromCustomer(Customer customer) {
        if (customer == null) return null;
        return new CustomerReponse(
                customer.getUserId(),
                customer.getUsername(),
                customer.getEmail(),
                customer.getPhoneNumber(),
                customer.getDateOfBirth(),
                customer.getAddress()
        );
    }


}

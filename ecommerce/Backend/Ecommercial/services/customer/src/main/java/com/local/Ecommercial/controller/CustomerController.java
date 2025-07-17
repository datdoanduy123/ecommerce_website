package com.local.Ecommercial.controller;

import com.local.Ecommercial.customer.Customer;
import com.local.Ecommercial.dto.CustomerReponse;
import com.local.Ecommercial.dto.CustomerRequest;
import com.local.Ecommercial.exceptions.CustomerException;
import com.local.Ecommercial.mapper.CustomerMapper;
import com.local.Ecommercial.responitory.CustomerRepository;
import com.local.Ecommercial.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @PostMapping
    public ResponseEntity<CustomerReponse> createCustomer(@RequestBody CustomerRequest request) {
        Customer saved = customerService.createCustomer(request);
        return ResponseEntity.ok(customerMapper.fromCustomer(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }


    @PutMapping
    public ResponseEntity<Void> updateCustomer(
            @RequestBody @Valid CustomerRequest customerRequest
    ) {
        customerService.updateCustomer(customerRequest);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerReponse> getCustomerById (@PathVariable Integer id) {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<CustomerReponse> getCustomerByUserId (@PathVariable Integer id) {
        Customer customer = customerRepository.findByUserId(id)
                .orElseThrow(() -> new CustomerException("Id cua Customer not found"));

        return ResponseEntity.ok(customerMapper.fromCustomer(customer));
    }


    @GetMapping
    public ResponseEntity<Page<CustomerReponse>> getAllCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(customerService.getAllCustomer(page, size));
    }

}

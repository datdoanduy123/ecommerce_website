package com.local.Ecommercial.service;

import com.local.Ecommercial.customer.Customer;
import com.local.Ecommercial.dto.CustomerReponse;
import com.local.Ecommercial.dto.CustomerRequest;
import com.local.Ecommercial.exceptions.CustomerException;
import com.local.Ecommercial.mapper.CustomerMapper;
import com.local.Ecommercial.responitory.CustomerRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public Customer createCustomer(CustomerRequest request) {
        if (customerRepository.existsById(request.userId())) {
            throw new CustomerException("Customer with id " + request.userId() + " already exists");
        }
        return customerRepository.save(customerMapper.toCustomer(request));
    }



    public void updateCustomer(@Valid CustomerRequest request){
        var customer = customerRepository.findById(request.userId())
                .orElseThrow(() -> new CustomerException(
                        "Customer with id " + request.userId() + " not found"));
        mergeCustomer(customer, request);
        customerRepository.save(customer);
    }

    private void mergeCustomer(Customer customer, CustomerRequest request) {
        if(StringUtils.isNotBlank(request.username())) {
            customer.setUsername(request.username());
        }
        if(StringUtils.isNotBlank(request.email())) {
            customer.setEmail(request.email());
        }
        if(StringUtils.isNotBlank(request.phoneNumber())) {
            customer.setPhoneNumber(request.phoneNumber());
        }
        if (request.dateOfBirth() != null) {
            customer.setDateOfBirth(request.dateOfBirth());
        }
        if (request.address() != null) {
            customer.setAddress(request.address());
        }
    }

    public CustomerReponse getCustomerById(Integer id) {

        var customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerException("Khong tim thay customer with id " + id + " not found"));

        return customerMapper.fromCustomer(customer);
    }

    public Page<CustomerReponse> getAllCustomer(int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by("userId").descending());
        Page<Customer> customerPage = customerRepository.findAll(pageable);
        return customerPage.map(customerMapper::fromCustomer);
    }

    public void deleteCustomer(Integer id) {
        var customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerException("Customer not found"));
        customerRepository.delete(customer);
    }

}

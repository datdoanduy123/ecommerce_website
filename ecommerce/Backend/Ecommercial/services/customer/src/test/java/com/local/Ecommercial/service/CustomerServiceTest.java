package com.local.Ecommercial.service;

import com.local.Ecommercial.customer.Address;
import com.local.Ecommercial.customer.Customer;
import com.local.Ecommercial.dto.CustomerReponse;
import com.local.Ecommercial.dto.CustomerRequest;
import com.local.Ecommercial.exceptions.CustomerException;
import com.local.Ecommercial.mapper.CustomerMapper;
import com.local.Ecommercial.responitory.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.*;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CustomerServiceTest {



    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CustomerMapper customerMapper;

    @InjectMocks
    private CustomerService customerService;

    private AutoCloseable closeable;

    @BeforeEach
    void setup() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    Address address = Address.builder()
            .houseNumber("123")
            .street("Main Street")
            .city("New York")
            .build();

    @Test
    void testCreateCustomer_Success() {
        CustomerRequest request = new CustomerRequest(1, "John", "john@example.com", "1234567890", LocalDate.of(2000, 1, 1), address);
        Customer customer = new Customer();
        when(customerRepository.existsById(request.userId())).thenReturn(false);
        when(customerMapper.toCustomer(request)).thenReturn(customer);
        when(customerRepository.save(customer)).thenReturn(customer);

        Customer result = customerService.createCustomer(request);

        assertEquals(customer, result);
        verify(customerRepository).save(customer);
    }



    @Test
    void testUpdateCustomer_Success() {
        CustomerRequest request = new CustomerRequest(1, "John", "john@example.com", "1234567890", LocalDate.of(2000, 1, 1), address);
        Customer customer = new Customer();
        when(customerRepository.findById(request.userId())).thenReturn(Optional.of(customer));
        when(customerRepository.save(customer)).thenReturn(customer);

        customerService.updateCustomer(request);

        verify(customerRepository).save(customer);
        assertEquals("John", customer.getUsername());
        assertEquals("john@example.com", customer.getEmail());
    }

    @Test
    void testUpdateCustomer_NotFound() {
        CustomerRequest request = new CustomerRequest(2, "Alice", null, null, null, null);
        when(customerRepository.findById(request.userId())).thenReturn(Optional.empty());

        assertThrows(CustomerException.class, () -> {
            customerService.updateCustomer(request);
        });
    }

    @Test
    void testGetCustomerById_Success() {
        Customer customer = new Customer();
        CustomerReponse response = new CustomerReponse(1, "John", "john@example.com", "1234567890", LocalDate.of(2000, 1, 1), address);

        when(customerRepository.findById(1)).thenReturn(Optional.of(customer));
        when(customerMapper.fromCustomer(customer)).thenReturn(response);

        CustomerReponse result = customerService.getCustomerById(1);

        assertEquals(response, result);
    }

    @Test
    void testGetCustomerById_NotFound() {
        when(customerRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(CustomerException.class, () -> {
            customerService.getCustomerById(1);
        });
    }

    @Test
    void testGetAllCustomer_Success() {
        Customer customer = new Customer();
        CustomerReponse response = new CustomerReponse(1, "John", "john@example.com", "1234567890", LocalDate.of(2000, 1, 1), address);

        Page<Customer> customerPage = new PageImpl<>(List.of(customer));
        when(customerRepository.findAll(any(Pageable.class))).thenReturn(customerPage);
        when(customerMapper.fromCustomer(customer)).thenReturn(response);

        Page<CustomerReponse> result = customerService.getAllCustomer(0, 10);

        assertEquals(1, result.getContent().size());
        assertEquals(response, result.getContent().get(0));
    }

    @Test
    void testDeleteCustomer_Success() {
        Customer customer = new Customer();
        when(customerRepository.findById(1)).thenReturn(Optional.of(customer));

        customerService.deleteCustomer(1);

        verify(customerRepository).delete(customer);
    }

    @Test
    void testDeleteCustomer_NotFound() {
        when(customerRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(CustomerException.class, () -> {
            customerService.deleteCustomer(1);
        });
    }
}

package com.local.Ecommercial.controller;

import com.local.Ecommercial.config.RestTemplateConfig;
import com.local.Ecommercial.customer.CustomerReponse;
import com.local.Ecommercial.dto.OrderReponse;
import com.local.Ecommercial.dto.OrderRequest;
import com.local.Ecommercial.orderLine.OrderLineResponse;
import com.local.Ecommercial.product.PurchaseRequest;
import com.local.Ecommercial.product.PurchaseResponse;
import com.local.Ecommercial.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final RestTemplate restTemplate;
    private final OrderService service;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(service.createOrder(request));
    }

    @GetMapping
    public ResponseEntity<List<OrderReponse>> getAllOrder(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(service.getAllOrder());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderReponse> getOrderById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getOrderById(id));
    }

    @GetMapping("/customer/{customerId}")

    public ResponseEntity<List<OrderReponse>> getOrdersByCustomerId(@PathVariable Integer customerId) {
        return ResponseEntity.ok(service.getOrdersByCustomerId(customerId));
    }
}
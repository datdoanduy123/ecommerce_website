package com.local.payment.config;


import com.local.payment.dto.OrderResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(name = "order-service")
public interface OrderClient {
    @GetMapping("/api/v1/orders/{id}")
    OrderResponse getOrderById(@PathVariable("id") Integer id);
}

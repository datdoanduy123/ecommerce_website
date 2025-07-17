package com.local.Ecommercial.service;

import com.local.Ecommercial.customer.CustomerReponse;
import com.local.Ecommercial.dto.OrderReponse;
import com.local.Ecommercial.dto.OrderRequest;
import com.local.Ecommercial.entity.Order;
import com.local.Ecommercial.mapper.OrderMapper;
import com.local.Ecommercial.orderLine.OrderLine;
import com.local.Ecommercial.entity.OrderStatus;
import com.local.Ecommercial.orderLine.OrderLineResponse;
import com.local.Ecommercial.product.PurchaseRequest;
import com.local.Ecommercial.product.PurchaseResponse;
import com.local.Ecommercial.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final RestTemplate restTemplate;
    private final OrderRepository repository;
    private final OrderMapper mapper;


    public Map<String, Object> createOrder(OrderRequest request) {
        // Gọi customer service
        String customerUrl = "http://localhost:8050/api/v1/customers/" + request.customerId();
        CustomerReponse customer = restTemplate.getForObject(customerUrl, CustomerReponse.class);

        // Gọi product service
        String productUrl = "http://localhost:8070/api/v1/products/Purchase";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<List<PurchaseRequest>> entity = new HttpEntity<>(request.products(), headers);
        ResponseEntity<List<PurchaseResponse>> response = restTemplate.exchange(
                productUrl,
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<>() {}
        );

        List<PurchaseResponse> products = response.getBody();

        double totalAmount = 0.0;
        List<OrderLine>  orderLines = new ArrayList<>();
        for( int i=0; i<products.size(); i++) {
            PurchaseResponse product = products.get(i);
            PurchaseRequest productRequest = request.products().get(i);
            double total = productRequest.quantity() * product.productPrice();
            totalAmount += total;

            OrderLine orderLine = new OrderLine();
            orderLine.setProductId(product.productId());
            orderLine.setProductName(product.productName());
            orderLine.setQuantity(productRequest.quantity());
            orderLine.setUnitPrice(product.productPrice());
            orderLine.setTotal(total);

            orderLines.add(orderLine);
        }
            // Tao don hang

            Order order = new Order();
            order.setCustomerId(request.customerId());
            order.setOrderDate(LocalDate.now());
            order.setOrderStatus(OrderStatus.PENDING);
            order.setCreatedAt(LocalDateTime.now());
            order.setTotalAmount(totalAmount);

            for(OrderLine lines : orderLines) {
                lines.setOrder(order);
            }

            order.setOrderLines(orderLines);
            Order savedOrder = repository.save(order);
            // Trả kết quả
            Map<String, Object> response1 = new HashMap<>();
            response1.put("orderId", savedOrder.getOrderId());
            response1.put("customer", customer);
            response1.put("products", products);
            response1.put("totalAmount", totalAmount);
            response1.put("message", "Đơn hàng được tạo thành công");

            return response1;

    }


    public List<OrderReponse> getAllOrder() {
        var orders = repository.findAll();
        return orders.stream().map(OrderMapper::toOrderReponse)
                .toList();
    }

    public OrderReponse getOrderById(Integer id) {
        Order order = repository.findById(id).
                orElseThrow( () -> new RuntimeException(" khong tim thay don hang co ma Id la: " + id));
        return mapper.toOrderReponse(order);
    }


    public List<OrderReponse> getOrdersByCustomerId(Integer customerId) {
        List<Order> orders = repository.findByCustomerId(customerId);
        return orders.stream()
                .map(OrderMapper::toOrderReponse)
                .toList();

    }
}


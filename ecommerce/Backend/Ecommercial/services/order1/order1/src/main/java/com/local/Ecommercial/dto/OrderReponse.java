package com.local.Ecommercial.dto;

import com.local.Ecommercial.entity.OrderStatus;
import com.local.Ecommercial.orderLine.OrderLineResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record OrderReponse(
        Integer orderId,
        OrderStatus orderStatus,
        Double totalAmount,
        LocalDate orderDate
//        List<OrderLineResponse> orderLine
) {
}

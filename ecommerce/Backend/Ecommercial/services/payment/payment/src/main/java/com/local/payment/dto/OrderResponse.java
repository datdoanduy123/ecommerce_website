package com.local.payment.dto;

import java.time.LocalDate;

public record OrderResponse (
        Integer OrderId,
        double totalAmount,
        String orderStatus,
         LocalDate orderDate
){
}

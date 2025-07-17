package com.local.payment.dto;

import com.local.payment.entity.PaymentMethod;
import com.local.payment.entity.PaymentStatus;

import java.time.LocalDateTime;

public record PaymentResponse (
        Integer paymentid,
        LocalDateTime paymentDate,
        double amount,
        PaymentMethod paymentMethod,
        PaymentStatus paymentStatus,
        Integer orderId
){
}

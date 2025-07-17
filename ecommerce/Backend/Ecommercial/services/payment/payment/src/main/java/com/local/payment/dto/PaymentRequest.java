package com.local.payment.dto;

import com.local.payment.entity.Payment;
import com.local.payment.entity.PaymentMethod;

public record PaymentRequest(
        Integer orderId,
        double amount,
        PaymentMethod paymentMethod
) {
}

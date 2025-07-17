package com.local.payment.mapper;

import com.local.payment.dto.PaymentRequest;
import com.local.payment.dto.PaymentResponse;
import com.local.payment.entity.Payment;
import com.local.payment.entity.PaymentMethod;
import com.local.payment.entity.PaymentStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class PaymentMapper {

    public Payment fromPayment(PaymentRequest request) {

        return Payment.builder()
                .amount(request.amount())
                .paymentDate(LocalDateTime.now())
                .paymentMethod(request.paymentMethod())
                .paymentStatus(PaymentStatus.PAID)
                .orderId(request.orderId())
                .build();
    }

    public PaymentResponse toPayment(Payment payment) {
        return new PaymentResponse(
                payment.getPaymentId(),
                payment.getPaymentDate(),
                payment.getAmount(),
                payment.getPaymentMethod(),
                payment.getPaymentStatus(),
                payment.getOrderId()
        );
    }
}

package com.local.payment.service;


import com.local.payment.config.OrderClient;
import com.local.payment.dto.OrderResponse;
import com.local.payment.dto.PaymentRequest;
import com.local.payment.dto.PaymentResponse;
import com.local.payment.entity.Payment;
import com.local.payment.entity.PaymentMethod;
import com.local.payment.entity.PaymentStatus;
import com.local.payment.mapper.PaymentMapper;
import com.local.payment.repository.PaymentRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final OrderClient orderClient;
    private final PaymentMapper mapper;
    private final PaymentRepository repository;


    public PaymentResponse createPayment(PaymentRequest request) {
        OrderResponse order = orderClient.getOrderById(request.orderId());
        System.out.println("Lay don hang thanh cong : " + order);

        Payment payment = mapper.fromPayment(request);

        Payment saved = repository.save(payment);

        return mapper.toPayment(saved);
    }

    public String createVNPayUrl(PaymentRequest request) {
        // 1. Tạo record UNPAID
        Payment payment = Payment.builder()
                .amount(request.amount())
                .paymentStatus(PaymentStatus.UNPAID)
                .paymentMethod(PaymentMethod.VNPAY)
                .orderId(request.orderId())
                .paymentDate(LocalDateTime.now())
                .build();
        repository.save(payment);

        // 2. URL sandbox fake
        String baseUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        String returnUrl = "http://localhost:8222/api/v1/payments/vnpay/return";

        // 3. Tạo URL demo (chỉ thêm orderId)
        String url = baseUrl + "?vnp_OrderInfo=" + payment.getPaymentId() + "&vnp_ReturnUrl=" + returnUrl + "&vnp_ResponseCode=00";
        return url;
    }


    public boolean handleVNPayReturn(HttpServletRequest request) {
        String paymentIdStr = request.getParameter("vnp_OrderInfo");
        String responseCode = request.getParameter("vnp_ResponseCode");
        String secureHash = request.getParameter("vnp_SecureHash");

        // TODO: Verify chữ ký (secureHash). Ở đây demo nên bỏ qua verify hash.

        if ("00".equals(responseCode)) {
            Payment payment = repository.findById(Integer.valueOf(paymentIdStr)).orElseThrow();
            payment.setPaymentStatus(PaymentStatus.PAID);
            repository.save(payment);
            return true;
        }
        return false;
    }
}


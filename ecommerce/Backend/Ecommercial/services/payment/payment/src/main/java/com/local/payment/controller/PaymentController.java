package com.local.payment.controller;


import com.local.payment.dto.PaymentRequest;
import com.local.payment.dto.PaymentResponse;
import com.local.payment.entity.Payment;
import com.local.payment.entity.PaymentStatus;
import com.local.payment.repository.PaymentRepository;
import com.local.payment.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentRepository repository;
    private final PaymentService service;

    @PostMapping
    public ResponseEntity<PaymentResponse> createPayment(@RequestBody PaymentRequest request) {
        return ResponseEntity.ok(service.createPayment(request));
    }

//    @PostMapping("/vnpay")
//    public ResponseEntity<String> createVNPayPayment(@RequestBody PaymentRequest request) {
//        System.out.println("Đã gọi API VNPay với orderId: " + request.orderId());
//        String fakeVNPayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?fakeOrderId=" + request.orderId();
//        return ResponseEntity.ok(fakeVNPayUrl);
//    }

    @PostMapping("/vnpay")
    public ResponseEntity<String> createVNPayPayment(@RequestBody PaymentRequest request) {
        String vnpayUrl = service.createVNPayUrl(request);
        return ResponseEntity.ok(vnpayUrl);
    }

    @GetMapping("/vnpay/return")
    public void vnpayReturn(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String paymentIdStr = req.getParameter("vnp_OrderInfo");
        String responseCode = req.getParameter("vnp_ResponseCode");

        if ("00".equals(responseCode)) {
            Payment payment = repository.findById(Integer.valueOf(paymentIdStr)).orElseThrow();
            payment.setPaymentStatus(PaymentStatus.PAID);
            repository.save(payment);
        }

        // Redirect về frontend
        res.sendRedirect("http://localhost:3000/payment-result?status=" + ("00".equals(responseCode) ? "success" : "fail"));
    }




}

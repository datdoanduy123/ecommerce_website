package com.local.ecommercial.dto;

public record PurchaseRequest(
        Integer productId,
        String size,
        Integer quantity
) {
}

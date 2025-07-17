package com.local.Ecommercial.product;

public record PurchaseRequest(
        Integer productId,
        Integer quantity
) {
}

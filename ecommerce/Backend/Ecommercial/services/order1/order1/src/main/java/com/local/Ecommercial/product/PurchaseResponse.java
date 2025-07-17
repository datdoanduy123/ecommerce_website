package com.local.Ecommercial.product;

public record PurchaseResponse(
        Integer productId,
        String productName,
        String productDescription,
        Integer quantity,
        Double productPrice,
        Double total
) {
}

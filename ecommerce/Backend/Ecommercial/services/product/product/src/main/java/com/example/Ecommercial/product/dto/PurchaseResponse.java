package com.example.Ecommercial.product.dto;

import java.util.List;

public record PurchaseResponse(
        Integer productId,
        String productName,
        String productDescription,
        Integer quantity,
        List<ProductSize> size,
        Gender gender,
        Double productPrice
) {
}

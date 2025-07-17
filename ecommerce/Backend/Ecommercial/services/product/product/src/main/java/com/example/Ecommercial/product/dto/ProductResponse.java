package com.example.Ecommercial.product.dto;

import java.util.List;

public record ProductResponse(
        Integer productId,
        String productName,
        String productDescription,
        Double productPrice,
        Integer availableQuantity,
        String producImgUrl,
        ProductStatus status,
        List<ProductSize> size,
        Gender gender,
        String createAt,
        String updateAt,
        Integer categoryId,
        String categoryName
) {
}

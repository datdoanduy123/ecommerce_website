package com.local.ecommercial.dto;

import com.local.ecommercial.entity.Gender;
import com.local.ecommercial.entity.ProductSize;
import com.local.ecommercial.entity.ProductStatus;

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

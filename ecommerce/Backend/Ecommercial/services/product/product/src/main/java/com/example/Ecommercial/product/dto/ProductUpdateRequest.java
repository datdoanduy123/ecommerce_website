package com.example.Ecommercial.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ProductUpdateRequest(
        Integer productId,
        @NotBlank(message = "Ten san pham phai co")
        String productName,
        String productDescription,
        @NotNull(message = "Gia san pham phai co")
        Double productPrice,
        Integer quantity,
        @NotNull(message = "Hinh anh san pham phai co")
        String producImgUrl,
        ProductStatus status,
        List<ProductSize> size,
        Gender gender,
        Integer category
) {

}

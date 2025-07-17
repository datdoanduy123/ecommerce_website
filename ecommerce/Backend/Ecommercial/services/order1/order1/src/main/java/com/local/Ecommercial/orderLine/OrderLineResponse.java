package com.local.Ecommercial.orderLine;

public record OrderLineResponse(
        Integer productId,
        String productName,
        Double unitPrice,
        Integer quantity,
        Double total
) {
}

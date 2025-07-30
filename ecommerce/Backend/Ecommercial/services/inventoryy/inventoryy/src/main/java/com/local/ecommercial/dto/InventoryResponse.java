package com.local.ecommercial.dto;

public record InventoryResponse(
        Integer inventoryId,
        String Size,
        Integer productId,
        String location,
        Integer availableQuantity
) {
}

package com.local.ecommercial.dto;

public record InventoryRequest(
        Integer inventoryId,
        String size,
        Integer productId,
        String location,
        Integer availableQuantity

) {
}

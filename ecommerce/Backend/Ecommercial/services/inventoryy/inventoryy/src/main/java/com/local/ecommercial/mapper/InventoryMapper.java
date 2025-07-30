package com.local.ecommercial.mapper;

import com.local.ecommercial.dto.InventoryRequest;
import com.local.ecommercial.dto.InventoryResponse;
import com.local.ecommercial.dto.ProductResponse;
import com.local.ecommercial.entity.Inventory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InventoryMapper {





    public Inventory toInventory(InventoryRequest request) {
        return Inventory.builder()
                .inventoryId(request.inventoryId())
                .productId(request.productId())
                .size(request.size())
                .availableQuantity(request.availableQuantity())
                .location(request.location())
                .build();
    }

    public InventoryResponse fromInventory(Inventory saved) {
        return new InventoryResponse(
                saved.getInventoryId(),
                saved.getSize(),
                saved.getProductId(),
                saved.getLocation(),
                saved.getAvailableQuantity()
        );
    }

    public List<InventoryResponse> toInventoryResponseList(List<Inventory> inventories) {
        return  inventories.stream().map(this::fromInventory).toList();
    }
}

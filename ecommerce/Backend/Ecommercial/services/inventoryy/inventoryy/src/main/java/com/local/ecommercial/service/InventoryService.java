package com.local.ecommercial.service;

import com.local.ecommercial.config.Product;
import com.local.ecommercial.dto.InventoryRequest;
import com.local.ecommercial.dto.InventoryResponse;
import com.local.ecommercial.dto.ProductResponse;
import com.local.ecommercial.dto.PurchaseRequest;
import com.local.ecommercial.entity.Inventory;
import com.local.ecommercial.exception.ProductNotFoundException;
import com.local.ecommercial.mapper.InventoryMapper;
import com.local.ecommercial.reponsitory.InventoryReponsitory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryReponsitory reponsitory;
    private final Product productClient;
    private final InventoryMapper mapper;

    public int getAvailableQuantity(Integer productId, String size) {
        ProductResponse product = productClient.getProductById(productId);
        if(product == null){
            throw new ProductNotFoundException("Product not found");
        }

        Optional<Inventory> inventory = reponsitory.findByProductIdAndSize(productId, size);

        return inventory.map(Inventory::getAvailableQuantity).orElse(0);
    }

    public InventoryResponse createInventory(InventoryRequest request) {
        ProductResponse product = productClient.getProductById(request.productId());
        if(product == null){
            throw new ProductNotFoundException("Product not found");
        }

        Inventory inventory = mapper.toInventory(request);

        inventory.setUpdateAt(LocalDateTime.now());

        Inventory saved = reponsitory.save(inventory);

        return mapper.fromInventory(saved);

    }

    public List<InventoryResponse> getInventory(Integer productId) {
        ProductResponse product = productClient.getProductById(productId);

        List<Inventory> inventories = reponsitory.findByProductId(productId);

        return mapper.toInventoryResponseList(inventories);

    }

    public void increaseInventory(List<PurchaseRequest> request) {
        for( PurchaseRequest req : request) {
            Inventory inventory =  reponsitory.findByProductIdAndSize(req.productId(), req.size())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
            if( inventory.getAvailableQuantity() < req.quantity() ) {
                throw new RuntimeException("So luong khong du");
            }
            inventory.setAvailableQuantity(inventory.getAvailableQuantity() + req.quantity());
            inventory.setUpdateAt(LocalDateTime.now());
            reponsitory.save(inventory);
    }
}

    public void decreaseInventory(List<PurchaseRequest> request) {
        for( PurchaseRequest req : request) {
            Inventory inventory =  reponsitory.findByProductIdAndSize(req.productId(), req.size())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
            if( inventory.getAvailableQuantity() < req.quantity() ) {
                throw new RuntimeException("So luong khong du");
            }
            inventory.setAvailableQuantity(inventory.getAvailableQuantity() - req.quantity());
            inventory.setUpdateAt(LocalDateTime.now());
            reponsitory.save(inventory);
        }
    }
}

package com.local.ecommercial.controller;

import com.local.ecommercial.dto.InventoryRequest;
import com.local.ecommercial.dto.InventoryResponse;
import com.local.ecommercial.dto.PurchaseRequest;
import com.local.ecommercial.service.InventoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user/inventories")
@AllArgsConstructor
@PreAuthorize("hasRole('User')")
public class UserController {
    private InventoryService service;


    @GetMapping("/{productId}")
    public ResponseEntity<List<InventoryResponse>> getInventory(@PathVariable Integer productId) {
        return ResponseEntity.ok(service.getInventory(productId));
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkInventory(
            @RequestParam("id") Integer productId,
            @RequestParam("size") String size
    ){
        Integer quantity = service.getAvailableQuantity(productId, size);
        return ResponseEntity.ok(quantity);
    }



    @PostMapping("/decrease")
    public ResponseEntity<Void> decreaseInventory(
            @RequestBody List<PurchaseRequest> request
    ) {
        service.decreaseInventory(request);
        return ResponseEntity.ok().build();
    }



}

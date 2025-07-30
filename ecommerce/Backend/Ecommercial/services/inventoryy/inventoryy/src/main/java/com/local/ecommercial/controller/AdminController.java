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
@RequestMapping("api/v1/admin/inventories")
@AllArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final InventoryService service;

    @GetMapping("/dashboard")
    public ResponseEntity<String> getAdminDashboard() {
        return ResponseEntity.ok("Admin dashboard");
    }

    @PostMapping
    public ResponseEntity<InventoryResponse> createInventory(@RequestBody InventoryRequest request) {
        return ResponseEntity.ok(service.createInventory(request));
    }

    @PostMapping("/increase")
    public ResponseEntity<Void> increaseInventory(
            @RequestBody List<PurchaseRequest> request
    ) {
        service.increaseInventory(request);
        return ResponseEntity.ok().build();
    }

}

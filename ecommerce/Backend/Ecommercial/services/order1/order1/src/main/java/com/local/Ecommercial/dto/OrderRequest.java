package com.local.Ecommercial.dto;

import com.local.Ecommercial.product.PurchaseRequest;

import java.util.List;

public record OrderRequest(
        Integer customerId,
        List<PurchaseRequest> products
) {
}

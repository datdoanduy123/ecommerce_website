package com.local.ecommercial.reponsitory;

import com.local.ecommercial.dto.InventoryResponse;
import com.local.ecommercial.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface InventoryReponsitory extends JpaRepository<Inventory, Integer> {
    Optional<Inventory> findByProductIdAndSize(Integer productId, String size);
    List<Inventory> findByProductId(Integer productId);
}

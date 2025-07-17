package com.example.Ecommercial.product.repository;

import com.example.Ecommercial.product.dto.ProductStatus;
import com.example.Ecommercial.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Integer> {
    Page<Product> findAllByStatusNot(ProductStatus status, Pageable pageable);
    List<Product> findByProductIdIn( List<Integer> productId);
}

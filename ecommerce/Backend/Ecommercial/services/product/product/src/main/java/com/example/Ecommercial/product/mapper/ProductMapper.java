package com.example.Ecommercial.product.mapper;

import com.example.Ecommercial.category.entity.Category;
import com.example.Ecommercial.product.dto.ProductRequest;
import com.example.Ecommercial.product.dto.ProductResponse;
import com.example.Ecommercial.product.dto.PurchaseResponse;
import com.example.Ecommercial.product.entity.Product;
import com.example.Ecommercial.product.repository.ProductRepository;
import com.example.Ecommercial.category.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class ProductMapper {

    private final ProductRepository repository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;


    public ProductResponse toProductResponse(Product product) {
        return new ProductResponse(
          product.getProductId(),
          product.getProductName(),
          product.getProductDescription(),
          product.getProductPrice(),
          product.getAvailableQuantity(),
          product.getProducImgUrl(),
          product.getStatus(),
          product.getSize(),
          product.getGender(),
          product.getCreateAt(),
          product.getUpdateAt(),
          product.getCategory().getCategoryId(),
          product.getCategory().getCategoryName()
        );
    }

    public Product toProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.category())
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));

        return Product.builder()
                .productName(request.productName())
                .productPrice(request.productPrice())
                .productDescription(request.productDescription())
                .producImgUrl(request.producImgUrl())
                .status(request.status())
                .availableQuantity(request.availableQuantity())
                .size(request.size())
                .gender(request.gender())
                .category(category)
                .build();
    }

    public Page<ProductResponse> toProductList(Page<Product> products) {
        List<ProductResponse> responseList = products.stream()
                .map(this::toProductResponse)
                .toList();
        return new PageImpl<>(responseList, products.getPageable(), products.getTotalElements());
    }


    public PurchaseResponse toProductPurchaseResponse(Product product, Integer quantity) {
        return new PurchaseResponse(
                product.getProductId(),
                product.getProductName(),
                product.getProductDescription(),
                product.getAvailableQuantity(),
                product.getSize(),
                product.getGender(),
                product.getProductPrice()
        );
    }

}

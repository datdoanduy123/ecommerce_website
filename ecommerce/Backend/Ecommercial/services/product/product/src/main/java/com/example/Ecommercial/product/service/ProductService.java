package com.example.Ecommercial.product.service;


import com.example.Ecommercial.category.entity.Category;
import com.example.Ecommercial.category.repository.CategoryRepository;
import com.example.Ecommercial.product.dto.*;
import com.example.Ecommercial.product.exception.CategoryNotFoundException;
import com.example.Ecommercial.product.exception.ProductNotFoundException;
import com.example.Ecommercial.product.mapper.ProductMapper;
import com.example.Ecommercial.product.entity.Product;
import com.example.Ecommercial.product.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;
    private final CategoryRepository categoryRepository;

    public ProductResponse createProduct(ProductRequest request) {
        var product = mapper.toProduct(request);
        String now = LocalDateTime.now().toString();
        product.setCreateAt(now);
        product.setUpdateAt(now);
        Product saved = repository.save(product);
        return mapper.toProductResponse(saved);
    }

    public Page<ProductResponse> getAllProducts(int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by("productId").descending());
        Page<Product> products = repository.findAllByStatusNot(ProductStatus.DELETED, pageable);
        return mapper.toProductList(products);
    }

    public ProductResponse getProductById(Integer id) {
        Product product = repository.findById(id)
                .filter(p -> p.getStatus() != ProductStatus.DELETED)
                .orElseThrow(
                        () -> new ProductNotFoundException("Khong tim thay san pham")
                );
        return mapper.toProductResponse(product);
    }


    public ProductResponse updateProduct(Integer id, ProductUpdateRequest request) {
        Product exiting = repository.findById(id).orElseThrow(() -> new RuntimeException("San pham nay khong ton tai"));
        Category category = categoryRepository.findById(request.category())
                .orElseThrow(() -> new CategoryNotFoundException("Danh muc nay khong ton tai"));
        exiting.setProductName(request.productName());
        exiting.setProductPrice(request.productPrice());
        exiting.setProductDescription(request.productDescription());
        exiting.setAvailableQuantity(request.quantity());
        exiting.setProducImgUrl(request.producImgUrl());
        if (request.status() != null) {
            exiting.setStatus(request.status());
        }
        exiting.setSize(request.size());
        exiting.setGender(request.gender());
        exiting.setCategory(category);
        exiting.setUpdateAt(LocalDateTime.now().toString());

        Product saved = repository.save(exiting);
        return mapper.toProductResponse(saved);
    }

    public void deleteProduct(Integer id) {
        Product product = repository.findById(id).orElseThrow(
                () -> new ProductNotFoundException("San pham nay khong ton tai")
        );

        product.setUpdateAt(LocalDateTime.now().toString());
        product.setStatus(ProductStatus.DELETED);
        repository.save(product);
    }


    public List<PurchaseResponse> getAllProductsByPurchase(List<PurchaseRequest> request) {
        var ProductIds = request
                .stream()
                .map(PurchaseRequest::productId)
                .toList();
        var stored = repository.findByProductIdIn(ProductIds);
        if( stored.size() != ProductIds.size() ) {
            throw new ProductNotFoundException("Loi he thong");
        }
        var PurchaseRequests = request
                .stream()
                .sorted(Comparator.comparing(PurchaseRequest::productId))
                .toList();

        var ProductPurchaseRequest = new ArrayList<PurchaseResponse>();
        for( int i=0; i<stored.size(); i++ ) {
            var product = stored.get(i);
            var requests = PurchaseRequests.get(i);
            if( product.getAvailableQuantity() < requests.quantity() ) {
                throw new ProductNotFoundException("Hang trong kho khong du");
            }

            var newAvaiableQuantity =  product.getAvailableQuantity() - requests.quantity();
            product.setAvailableQuantity(newAvaiableQuantity);
            product.setUpdateAt(LocalDateTime.now().toString());
            repository.save(product);
            ProductPurchaseRequest.add(mapper.toProductPurchaseResponse(product, requests.quantity()));
        }
        return ProductPurchaseRequest;

    }

}

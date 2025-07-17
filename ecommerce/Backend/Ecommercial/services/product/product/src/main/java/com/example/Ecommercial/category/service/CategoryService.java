package com.example.Ecommercial.category.service;


import com.example.Ecommercial.category.dto.CategoryResponse;
import com.example.Ecommercial.category.dto.CatetoryRequest;
import com.example.Ecommercial.category.entity.Category;
import com.example.Ecommercial.category.mapper.CategoryMapper;
import com.example.Ecommercial.category.repository.CategoryRepository;
import com.example.Ecommercial.product.dto.ProductResponse;
import com.example.Ecommercial.product.dto.ProductStatus;
import com.example.Ecommercial.product.entity.Product;
import com.example.Ecommercial.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.Ecommercial.product.exception.CategoryNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repository;
    private final CategoryMapper mapper;

    public CategoryResponse createCategory(CatetoryRequest request) {
        Category category = new Category();
        category.setCategoryName(request.categoryName());
        category.setCategoryDescription(request.categoryDescription());
        Category saved = repository.save(category);

        return new CategoryResponse(
                saved.getCategoryId(),
                saved.getCategoryName(),
                saved.getCategoryDescription()
        );
    }

    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = repository.findAll();
        return mapper.toCategoryList(categories);
    }
}

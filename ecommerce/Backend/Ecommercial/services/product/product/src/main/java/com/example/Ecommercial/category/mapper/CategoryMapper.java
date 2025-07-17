package com.example.Ecommercial.category.mapper;


import com.example.Ecommercial.category.dto.CategoryResponse;
import com.example.Ecommercial.category.dto.CatetoryRequest;
import com.example.Ecommercial.category.entity.Category;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryMapper {
    public Category toCategory(CatetoryRequest request) {
        return Category.builder()
                .categoryName(request.categoryName())
                .categoryDescription(request.categoryDescription())
                .build();
    }

    public CategoryResponse toCategoryResponse(Category category) {
        return new CategoryResponse(
                category.getCategoryId(),
                category.getCategoryName(),
                category.getCategoryDescription()

        );
    }

    public List<CategoryResponse> toCategoryList(List<Category> categories) {
        return categories.stream().map(this::toCategoryResponse).toList();
    }
}

package com.example.Ecommercial.category.controller;


import com.example.Ecommercial.category.dto.CategoryResponse;
import com.example.Ecommercial.category.dto.CatetoryRequest;
import com.example.Ecommercial.category.repository.CategoryRepository;
import com.example.Ecommercial.category.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/categories")
public class Controller {
    private final CategoryRepository repository;
    private final CategoryService service;

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CatetoryRequest request){
        return ResponseEntity.ok(service.createCategory(request));
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories(){
        return ResponseEntity.ok(service.getAllCategories());
    }

}

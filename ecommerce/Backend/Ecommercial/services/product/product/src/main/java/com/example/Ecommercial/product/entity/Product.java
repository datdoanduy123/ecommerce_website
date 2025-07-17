package com.example.Ecommercial.product.entity;


import com.example.Ecommercial.category.entity.Category;
import com.example.Ecommercial.product.dto.Gender;
import com.example.Ecommercial.product.dto.ProductSize;
import com.example.Ecommercial.product.dto.ProductStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
@Getter
@Setter
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;
    private String productName;
    private String productDescription;
    private Double productPrice;
    private Integer availableQuantity;
    private String producImgUrl;
    @Enumerated(EnumType.STRING)
    private ProductStatus status;
    @ElementCollection(targetClass = ProductSize.class)
    @Enumerated(EnumType.STRING)
    private List<ProductSize> size;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String createAt;
    private String updateAt;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoryId")
    private Category category;


}

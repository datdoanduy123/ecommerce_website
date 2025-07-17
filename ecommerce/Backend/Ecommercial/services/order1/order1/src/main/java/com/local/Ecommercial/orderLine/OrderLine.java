package com.local.Ecommercial.orderLine;


import com.local.Ecommercial.entity.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Table( name = "OrderLine")
@Getter
@Setter
@Entity
public class OrderLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer OrderLineId;
    private Integer productId;
    private String productName;
    private Double unitPrice;
    private Integer quantity;
    private Double total;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "orderId")
    private Order order;
}

package com.local.Ecommercial.mapper;

import com.local.Ecommercial.dto.OrderReponse;
import com.local.Ecommercial.entity.Order;
import com.local.Ecommercial.orderLine.OrderLine;
import com.local.Ecommercial.orderLine.OrderLineResponse;
import com.local.Ecommercial.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderMapper {

    private final OrderRepository orderRepository;


    public static OrderReponse toOrderReponse(Order order) {
        List<OrderLineResponse> lines = order.getOrderLines().stream()
                .map(
                        line -> new OrderLineResponse(
                                line.getProductId(),
                                line.getProductName(),
                                line.getUnitPrice(),
                                line.getQuantity(),
                                line.getTotal()
                        )
                )
                .toList();

        return new OrderReponse(
                order.getOrderId(),
                order.getOrderStatus(),
                order.getTotalAmount(),
                order.getOrderDate()
//                lines
        );
    }

}

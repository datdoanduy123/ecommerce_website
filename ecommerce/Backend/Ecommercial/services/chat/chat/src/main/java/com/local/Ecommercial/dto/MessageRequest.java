package com.local.Ecommercial.dto;

public record MessageRequest(
        Long receiverId,
        String content
) {
}

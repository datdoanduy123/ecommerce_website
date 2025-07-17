package com.local.Ecommercial.dto;

public record WsMessageRequest(
        Long receiverId,
        String content,
        String token
) {
}

package com.local.Ecommercial.dto;

import java.time.LocalDateTime;

public record MessageResponse(
        Long MessageId,
        Long senderId,
        Long receiverId,
        String content,
        LocalDateTime timestamp
) {
}

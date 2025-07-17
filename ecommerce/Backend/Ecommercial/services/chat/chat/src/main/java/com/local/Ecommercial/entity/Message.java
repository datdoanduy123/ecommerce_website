package com.local.Ecommercial.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;



@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Message")
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long MessageId;
    private Long senderId;
    private Long receiverId;
    private String content;
    private LocalDateTime timestamp;
    private Boolean isRead;
}

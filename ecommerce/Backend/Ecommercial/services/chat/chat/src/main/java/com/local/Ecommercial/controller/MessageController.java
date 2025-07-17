package com.local.Ecommercial.controller;


import com.local.Ecommercial.config.JwtUtil;
import com.local.Ecommercial.dto.MessageRequest;
import com.local.Ecommercial.dto.MessageResponse;
import com.local.Ecommercial.dto.WsMessageRequest;
import com.local.Ecommercial.mapper.MessageMapper;
import com.local.Ecommercial.reponsitory.MessageRepository;
import com.local.Ecommercial.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/chats")
public class MessageController {

    private final MessageService service;
    private final JwtUtil jwtUtil;


//    @PostMapping("/send")
    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public MessageResponse sendMessage(WsMessageRequest request) {

        String jwt = request.token().substring(7).trim();
        Long senderId = Long.parseLong(jwtUtil.extractUserId(jwt));
        Long adminId = 3L;

        // Nếu không phải admin
        if (!senderId.equals(adminId)) {
            // Bắt buộc receiverId = admin
            return service.sendMessage(senderId, adminId, request.content());
        }

        // Nếu là admin, cho phép dùng receiverId trong request
        return service.sendMessage(senderId, request.receiverId(), request.content());
    }


    @GetMapping("/histories/{userId}")
    public ResponseEntity<List<MessageResponse>> getMessages(
            @RequestHeader("Authorization") String token,
            @PathVariable Long userId
    ) {
        String jwt = token.substring(7).trim();
        Long currentId = Long.parseLong(jwtUtil.extractUserId(jwt));
        Long adminId = 3L;

        if(!currentId.equals(adminId) && !currentId.equals(userId)){
            return ResponseEntity.status(403).build();
        }

        var conservation = service.getConservation(userId, adminId);

        return ResponseEntity.ok(conservation);
    }

    @GetMapping("/conservation")
    public ResponseEntity<List<Long>> getAllUserSendAdmin(
            @RequestHeader("Authorization") String token

    ) {
        String jwt = token.substring(7).trim();
        Long currentId = Long.parseLong(jwtUtil.extractUserId(jwt));
        Long amdinId = 3L;
        if( !currentId.equals(amdinId)){
            return ResponseEntity.status(403).build();
        }
        List<Long> userIds = service.getAllUserSendAdmin(amdinId);
        return ResponseEntity.ok(userIds);
    }

    @GetMapping("/conservation/admin/{userId}")
    public ResponseEntity<List<MessageResponse>> getDetailConservationAdminSendsUser(
            @RequestHeader("Authorization") String token,
            @PathVariable Long userId
    ) {
        String jwt = token.substring(7).trim();
        Long currentId = Long.parseLong(jwtUtil.extractUserId(jwt));
        Long amdinId = 3L;
        if( !currentId.equals(amdinId)){
            return ResponseEntity.status(403).build();
        }

        List<MessageResponse> conservation = service.getDetailConservationAdminSendsUser(userId, amdinId);
        return ResponseEntity.ok(conservation);

    }









}

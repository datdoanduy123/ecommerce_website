package com.local.Ecommercial.service;


import com.local.Ecommercial.dto.MessageResponse;
import com.local.Ecommercial.entity.Message;
import com.local.Ecommercial.mapper.MessageMapper;
import com.local.Ecommercial.reponsitory.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository repository;
    private final MessageMapper mapper;

    public MessageResponse sendMessage(Long senderId, Long receiverId, String content) {
        Message message = Message.builder()
                .receiverId(receiverId)
                .content(content)
                .senderId(senderId)
                .isRead(false)
                .timestamp(LocalDateTime.now())
                .build();

        var saved = repository.save(message);
        return mapper.toMessage(saved);

    }

    public List<MessageResponse> getConservation(Long userId, Long adminId) {
        List<Message> messages = repository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(
                userId, adminId, userId, adminId);

        return messages.stream()
                .map(mapper::toMessage)
                .toList();
    }


    public List<Long> getAllUserSendAdmin(Long amdinId) {
        List<Message> messagess = repository.findBySenderIdOrReceiverId(amdinId, amdinId);

        Set<Long> userIds = new HashSet<>();

        for (Message message : messagess) {
            if (message.getSenderId().equals(amdinId) && !message.getReceiverId().equals(amdinId)) {
                userIds.add(message.getReceiverId());
            } else if (message.getReceiverId().equals(amdinId) && !message.getSenderId().equals(amdinId)) {
                userIds.add(message.getSenderId());
            }
        }

        return new ArrayList<>(userIds);
    }

    public List<MessageResponse> getDetailConservationAdminSendsUser(Long userId, Long adminId) {
        List<Message> messages = repository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(userId, adminId, userId, adminId);

        return messages.stream()
                .map(mapper::toMessage)
                .toList();
    }
}

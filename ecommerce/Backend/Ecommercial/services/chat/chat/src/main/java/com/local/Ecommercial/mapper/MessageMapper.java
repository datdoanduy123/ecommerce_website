package com.local.Ecommercial.mapper;


import com.local.Ecommercial.dto.MessageResponse;
import com.local.Ecommercial.entity.Message;
import org.springframework.stereotype.Service;

@Service
public class MessageMapper {
    public MessageResponse toMessage(Message message) {
        if( message == null) return null;

        return new MessageResponse(
                message.getMessageId(),
                message.getSenderId(),
                message.getReceiverId(),
                message.getContent(),
                message.getTimestamp()
        );
    }
}

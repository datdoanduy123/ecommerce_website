package com.local.Ecommercial.reponsitory;

import com.local.Ecommercial.dto.MessageResponse;
import com.local.Ecommercial.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(
            Long userId1, Long receiverId1, Long userId2, Long receiverId2);
    List<Message> findBySenderIdOrReceiverId( Long senderId, Long receiverId);
//    List<MessageResponse> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(Long senderId1, Long receiverId1,
//                Long senderId2, Long receiverId2);
}

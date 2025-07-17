import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "./ChatPage.css";
import { BsX } from "react-icons/bs";
import { getChatHistory, getDetailConservationAdminSendsUser } from "../../Services/chatService";

const ChatPopup = ({ userId, token, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [stompClient, setStompClient] = useState(null);

  const role = localStorage.getItem("role");
  const validUserId = userId !== null && !isNaN(userId) && userId !== 0;

  useEffect(() => {
    if (!validUserId) {
      console.error("userId không hợp lệ (null, NaN hoặc bằng 0)");
      return;
    }

    // ⚡ Fetch lịch sử tin nhắn trước
    const fetchMessages = async () => {
      try {
        let res;
        if (role === "ADMIN") {
          res = await getDetailConservationAdminSendsUser(userId, token);
        } else {
          res = await getChatHistory(userId, token);
        }
        setMessages(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy lịch sử:", err);
      }
    };

    fetchMessages();

    // ✅ Kết nối websocket
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8073/ws"),
      connectHeaders: {},
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("Kết nối websocket thành công!");

      client.subscribe("/topic/messages", (message) => {
        const body = JSON.parse(message.body);
        if (body.senderId === userId || body.receiverId === userId) {
          setMessages((prev) => [...prev, body]);
        }
      });

      setStompClient(client);
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [role, token, userId, validUserId]);

  const handleSend = () => {
    if (!content.trim() || !stompClient) return;

    let receiverId = 3; // mặc định gửi admin nếu là user
    if (role === "ADMIN") {
      receiverId = userId;
    }

    const payload = {
      receiverId,
      content,
      token: `Bearer ${token}`,
    };

    stompClient.publish({
      destination: "/app/send",
      body: JSON.stringify(payload),
    });

    setContent("");
  };

  return (
    <div className="chat-popup">
      <div className="chat-popup-header">
        <span>{role === "ADMIN" ? `Chat với User #${userId}` : "Chat với Admin"}</span>
        <BsX onClick={onClose} className="chat-popup-close" />
      </div>
      <div className="chat-popup-messages">
        {messages.map((msg, index) => (
          <div
            key={msg.messageId || index}
            className={`chat-popup-message ${
              Number(msg.senderId) === Number(userId) ? "user" : "admin"
            }`}
          >
            <strong>
              {Number(msg.senderId) === Number(userId) ? "Bạn" : "Admin"}:
            </strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-popup-input">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={handleSend}>Gửi</button>
      </div>
    </div>
  );
};

export default ChatPopup;

import React, { useEffect, useState } from "react";
import { getChatHistory, sendChatMessage } from "../../Services/chatService";
import "./ChatComponent.css";

const ChatBox = ({ userId, token }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getChatHistory(userId, token);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [userId, token]);

  const handleSend = async () => {
    if (!content.trim()) return;

    try {
      const res = await sendChatMessage({ content }, token);
      setMessages((prev) => [...prev, res.data]);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.MessageId} className="chat-message">
            <strong>{msg.senderId === userId ? "Bạn" : "Admin"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        className="chat-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nhập tin nhắn..."
      />
      <button className="chat-send-button" onClick={handleSend}>Gửi</button>
    </div>
  );
};

export default ChatBox;

import React, { useEffect, useState } from "react";
import { getAllUserSendAdmin } from "../../Services/chatService";
import ChatPage from "../ChatPage/ChatPage";

const AdminConservation = ({ token }) => {
  const [userIds, setUserIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchConservations = async () => {
      try {
        const res = await getAllUserSendAdmin(token);
        setUserIds(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách user:", err);
      }
    };
    fetchConservations();
  }, [token]);

  const handleOpenChat = (userId) => {
    setSelectedUserId(userId);
    setShowChat(true);
  };

  return (
    <div>
      <h3>Danh sách user đã nhắn với admin</h3>
      <ul>
        {userIds.map((id) => (
          <li key={id}>
            <button onClick={() => handleOpenChat(id)}>
              Chat với User ID: {id}
            </button>
          </li>
        ))}
      </ul>

      {showChat && selectedUserId && (
        <ChatPage
          userId={selectedUserId}
          token={token}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default AdminConservation;

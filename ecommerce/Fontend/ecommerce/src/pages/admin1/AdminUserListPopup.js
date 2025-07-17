import React from "react";
import "./AdminUserListPopup.css";

const AdminUserListPopup = ({ userIds, onSelectUser, onClose }) => {
  return (
    <div className="admin-user-list-popup">
      <div className="admin-user-list-header">
        <h4>Danh sách user đã nhắn</h4>
        <button onClick={onClose}>Đóng</button>
      </div>
      <ul className="admin-user-list">
        {userIds.map((id) => (
          <li key={id}>
            <button onClick={() => onSelectUser(id)}>User ID: {id}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserListPopup;

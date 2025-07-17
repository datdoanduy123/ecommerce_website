// src/pages/ProfileAdminPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerByUserId } from "../../Services/customerService";
import "./ProfileAdminPage.css";

const ProfileAdminPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCustomerByUserId(id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error("Lỗi lấy thông tin user:", err));
  }, [id]);

  if (!user) return <p>Đang tải thông tin...</p>;

  return (
    <div className="user-profile-container">
      <h2>Chi tiết người dùng</h2>
      <p><strong>Tên:</strong> {user.username}</p>
      <p><strong>SĐT:</strong> {user.phoneNumber}</p>
      <p><strong>Ngày sinh:</strong> {user.dateOfBirth}</p>
      <p><strong>Địa chỉ:</strong> 
        {user.address 
          ? `${user.address.houseNumber}, ${user.address.street}, ${user.address.city}` 
          : "Không có thông tin"}
      </p>
    </div>
  );
};

export default ProfileAdminPage;

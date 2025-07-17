import { FaUser, FaShoppingBag } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import logo from "../../assets/logo.png";
import "./Navigation.css";
import { BsChatDots } from "react-icons/bs";
import React, { useState } from "react";
import ChatPage from "../ChatPage/ChatPage";
import { getAllUserSendAdmin } from "../../Services/chatService";
import { useNavigate } from "react-router-dom";
import AdminUserListPopup from "../admin1/AdminUserListPopup";
import CartPage from "../CartPage/CartPage";

const Navigation = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [adminUserIds, setAdminUserIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);

  const token = localStorage.getItem("token");
  const userId = Number(localStorage.getItem("userId"));
  const role = localStorage.getItem("role");

  const handleMenPage = () => {
    navigate("/men");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };




  const handleProfileClick = () => {
    navigate("/profile");
  };

  const toggleChatPopup = async () => {
    if (role === "ADMIN") {
      try {
        const res = await getAllUserSendAdmin(token);
        setAdminUserIds(res.data);
        setShowChat(!showChat);
      } catch (err) {
        console.error("Lỗi lấy danh sách user:", err);
      }
    } else {
      setShowChat(!showChat);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUserId(id);
  };

  // =============================
  // Mini cart hover logic
  // =============================

  let timerId;

  const handleCartMouseEnter = () => {
    clearTimeout(timerId);
    setShowMiniCart(true);
  };

  const handleCartMouseLeave = () => {
    timerId = setTimeout(() => {
      setShowMiniCart(false);
    }, 200); // delay 200ms để di chuột xuống không biến mất ngay
  };

  return (
    <div className="nav-container">
      <ul className="nav-list">
        <li className="logo">
          <img src={logo} alt="Logo" />
        </li>

        <div className="item">
          <li className="nav-item">OUTLET</li>
          <li onClick={handleMenPage} className="nav-item">NAM</li>
          <li className="nav-item">NỮ</li>
          <li className="nav-item">THỂ THAO</li>
          <li className="nav-item">CARE&SHARE</li>
          <div className="search-bar">
            <div className="search-item">
              <input
                className="search-input"
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
              />
              <CiSearch className="search-icon" onClick={handleSearchSubmit} />
            </div>
          </div>
          <li className="nav-icon" onClick={toggleChatPopup}>
            <BsChatDots />
          </li>
          <li className="nav-icon" onClick={handleProfileClick}>
            <FaUser />
          </li>
          <li
            className="nav-icon cart-wrapper"
            onMouseEnter={handleCartMouseEnter}
            onMouseLeave={handleCartMouseLeave}
          >
            <FaShoppingBag />
            {showMiniCart && (
              <div
                className="mini-cart-popup-wrapper"
                onMouseEnter={handleCartMouseEnter}
                onMouseLeave={handleCartMouseLeave}
              >
                <CartPage onClose={() => setShowMiniCart(false)} />
              </div>
            )}
          </li>
        </div>
      </ul>

      {showChat && role === "ADMIN" && !selectedUserId && (
        <AdminUserListPopup
          userIds={adminUserIds}
          onSelectUser={handleSelectUser}
          onClose={() => setShowChat(false)}
        />
      )}

      {showChat && ((role === "ADMIN" && selectedUserId) || role !== "ADMIN") && (
        <ChatPage
          userId={role === "ADMIN" ? selectedUserId : userId}
          token={token}
          onClose={() => {
            setShowChat(false);
            setSelectedUserId(null);
          }}
        />
      )}
    </div>
  );
};

export default Navigation;

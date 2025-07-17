import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = ({ onClose }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    
    const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    setCartItems(storedCart);
    updateSubtotal(storedCart);
  }, [userId]);

  const updateSubtotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0
    );
    setSubtotal(total);
  };

  const handleRemove = (productId, selectedSize) => {
  const newCart = cartItems.filter(
    (item) => !(item.productId === productId && item.selectedSize === selectedSize)
  );
  localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));

  setCartItems(newCart);
  updateSubtotal(newCart);
};


  const handleIncrease = (productId, selectedSize) => {
  const newCart = cartItems.map((item) =>
    item.productId === productId && item.selectedSize === selectedSize
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
  localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));

  setCartItems(newCart);
  updateSubtotal(newCart);
};


  const handleDecrease = (productId, selectedSize) => {
  const newCart = cartItems
    .map((item) =>
      item.productId === productId && item.selectedSize === selectedSize && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);

  localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));

  setCartItems(newCart);
  updateSubtotal(newCart);
};


  const handleViewAll = () => {
    navigate("/checkout");
  };

  return (
    <div className="mini-cart">
      <div className="mini-cart-arrow"></div>
      <p className="subtotal">
        Tạm tính: <strong>{subtotal.toLocaleString()}đ</strong> ({cartItems.length} sản phẩm)
      </p>
      <div className="cart-items">
        {cartItems.map((item) => (
        <div key={`${item.productId}-${item.selectedSize}`} className="cart-item">
          <img src={item.producImgUrl} alt={item.productName} className="cart-item-image" />
          <div className="cart-item-info">
            <h5>{item.productName}</h5>
            <p>{item.productDescription}</p>
            <p>Size: {item.selectedSize}</p> {/* ✅ hiển thị size */}
            <p className="cart-item-price">{item.productPrice.toLocaleString()}đ</p>
            <div className="qty-controls">
              <button onClick={() => handleDecrease(item.productId, item.selectedSize)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrease(item.productId, item.selectedSize)}>+</button>
            </div>
          </div>
          <div
            className="cart-item-remove"
            onClick={() => handleRemove(item.productId, item.selectedSize)}
          >
            ✕
          </div>
        </div>
      ))}

      </div>
      <button className="mini-cart-view-all" onClick={handleViewAll}>
        Xem tất cả
      </button>
    </div>
  );
};

export default CartPage;

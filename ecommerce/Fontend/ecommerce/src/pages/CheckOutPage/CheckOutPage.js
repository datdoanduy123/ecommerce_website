import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../Services/orderService";
import { createPayment } from "../../Services/paymentService";
import "./CheckOutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerId] = useState(Number(localStorage.getItem("userId")) || 1);

  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    
    const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    setCartItems(storedCart);
    const total = storedCart.reduce(
      (sum, item) => sum + item.productPrice * item.quantity,
      0
    );
    setTotalAmount(total);
  }, []);

  const handleOrderAndPayment = async () => {
    try {
      const products = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));

      const orderRequest = {
        customerId,
        products
      };

      // 1️⃣ Tạo order
      const orderRes = await createOrder(orderRequest);
      const orderId = orderRes.data.orderId;

      // 2️⃣ Thanh toán luôn
      const paymentRequest = {
        orderId: orderId,
        amount: totalAmount,
        paymentMethod: paymentMethod
      };

      const paymentRes = await createPayment(paymentRequest);

      alert(`Đặt hàng & thanh toán thành công! Mã thanh toán: ${paymentRes.data.paymentid}`);

      // 3️⃣ Xóa giỏ hàng local
      localStorage.removeItem(`cart_${userId}`);


      // 4️⃣ Điều hướng
      navigate("/thank-you", { state: { paymentId: paymentRes.data.paymentid } });
    } catch (error) {
      console.error("Lỗi khi đặt hàng & thanh toán:", error);
      alert("Có lỗi xảy ra khi đặt hàng hoặc thanh toán.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Thanh toán đơn hàng</h2>

      <div className="checkout-items">
        {cartItems.map(item => (
          <div key={item.productId} className="checkout-item">
            <img src={item.producImgUrl} alt={item.productName} className="checkout-image" />
            <div>
              <p className="item-name">{item.productName}</p>
              <p>Số lượng: {item.quantity}</p>
              <p>Giá: {item.productPrice.toLocaleString()}đ</p>
              <p>Tạm tính: {(item.productPrice * item.quantity).toLocaleString()}đ</p>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-summary">
        <h3>Tổng tiền: {totalAmount.toLocaleString()}đ</h3>

        <div className="payment-section">
          <label>Chọn phương thức thanh toán:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="CASH">Tiền mặt</option>
            <option value="BANK_TRANSFER">Chuyển khoản ngân hàng</option>
            <option value="MOMO">Momo</option>
            <option value="VNPAY">VNPay</option>
            <option value="CREDIT_CARD">Thẻ tín dụng</option>
          </select>
        </div>

        <button className="checkout-btn" onClick={handleOrderAndPayment}>
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

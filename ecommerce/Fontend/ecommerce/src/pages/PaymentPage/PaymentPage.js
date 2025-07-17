import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, amount } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("CASH");

  if (!orderId || !amount) {
    return <p>Không có thông tin đơn hàng. Vui lòng quay lại giỏ hàng.</p>;
  }

  const handlePayment = async () => {
  try {
    const paymentRequest = {
      orderId: orderId,
      amount: amount,
      paymentMethod: paymentMethod
    };

    if (paymentMethod === "VNPAY") {
      const response = await axios.post("http://localhost:8222/api/v1/payments/vnpay", paymentRequest);

      const vnpayUrl = response.data;
      localStorage.removeItem("cart");
      window.location.href = vnpayUrl; // Redirect sang sandbox
    } else {
      const response = await axios.post("http://localhost:8222/api/v1/payments", paymentRequest);

      alert(`Thanh toán thành công! Mã thanh toán: ${response.data.paymentid}`);
      localStorage.removeItem("cart");
      navigate("/thank-you", {
        state: { paymentId: response.data.paymentid }
      });
    }
  } catch (error) {
    console.error("Lỗi khi thanh toán:", error);
    alert("Có lỗi xảy ra khi thanh toán.");
  }
};



  return (
    <div className="payment-container">
      <h2>Thanh toán đơn hàng #{orderId}</h2>
      <p>Số tiền cần thanh toán: <strong>{amount.toLocaleString()}đ</strong></p>

      <div className="payment-method">
        <label>Chọn phương thức thanh toán:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="CASH">Tiền mặt</option>
          <option value="BANK_TRANSFER">Chuyển khoản ngân hàng</option>
          <option value="MOMO">Momo</option>
          <option value="VNPAY">VNPay</option>
          <option value="CREDIT_CARD">Thẻ tín dụng</option>
        </select>
      </div>

      <button className="payment-btn" onClick={handlePayment}>
        Xác nhận thanh toán
      </button>
    </div>
  );
};

export default PaymentPage;

import React from "react";
import { useLocation } from "react-router-dom";

const ThankYouPage = () => {
  const location = useLocation();
  const { paymentId } = location.state || {};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Cảm ơn bạn đã đặt hàng!</h2>
      {paymentId && <p>Mã thanh toán của bạn: <strong>{paymentId}</strong></p>}
      <p>Đơn hàng của bạn đang được xử lý.</p>
      <button onClick={() => window.location.href = "/home"} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Quay về trang chủ
      </button>
    </div>
  );
};

export default ThankYouPage;

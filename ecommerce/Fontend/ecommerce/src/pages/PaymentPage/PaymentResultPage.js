import React from "react";
import { useLocation } from "react-router-dom";

const PaymentResultPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const status = query.get("status");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {status === "success" ? (
        <h2>🎉 Thanh toán thành công!</h2>
      ) : (
        <h2>❌ Thanh toán thất bại.</h2>
      )}
    </div>
  );
};

export default PaymentResultPage;

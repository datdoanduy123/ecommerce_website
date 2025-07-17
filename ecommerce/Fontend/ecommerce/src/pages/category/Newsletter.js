import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h2>Đăng ký nhận bản tin</h2>
      <p>Nhận thông báo về ưu đãi mới nhất và xu hướng thời trang</p>
      <div className="newsletter-form">
        <input type="email" placeholder="Nhập email của bạn" />
        <button>Đăng ký</button>
      </div>
    </div>
  );
};

export default Newsletter;

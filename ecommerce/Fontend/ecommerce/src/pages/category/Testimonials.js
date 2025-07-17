import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h2>Khách hàng nói gì?</h2>
      <div className="testimonial-cards">
        <div className="testimonial-card">
          <p>🌟 "Sản phẩm đẹp, chất lượng vượt mong đợi!"</p>
          <h4>— Linh, Hà Nội</h4>
        </div>
        <div className="testimonial-card">
          <p>🌟 "Giao hàng nhanh, dịch vụ tuyệt vời!"</p>
          <h4>— Huy, TP. Hồ Chí Minh</h4>
        </div>
        <div className="testimonial-card">
          <p>🌟 "Giá cả hợp lý, nhiều mẫu mã thời thượng."</p>
          <h4>— Trang, Đà Nẵng</h4>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

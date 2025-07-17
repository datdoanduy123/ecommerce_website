import React from "react";
import "./BannerPage.css";

const BannerPage = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>ÁO BRA THỂ THAO</h1>
        <p>Tặng Găng tay chống tia UV khi mua Áo/Quần bất kỳ</p>
        <button>KHÁM PHÁ</button>
      </div>
      <div className="banner-images">
        <img src="/images/model1.png" alt="Mẫu 1" className="model model-1" />
        <img src="/images/model2.png" alt="Mẫu 2" className="model model-2" />
      </div>
    </div>
  );
};

export default BannerPage;

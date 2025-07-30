import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../Services/productService";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import ProductPage from "../ProductPage/ProductPage";
import BannerPage from "../BannerPage/BannerPage";  
// import HeroBannerPage from "../BannerPage/HeroBannerPage";
import FeatureCategories from "../category/FeatureCategories";
import PromotionStrip from "../category/PromotionStrip";
import Testimonials from "../category/Testimonials";
import Newsletter from "../category/Newsletter";
import NavigationBar from "../Navigation/NavigationBar";


import "./HomePage.css";

const HomePage = () => {
  const [role, setRole] = useState(""); // Lấy role
  const [showMiniCart, setShowMiniCart] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        console.log("Sản phẩm:", res.data);
        // setFeaturedProducts(res.data.slice(0, 15));
      })
      .catch((err) => console.error("Lỗi API:", err));
  }, []);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  // Xử lý hiện mini cart
  useEffect(() => {
    if (location.state && location.state.showMiniCart) {
      setShowMiniCart(true);

      const timer = setTimeout(() => {
        setShowMiniCart(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleCreateClick = () => {
    navigate("/admin-products");
  };

  const handleOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleManageUsers = () => {
    navigate("/admin-users");
  };

  return (
    <div>
      {/* <Navigation /> */}
      <NavigationBar />
      <h2>Sản phẩm nổi bật</h2>

      {showMiniCart && (
        <div className="mini-cart-popup">
          ✅ Đã thêm sản phẩm vào giỏ hàng!
        </div>
      )}

      {role === "ADMIN" && (
        <>
          <button onClick={handleCreateClick}>➕ Tạo sản phẩm mới</button>
          <button onClick={handleManageUsers} style={{ marginLeft: "10px" }}>
            👤 Quản lý người dùng
          </button>
          <button onClick={() => navigate("/admin-categories")} style={{ marginLeft: "10px" }}>
            📂 Quản lý danh mục
          </button>
        </>
      )}

      <button onClick={handleOut} style={{ marginLeft: "10px" }}>
        Đăng xuất
      </button>
      {/* <PromotionStrip /> */}
      <BannerPage />
      {/* <HeroBannerPage /> */}
      <FeatureCategories />
      <ProductPage />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;

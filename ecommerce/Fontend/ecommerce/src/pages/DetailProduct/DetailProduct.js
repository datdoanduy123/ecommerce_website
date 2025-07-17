import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../Services/productService";
import "./DetailProduct.css";

function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        console.log("Product detail:", res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
      return;
    }

    const userId = localStorage.getItem("userId");
    const existingCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    const foundIndex = existingCart.findIndex(
      (item) => item.productId === product.productId && item.selectedSize === selectedSize
    );

    if (foundIndex !== -1) {
      existingCart[foundIndex].quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
        selectedSize, // ✅ thêm size
      });
    }

    localStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));
    navigate("/home", { state: { showMiniCart: true } });
  };

  if (!product) {
    return <p>Đang tải chi tiết sản phẩm...</p>;
  }

  return (
    <div className="detail-container">
      <div className="image-section">
        <img
          src={product.producImgUrl}
          alt={product.productName}
          className="detail-image"
        />
      </div>
      <div className="info-section">
        <h1 className="product-title">{product.productName}</h1>
        <p className="product-price">{product.productPrice} VND</p>
        <p className="product-description">{product.productDescription}</p>
        <div className="product-size-selector">
          <label>Chọn kích cỡ:</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">-- Chọn size --</option>
            {product.size && product.size.map((sz) => (
              <option key={sz} value={sz}>{sz}</option>
            ))}
          </select>
        </div>

        <p className="product-quantity">Số lượng còn lại: {product.availableQuantity}</p>
        <p className="product-category">Danh mục: {product.categoryName || "Không có"}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
}

export default DetailProduct;


import React from "react";
import "./ProductComponent.css";
import { useNavigate } from "react-router-dom";



const ProductComponent = ({ product }) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/detail-product/${product.productId}`); 
  }
  return (
    <div className="product-card" onClick={handleProductClick}>
      <img
        src={product.producImgUrl}
        alt={product.productName}
        className="product-image"
      />
      <h3 className="product-name">{product.productName}</h3>
      <p className="product-des">{product.productDescription}</p>
      <p className="product-price">{product.productPrice} VND</p>
      <p className="product-size">
        {product.size && product.size.length > 0 ? product.size.join(", ") : "Không có size"}
      </p>
      <p className="product-quantity">{product.availableQuantity} available</p>
      <button className="Product-button">Thêm vào giỏ hàng</button>
    </div>
  );
};

export default ProductComponent;



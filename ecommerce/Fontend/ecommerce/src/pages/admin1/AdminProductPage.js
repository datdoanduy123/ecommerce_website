import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../Services/productService";
import { useNavigate } from "react-router-dom";
import "./AdminProductPage.css";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data.content);
      })
      .catch((err) => console.error("Lỗi lấy sản phẩm:", err));
  };

  const handleEdit = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
      deleteProduct(id)
        .then(() => {
          alert("Xóa thành công!");
          loadProducts();
        })
        .catch((err) => {
          console.error("Lỗi xóa:", err);
          alert("Lỗi khi xóa sản phẩm");
        });
    }
  };

  return (
    <div className="admin-product-container">
      <h2>Quản lý sản phẩm</h2>
      <button onClick={() => navigate("/create-product")}>➕ Thêm sản phẩm</button>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.productId} className="product-card-admin">
            <img src={product.producImgUrl} alt={product.productName} className="admin-product-img" />
            <h3>{product.productName}</h3>
            <p>{product.productDescription}</p>
            <p>Giá: {product.productPrice} VND</p>
            <p>Còn lại: {product.availableQuantity}</p>
            <button onClick={() => handleEdit(product.productId)}>Sửa</button>
            <button onClick={() => handleDelete(product.productId)}>Xóa</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductPage;

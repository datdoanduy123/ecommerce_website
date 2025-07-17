import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../Services/productService";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const loadProducts = (pageNumber) => {
    getAllProducts(pageNumber, 6)
      .then((res) => {
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Lỗi API:", err);
      });
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="product-page">
      <h2 className="page-title">SẢN PHẨM BÁN CHẠY (Trang {page + 1}/{totalPages})</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductComponent key={product.productId} product={product} />
          ))
        ) : (
          <p>Không có sản phẩm nào</p>
        )}
      </div>

      <div className="pagination-buttons">
        <button onClick={handlePrevious} disabled={page === 0}>⬅ Trước</button>
        <button onClick={handleNext} disabled={page === totalPages - 1}>Tiếp ➡</button>
      </div>
    </div>
  );
};

export default ProductPage;

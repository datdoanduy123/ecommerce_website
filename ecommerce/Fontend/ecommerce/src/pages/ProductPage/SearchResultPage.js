import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../Services/productService";
import { useLocation } from "react-router-dom";

const SearchResultPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data.content);
      })
      .catch((err) => console.error("Lỗi lấy sản phẩm:", err));
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) =>
      p.productName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [query, products]);

  return (
    <div>
      <h2>Kết quả tìm kiếm cho: "{query}"</h2>
      {filteredProducts.length === 0 ? (
        <p>Không tìm thấy sản phẩm nào.</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.productId} className="product-card">
              <img
                src={product.producImgUrl}
                alt={product.productName}
                style={{ width: "200px" }}
              />
              <h4>{product.productName}</h4>
              <p>Giá: {product.productPrice} VND</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;

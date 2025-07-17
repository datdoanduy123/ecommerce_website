import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../Services/productService";
import { useLocation } from "react-router-dom";

const ProductListPage = () => {
  const location = useLocation();
  const [groupedProducts, setGroupedProducts] = useState({});
  const [genderLabel, setGenderLabel] = useState("");

  const query = new URLSearchParams(location.search);
  const gender = query.get("gender");

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        let filtered = res.data.content;

        if (gender) {
          filtered = filtered.filter((p) => p.gender && p.gender === gender);
        }

        // Gán label
        if (gender === "MALE") setGenderLabel("Nam");
        else if (gender === "FEMALE") setGenderLabel("Nữ");
        else if (gender === "UNISEX") setGenderLabel("Unisex");
        else setGenderLabel("");

        console.log("Filtered products:", filtered);

        // Group by categoryName
        const grouped = {};
        filtered.forEach((p) => {
          if (p.categoryName) {
            if (!grouped[p.categoryName]) {
              grouped[p.categoryName] = [];
            }
            grouped[p.categoryName].push(p);
          }
        });

        setGroupedProducts(grouped);
      })
      .catch((err) => console.error("Lỗi lấy sản phẩm:", err));
  }, [gender]);

  return (
    <div>
      <h2>Sản phẩm {genderLabel && `(Giới tính: ${genderLabel})`}</h2>

      {Object.keys(groupedProducts).length === 0 && <p>Không có sản phẩm nào.</p>}

      {Object.keys(groupedProducts).map((catName) => (
        <div key={catName}>
          <h3>{catName}</h3>
          <div className="product-list">
            {groupedProducts[catName].map((product) => (
              <div key={product.productId} className="product-card">
                <img src={product.producImgUrl} alt={product.productName} style={{ width: "200px" }} />
                <h4>{product.productName}</h4>
                <p>Giá: {product.productPrice} VND</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListPage;

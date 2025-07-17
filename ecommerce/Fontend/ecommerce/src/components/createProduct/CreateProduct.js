import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllCategories } from "../../Services/productService";
import "./CreateProduct.css";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [gender, setGender] = useState("");

  const availableSizes = ["S", "M", "L", "XL", "XXL"];
  const navigate = useNavigate();
  const handleSizeChange = (e) => {
  const { value, checked } = e.target;

  
  if (checked) {
    setSizes([...sizes, value]);
  } else {
    setSizes(sizes.filter((s) => s !== value));
  }
};


  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Lỗi khi tải danh mục:", err));
  }, []);

  const handleUploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "product_preset");
    const cloudName = "dpw0wahaa";

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url;
  };

  const handleCreateProduct = async () => {
    try {
      const imageUrl = await handleUploadToCloudinary();

      const productData = {
        productName,
        productPrice: parseFloat(price),
        producImgUrl: imageUrl,
        availableQuantity: parseInt(availableQuantity),
        productDescription,
        status,
        size: sizes, 
        gender,
        category: parseInt(category)
      };

      await axios.post("http://localhost:8222/api/v1/products", productData);
      console.log("Product gửi đi:", productData);

      alert("Tạo sản phẩm thành công!");
    } catch (err) {
      console.error("Lỗi khi tạo sản phẩm:", err);
      alert("Tạo thất bại");
    }
    navigate(`/home`);

  };

  return (
    <div className="create-product-container">
      <h2>Tạo sản phẩm mới</h2>
      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="form-group">
              <label>Giá</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
      <div className="form-group">
        <label>Kích cỡ</label>
        <div className="checkbox-group">
          {availableSizes.map((sz) => (
            <label key={sz}>
              <input
                type="checkbox"
                value={sz}
                checked={sizes.includes(sz)}
                onChange={handleSizeChange}
              />
              {sz}
            </label>
          ))}
        </div>
      </div>

      <label>Giới tính</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">-- Chọn giới tính --</option>
        <option value="MALE">Nam</option>
        <option value="FEMALE">Nữ</option>
        <option value="UNISEX">Unisex</option>
      </select>


      <div className="form-group">
        <label>Số lượng</label>
        <input
          type="number"
          value={availableQuantity}
          onChange={(e) => setAvailableQuantity(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Mô tả sản phẩm</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Ảnh sản phẩm</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <div className="form-group">
        <label>Trạng thái</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ACTIVE">Đang bán</option>
          <option value="OUT_OF_STOCK">Hết hàng</option>
          <option value="DELETED">Ngưng bán</option>
        </select>
      </div>
      <div className="form-group">
        <label>Danh mục</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>
      <button className="create-btn" onClick={handleCreateProduct}>
        Tạo sản phẩm
      </button>
    </div>
  );
}

export default CreateProduct;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProductById, updateProduct, getAllCategories } from "../../Services/productService";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // ⭐ File ảnh mới
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    quantity: "",
    producImgUrl: "",
    size: "",
    gender: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct({
          productName: res.data.productName,
          productDescription: res.data.productDescription,
          productPrice: res.data.productPrice,
          quantity: res.data.availableQuantity,
          producImgUrl: res.data.producImgUrl,
          size: res.data.size ? res.data.size.join(",") : "",
          gender: res.data.gender,
          category: res.data.categoryId,
        });
      })
      .catch((err) => console.error("Lỗi lấy sản phẩm:", err));

    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Lỗi lấy category:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = product.producImgUrl; // ⭐ Giữ URL ảnh cũ mặc định

      if (file) {
        imageUrl = await handleUploadToCloudinary();
      }

      const productToUpdate = {
        ...product,
        producImgUrl: imageUrl,
        size: product.size ? product.size.split(",").map((s) => s.trim()) : [],
      };

      await updateProduct(id, productToUpdate);

      alert("Cập nhật thành công!");
      navigate("/admin-products");
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Lỗi khi cập nhật sản phẩm");
    }
  };

  return (
    <div>
      <h2>Sửa sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <input name="productName" value={product.productName} onChange={handleChange} placeholder="Tên sản phẩm" required />
        <input name="productDescription" value={product.productDescription} onChange={handleChange} placeholder="Mô tả" required />
        <input name="productPrice" value={product.productPrice} onChange={handleChange} placeholder="Giá" type="number" required />
        <input name="quantity" value={product.quantity} onChange={handleChange} placeholder="Số lượng" type="number" required />

        <input name="size" value={product.size} onChange={handleChange} placeholder="Size (vd: M,L,XL)" />

        <select name="gender" value={product.gender} onChange={handleChange}>
          <option value="">-- Chọn giới tính --</option>
          <option value="MALE">Nam</option>
          <option value="FEMALE">Nữ</option>
          <option value="UNISEX">Unisex</option>
        </select>

        <select name="category" value={product.category} onChange={handleChange} required>
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <p>Ảnh hiện tại:</p>
        <img src={product.producImgUrl} alt="Ảnh sản phẩm" style={{ width: "150px", marginBottom: "10px" }} />

        <input type="file" onChange={handleFileChange} />

        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default UpdateProductPage;

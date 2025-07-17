// src/components/Category/AdminCategoryPage.js
import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
} from "../../Services/productService"; // dùng chung file service

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCategory = async () => {
    try {
      if (!newCategory.categoryName || !newCategory.categoryDescription) {
        alert("Vui lòng nhập đủ thông tin");
        return;
      }
      await createCategory(newCategory);
      alert("✅ Tạo danh mục thành công");
      setNewCategory({ categoryName: "", categoryDescription: "" });
      fetchCategories(); // reload lại danh sách
    } catch (error) {
      console.error("Lỗi khi tạo category:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📂 Quản lý danh mục sản phẩm</h2>

      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        <h3>➕ Tạo danh mục mới</h3>
        <input
          type="text"
          placeholder="Tên danh mục"
          name="categoryName"
          value={newCategory.categoryName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Mô tả danh mục"
          name="categoryDescription"
          value={newCategory.categoryDescription}
          onChange={handleInputChange}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={handleCreateCategory} style={{ marginLeft: "10px" }}>
          Tạo
        </button>
      </div>

      <h3>📋 Danh sách danh mục hiện tại:</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Mô tả</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.categoryId}>
              <td>{cat.categoryId}</td>
              <td>{cat.categoryName}</td>
              <td>{cat.categoryDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryPage;

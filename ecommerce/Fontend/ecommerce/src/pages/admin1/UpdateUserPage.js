import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, updateCustomerApi } from "../../Services/customerService";

const UpdateUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    userId: "",
    username: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: {
      houseNumber: "",
      street: "",
      city: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    getCustomerById(id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["houseNumber", "street", "city"].includes(name)) {
      setUser({
        ...user,
        address: {
          ...user.address,
          [name]: value,
        },
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomerApi(user)
      .then(() => {
        alert("Cập nhật thành công!");
        navigate("/admin-users");
      })
      .catch((err) => {
        console.error("Lỗi cập nhật:", err);
        alert("Lỗi khi cập nhật user");
      });
  };

  return (
    <div className="update-container">
      <h2>Sửa thông tin user</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" value={user.username} onChange={handleChange} placeholder="Tên" required />
        <input name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="SĐT" required />
        <input name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} placeholder="YYYY-MM-DD" required />
        <input name="houseNumber" value={user.address.houseNumber} onChange={handleChange} placeholder="Số nhà" />
        <input name="street" value={user.address.street} onChange={handleChange} placeholder="Đường" />
        <input name="city" value={user.address.city} onChange={handleChange} placeholder="Thành phố" />

        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default UpdateUserPage;

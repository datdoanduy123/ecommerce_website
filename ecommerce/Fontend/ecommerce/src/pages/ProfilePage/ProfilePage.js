import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { FaUserCircle, FaPhoneAlt, FaBirthdayCake, FaHome, FaCity, FaMapMarkedAlt } from "react-icons/fa";
import { updateCustomerApi } from "../../Services/customerService"; // thêm file service

function ProfilePage() {
  const [customer, setCustomer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const customerData = localStorage.getItem("customer");
    if (customerData) {
      const parsed = JSON.parse(customerData);
      setCustomer(parsed);
      setFormData(parsed);
    }
  }, []);

  if (!customer) {
    return <p className="profile-loading">Không có thông tin khách hàng</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Nếu sửa trong address
    if (["houseNumber", "street", "city"].includes(name)) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      await updateCustomerApi(formData);
      setCustomer(formData);
      localStorage.setItem("customer", JSON.stringify(formData));
      setEditing(false);
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <FaUserCircle className="avatar-icon" />
        </div>
        <h2>{customer.username}</h2>

        <div className="profile-info">
          {editing ? (
            <>
              <div className="input-group">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Ngày sinh</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Số nhà</label>
                <input
                  type="text"
                  name="houseNumber"
                  value={formData.address.houseNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Đường</label>
                <input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Thành phố</label>
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleChange}
                />
              </div>
              <button className="save-btn" onClick={handleSave}>Lưu</button>
            </>
          ) : (
            <>
              <div className="info-item"><FaPhoneAlt className="info-icon" /> <span>{customer.phoneNumber}</span></div>
              <div className="info-item"><FaBirthdayCake className="info-icon" /> <span>{customer.dateOfBirth}</span></div>
              <div className="info-item"><FaHome className="info-icon" /> <span>{customer.address.houseNumber}</span></div>
              <div className="info-item"><FaMapMarkedAlt className="info-icon" /> <span>{customer.address.street}</span></div>
              <div className="info-item"><FaCity className="info-icon" /> <span>{customer.address.city}</span></div>
            </>
          )}
        </div>

        {!editing ? (
          <button className="edit-btn" onClick={() => setEditing(true)}>Cập nhật thông tin</button>
        ) : (
          <button className="cancel-btn" onClick={() => setEditing(false)}>Hủy</button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

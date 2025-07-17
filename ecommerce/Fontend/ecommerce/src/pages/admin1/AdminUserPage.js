import React, { useEffect, useState } from "react";
import { getAllCustomers, deleteCustomer } from "../../Services/customerService";
import "./AdminUserPage.css";
import { useNavigate } from "react-router-dom";

const AdminUserPage = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers(page);
  }, [page]);

  const loadCustomers = (pageNumber) => {
    getAllCustomers(pageNumber, 5)
      .then(res => {
        setCustomers(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => {
        console.error("Lỗi lấy danh sách:", err);
      });
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa user này?")) {
      deleteCustomer(id)
        .then(() => {
          alert("Xóa thành công!");
          loadCustomers(page);
        })
        .catch(err => {
          console.error("Lỗi xóa:", err);
          alert("Lỗi khi xóa user");
        });
    }
  };

  return (
    <div className="admin-container">
      <h2>Danh sách khách hàng (Trang {page + 1}/{totalPages})</h2>
      <ul>
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div key={customer.userId} className="customer-card">
              <h3>{customer.username}</h3>
              <p>Phone: {customer.phoneNumber}</p>
              <p>Date of birth: {customer.dateOfBirth}</p>
              <button onClick={() => handleViewProfile(customer.userId)}>Xem hồ sơ</button>
              <button onClick={() => navigate(`/admin-users/update/${customer.userId}`)}>Sửa</button>
              <button onClick={() => handleDelete(customer.userId)}>Xóa</button>
            </div>
          ))
        ) : (
          <p>Không có khách hàng nào</p>
        )}
      </ul>

      <div className="pagination-buttons">
        <button onClick={handlePrevious} disabled={page === 0}>⬅ Trước</button>
        <button onClick={handleNext} disabled={page === totalPages - 1}>Tiếp ➡</button>
      </div>
    </div>
  );
};

export default AdminUserPage;

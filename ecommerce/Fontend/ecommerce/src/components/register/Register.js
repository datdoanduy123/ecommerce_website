import { useState } from "react";

function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState({ 
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: {
      houseNumber: "",
      city: "",
      street: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "houseNumber" || name === "city" || name === "street") {
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email" />
      <input 
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
        placeholder="Số điện thoại"
      />
      <input 
        name="dateOfBirth"
        type="date"
        value={form.dateOfBirth}
        onChange={handleChange}
        placeholder="Ngày sinh"
      />
      <input 
        name="houseNumber"
        value={form.address.houseNumber}
        onChange={handleChange}
        placeholder="Số nhà"
      />
      <input 
        name="city"
        value={form.address.city}
        onChange={handleChange}
        placeholder="Thành phố"
      />
      <input 
        name="street"
        value={form.address.street}
        onChange={handleChange}
        placeholder="Đường"
      />
      <button type="submit">Đăng ký</button>
    </form>
  );
}
export default RegisterForm;

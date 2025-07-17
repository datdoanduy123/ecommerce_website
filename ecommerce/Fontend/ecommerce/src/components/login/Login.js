import { useState } from "react";

function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); 
  }; 

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}> 
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="user name"
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="password"
      />

      <button type="submit">Đăng Nhập</button>
    </form>
  );
}

export default LoginForm;

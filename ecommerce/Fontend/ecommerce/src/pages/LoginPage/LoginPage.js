
import { Link } from "react-router-dom";
import LoginForm from "../../components/login/Login";
import "./LoginPage.css";
import { loginUser } from "../../Services/authService";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const navigate = useNavigate()
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 >
          Đăng nhập
        </h2>
        <LoginForm onSubmit={handleLogin} />
        <p className="register-link">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </div>
    </div>
  );

  async function handleLogin(formData) {
  try {
    const res = await loginUser(formData);
    console.log("Login response:", res.data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    if (res.data.customer) {
      localStorage.setItem("userId", res.data.customer.userId);
      localStorage.setItem("customer", JSON.stringify(res.data.customer));
    }

    alert(`Đăng nhập thành công`);
    navigate("/home");
  } catch (error) {
    alert(`Đăng nhập thất bại: ${error.message}`);
  }
}

}

export default LoginPage;

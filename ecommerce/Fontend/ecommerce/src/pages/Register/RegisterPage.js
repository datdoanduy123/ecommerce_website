import RegisterForm from "../../components/register/Register";
import { registerUser } from "../../Services/authService";
import "./RegisterPage.css"

function RegisterPage() {
  const handleRegister = async (formData) => {
    try {
      const res = await registerUser(formData);
      alert(`Đăng ký thành công: ${res.data.token}`);
    } catch (error) {
      alert(error.message);
    }
  };
  
  // return <RegisterForm onSubmit={handleRegister} />;

  return (
    <div className = "register-container">
      <div className = "register-box">
        <h2>Đăng Ký</h2>
        <RegisterForm onSubmit={handleRegister}/>

      </div>

    </div>
  );
}
export default RegisterPage;

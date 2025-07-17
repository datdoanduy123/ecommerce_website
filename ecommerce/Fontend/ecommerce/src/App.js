import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import CreateProduct from "./components/createProduct/CreateProduct"
import ManPage from "./pages/MenPage/ManPage";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import ChatPage from "./pages/ChatPage/ChatPage";
import AdminConservation from "./pages/admin1/AdminConservation";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckOutPage/CheckOutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ThankYouPage from "./pages/ThankYouPage/ThankYouPage";
import AdminUserPage from "./pages/admin1/AdminUserPage";
import ProfileAdminPage from "./pages/admin1/ProfileAdminPage";
import UpdateUserPage from "./pages/admin1/UpdateUserPage";
import AdminProductPage from "./pages/admin1/AdminProductPage";
import UpdateProductPage from "./pages/admin1/UpdateProductPage";
import ProductListPage from "./pages/ProductPage/ProductListPage";
import SearchResultPage from "./pages/ProductPage/SearchResultPage";
import AdminCategoryPage from "./pages/admin1/AdminCategoryPage ";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="/men" element={<ManPage />} />
      <Route path="/detail-product/:id" element={<DetailProduct />} />
      <Route path="/admin-conservation" element={<AdminConservation />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/admin-users" element={<AdminUserPage />} />
      <Route path="/profile/:id" element={<ProfileAdminPage />} />
      <Route path="/admin-users/update/:id" element={<UpdateUserPage />} />
      <Route path="/admin-products" element={<AdminProductPage />} />
      <Route path="/update-product/:id" element={<UpdateProductPage />} />
      <Route path="/productlist" element={<ProductListPage />} />
      <Route path="/search" element={<SearchResultPage />} />
      <Route path="/admin-categories" element={<AdminCategoryPage />} />

      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

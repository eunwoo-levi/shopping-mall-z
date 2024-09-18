import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import AdminProductPage from "./pages/AdminOrder/AdminProductPage";
import AdminOrderPage from "./pages/AdminProduct/AdminOrderPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/product" element={<AdminProductPage />} />
        <Route path="/admin/order" element={<AdminOrderPage />} />
      </Routes>
    </>
  );
}

export default App;

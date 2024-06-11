import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./pages/Admin/Layout/Layout";
import CategoryManagement from "./pages/Admin/category/CategoryManagement";
import ProductManagement from "./pages/Admin/product/ProductManagement";
import DashBoard from "./pages/Admin/dashboard/DashBoard";
import OrderManagement from "./pages/Admin/order/OrderManagement";
import AccountManagement from "./pages/Admin/account/AccountManagement";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import LoginLayout from "./pages/Login/LoginLayout";
import Register from "./pages/Register";
import PageAbout from "./pages/PageAbout";
import PagePost from "./pages/PagePost";
import PageContact from "./pages/PageContact";
import PageMenu from "./pages/PageMenu";
import FoodDetail from "./components/detail_food/FoodDetail";
import Cart from "./components/cart/Cart";
import ThankYouPage from "./pages/ThankYouPage";
import Payment from "./components/payment/Payment";
import OrderDetail from "./pages/Admin/order/OrderDetail";
import CounterPage from "./pages/Counter/Counter";
import Chef from "./pages/Chef/Chef";
import NotFound from "./components/NotFound";
import LayoutUser from "./pages/LayoutUser";


const App = () => {
  // Lấy giá trị isLoggedIn và isAdmin từ reducer
  let { isLoggedIn, isAdmin, isCounter, isStaff, isChef, isRecep } = useSelector((state) => state.app);

  return (
    <Routes>
      <Route path="/" element={<LoginLayout />}>
        <Route path="" element={<Login />}></Route>
        <Route path="login-page" element={<Login />}></Route>
      </Route>
      {!isLoggedIn && (
        <Route path="/" element={<LoginLayout />}>
          <Route path="" element={<Login />}></Route>
        </Route>
      )}
      {isLoggedIn && isAdmin && (
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<DashBoard />}></Route>
          <Route path="manager-order" element={<OrderManagement />}></Route>
          <Route path="manager-account" element={<AccountManagement />}></Route>
          <Route path="manager-category" element={<CategoryManagement />}></Route>
          <Route path="manager-food" element={<ProductManagement />}></Route>
          <Route path="order/get-detail/:orderId" element={<OrderDetail />}></Route>
          {/* Thêm một Route cuối cùng với path="*" để xử lý các trang không hợp lệ */}
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Route>
      )}
      {isLoggedIn && isStaff && (
        <Route path="/staff" element={<LayoutUser />}>
          <Route path="home-page" element={<Home />}></Route>
          <Route path="about-page" element={<PageAbout />}></Route>
          <Route path="blog-page" element={<PagePost />}></Route>
          <Route path="contact-page" element={<PageContact />}></Route>
          <Route path="menu-page" element={<PageMenu />}></Route>
          <Route path="cart-detail-page" element={<Cart />}></Route>
          <Route path="get-pay-page" element={<Payment />}></Route>
          {/* Sử dụng Route param để truyền id vào FoodDetail */}
          <Route path="food-detail/:id" element={<FoodDetail />}></Route>
          <Route path="thankYou" element={<ThankYouPage />}></Route>
          <Route path="register-page" element={<Register />}></Route>
          {/* Thêm một Route cuối cùng với path="*" để xử lý các trang không hợp lệ */}
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Route>
      )}
      {isLoggedIn && isRecep && (
        <Route path="/recep" element={<CounterPage />}></Route>
      )}
      {isLoggedIn && isChef && (
        <Route path="/chef" element={<Chef />}></Route>
      )}
      {/* Trang not found */}
      <Route path="not-found" element={<NotFound />} />
      {/* Chuyển hướng các đường dẫn không hợp lệ đến trang not found */}
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default App;

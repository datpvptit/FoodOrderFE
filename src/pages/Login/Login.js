import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginSuccess, saveCurrentPath, clearCartItems, clearOrderItems } from "../../actions/actions";
import "../../styles/css/login.css";
import { scrollToElement } from '../../scrollUtils';
import bg1 from "../../assets/images/bg_1.jpg";
const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
    dispatch(saveCurrentPath(window.location.pathname));
    document.title = 'Đăng nhập hệ thống';
    setTimeout(() => {
      scrollToElement('scrollTarget');
    });
  }, [dispatch]);

  const navigate = useNavigate(); // Sửa đổi tại đây
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const fetchPayment = async (listOrderId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5159/api/actions?KeepStatus=60m&Wait=15s&MessageCount=200&MessageSeverity=Info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
        body: {
          "PrintBTWAction": {
            "DocumentFile": "d:\\BarcodeBTW\\Serial.btw",
            "Printer": "ZDesigner ZT610-600dpi ZPL",
          "NamedDataSources": {
              "SN": "1159"},
            "SaveAfterPrint": true
          }
        },
      });
      const data = await response.json();      
      if (data.success) {
        console.log("ok");
      } else {
        throw new Error("Failed to add order");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    // const remember = formData.get("remember");
    console.log({ email, password })

    const app_api_url = process.env.REACT_APP_API_URL;
    try {
      const url = app_api_url + "/api/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();

      let isAdmin = false;
      let isStaff = false;
      let isRecep = false;
      let isChef = false;
      if (data.desc === "[SUPERADMIN]") {
        isAdmin = true;
      } else if (data.desc === "[STAFF]") {
        isStaff = true;
      } else if (data.desc === "[RECEP]") {
        isRecep = true;
      } else if (data.desc === "[CHEF]") {
        isChef = true;
      }

      // Cập nhật reducer và localStorage
      const user = { title: data.title, userId: data.id };
      dispatch(loginSuccess({ user: user, isAdmin: isAdmin, isStaff: isStaff, isRecep: isRecep, isChef: isChef })); // Cập nhật thông tin người dùng
      dispatch(clearCartItems());
      dispatch(clearOrderItems());
      sessionStorage.setItem("accessToken", data.data); // Lưu accessToken vào sessionStorage

      // Điều hướng người dùng đến trang phù hợp dựa vào desc
      if (data.desc === "[SUPERADMIN]") {
        navigate("/admin/dashboard");
      } else if (data.desc === "[STAFF]") {
        navigate("/staff");
      } else if (data.desc === "[RECEP]") {
        navigate("/recep");
      } else if (data.desc === "[CHEF]") {
        navigate("/chef");
      } else {
        navigate("/login-page");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <section className="ftco-section" style={{ backgroundImage: `url(${bg1})` }} >
      <div className="container">
        <div className="row">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <form onSubmit={handleSubmit}>
                  <div id="scrollTarget" className="card-body p-5 text-center">
                    <h3 className="mb-5">Đăng nhập hệ thống </h3>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-4" id="show_hide_password">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="form-control form-control-lg"
                      />
                      <div className="input-group-addon">
                        <span onClick={togglePasswordVisibility}>
                          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>

                    <div className="form-check d-flex justify-content-start mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        name="remember"
                        id="form1Example3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form1Example3"
                      >
                        Nhớ mật khẩu
                      </label>
                    </div>
                    <div>
                      <button
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        style={{ width: "100%" }}
                        type="submit"
                      >
                        Đăng nhập
                      </button>
                      <button
                        onClick={fetchPayment}
                      >Gửi</button>
                    </div>

                    <div className="mt-4">
                      Chưa có tài khoản?
                      <NavLink
                        to="/register-page"
                        className={({ isActive }) => {
                          const activeClass = isActive ? "activeHome" : "";
                          return `${activeClass}`;
                        }}
                      >
                        Đăng ký
                      </NavLink>
                    </div>
                    <div className="signup_link">
                      Quên mật khẩu?
                      <NavLink to="/forgotPassword">Lấy lại mật khẩu</NavLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

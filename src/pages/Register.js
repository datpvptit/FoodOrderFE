import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../actions/actions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../styles/css/register.css";
import { scrollToElement } from '../scrollUtils';
const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
    dispatch(saveCurrentPath(window.location.pathname));
    setTimeout(() => {
      scrollToElement('scrollTarget');
    });
  }, [dispatch]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const phone = formData.get("phone");
    const address = formData.get("address");

    console.log(username, email, password, confirmPassword, phone, address); // Thay console.log bằng xử lý đăng ký thực tế
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">
                  Tạo tài khoản
                </h2>

                <form onSubmit={handleSubmit} id="signupForm">
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="username"
                      required
                      className="form-control form-control-lg"
                      placeholder="Username"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="Email"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <div id="show_hide_password1">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        required
                        placeholder="Password"
                        className="form-control form-control-lg"
                      />
                      <div className="input-group-addon">
                        <span onClick={togglePasswordVisibility}>
                          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <div id="show_hide_password2">
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        className="form-control form-control-lg"
                        placeholder="Repeat your password"
                      />
                      <div className="input-group-addon">
                        <span
                          href="#"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      required
                      className="form-control form-control-lg"
                      placeholder="Phone number"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="address"
                      required
                      className="form-control form-control-lg"
                      placeholder="Address"
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      style={{ width: "100%" }}
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                    >
                      Đăng ký
                    </button>
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">
                    Bạn đã có tài khoản?
                    <NavLink
                      to="/login-page"
                      className={({ isActive }) => {
                        const activeClass = isActive ? "activeHome" : "";
                        return `fw-bold text-body ${activeClass}`;
                      }}
                    >
                      Đăng nhập
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

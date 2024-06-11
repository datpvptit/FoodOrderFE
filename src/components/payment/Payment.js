import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCurrentPath, clearOrderItems } from "../../actions/actions";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const cartItemsOrder = useSelector((state) => state.app.cartItemsOrder);
  const user = useSelector((state) => state.app.user);
  const listOrderId = useSelector((state) => state.app.listOrderId);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalPrice = cartItemsOrder.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const navigate = useNavigate();

  const fetchPayment = async (listOrderId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:4000/addOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderIDList: listOrderId,
          totalPrice: totalPrice,
          custommerName: customerInfo.fullName,
          customerEmail: customerInfo.email,
          customerPhoneNumber: customerInfo.phoneNumber,
          method: paymentMethod
        }),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // gọi api thanh toán thành công thì chuyên qua trang cảm ơn và xóa hết sản phẩm trong giỏ hàng
    fetchPayment(listOrderId);
    dispatch(clearOrderItems());
    navigate("/thankYou");
  };

  return (
    <section role="main" className="pb-5">
      <div className="container mt-4">
        <form className="needs-validation" onSubmit={handleSubmit}>
          <input type="hidden" name="kh_tendangnhap" value="dnpcuong" />

          <div className="py-5 text-center">
            <i className="fa fa-credit-card fa-4x" aria-hidden="true"></i>
            <h2>Thanh toán</h2>
            <p className="lead">
              Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước
              khi Đặt hàng.
            </p>
          </div>

          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Giỏ hàng</span>
                <span className="badge badge-secondary badge-pill">
                  {cartItemsOrder.length}
                </span>
              </h4>
              <ul className="list-group mb-3">
                {cartItemsOrder.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between lh-condensed"
                  >
                    <div>
                      <h6 className="my-0">{item.title}</h6>
                      <small className="text-muted">
                        Số lượng: {item.quantity}
                      </small>
                    </div>
                    <span className="text-muted">
                      ${item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Thông tin khách hàng</h4>
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="fullName">Họ tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={customerInfo.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="tableName">Bàn số</label>
                  <div>{user.title}</div>
                </div>
                <div className="col-md-12">
                  <label htmlFor="phoneNumber">Điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={customerInfo.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <h4 className="mb-3">Hình thức thanh toán</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="cash"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    value="Tiền mặt"
                    checked={paymentMethod === "Tiền mặt"}
                    onChange={handlePaymentMethodChange}
                    required
                  />
                  <label className="custom-control-label" htmlFor="cash">
                    Tiền mặt
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="bankTransfer"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    value="Chuyển khoản"
                    checked={paymentMethod === "Chuyển khoản"}
                    onChange={handlePaymentMethodChange}
                    required
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="bankTransfer"
                  >
                    Chuyển khoản
                  </label>
                </div>
              </div>
              <hr className="mb-4" />
              {/* Phần tổng tiền và nút đặt hàng */}
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Tổng tiền</span>
                <span className="badge badge-secondary badge-pill">
                  ${totalPrice}
                </span>
              </h4>
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                name="btnDatHang"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Payment;

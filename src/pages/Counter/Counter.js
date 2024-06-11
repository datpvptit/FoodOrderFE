import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentPath, clearOrderItems } from "../../actions/actions";
import Footer from "../../components/Footer/Footer";
import HeaderCounter from "./HeaderCounter";
import { Container, Row, Col } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../pages/util/toast";
import { FaTrash, FaPencilAlt, FaSearch } from "react-icons/fa"

const Counter = () => {
  const cartItemsOrder = useSelector((state) => state.app.cartItemsOrder);
  const [bill, setBill] = useState("");
  const [orders, setOrders] = useState([]);
  const listOrderId = useSelector((state) => state.app.listOrderId);
  const [orderItemList, setItemList] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phoneNumber: ""
  });
  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
  }, [dispatch]);
  useEffect(() => {
    setPaymentInfo();
  }, [orders]);
  const totalPrice = cartItemsOrder.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const staticUrl = process.env.REACT_APP_API_URL_IMAGE;
  const app_api_url = process.env.REACT_APP_API_URL;
  const fetchOrders = async (phone_number) => {
    setPaymentInfo();
    setOrders([]);
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = app_api_url + `/api/order/get-all-customer-order?phoneNumber=${encodeURIComponent(phone_number)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
        setBill(data.title);
      } else {
        notify(data.data, "error");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const setPaymentInfo = async () => {
    let x = [];
    let total = 0;
    orders.forEach(order => {
      total = total + order.totalPrice;
      x.push(order.id)
    });
    setItemList(x);
    setTotalBill(total);
    setCustomerInfo({
      fullName: bill.split("-")[1],
      phoneNumber: bill.split("-")[0]
    });
  };
  const formatPriceToVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const fetchPayment = async (listOrderId) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const url = app_api_url + `/api/payment/add`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderIDList: orderItemList,
          totalPrice: totalBill,
          custommerName: customerInfo.fullName,
          customerPhoneNumber: customerInfo.phoneNumber,
        }),
      });
      const data = await response.json();
      if (data.success) {
        fetchOrders(searchValue);
        notify(data.data, "success");
        console.log("ok");
      } else {
        throw new Error("Failed to add order");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const handleSubmit = () => {
    console.log("ok");
    // gọi api thanh toán thành công thì chuyên qua trang cảm ơn và xóa hết sản phẩm trong giỏ hàng
    fetchPayment(listOrderId);
    dispatch(clearOrderItems());
  };
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Hàm xử lý sự kiện khi nhấn nút tìm kiếm
  const handleSearchClick = () => {
    fetchOrders(searchValue);
  };

  return (
    <div>
      <HeaderCounter />
      <Container>
        <h2 className="mt-4">Tìm kiếm theo số điện thoại khách hàng </h2>
        <form
          id="searchForm"
          className="input-group justify-content-end"
          style={{ width: "40%" }}
        >
          <div className="input-group">
            <input
              type="text"
              id="searchInput"
              className="form-control"
              placeholder="Tìm theo tên sản phẩm"
              value={searchValue}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button
                type="button"
                id="searchBtn"
                className="btn btn-primary"
                onClick={handleSearchClick}
              >
                <FaSearch />
              </button>
            </div>
          </div>
        </form>
        <h2 className="mt-4">Khách hàng: {bill} </h2>
        {orders.map((order) => (
          <div key={order.id} className="mb-4">
            <h3>Chi tiết đơn đặt #{order.id} </h3>
            <Row>
              <Col md="6">
                <div className="mb-4">
                  <h5 className="card-title">Thông tin đơn hàng</h5>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td><strong>Vị trí bàn:</strong></td>
                        <td>{order.userName}</td>
                      </tr>
                      <tr>
                        <td><strong>Ngày đặt:</strong></td>
                        <td>{new Date(order.time).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td><strong>Giá trị hóa đơn:</strong></td>
                        <td>${order.totalPrice.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td><strong>Trạng thái:</strong></td>
                        <td>{order.status ? "Đã phục vụ" : "Chưa phục vụ"}</td>
                      </tr>
                      <tr>
                        <td><strong>Thanh toán:</strong></td>
                        <td>{order.is_pay ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col md="6">
                <h5>Chi tiết sản phẩm</h5>
                {order.detailResponeList.map((item, index) => (
                  <div key={index} className="mb-3">
                    <Row>
                      <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <img
                          src={`${staticUrl}/${item.image}`}
                          alt={item.foodName}
                          className="img-fluid"
                        />
                      </Col>
                      <Col xs="12" md="8">
                        <p>
                          <strong>Tên sản phẩm:</strong> {item.foodName}
                        </p>
                        <p>
                          <strong>Số lượng:</strong> {item.quanity}
                        </p>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Col>
            </Row>
          </div>

        ))}
        <div className="d-flex justify-content-between">
          <p>Tổng số sản phẩm: {orderItemList.length}</p>
          <p>Tổng thanh toán: {formatPriceToVND(totalBill)}</p>
        </div >
        <div className="text-right pb-5">
          <button className="btn btn-secondary mr-3" style={{ color: "white" }}
            onClick={handleSubmit}>
            Thanh toán
          </button>
        </div>
      </Container>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Counter;

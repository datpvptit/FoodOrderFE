import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../../actions/actions";
import Footer from "../../components/Footer/Footer";
import HeaderChef from "./HeaderChef";
import { Container, Row, Col } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../pages/util/toast";

const Counter = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState('');
  const [foodId, setFoodId] = useState('');
  useEffect(() => {
    fetchOrders();
    dispatch(saveCurrentPath(window.location.pathname));
  }, [dispatch]);

  const staticUrl = process.env.REACT_APP_API_URL_IMAGE;
  const app_api_url = process.env.REACT_APP_API_URL;
  const fetchOrders = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/order/get-all-to-serve";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        console.error("Error fetching orders:", data.desc);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const serveOrders = async (orderId, foodId) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = `${app_api_url}/api/order/serve/detail/${orderId}` + `/${foodId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        notify(data.data, "success");
        fetchOrders();
      } else {
        notify(data.data, "error");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSubmit = (orderId, foodId) => {
    console.log(orderId, foodId);
    setOrderId(orderId, foodId);
    setFoodId(foodId)
    serveOrders(orderId, foodId);
    fetchOrders();
  };

  return (
    <div>
      <HeaderChef />
      <Container>
        <h2 className="mt-4">Orders</h2>
        {orders.map((order) => (
          <div key={order.id} className="mb-4">
            <h3>Chi tiết đơn hàng #{order.id}</h3>
            <button className="btn btn-secondary"
              value={orderId}
              onClick={() => handleSubmit(order.id)}>Phục vụ</button>
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
                      {!item.status ? (
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleSubmit(order.id, item.id)}
                        >
                          Phục vụ
                        </button>
                      ) : (
                        <p>
                          <strong>Trạng thái: Đã phục vụ</strong>
                        </p>
                      )}

                    </Row>
                  </div>
                ))}
              </Col>
            </Row>
          </div>
        ))}
      </Container>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Counter;

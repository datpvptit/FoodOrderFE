import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

const OrderDetail = () => {
  const staticUrl = process.env.REACT_APP_API_URL_IMAGE;
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);

  const app_api_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Gọi API để lấy chi tiết đơn hàng dựa trên orderId
    fetchOrderDetail(orderId);
    document.title = "Chi tiết đơn đặt";
  }, [orderId]);
  const formatPriceToVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const fetchOrderDetail = async (orderId) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = app_api_url + `/api/order/get-detail/${orderId}`;
      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setOrderDetail(data.data);
      } else {
        console.error("Error fetching order detail:", data.desc);
      }
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

  if (!orderDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Container>
        <h2 className="mt-4">Chi tiết đơn hàng #{orderId}</h2>
        <Row>
          <Col md="6">
            <div body className="mb-4">
              <h5 className="card-title">Thông tin đơn hàng</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td><strong>Vị trí bàn:</strong></td>
                    <td>{orderDetail.userName}</td>
                  </tr>
                  <tr>
                    <td><strong>Ngày đặt:</strong></td>
                    <td>{new Date(orderDetail.time).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Giá trị hóa đơn:</strong></td>
                    <td>{formatPriceToVND(orderDetail.totalPrice)}</td>
                  </tr>
                  <tr>
                    <td><strong>Trạng thái:</strong></td>
                    <td>{orderDetail.status ? "Đã phục vụ" : "Chưa phục vụ"}</td>
                  </tr>
                  <tr>
                    <td><strong>Thanh toán:</strong></td>
                    <td>{orderDetail.is_pay ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
          <Col md="6">
            <h5>Chi tiết sản phẩm</h5>
            {orderDetail.detailResponeList.map((item, index) => (
              <div key={index} body className="mb-3">
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
        <Link to="/admin/manager-order" className="btn btn-secondary mb-4">Quay lại</Link>
      </Container>

    </div>
  );
};

export default OrderDetail;

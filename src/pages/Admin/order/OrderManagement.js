import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../../../actions/actions";
import HeaderAdmin from "../Layout/HeaderAdmin";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // Số lượng đơn hàng trên mỗi trang

  const app_api_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
    document.title = "Quản trị danh sách đơn đặt";
    fetchOrders(); // Gọi hàm fetchOrders khi component được tải
  }, [dispatch]);

  // Hàm để gửi yêu cầu GET đến API để lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/order/get-all";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setOrders(data.data); // Cập nhật danh sách đơn hàng từ dữ liệu trả về
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Tính chỉ mục bắt đầu và chỉ mục kết thúc của danh sách đơn hàng trên trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Hàm để chuyển đến trang mới
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <HeaderAdmin></HeaderAdmin>
      <div className="container-fluid pt-4 px-4">
        <div>
          <h3>Quản lý đơn hàng</h3>
          <div className="d-flex align-items-center justify-content-between">
            <form
              id="searchForm"
              className="input-group justify-content-end"
              style={{ width: "40%" }}
            >
              <input
                type="text"
                id="searchInput"
                className="form-control"
                placeholder="Tìm theo tên mã đơn"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  id="searchBtn"
                  className="btn btn-primary"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Vị trí bàn</th>
                <th>Tên khách hàng</th>
                <th>Ngày đặt</th>
                <th>SĐT (tài khoản)</th>
                <th>Thành tiền</th>
                <th>Trạng thái phục vụ</th>
                <th>Trạng thái thanh toán</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.userName}</td>
                  <td>{order.cusName}</td>
                  <td>{order.time}</td>
                  <td>{order.customer_phone_number}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.status ? "Đã phục vụ" : "Chưa phục vụ"}</td>
                  <td>{order.is_pay ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                  <td><Link
                    to={`/admin/order/get-detail/${order.id}`}
                    className="btn btn-secondary"
                  >
                    Chi tiết
                  </Link></td> {/* Bổ sung liên kết đến trang chi tiết đơn hàng */}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Phân trang */}
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(orders.length / ordersPerPage) },
              (_, i) => i + 1
            ).map((number) => (
              <li key={number} className="page-item">
                <button onClick={() => paginate(number)} className="page-link">
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;

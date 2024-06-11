import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaPencilAlt, FaSearch } from "react-icons/fa";
import ModalAddCustomer from "./ModalAddCustomer";
import {
  removeFromCart,
  saveCurrentPath,
  updateCartItemQuantity,
  orderItems,
  addOrderId
} from "../../actions/actions";
import { Link } from "react-router-dom";
import { scrollToElement } from '../../scrollUtils';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../pages/util/toast";

const Cart = () => {
  const dispatch = useDispatch();
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const cartItems = useSelector((state) => state.app.cartItems);
  const [showAddModal, setShowAddModal] = useState(false);
  let user = useSelector((state) => state.app.user);
  const cartItemsOrder = useSelector((state) => state.app.cartItemsOrder);

  const [searchValue, setSearchValue] = useState('');
  const [itemQuantitiesCart, setItemQuantitiesCart] = useState({});
  const [itemQuantitiesOrder, setItemQuantitiesOrder] = useState({});
  const [totalPriceCart, setTotalPriceCart] = useState(0);
  const [totalPriceOrder, setTotalPriceOrder] = useState(0);
  const [customer, setCustomer] = useState({});

  const totalQuantityCart = Object.values(itemQuantitiesCart).reduce(
    (total, quantity) => total + quantity,
    0
  );
  useEffect(() => {
    const updatedItemQuantitiesCart = cartItems.reduce((quantities, item) => {
      quantities[item.id] = item.quantity;
      return quantities;

    }, {});

    setItemQuantitiesCart(updatedItemQuantitiesCart);
    document.title = 'Giỏ hàng';
    const updatedItemQuantitiesOrder = cartItemsOrder.reduce(
      (quantities, item) => {
        quantities[item.id] = item.quantity;
        return quantities;
      },
      {}
    );
    setItemQuantitiesOrder(updatedItemQuantitiesOrder);

    const updatedTotalPriceCart = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPriceCart(updatedTotalPriceCart);

    const updatedTotalPriceOrder = cartItemsOrder.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPriceOrder(updatedTotalPriceOrder);

    dispatch(saveCurrentPath(window.location.pathname));
    setTimeout(() => {
      scrollToElement('scrollTarget');
    });
    console.log(totalQuantityCart);
    setIsButtonVisible(totalQuantityCart > 0 && !!customer.phoneNumber);
    console.log(isButtonVisible);
  }, [cartItems, cartItemsOrder, dispatch, customer.phoneNumber, totalQuantityCart]);


  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleAddButtonClick = () => {
    setShowAddModal(true);
  };

  const handleAddCustomer = async (customer) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/customers/add"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customer)
      });
      const responseData = await response.json();
      if (responseData.success) {
        notify(responseData.data, "success");

      } else {
        notify(responseData.data, "error");
      }
      setShowAddModal(false);

    } catch (error) {
      console.error("Error adding account:", error);
    }
  };
  const totalQuantityOrder = Object.values(itemQuantitiesOrder).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    setItemQuantitiesCart({ ...itemQuantitiesCart, [id]: quantity });
    dispatch(updateCartItemQuantity(id, quantity));

    const updatedTotalPriceCart = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPriceCart(updatedTotalPriceCart);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };


  const staticUrl = process.env.REACT_APP_API_URL_IMAGE;
  const app_api_url = process.env.REACT_APP_API_URL;
  const fetchOrders = async (cartItems) => {
    const reducedArray = cartItems.map(item => {
      return {
        foodID: item.id,
        number: item.quantity
      };
    });
    try {
      const token = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/order/add";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.userId, orderItemDTOList: reducedArray, customerPhoneNumber: customer.phoneNumber })
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        notify(data.data, "success");
        dispatch(addOrderId(data.id));
      } else {
        notify(data.data, "error");
        throw new Error("Failed to add order");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const findCustomerByPhoneNumber = async (phone_number) => {

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = app_api_url + `/api/customers/getByPhoneNumber?phoneNumber=${encodeURIComponent(phone_number)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Kiểm tra nếu phản hồi thành công (status code 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Kiểm tra nội dung phản hồi trước khi phân tích cú pháp JSON
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        setCustomer(data.data);
      } else {
        throw new Error("Response is empty");
      }

      // Handle the response here if needed
    } catch (error) {
      console.error("Error getting list of food:", error);
      // Handle error here if needed
    }

  };
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    findCustomerByPhoneNumber(searchValue);
  };

  const handleOrder = () => {
    fetchOrders(cartItems);
    dispatch(orderItems());
  };

  const formatPriceToVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="my-4">Danh sách sản phẩm</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Tổng cộng</th>
              <th scope="col">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={`${staticUrl}/${item.image}`}
                    alt={item.name}
                    className="img-fluid"
                    style={{ maxWidth: "100px" }}
                  />
                </td>
                <td>{item.title}</td>
                <td>{formatPriceToVND(item.price)}</td>
                <td>
                  <input
                    type="number"
                    value={itemQuantitiesCart[item.id]}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    min="1"
                    className="form-control"
                  />
                </td>
                <td>${item.price * itemQuantitiesCart[item.id]}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <p>Tổng số sản phẩm: {totalQuantityCart}</p>
          <p>Tổng tiền: {formatPriceToVND(totalPriceCart)}</p>
        </div >
        <div className="d-flex justify-content-between">
          {/* Search form */}
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
                placeholder="Tìm khách hàng theo số điện thoại"
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
        </div>
        <h2 className="my-4">Thông tin khách hàng</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Số điện thoại</th>
              <th>Họ tên</th>
              <th>Địa chỉ</th>
            </tr>
          </thead>
          <tbody>
            <td>{customer.phoneNumber}</td>
            <td>{customer.fullName}</td>
            <td>{customer.address}</td>
          </tbody>
        </table>
      </div>

      <div className="text-right pb-5">
        <button className="btn btn-secondary mr-3">
          <Link to="/staff/menu-page" style={{ color: "white" }}>
            Tiếp tục thêm món ăn
          </Link>
        </button>
        {isButtonVisible && (
          <button
            className="btn btn-primary mr-3"
            style={{ color: "white" }}
            onClick={handleOrder}
          >
            Đặt món
          </button>
        )}
        <ModalAddCustomer
          isOpen={showAddModal}
          toggle={toggleAddModal}
          handleAddCustomer={handleAddCustomer}
        />
        <button
          type="button"
          className="btn btn-primary"
          id="addModalBtn"
          onClick={handleAddButtonClick}
        >
          Thêm thông tin khách hàng
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;

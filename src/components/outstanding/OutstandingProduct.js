import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/actions"; // Import action addToCart
import { NavLink } from "react-router-dom";
const OutstandingProduct = () => {
  const staticUrl = process.env.REACT_APP_API_URL_IMAGE;
  const app_api_url = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const formatPriceToVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const fetchCategories = async () => {
    try {
      const url = app_api_url + "/api/home/category";
      const response = await fetch(url);
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Hàm xử lý thêm món vào giỏ hàng
  const handleAddToCart = (food) => {
    const foodWithDefaultQuantity = { ...food, quantity: 1 }; // Tạo một bản sao của food với quantity mặc định là 1
    dispatch(addToCart(foodWithDefaultQuantity)); // Dispatch action addToCart với thông tin sản phẩm có số lượng mặc định là 1
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div class="row no-gutters justify-content-center mb-5 pb-2">
          <div class="col-md-12 text-center heading-section">
            <span class="subheading">Đặc sản</span>
            <h2 class="mb-4">Thực đơn</h2>
          </div>
        </div>
        <div className="row no-gutters d-flex align-items-stretch">
          {categories.length > 0 && // Kiểm tra xem categories đã được fetch chưa
            categories[1].foodDTOList.map((food, foodIndex) => (
              <div
                key={food.id}
                className="col-md-12 col-lg-6 d-flex align-self-stretch"
              >
                <div className="menus d-sm-flex align-items-stretch">
                  <div
                    className={`menu-img img ${
                      foodIndex % 2 !== 0 ? "order-md-last" : ""
                    }`}
                    style={{
                      backgroundImage: `url(${staticUrl}/${food.image})`,
                    }}
                  ></div>
                  <div className="text d-flex align-items-center productBody">
                    <div>
                      <div className="d-flex">
                        <div className="one-half">
                          <h3 className="productName">
                            <NavLink to={`/food-detail/${food.id}`}>
                              {food.title}
                            </NavLink>
                          </h3>
                        </div>
                        <div className="one-forth">
                          <span className="price">
                            {formatPriceToVND(food.price)}
                          </span>
                        </div>
                      </div>
                      <p className="desc">
                        <span>Thịt</span>, <span>Khoai tây</span>,{" "}
                        <span>Gạo</span>, <span>Cà chua</span>
                      </p>
                      <p>
                        <button
                          className="btn btn-primary addBtn"
                          onClick={() => handleAddToCart(food)}
                        >
                          Thêm món
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default OutstandingProduct;

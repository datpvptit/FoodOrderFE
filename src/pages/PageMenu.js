import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, saveCurrentPath } from "../actions/actions";
import { Link } from "react-router-dom";
import { scrollToElement } from "../scrollUtils";

const PageMenu = () => {
  const staticUrl = process.env.REACT_APP_API_URL_IMAGE;
  const app_api_url = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0); // Đặt selectedCategory mặc định là 0

  useEffect(() => {
    fetchCategories();
    dispatch(saveCurrentPath(window.location.pathname));
    document.title = 'Thực đơn nhà hàng';
    setTimeout(() => {
      scrollToElement("scrollTarget");
    });
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

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
  };

  // Hàm xử lý thêm món vào giỏ hàng
  const handleAddToCart = (food) => {
    const foodWithDefaultQuantity = { ...food, quantity: 1 }; // Tạo một bản sao của food với quantity mặc định là 1
    dispatch(addToCart(foodWithDefaultQuantity)); // Dispatch action addToCart với thông tin sản phẩm có số lượng mặc định
  };

  return (
    <section id="scrollTarget" className="ftco-section">
      <div className="container">
        <div className="ftco-search">
          <div className="row">
            <div className="col-md-12 nav-link-wrap">
              <div
                className="nav nav-pills d-flex text-center"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className={`nav-link ${
                      selectedCategory === index ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(index)}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-md-12 tab-wrap">
              <div className="tab-content" id="v-pills-tabContent">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`tab-pane fade ${
                      selectedCategory === index ? "show active" : ""
                    }`}
                    id={`v-pills-${index + 1}`}
                    role="tabpanel"
                    aria-labelledby={`v-pills-${index + 1}-tab`}
                  >
                    <div className="row no-gutters d-flex align-items-stretch">
                      {category.foodDTOList.map((food, foodIndex) => (
                        <div
                          key={foodIndex}
                          className="col-md-12 col-lg-6 d-flex align-self-stretch"
                        >
                          <div className="menus d-sm-flex align-items-stretch fadeInUp">
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
                                      <Link to={`/food-detail/${food.id}`}>
                                        {food.title}
                                      </Link>
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageMenu;

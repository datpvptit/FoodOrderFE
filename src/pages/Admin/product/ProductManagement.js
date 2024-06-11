import React, { useState, useEffect } from "react";
import ModalAddProduct from "./ModalAddProduct";
import ModalEditProduct from "./ModalEditProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import HeaderAdmin from "../Layout/HeaderAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../util/toast";
import { FaTrash, FaPencilAlt, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../../../actions/actions";

const ProductManagement = () => {
  const staticUrl = process.env.REACT_APP_API_URL_IMAGE;

  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [food, setFood] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [foodsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const app_api_url = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetchFoods();
    fetchCategories();
    dispatch(saveCurrentPath(window.location.pathname));
    document.title = "Quản trị danh sách sản phẩm";
  }, [dispatch]);

  const fetchCategories = () => {
    const url = app_api_url + "/api/home/category"
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchFoods = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/products/getAll";

      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setFoods(data.data);
        })

      // Handle the response here if needed
    } catch (error) {
      console.error("Error getting list of food:", error);
      // Handle error here if needed
    }

  };

  const fetchFoodsByName = async (input_name) => {
    if (input_name == '') {
      fetchFoods();
    } else
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const url = app_api_url + `/api/products/search?name=${encodeURIComponent(input_name)}`;

        fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((response) => response.json())
          .then((data) => {
            setFoods(data.data);
          })

        // Handle the response here if needed
      } catch (error) {
        console.error("Error getting list of food:", error);
        // Handle error here if needed
      }

  };
  // const fetchFoods = () => {
  //   const url = app_api_url + "/api/products/getAll";
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCategories(data);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };

  const handleAddFood = async (food) => {
    const formData = new FormData();
    formData.append("title", food.title);
    formData.append("timeServe", food.timeServe);
    formData.append("material", food.material);
    formData.append("detail", food.detail);
    formData.append("price", food.price);
    formData.append("file", food.image); // Thêm đối tượng File vào FormData
    formData.append("category_name", food.category);
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/products/add";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (!response.ok) {
        notify("Lỗi hệ thống, vui lòng thử lại", "error");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      if (responseData.success) {
        notify("Thêm mới thành công", "success");
      } else {
        notify("Thêm mới thất bại", "error");
      }
      fetchFoods();
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const handleUpdateFood = async (food) => {
    let file;
    const formData = new FormData();
    formData.append("id", food.id);
    formData.append("title", food.title);
    formData.append("price", food.price);
    formData.append("material", food.material);
    formData.append("detail", food.detail);
    formData.append("timeServe", food.timeServe);

    formData.append("category_name", food.category_name);

    if (food.image instanceof File) {
      formData.append("file", food.image); // Thêm đối tượng File vào FormData
    } else {
      file = new File([""], food.image, { type: "image/jpeg" });
      console.log(file);
      formData.append("file", file); // Thêm đối tượng File vào FormData
    }
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/products/update";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      const responseData = await response.json();

      if (responseData.success) {
        await fetchFoods()
        notify("Cập nhật thành công", "success");
      } else {
        notify("Cập nhật thất bại", "error");
      }

    } catch (error) {
      console.error("Error updating food:", error);
      // Xử lý lỗi ở đây nếu cần
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = app_api_url + `/api/products/delete/${foodId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(fetchFoods());
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        notify("Xóa món ăn thành công !", "success");
      } else {
        notify("Xóa món ăn thất bại !", "error");
      }
      // Xử lý response ở đây nếu cần
    } catch (error) {
      console.error("Error deleting food:", error);
      // Xử lý lỗi ở đây nếu cần
    }
  };

  const handleEditButtonClick = (food) => {
    setShowEditModal(true);
    setFood(food);
  };

  const handleDeleteButtonClick = (food) => {
    setShowDeleteModal(true);
    setFood(food);
  };

  const handleAddButtonClick = () => {
    setShowAddModal(true);
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Hàm xử lý sự kiện khi nhấn nút tìm kiếm
  const handleSearchClick = () => {
    fetchFoodsByName(searchValue);
  };

  let allProducts = [];

  foods.forEach((food) => {
    allProducts.push(food);
  });
  // Get current foods
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = allProducts.slice(indexOfFirstFood, indexOfLastFood);
  let totalPage = allProducts.length / foodsPerPage;
  if (parseInt(totalPage) * foodsPerPage === allProducts.length) {
    totalPage = parseInt(totalPage);
  } else {
    totalPage = parseInt(totalPage) + 1;
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatPriceToVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="content">
      <HeaderAdmin />
      <div className="container-fluid pt-4 px-4">
        <div>
          <h3>Quản lý sản phẩm</h3>
          <div className="d-flex align-items-center justify-content-between">
            {/* Add modal */}
            <ModalAddProduct
              isOpen={showAddModal}
              toggle={toggleAddModal}
              listCategory={categories}
              handleSaveFood={handleAddFood}
            />
            <button
              type="button"
              className="btn btn-primary"
              id="addModalBtn"
              onClick={handleAddButtonClick}
            >
              Thêm mới sản phẩm
            </button>
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
          </div>
          <hr />
          {/* Table of foods */}
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Đơn giá</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentFoods.map((food, index) => (
                <tr key={index}>
                  <td>{food.id}</td>
                  <td>
                    <img
                      src={`${staticUrl}/${food.image}`}
                      alt={food.title}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </td>
                  <td>{food.title}</td>
                  <td>{food.category}</td>
                  {/* Sử dụng thuộc tính category đã được thiết lập */}
                  <td>{formatPriceToVND(food.price)}</td>
                  <td>
                    {/* Edit button */}
                    <button
                      className="btn btn-primary editModalBtn"
                      onClick={() =>
                        handleEditButtonClick({
                          ...food,
                          category_name: food.category,
                          listCategory: categories,
                        })
                      }
                    >
                      <FaPencilAlt />
                    </button>
                    {/* Delete button */}
                    <button
                      className="btn btn-danger deleteModalBtn"
                      onClick={() =>
                        handleDeleteButtonClick({
                          ...food,
                          category_name: food.category,
                          listCategory: categories,
                        })
                      }
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {[...Array(totalPage)].map((_, pageNumber) => (
                <li key={pageNumber} className="page-item">
                  <button
                    onClick={() => paginate(pageNumber + 1)}
                    className="page-link"
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {/* Modals */}
      {showEditModal && (
        <ModalEditProduct
          isOpen={showEditModal}
          toggle={toggleEditModal}
          food={food}
          listCategory={categories}
          handleUpdateFood={handleUpdateFood}
        />
      )}
      {showDeleteModal && (
        <ModalDeleteProduct
          isOpen={showDeleteModal}
          toggle={toggleDeleteModal}
          foodId={food.id}
          handleDeleteFood={handleDeleteFood}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductManagement;

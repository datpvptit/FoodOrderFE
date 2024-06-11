import React, { useState, useEffect } from "react";
import ModalAddCategory from "./ModalAddCategory";
import ModalEditCategory from "./ModalEditCategory";
import ModalDeleteCategory from "./ModalDeleteCategory";
import HeaderAdmin from "../Layout/HeaderAdmin";
import { FaTrash, FaPencilAlt, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../../../actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../util/toast";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [category, setCategory] = useState(null);

  const dispatch = useDispatch();

  const app_api_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = "Quản trị danh mục sản phẩm";
    fetchCategories();
    dispatch(saveCurrentPath(window.location.pathname));
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

  const handleAddCategory = async (categoryName) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/category/add"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: categoryName }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        await fetchCategories()
        notify("Thêm mới thành công !", "success");
      } else {
        notify("Thêm mới thất bại !", "error");
      }
      setShowAddModal(false);

    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async (category) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/category/update";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: category.name, newName: category.newName }),
      })
      const responseData = await response.json();
      if (responseData.success) {
        await fetchCategories(); // Wait for fetchCategories() to complete
        notify("Cập nhật thành công !", "success");
      } else {
        notify("Cập nhật thất bại !", "error");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (category) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/category/delete";
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: category.name }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        await fetchCategories()
        notify("Xóa thành công !", "success");
      } else {
        notify("Xóa thất bại !", "error");
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditButtonClick = (category) => {
    setShowEditModal(true);
    setCategory(category);
  };

  const handleDeleteButtonClick = (category) => {
    setShowDeleteModal(true);
    setCategory(category);
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

  return (
    <div className="content">
      <HeaderAdmin></HeaderAdmin>
      <div className="container-fluid pt-4 px-4">
        <div>
          <h3>Quản lý Danh Mục</h3>
          <div className="d-flex align-items-center justify-content-between">
            <ModalAddCategory
              isOpen={showAddModal}
              toggle={toggleAddModal}
              handleSave={handleAddCategory}
            />
            <button
              type="button"
              className="btn btn-primary"
              id="addModalBtn"
              onClick={handleAddButtonClick}
            >
              Thêm mới danh mục
            </button>
            <form
              id="searchForm"
              className="input-group justify-content-end"
              style={{ width: "40%" }}
            >
              <input
                type="text"
                id="searchInput"
                className="form-control"
                placeholder="Tìm theo tên danh mục"
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
                <th>Mã danh mục</th>
                <th>Tên Danh mục</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="categoryName">{category.name}</td>
                  <td>
                    <button
                      className="btn btn-primary editModalBtn"
                      data-category-name={category.name}
                      onClick={() =>
                        handleEditButtonClick({
                          id: index + 1,
                          name: category.name,
                        })
                      }
                    >
                      <FaPencilAlt></FaPencilAlt>
                    </button>
                    <button
                      className="btn btn-danger deleteModalBtn"
                      onClick={() =>
                        handleDeleteButtonClick({
                          id: index + 1,
                          name: category.name,
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
        </div>
      </div>
      {showEditModal && (
        <ModalEditCategory
          isOpen={showEditModal}
          toggle={toggleEditModal}
          category={category}
          handleUpdate={handleUpdateCategory}
        />
      )}
      {showDeleteModal && (
        <ModalDeleteCategory
          isOpen={showDeleteModal}
          toggle={toggleDeleteModal}
          category={category}
          handleDelete={handleDeleteCategory}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default CategoryManagement;

import React, { useState, useEffect } from "react";
import HeaderAdmin from "../Layout/HeaderAdmin";
import { FaSearch, FaTrash } from "react-icons/fa";
import ModalAddAccount from "./ModalAddAccount";
import ModalDeleteAccount from "./ModalDeleteAccount";
import { saveCurrentPath } from "../../../actions/actions";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../util/toast";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountId, setAccountId] = useState("");

  const dispatch = useDispatch();

  const app_api_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
    document.title = "Quản trị tài khoản hệ thống";
    fetchAccounts(); // Gọi hàm fetchAccounts khi component được tải
  }, [dispatch]);

  // Hàm để gửi yêu cầu GET đến API để lấy danh sách tài khoản
  const fetchAccounts = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/user/get-all";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setAccounts(data.data);
      } else {
        console.error("Error fetching accounts:", data.desc);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };


  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleAddButtonClick = () => {
    setShowAddModal(true);
  };
  const handleAddAccount = async (user) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const url = app_api_url + "/api/user/add"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user)
      });
      const responseData = await response.json();
      if (responseData.success) {
        await fetchAccounts();
        notify(responseData.data, "success");

      } else {
        notify(responseData.data, "error");
      }
      setShowAddModal(false);

    } catch (error) {
      console.error("Error adding account:", error);
    }
  };
  const handleApproveAccount = async (accountId) => {
    try {
      const url = app_api_url + `/api/user/confirm/${accountId}`;
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await fetch(
        url,
        {
          method: "PUT", // Phương thức PUT để cập nhật trạng thái phê duyệt
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        await notify("Phê duyệt tài khoản thành công!", "success");
        fetchAccounts();
      } else {
        notify("Có lỗi khi phê duyệt tài khoản!", "error");
      }
    } catch (error) {
      console.error("Error approving account:", error);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    console.log(accountId);
    try {
      const url = app_api_url + `/api/user/delete/${accountId}`;
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await fetch(
        url,
        {
          method: "DELETE", // Phương thức DELETE để xóa tài khoản
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }

      );
      const data = await response.json();
      if (data.success) {
        // Nếu xóa thành công, cập nhật lại danh sách tài khoản
        await notify("Xóa tài khoản thành công!", "success");
        fetchAccounts();
      } else {
        notify("Xóa tài khoản thất bại!", "error");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteButtonClick = (id) => {
    setAccountId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="content">
      <HeaderAdmin />
      <div className="container-fluid pt-4 px-4">
        <div>
          <h3>Quản lý tài khoản</h3>
          <div className="d-flex align-items-center justify-content-between">
            <ModalAddAccount
              isOpen={showAddModal}
              toggle={toggleAddModal}
              handleSaveUser={handleAddAccount}
            />
            <button
              type="button"
              className="btn btn-primary"
              id="addModalBtn"
              onClick={handleAddButtonClick}
            >
              Thêm mới tài khoản
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
                <th>STT</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={index}>
                  <td>{account.id}</td>
                  <td>{account.email}</td>
                  <td>{account.fullName}</td>
                  <td>{account.role}</td>
                  <td>{account.phone}</td>
                  <td>
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => handleDeleteButtonClick(account.id)}
                    >
                      <FaTrash />
                    </button>
                    {account.status ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleApproveAccount(account.id)}
                      >
                        Phê duyệt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <ModalDeleteAccount
          isOpen={showDeleteModal}
          toggle={toggleDeleteModal}
          accountId={accountId}
          handleDelete={handleDeleteAccount}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default AccountManagement;

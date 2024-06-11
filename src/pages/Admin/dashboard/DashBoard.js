import React, { useEffect } from "react";
import { saveCurrentPath } from "../../../actions/actions";
import { useDispatch } from "react-redux";
import HeaderAdmin from "../Layout/HeaderAdmin";

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
  }, [dispatch]);
  return (
    <div className="content">
      <HeaderAdmin></HeaderAdmin>
      <div class="container-fluid pt-4 px-4">
        <h2>Quản trị hệ thống nhà hàng</h2>
      </div>
    </div>
  );
};

export default DashBoard;

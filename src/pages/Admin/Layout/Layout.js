import React from "react";
import SliderAdmin from "./SliderAdmin";
import "../../../styles/css/admin/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <SliderAdmin></SliderAdmin>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;

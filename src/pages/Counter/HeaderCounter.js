import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/actions";
import { useNavigate } from 'react-router-dom';

const HeaderCounter = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.app);
  // user = {title: "nam", userId: 2} 
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login-page'); // Điều hướng người dùng đến trang chính sau khi logout
  };

  return (
    <Navbar color="dark" dark expand="md">
      <div className="container d-flex justify-content-between">
        <NavbarBrand href="/counter">Order Management</NavbarBrand>
        {user && (
          <Nav navbar>
            <NavItem>
              <NavLink disabled>{`Manager: ${user.title}`}</NavLink>
            </NavItem>
            <Button color="light" onClick={handleLogout}>Đăng xuất</Button>
          </Nav>
        )}
      </div>
    </Navbar>
  );
};

export default HeaderCounter;

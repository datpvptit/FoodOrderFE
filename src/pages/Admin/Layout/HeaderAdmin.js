import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, logout } from '../../../actions/actions';
import default_avatar from '../../../assets/images/default_avatar.png'
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { user } = useSelector(state => state.app);
    // user = {title: "nam", userId: 1}

    const handleOnclick = () => {
        dispatch(toggleSidebar());
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login-page'); // Điều hướng người dùng đến trang đăng nhập sau khi logout
    }

    return (
        <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
            <span className="sidebar-toggler flex-shrink-0" onClick={handleOnclick}>
                <FaBars />
            </span>

            <div className="navbar-nav align-items-center ms-auto">
                <div className="nav-item dropdown">
                    <a href="/profile" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img className="rounded-circle me-lg-2" src={default_avatar} alt=""
                            style={{ width: "40px", height: "40px" }} />
                        <span className="d-none d-lg-inline-flex">{user.title}</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                        <button className="dropdown-item">My Profile</button>
                        <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default HeaderAdmin;

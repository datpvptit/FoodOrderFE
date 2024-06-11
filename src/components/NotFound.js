import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const currentPath = useSelector(state => state.app.currentPath);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">404 - Không tìm thấy trang</h1>
          <p className="text-center">Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
          <div className="text-center">
            <Link to={currentPath} className="btn btn-primary">Quay lại</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

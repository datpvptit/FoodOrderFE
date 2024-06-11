import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../actions/actions";
import { Link } from "react-router-dom";
import { scrollToElement } from '../scrollUtils';
const ThankYouPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
    document.title = 'Thanh you for comming!';
  }, [dispatch]);
  return (
    <section className="ftco-section">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <h1>Thank You!</h1>
            <p className="lead">
              Cảm ơn bạn đã sử dụng các món ăn của chúng tôi.
            </p>
            <Link to="/home-page" className="btn btn-primary">
              Quay lại trang chính
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouPage;

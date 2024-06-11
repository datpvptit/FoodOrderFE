import React from "react";
import insta1 from "../../assets/images/insta-1.jpg";
import insta2 from "../../assets/images/insta-2.jpg";
import insta3 from "../../assets/images/insta-3.jpg";
import insta4 from "../../assets/images/insta-4.jpg";
import insta5 from "../../assets/images/insta-5.jpg";
import insta6 from "../../assets/images/insta-6.jpg";
import { FaInstagram, FaTwitter, FaFacebook   } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="ftco-footer ftco-bg-dark ftco-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6 col-lg-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Feliciano</h2>
              <p>
                Xa xa, đằng sau những ngọn núi chữ, xa những đất nước Vokalia và
                Consonantia, có những văn bản mù quáng.
              </p>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                <li className="ftco-animate">
                  <a href="https://twitter.com">
                  <FaTwitter />
                  </a>
                </li>
                <li className="ftco-animate">
                  <a href="https://facebook.com">
                  <FaFacebook />
                  </a>
                </li>
                <li className="ftco-animate">
                  <a href="https://instagram.com">
                  <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Giờ mở cửa</h2>
              <ul className="list-unstyled open-hours">
                <li className="d-flex">
                  <span>Thứ hai</span>
                  <span>8:00 - 21:00</span>
                </li>
                <li className="d-flex">
                  <span>Thứ ba</span>
                  <span>8:00 - 21:00</span>
                </li>
                <li className="d-flex">
                  <span>Thứ tư</span>
                  <span>8:00 - 21:00</span>
                </li>
                <li className="d-flex">
                  <span>Thứ năm</span>
                  <span>8:00 - 21:00</span>
                </li>
                <li className="d-flex">
                  <span>Thứ sáu</span>
                  <span>8:00 - 21:00</span>
                </li>
                <li className="d-flex">
                  <span>Thứ bảy</span>
                  <span>8:00 - 21:00</span>
                </li>
                <li className="d-flex">
                  <span>Chủ nhật</span>
                  <span> 8:00 - 21:00</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Instagram</h2>
              <div className="thumb d-sm-flex">
                <a
                  href="https://instagram.com"
                  className="thumb-menu img"
                  style={{ backgroundImage: `url(${insta1})` }}
                ></a>
                <a
                  href="https://instagram.com"
                  className="thumb-menu img"
                  style={{ backgroundImage: `url(${insta2})` }}
                ></a>
                <a
                  href="https://instagram.com"
                  className="thumb-menu img"
                  style={{ backgroundImage: `url(${insta3})` }}
                ></a>
              </div>
              <div className="thumb d-flex">
                <a
                  href="https://instagram.com"
                  className="thumb-menu img"
                  style={{ backgroundImage: `url(${insta4})` }}
                ></a>
                <a
                  href="https://instagram.com"
                  className="thumb-menu img"
                  style={{ backgroundImage: `url(${insta5})` }}
                ></a>
                <a
                  href="https://instagram.com"
                  className="thumb-menu img"
                  style={{ backgroundImage: `url(${insta6})` }}
                ></a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Bản tin</h2>
              <p>
                Xa xa, đằng sau những ngọn núi chữ, xa những đất nước Vokalia và
                Consonantia, có những văn bản mù quáng.
              </p>
              <form action="#" className="subscribe-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control mb-2 text-center"
                    placeholder="Enter email address"
                  />
                  <input
                    type="submit"
                    value="Subscribe"
                    className="form-control submit px-3"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

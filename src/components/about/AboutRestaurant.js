import React from "react";
import about from "../../assets/images/about.jpg";
import about1 from "../../assets/images/about-1.jpg";

const AboutRestaurant = () => {
  return (
    <>
      <section className="ftco-section ftco-wrap-about">
        <div className="container">
          <div className="row">
            <div className="col-md-7 d-flex">
              <div
                className="img img-1 mr-md-2"
                style={{ backgroundImage: `url(${about})` }}
              ></div>
              <div
                className="img img-2 ml-md-2"
                style={{ backgroundImage: `url(${about1})` }}
              ></div>
            </div>
            <div class="col-md-5 wrap-about pt-5 pt-md-5 pb-md-3">
              <div class="heading-section mb-4 my-5 my-md-0">
                <span class="subheading">Thông tin</span>
                <h2 class="mb-4">về nhà hàng Feliciano</h2>
              </div>
              <p>
                Một con sông nhỏ tên là Duden chảy ngang qua vị trí của họ và
                cung cấp cho nó những điều kiện cần thiết. Đó là một đất nước
                thiên đường, trong đó những câu nói nướng vào miệng bạn.
              </p>
              <p class="time">
                <span>
                  Thứ hai - Chủ nhật <strong>8 sáng - 9 tối</strong>
                </span>
                <span>
                  <a href="#">+ 1-978-123-4567</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="ftco-section ftco-counter img ftco-no-pt"
        id="section-counter"
      >
        <div className="container">
          <div className="row d-md-flex">
            <div className="col-md-9">
              <div className="row d-md-flex align-items-center">
                <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 d-flex justify-content-center counter-wrap">
                  <div className="block-18">
                    <div className="text">
                      <strong className="number">
                        18
                      </strong>
                      <span>SỐ NĂM KINH NGHIỆM</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 d-flex justify-content-center counter-wrap">
                  <div className="block-18">
                    <div className="text">
                      <strong className="number">
                        100
                      </strong>
                      <span>THỰC ĐƠN/MÓN ĂN</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 d-flex justify-content-center counter-wrap">
                  <div className="block-18">
                    <div className="text">
                      <strong className="number">
                        50
                      </strong>
                      <span>NHÂN VIÊN</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-4 mb-lg-0 d-flex justify-content-center counter-wrap">
                  <div className="block-18">
                    <div className="text">
                      <strong className="number">
                        15000
                      </strong>
                      <span>KHÁCH HÀNG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center text-md-left">
              <p>
                Một con sông nhỏ tên là Duden chảy ngang qua vị trí của họ và
                cung cấp cho nó những điều kiện cần thiết.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutRestaurant;

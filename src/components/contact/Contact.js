import React from "react";

const Contact = () => {
  return (
    <>
      <section
        className="hero-wrap hero-wrap-2"
        style={{ backgroundImage: `url('images/bg_3.jpg')` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-end justify-content-center">
            <div className="col-md-9 ftco-animate text-center mb-4">
              <h1 className="mb-2 bread">Liên hệ</h1>
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="index.html">Trang chủ <i className="ion-ios-arrow-forward"></i></a>
                </span>
                <span>Liên hệ<i className="ion-ios-arrow-forward"></i></span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-no-pt ftco-no-pb contact-section">
        <div className="container">
          <div className="row d-flex align-items-stretch no-gutters">
            <div className="col-md-6 pt-5 px-2 pb-2 p-md-5 order-md-last">
              <h2 className="h4 mb-2 mb-md-5 font-weight-bold">
                Liên hệ với chúng tôi
              </h2>
              <form action="#">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Subject" />
                </div>
                <div className="form-group">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="7"
                    className="form-control"
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Send Message"
                    className="btn btn-primary py-3 px-5"
                  />
                </div>
              </form>
            </div>
            <div className="col-md-6 d-flex align-items-stretch">
              <div id="map"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section contact-section">
        <div className="container">
          <div className="row d-flex contact-info">
            <div className="col-md-12 mb-4">
              <h2 className="h4 font-weight-bold">Thông tin liên hệ</h2>
            </div>
            <div className="w-100"></div>
            <div className="col-md-3 d-flex">
              <div className="dbox">
                <p>
                  <span>Địa chỉ:</span> 198 West 21th Street, Suite 721 New York
                  NY 10016
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="dbox">
                <p>
                  <span>Phone:</span>
                  <a href="tel://1234567920">+ 1235 2355 98</a>
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="dbox">
                <p>
                  <span>Email:</span>
                  <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex">
              <div className="dbox">
                <p><span>Website</span> <a href="#">yoursite.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../actions/actions";
import { scrollToElement } from '../scrollUtils';
const GoogleMapsEmbed = () => {
  return (
    <div className="google-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2925132859327!2d105.78486297457!3d20.980908489421708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCB2aeG7hW4gdGjDtG5n!5e0!3m2!1svi!2s!4v1710248139423!5m2!1svi!2s"
        width="500"
        height="600"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

const PageContact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
    dispatch(saveCurrentPath(window.location.pathname));
    document.title = 'Liên hệ với chúng tôi';
    setTimeout(() => {
      scrollToElement('scrollTarget');
    });
  }, [dispatch]);
  return (
    <div>
      <section id="scrollTarget" className="ftco-section ftco-no-pt ftco-no-pb contact-section">
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
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                  />
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
              <div id="map" className="py-5">
                <GoogleMapsEmbed></GoogleMapsEmbed>
              </div>
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
                <p>
                  <span>Website</span> <a href="#">yoursite.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageContact;


import bg1 from "../../assets/images/bg_1.jpg";
import bg2 from "../../assets/images/bg_2.jpg";
import bg3 from "../../assets/images/bg_3.jpg";

const Slider = () => {
  return (
    <section className="home-slider owl-carousel js-fullheight">
      <div
        className="slider-item js-fullheight"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div
            className="row slider-text js-fullheight justify-content-center align-items-center"
          >
            <div className="col-md-12 col-sm-12 text-center">
              <span className="subheading">Feliciano</span>
              <h1 className="mb-4">NHÀ HÀNG TỐT NHẤT</h1>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className="slider-item js-fullheight"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div
            className="row slider-text js-fullheight justify-content-center align-items-center"
          >
            <div className="col-md-12 col-sm-12 text-center">
              <span className="subheading">Feliciano</span>
              <h1 className="mb-4">BỔ DƯỠNG VÀ NGON MIỆNG</h1>
            </div>
          </div>
        </div>
      </div>

      <div
        className="slider-item js-fullheight"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div
            className="row slider-text justify-content-center align-items-center"   
          >
            <div className="col-md-12 col-sm-12 text-center">
              <span className="subheading">Feliciano</span>
              <h1 className="mb-4">ĐẶC SẢN NGON NHẤT</h1>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Slider;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeedbackItem from "./FeedBackItem";
import person1 from "../../assets/images/person_1.jpg";
import person2 from "../../assets/images/person_2.jpg";
import person3 from "../../assets/images/person_3.jpg";
import person4 from "../../assets/images/person_4.jpg";

const Feedback = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <section className="ftco-section testimony-section img">
      <div className="overlay"></div>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-12 text-center heading-section">
            <span className="subheading">Cảm nhận khách hàng</span>
            {/* <h2 class="mb-4">Happy Customer</h2> */}
          </div>
        </div>
        <Slider {...settings}>
          <FeedbackItem
            imgSrc={person1}
            name="Jason McClean"
            position="Khách hàng"
            content="Xa xa, đằng sau những ngọn núi chữ, xa những đất nước Vokalia và Consonantia, có những văn bản mù quáng."
          />
          <FeedbackItem
            imgSrc={person2}
            name="Mark Stevenson"
            position="Khách hàng"
            content="Xa xa, đằng sau những ngọn núi chữ, xa những đất nước Vokalia và Consonantia, có những văn bản mù quáng."
          />
          <FeedbackItem
            imgSrc={person3}
            name="Art Leonard"
            position="Khách hàng"
            content="Xa xa, đằng sau những ngọn núi chữ, xa những đất nước Vokalia và Consonantia, có những văn bản mù quáng."
          />
          <FeedbackItem
            imgSrc={person4}
            name="Rose Henderson"
            position="Khách hàng"
            content="Xa xa, đằng sau những ngọn núi chữ, xa những đất nước Vokalia và Consonantia, có những văn bản mù quáng."
          />
          <FeedbackItem
            imgSrc={person3}
            name="Ian Boner"
            position="Khách hàng"
            content="Xa xa, đằng sau những ngọn núi chữ, xa những đất nước Vokalia và Consonantia, có những văn bản mù quáng."
          />
        </Slider>
      </div>
    </section>
  );
};

export default Feedback;

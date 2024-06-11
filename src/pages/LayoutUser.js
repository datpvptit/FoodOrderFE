import Footer from "../components/Footer/Footer";
import Slider from "../components/Slider/Slider";
import Header from "../components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "../styles/css/style.css";
import "../styles/css/layoutUser.css"
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
const LayoutUser = () => {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header></Header>
      <Slider></Slider>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};
export default LayoutUser;

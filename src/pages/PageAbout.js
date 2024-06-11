import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../actions/actions";
import AboutRestaurant from "../components/about/AboutRestaurant";
import AboutChef from "../components/about/AboutChef";
import Feedback from "../components/about/FeedBack";
import { scrollToElement } from '../scrollUtils';
const PageAbout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
    document.title = 'Thông tin nhà hàng';
    setTimeout(() => {
      scrollToElement('scrollTarget');
    });
  }, [dispatch]);
  return (
    <>
      <AboutRestaurant></AboutRestaurant>
      <AboutChef></AboutChef>
      <Feedback></Feedback>
    </>
  );
};

export default PageAbout;

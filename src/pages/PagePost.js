import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../actions/actions";
import PostItem from "../components/post/PostItem";
import image1 from "../assets/images/image_1.jpg";
import image2 from "../assets/images/image_2.jpg";
import image3 from "../assets/images/image_3.jpg";
import image4 from "../assets/images/image_4.jpg";
import image5 from "../assets/images/image_5.jpg";
import image6 from "../assets/images/image_6.jpg";
import { scrollToElement } from '../scrollUtils';
const PagePost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
    document.title = 'Blog';
    setTimeout(() => {
      scrollToElement('scrollTarget');
    });
  }, [dispatch]);
  return (
    <>
      <section id="scrollTarget" className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center heading-section">
              <span className="subheading" style={{ zIndex: "0" }}>
                Bài viết
              </span>
              <h2 className="mb-4">Bài viết gần đây</h2>
            </div>
          </div>
          <div className="row">
            <PostItem
              imageUrl={image1}
              date="Ngày 06 tháng 9 năm 2019"
              author="Quản trị viên"
              title="Thưởng thức những món ăn ngon ở Châu Á"
              readMoreLink="#"
              commentsCount={3}
            />
            <PostItem
              imageUrl={image2}
              date="Ngày 06 tháng 9 năm 2019"
              author="Quản trị viên"
              title="Thưởng thức những món ăn ngon ở Châu Á"
              readMoreLink="#"
              commentsCount={3}
            />
            <PostItem
              imageUrl={image3}
              date="Ngày 06 tháng 9 năm 2019"
              author="Quản trị viên"
              title="Thưởng thức những món ăn ngon ở Châu Á"
              readMoreLink="#"
              commentsCount={3}
            />
            <PostItem
              imageUrl={image4}
              date="Ngày 06 tháng 9 năm 2019"
              author="Quản trị viên"
              title="Thưởng thức những món ăn ngon ở Châu Á"
              readMoreLink="#"
              commentsCount={3}
            />
            <PostItem
              imageUrl={image5}
              date="Ngày 06 tháng 9 năm 2019"
              author="Quản trị viên"
              title="Thưởng thức những món ăn ngon ở Châu Á"
              readMoreLink="#"
              commentsCount={3}
            />
            <PostItem
              imageUrl={image6}
              date="Ngày 06 tháng 9 năm 2019"
              author="Quản trị viên"
              title="Thưởng thức những món ăn ngon ở Châu Á"
              readMoreLink="#"
              commentsCount={3}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PagePost;

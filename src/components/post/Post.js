import React from "react";
import PostItem from "./PostItem";
import image1 from "../../assets/images/image_1.jpg"
import image2 from "../../assets/images/image_2.jpg"
import image3 from "../../assets/images/image_3.jpg"

const Post = () => {
  return (
    <section className="ftco-section bg-light">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 text-center heading-section">
            <span className="subheading" style={{zIndex: "0"}}>Bài viết</span>
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
        </div>
      </div>
    </section>
  );
};

export default Post;
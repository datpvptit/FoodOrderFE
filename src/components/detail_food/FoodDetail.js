import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch và useSelector từ Redux
import { addToCart } from "../../actions/actions"; // Import action addToCart

import Comment from "./Comments";

import "../../styles/css/detail.css";

const FoodDetail = () => {
  const staticUrl = process.env.REACT_APP_API_URL_IMAGE;
  const app_api_url = process.env.REACT_APP_API_URL;
  const [foodDetail, setFoodDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [quantity, setQuantity] = useState(1); // Thêm state để lưu số lượng

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems); // Lấy số lượng sản phẩm trong giỏ hàng từ Redux store

  let { id } = useParams();

  useEffect(() => {
    fetchFoodDetail(id);
    // fetchComments(id);
  }, [id]);

  const fetchFoodDetail = async (id) => {
    try {
      const url = app_api_url + `/api/food/get-detail/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setFoodDetail(data.data);
    } catch (error) {
      console.error("Error fetching food detail:", error);
    }
  };

  // const fetchComments = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/comments/${id}`);
  //     const data = await response.json();
  //     setComments(data);
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // };

  const handleCommentSubmit = async () => {
    // try {
    //   await fetch(`http://localhost:4000/comments/${id}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ content: newComment }),
    //   });
    //   fetchComments(id);
    //   setNewComment("");
    // } catch (error) {
    //   console.error("Error submitting comment:", error);
    // }
  };

  const handleAddToCart = () => {
    const updatedItem = {
      ...foodDetail,
      quantity: quantity // Số lượng sản phẩm cần thêm vào giỏ hàng
    };
    dispatch(addToCart(updatedItem));
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value)); // Cập nhật số lượng từ input
  };

  if (!foodDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="detail">
        <div className="container">
          <div className="product">
            <div className="row py-5">
              <div className="col-12 col-md-6 col-lg-5 col-xl-5">
                <div
                  className="menu-img img"
                  style={{
                    height: "100%",
                    backgroundImage: `url(${staticUrl}/${foodDetail.image})`,
                  }}
                ></div>
              </div>
              <div className="col-12 col-md-6 col-lg-7 col-xl-7 productRight text d-flex align-items-center">
                <div className="detail-right-food px-4">
                  <h3>{foodDetail.title}</h3>
                  <div className="price">
                    <p>${foodDetail.price}</p>
                  </div>
                  <div className="quantily">
                    <p style={{ height: "auto" }}>Số lượng:</p>
                    <input
                      type="number"
                      min="1"
                      value={quantity} // Sử dụng state quantity
                      onChange={handleQuantityChange} // Bắt sự kiện thay đổi số lượng
                      style={{ width: "50px", height: "30px" }}
                    />
                  </div>
                  <div className="button-row">
                    <button
                      className="btn btn-primary addBtn"
                      onClick={handleAddToCart}
                    >
                      Thêm món
                    </button>
                  </div>
                  <div className="detailss">
                    <p style={{ fontWeight: "bold" }}>Thông tin chi tiết</p>
                    <p>{foodDetail.timeShip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="comments py-5">
        <div className="container">
          <h2>Bình luận</h2>
          {/* Hiển thị danh sách bình luận */}
          {comments.length > 0 &&
            comments.map((comment, index) => (
              <Comment
                key={index}
                author={comment.author}
                content={comment.content}
              />
            ))}
          {/* Form nhập bình luận mới */}
          <form onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Nhập bình luận của bạn..."
                rows="4"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Gửi
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default FoodDetail;

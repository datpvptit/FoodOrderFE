const FeedbackItem = ({ imgSrc, name, position, content }) => {
    return (
      <div className="col-md-12">
        <div className="carousel-testimony owl-carousel ftco-owl">
          <div className="item">
            <div className="testimony-wrap text-center pb-5">
              <div
                className="user-img mb-4"
                style={{ backgroundImage: `url(${imgSrc})` }}
              >
                <span className="quote d-flex align-items-center justify-content-center">
                  <i className="icon-quote-left"></i>
                </span>
              </div>
              <div className="text p-3">
                <p className="mb-4">{content}</p>
                <p className="name">{name}</p>
                <span className="position">{position}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FeedbackItem;
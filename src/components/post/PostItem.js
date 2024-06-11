const PostItem = ({ imageUrl, date, author, title, readMoreLink, commentsCount }) => {
    return (
      <div className="col-md-4">
        <div className="blog-entry">
          <a href="blog-single.html" className="block-20" style={{ backgroundImage: `url(${imageUrl})` }}></a>
          <div className="text pt-3 pb-4 px-4">
            <div className="meta">
              <div><a href="#">{date}</a></div>
              <div><a href="#">{author}</a></div>
            </div>
            <h3 className="heading"><a href="#">{title}</a></h3>
            <p className="clearfix">
              <a href={readMoreLink} className="float-left read">Đọc thêm</a>
              <a href="#" className="float-right meta-chat"><span className="icon-chat"></span> {commentsCount}</a>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default PostItem;
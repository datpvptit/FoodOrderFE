import { FaInstagram, FaTwitter, FaFacebook, FaGooglePlusG    } from "react-icons/fa";

const Chef = ({ imgSrc, name, position }) => {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="staff">
        <div
          className="img"
          style={{ backgroundImage: `url(${imgSrc})` }}
        ></div>
        <div className="text pt-4">
          <h3>{name}</h3>
          <span className="position mb-2">{position}</span>
          <div className="faded">
            <ul className="ftco-social d-flex">
              <li>
                <a href="#">
                  <FaInstagram></FaInstagram>
                </a>
              </li>
              <li>
                <a href="#">
                  <FaFacebook></FaFacebook>
                </a>
              </li>
              <li>
                <a href="#">
                  <FaGooglePlusG></FaGooglePlusG>
                </a>
              </li>
              <li>
                <a href="#">
                  <FaTwitter></FaTwitter>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chef;
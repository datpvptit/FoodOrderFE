import Chef from "./Chef";
import chef4 from "../../assets/images/chef-4.jpg"
import chef3 from "../../assets/images/chef-3.jpg"
import chef2 from "../../assets/images/chef-2.jpg"
import chef1 from "../../assets/images/chef-1.jpg"

const AboutChef = () => {
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center mb-5 pb-2">
          <div className="col-md-12 text-center heading-section">
            <span className="subheading">Đầu bếp</span>
            <h2 className="mb-4">Đầu bếp bậc thầy của chúng tôi</h2>
          </div>
        </div>
        <div className="row">
          <Chef
            imgSrc={chef4}
            name="John Smooth"
            position="Chủ nhà hàng"
          />
          <Chef
            imgSrc={chef2}
            name="Rebeca Welson"
            position="Bếp trưởng"
          />
          <Chef
            imgSrc={chef3}
            name="Kharl Branyt"
            position="Đầu bếp"
          />
          <Chef
            imgSrc={chef1}
            name="Luke Simon"
            position="Đầu bếp"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutChef;
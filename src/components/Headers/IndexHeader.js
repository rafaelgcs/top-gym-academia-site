import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components
import { Link as ScrollLink } from "react-scroll";

function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/bg-header-02.jpg") + ")",
          backgroundSize: 'cover',
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Logo</h1>
              {/* <div className="fog-low">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div> */}
              {/* <div className="fog-low right">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div> */}
            </div>
            {/* <h2 className="presentation-subtitle text-center">
              Make your mark with a Free Bootstrap 4 (Reactstrap) UI Kit!
            </h2> */}
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")"
          }}
        />
        <h6 className="category category-absolute">

          <ScrollLink
            to="pricing"
            href="#"
            style={{ color: 'white' }}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          // onClick={()=>{window.scrollTo(0, )}}
          >
            Veja nossos preços{" "}
            <i className="fas fa-arrow-down" />
          </ScrollLink>
        </h6>

      </div>
    </>
  );
}

export default IndexHeader;

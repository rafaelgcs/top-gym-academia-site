import React from "react";

// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import IndexHeader from "components/Headers/IndexHeader";
import IndexFooter from "components/Footers/IndexFooter";

// index sections
import SectionPricing from "./index-sections/SectionPricing";
import SectionMVV from "./index-sections/SectionMVV";
import SectionNewEvents from "./index-sections/SectionNewEvents";
import SectionSocial from "./index-sections/SectionSocial";

function Index() {

  return (
    <>
      <IndexNavbar />
      <IndexHeader />
      <div className="main" id="pricing">
        <SectionPricing />
        <SectionMVV />
        <SectionNewEvents />
        <SectionSocial />
        <IndexFooter />
      </div>
    </>
  );
}

export default Index;

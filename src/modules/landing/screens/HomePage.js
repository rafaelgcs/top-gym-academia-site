import React, { useState } from 'react';

import IndexHeader from '../../shared/components/Headers/IndexHeader';
import SectionPricing from '../views/SectionPricing';
import SectionMVV from '../views/SectionMVV';
import SectionSocial from '../views/SectionSocial';
import ScrollToTopOnMount from '../views/ScrollToTopOnMount';
import DefaultNavbar from '../../shared/components/Navbars/DefaultNavbar';
import HomeNavbarLinks from '../../shared/components/Navbars/HomeNavbarLinks';
import DefaultFooter from '../../shared/components/Footers/DefaultFooter';
import FloatButton from '../../shared/components/CustomButtons/FloatButton';

const HomePage = (props) => {
    let pageHeader = React.createRef();
    const [imageTop, setImageTop] = useState(<img alt="Top Gym Academia Logo" src={require('../../shared/assets/img/logo-50x120-white.png')} />);
    const { ...rest } = props;
    React.useEffect(() => {
        if (window.innerWidth < 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                if (pageHeader.current != null)
                    pageHeader.current.style.transform =
                        "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });

    return (
        <>
            <ScrollToTopOnMount />
            <DefaultNavbar
                brand={imageTop}
                rightLinks={<HomeNavbarLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "dark"
                }}
                {...rest}
            />
            <IndexHeader />
            <div className="main" id="pricing">
                <SectionPricing />
                <SectionMVV />
                {/* <SectionNewEvents /> */}
                <SectionSocial />
                <DefaultFooter />
            </div>
            <FloatButton />
        </>
    );
}

export default HomePage;

import React from 'react';

import IndexNavbar from '../components/Navbars/IndexNavbar';
import IndexHeader from 'components/Headers/IndexHeader';
import SectionPricing from 'views/index-sections/SectionPricing';
import SectionMVV from 'views/index-sections/SectionMVV';
import SectionSocial from 'views/index-sections/SectionSocial';
import IndexFooter from 'components/Footers/IndexFooter';
import SectionNewEvents from 'views/index-sections/SectionNewEvents';
import DefaultNavbar from 'components/Navbars/DefaultNavbar';
import HomeNavbarLinks from 'components/Navbars/HomeNavbarLinks';

const HomePage = (props) => {
    let pageHeader = React.createRef();
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
            <DefaultNavbar
                brand="Top Gym Academia"
                rightLinks={<HomeNavbarLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />
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

export default HomePage;

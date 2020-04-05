import React from 'react';

import IndexNavbar from '../components/Navbars/IndexNavbar';
import IndexHeader from 'components/Headers/IndexHeader';
import SectionPricing from 'views/index-sections/SectionPricing';
import SectionMVV from 'views/index-sections/SectionMVV';
import SectionSocial from 'views/index-sections/SectionSocial';
import IndexFooter from 'components/Footers/IndexFooter';
import SectionNewEvents from 'views/index-sections/SectionNewEvents';

const HomePage = () => {
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

export default HomePage;

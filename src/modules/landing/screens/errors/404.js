import React, { useState } from 'react';

import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col
} from "reactstrap";

import NavbarLinks from '../../../shared/components/Navbars/NavbarLinks';
// import EquipeHeader from 'components/Headers/EquipeHeader';
import DefaultNavbar from '../../../shared/components/Navbars/DefaultNavbar';
import DefaultFooter from '../../../shared/components/Footers/DefaultFooter';
import ScrollToTopOnMount from '../../views/ScrollToTopOnMount';


const Error404 = (props) => {
    const [imageTop, setImageTop] = useState(<img alt="Top Gym Academia - Logo" src={require('../../../shared/assets/img/logo-50x120-white.png')} />);
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
        <div>
            <ScrollToTopOnMount />
            <DefaultNavbar
                brand={imageTop}
                rightLinks={<NavbarLinks />}
                fixed
                color="dark"
                {...rest}
            />
            <Col md={12} className="section section-dark text-center">
                <div className="section section-dark text-center">
                    <Container>
                    <h2 className="title" style={{ fontSize: 30 }}>Erro 404!</h2>
                    <h2 className="title" style={{ fontSize: 60 }}>A página solicitada não foi encontrada!</h2>
                    <h2 className="title" style={{ fontSize: 30 }}>Verifique se o link está correto e tente novamente mais tarde</h2>
                    </Container>
                </div>

            </Col>
            <DefaultFooter />
        </div>
    );
}

export default Error404;
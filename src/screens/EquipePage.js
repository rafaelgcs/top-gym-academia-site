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

import NavbarLinks from 'components/Navbars/NavbarLinks';
import EquipeHeader from 'components/Headers/EquipeHeader';
import DefaultNavbar from 'components/Navbars/DefaultNavbar';
import DefaultFooter from 'components/Footers/DefaultFooter';
import ScrollToTopOnMount from 'views/ScrollToTopOnMount';
import FloatButton from 'components/CustomButtons/FloatButton';


const EquipePage = (props) => {
    const [imageTop, setImageTop] = useState(<img src={require('assets/img/logo-50x-black.png')} />);
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
                // color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />
            <EquipeHeader />
            <Col md={12}>
                <Row>
                    <Col md={6} className="section section-dark text-center">
                        <div className="section section-dark text-center">
                            <Container>
                                <h2 className="title" style={{ color: 'green' }}>MUSCULAÇÃO</h2>
                                <Row style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-m.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Vinícius Santana</CardTitle>
                                                        {/* <h6 className="card-category">Boxe</h6> */}
                                                    </div>
                                                </a>
                                                {/* <div className="text-center">
                                                    <Button
                                                        className="btn-just-icon btn-neutral"
                                                        color="link"
                                                        href="#"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-google-plus" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </Button>

                                                </div> */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-m.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Alisson Erick</CardTitle>
                                                        {/* <h6 className="card-category">FitDance</h6> */}
                                                    </div>
                                                </a>
                                                {/* <div className="text-center">
                                                    <Button
                                                        className="btn-just-icon btn-neutral"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-google-plus" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </Button>

                                                </div>
                                             */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-m.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Tiago Tavares</CardTitle>
                                                        {/* <h6 className="card-category">Jump / Step</h6> */}
                                                    </div>
                                                </a>
                                                {/* <div className="text-center">
                                                    <Button
                                                        className="btn-just-icon btn-neutral"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-google-plus" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </Button>

                                                </div>
                                             */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-m.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Davi Coutinho</CardTitle>
                                                        {/* <h6 className="card-category">Jump / Step / Spinning</h6> */}
                                                    </div>
                                                </a>
                                                {/* <div className="text-center">
                                                    <Button
                                                        className="btn-just-icon btn-neutral"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-google-plus" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </Button>

                                                </div> */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                    </Col>
                    <Col className="section-dark d-none d-md-block"
                        style={{
                            backgroundImage:
                                "url(" + require("assets/img/bank/gym-03.jpg") + ")",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}></Col>

                </Row>
            </Col>
            <Col md={12}>
                <Row>
                    <Col className="section-dark d-none d-md-block"
                        style={{
                            backgroundImage:
                                "url(" + require("assets/img/bank/gym-02.jpg") + ")",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}></Col>
                    <Col md={6} className="section section-dark text-center">
                        <div className="section section-dark text-center">
                            <Container>
                                <h2 className="title" style={{ color: 'green' }}>GINÁSTICA</h2>
                                <Row style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-m.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Leonardo (Leo)</CardTitle>
                                                        <h6 className="card-category">Boxe</h6>
                                                    </div>
                                                </a>
                                                {/* <div className="text-center">
                                                    <Button
                                                        className="btn-just-icon btn-neutral"
                                                        color="link"
                                                        href="#"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-google-plus" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </Button>

                                                </div> */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-m.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Paulo Roberto (Paulinho Show)</CardTitle>
                                                        <h6 className="card-category">FitDance</h6>
                                                    </div>
                                                </a>
                                                {/* <div className="text-center">
                                                    <Button
                                                        className="btn-just-icon btn-neutral"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-google-plus" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </Button>

                                                </div>
                                             */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-f.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Edvanda</CardTitle>
                                                        <h6 className="card-category">Jump / Step</h6>
                                                    </div>
                                                </a>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-m.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Rubens Reis (Nino)</CardTitle>
                                                        <h6 className="card-category">Jump / Step / Spinning</h6>
                                                    </div>
                                                </a>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-f.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Elisandra</CardTitle>
                                                        <h6 className="card-category">Zumba</h6>
                                                    </div>
                                                </a>
                                                {/* <div className="text-center">
                                                    <Button
                                                        className="btn-just-icon btn-neutral"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-google-plus" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </Button>

                                                </div>
                                             */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                    </Col>

                </Row>
            </Col>
            <Col md={12}>
                <Row>
                    <Col md={6} className="section section-dark text-center">
                        <div className="section section-dark text-center">
                            <Container>
                                <h2 className="title" style={{ color: 'green' }}>VENDAS & APOIO</h2>
                                <Row style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-m.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Caio Santana</CardTitle>
                                                        {/* <h6 className="card-category">Boxe</h6> */}
                                                    </div>
                                                </a>
                                                {/* <div className="text-center">
                                                    <Button
                                                        className="btn-just-icon btn-neutral"
                                                        color="link"
                                                        href="#"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-google-plus" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </Button>

                                                </div> */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-f.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Amanda Pina</CardTitle>
                                                        {/* <h6 className="card-category">FitDance</h6> */}
                                                    </div>
                                                </a>
                                                {/* <div className="text-center">
                                                    <Button
                                                        className="btn-just-icon btn-neutral"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-google-plus" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </Button>

                                                </div>
                                             */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="4">
                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/faces/default-f.png")}
                                                    />
                                                </a>
                                            </div>
                                            <CardBody>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">Elvira</CardTitle>
                                                        {/* <h6 className="card-category">Jump / Step</h6> */}
                                                    </div>
                                                </a>
                                                {/* <div className="text-center">
                                                    <Button
                                                        className="btn-just-icon btn-neutral"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-google-plus" />
                                                    </Button>
                                                    <Button
                                                        className="btn-just-icon btn-neutral ml-1"
                                                        color="link"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-linkedin" />
                                                    </Button>

                                                </div>
                                             */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                    </Col>
                    <Col className="section-dark d-none d-md-block"
                        style={{
                            backgroundImage:
                                "url(" + require("assets/img/bank/gym-01.jpg") + ")",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}></Col>

                </Row>
            </Col>
            <DefaultFooter />
            <FloatButton />
        </div>
    );
}

export default EquipePage;
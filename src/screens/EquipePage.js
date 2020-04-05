import React from 'react';
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import IndexHeader from 'components/Headers/IndexHeader';
import EquipeHeader from 'components/Headers/EquipeHeader';

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";

import { Box } from '@material-ui/core';

import EquipeNavbar from 'components/Navbars/EquipeNavbar';


const EquipePage = () => {

    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth < 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
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
            <EquipeNavbar />
            <EquipeHeader />
            <Box display="flex">
                <Box flex={1} className="section section-dark text-center">
                    <div className="section section-dark text-center">
                        <Container>
                            <h2 className="title">Nossa Equipe de ZUMBA</h2>
                            <Row>
                                <Col md="4">
                                    <Card className="card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/faces/clem-onojeghuo-3.jpg")}
                                                />
                                            </a>
                                        </div>
                                        <CardBody>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <div className="author">
                                                    <CardTitle tag="h4">Henry Ford</CardTitle>
                                                    <h6 className="card-category">Product Manager</h6>
                                                </div>
                                            </a>
                                            <div className="text-center">
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
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/faces/joe-gardner-2.jpg")}
                                                />
                                            </a>
                                        </div>
                                        <CardBody>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <div className="author">
                                                    <CardTitle tag="h4">Sophie West</CardTitle>
                                                    <h6 className="card-category">Designer</h6>
                                                </div>
                                            </a>
                                            <div className="text-center">
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

                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/faces/erik-lucatero-2.jpg")}
                                                />
                                            </a>
                                        </div>
                                        <CardBody>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <div className="author">
                                                    <CardTitle tag="h4">Robert Orben</CardTitle>
                                                    <h6 className="card-category">Developer</h6>
                                                </div>
                                            </a>
                                            <div className="text-center">
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

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Box>
                <Box flex={1} className="page-header section-dark"
                    style={{
                        backgroundImage:
                            "url(" + require("assets/img/bg-header-02.webp") + ")",
                        backgroundSize: 'cover',
                    }}>

                </Box>
            </Box>
            <Box display="flex">
                <Box flex={1} className="section section-dark text-center">
                    <div className="section section-dark text-center">
                        <Container>
                            <h2 className="title">Nossa Equipe de ZUMBA</h2>
                            <Row>
                                <Col md="4">
                                    <Card className="card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/faces/clem-onojeghuo-3.jpg")}
                                                />
                                            </a>
                                        </div>
                                        <CardBody>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <div className="author">
                                                    <CardTitle tag="h4">Henry Ford</CardTitle>
                                                    <h6 className="card-category">Product Manager</h6>
                                                </div>
                                            </a>
                                            <div className="text-center">
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
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/faces/joe-gardner-2.jpg")}
                                                />
                                            </a>
                                        </div>
                                        <CardBody>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <div className="author">
                                                    <CardTitle tag="h4">Sophie West</CardTitle>
                                                    <h6 className="card-category">Designer</h6>
                                                </div>
                                            </a>
                                            <div className="text-center">
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

                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/faces/erik-lucatero-2.jpg")}
                                                />
                                            </a>
                                        </div>
                                        <CardBody>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <div className="author">
                                                    <CardTitle tag="h4">Robert Orben</CardTitle>
                                                    <h6 className="card-category">Developer</h6>
                                                </div>
                                            </a>
                                            <div className="text-center">
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

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Box>
                <Box flex={1} className="page-header section-dark"
                    style={{
                        backgroundImage:
                            "url(" + require("assets/img/bg-header-02.webp") + ")",
                        backgroundSize: 'cover',
                    }}>

                </Box>
            </Box>
            <Box display="flex">
                <Box flex={1} className="page-header section-dark"
                    style={{
                        backgroundImage:
                            "url(" + require("assets/img/bg-header-02.webp") + ")",
                        backgroundSize: 'cover',
                    }}>

                </Box>

                <Box flex={1} className="section section-dark text-center">
                    <div className="section section-dark text-center">
                        <Container>
                            <h2 className="title">Nossa Equipe de ZUMBA</h2>
                            <Row>
                                <Col md="4">
                                    <Card className="card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/faces/clem-onojeghuo-3.jpg")}
                                                />
                                            </a>
                                        </div>
                                        <CardBody>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <div className="author">
                                                    <CardTitle tag="h4">Henry Ford</CardTitle>
                                                    <h6 className="card-category">Product Manager</h6>
                                                </div>
                                            </a>
                                            <div className="text-center">
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
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/faces/joe-gardner-2.jpg")}
                                                />
                                            </a>
                                        </div>
                                        <CardBody>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <div className="author">
                                                    <CardTitle tag="h4">Sophie West</CardTitle>
                                                    <h6 className="card-category">Designer</h6>
                                                </div>
                                            </a>
                                            <div className="text-center">
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

                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    src={require("assets/img/faces/erik-lucatero-2.jpg")}
                                                />
                                            </a>
                                        </div>
                                        <CardBody>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <div className="author">
                                                    <CardTitle tag="h4">Robert Orben</CardTitle>
                                                    <h6 className="card-category">Developer</h6>
                                                </div>
                                            </a>
                                            <div className="text-center">
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

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Box>
            </Box>

            <div
                style={{
                    backgroundImage: "url(" + require("assets/img/daniel-olahh.jpg") + ")"
                }}
                className="page-header"
                data-parallax={true}
                ref={pageHeader}
            >
                ... other code
            </div>
        </div>
    );
}

export default EquipePage;
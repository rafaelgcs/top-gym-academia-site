import React, { useState } from 'react';
import Slider from "react-slick";
// reactstrap components
import { Container, Row, Col, Button as RSButton } from "reactstrap";

import { Box } from '@material-ui/core';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// core components
import { Link as ScrollLink } from "react-scroll";

import api from 'services/api';
const TOKEN_API_INSTAGRAM = 'IGQVJWOWtvSkdzU0JQc3dmbUpFazFjUGpibHduRDZAuc24xd0dWSGJWZA1hMZA0x5UFV0ZAkc4djdGWm04RVJrSk1HNVNNdHZAoMDh2TDRYLWhZAUW9TamJrVEExMVpUTHpRX203V0tiNEpR';


function GalleryHeader() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2
    };
    const [instaPhotos, setInstaPhotos] = useState([]);

    const getGallery = async () => {
        // API TO GET ALL
        const response = await api.get(`/me/media?fields=id,media_type,media_url,username,caption,permalink&access_token=${TOKEN_API_INSTAGRAM}`);

        if (response.status == 200 || response.status == 304) {

            const returned = JSON.stringify(response.data.data);
            const images = await JSON.parse(returned);

            setInstaPhotos(images);
            localStorage.setItem('@topgymacademia:instaphotos', JSON.stringify(images));
        }
    }

    React.useEffect(() => {
        let havePhotos = localStorage.getItem('@topgymacademia:instaphotos');
        if (instaPhotos.length == 0) {
            if (havePhotos != null) {
                console.log("chamou do localstorage");
                setInstaPhotos(JSON.parse(havePhotos));
            }
            getGallery();
        }
    });
    return (
        <>
            <Row style={{ maxWidth: '100%', marginRight: 0, paddingRight: 0 }}>
                <Col md={6} className="page-header section-dark" style={{ maxWidth: "100%", marginRight: 0 }}>
                    <Container>
                        <h2 style={{ fontSize: 28, marginBottom: -25, color:'white' }}>Seja bem vindo(a) à nossa galeria!</h2>
                        <h2 className="title" style={{ fontSize: 60 }}>Dê uma olhada na <span style={{ color: 'green', fontWeight: 'bold' }}>TOP GYM!</span></h2>
                        <Box>
                            <ScrollLink
                                to="gallery-gym"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                            >
                                <RSButton
                                    style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 15, paddingBottom: 15 }}
                                    className="btn-round"
                                    color="success"
                                >
                                    Veja Agora!
                                </RSButton>
                            </ScrollLink>
                        </Box>
                    </Container>

                </Col>
                <Col md={6} style={{ backgroundColor: 'white', marginRight: 0, paddingRight: 0 }} className="section section-dark text-center">
                    <Container>
                        <h2 style={{ color: 'black' }}>Acompanhe-nos em nosso Instagram!</h2>
                        <Slider {...settings}>
                            {
                                instaPhotos.map((item, index) => {
                                    return (
                                        <Box key={index} flex={2} onClick={() => window.open(item.permalink, '_blank')} style={{ cursor: 'pointer', '&:hover': { scale: 1.2 } }}>
                                            <img src={item.media_url} width="100%" style={{ cursor: 'pointer', '&:hover': { scale: 1.2 } }} />
                                        </Box>
                                    );
                                })
                            }
                        </Slider>
                    </Container>

                </Col>
            </Row>
        </>
    );
}

export default GalleryHeader;
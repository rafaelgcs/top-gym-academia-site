import React, { useState } from 'react';
import Slider from "react-slick";
// reactstrap components
import { Container, Col } from "reactstrap";

import { Box } from '@material-ui/core';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { apiInsta } from '../../../../services/api';
const TOKEN_API_INSTAGRAM = 'IGQVJWOWtvSkdzU0JQc3dmbUpFazFjUGpibHduRDZAuc24xd0dWSGJWZA1hMZA0x5UFV0ZAkc4djdGWm04RVJrSk1HNVNNdHZAoMDh2TDRYLWhZAUW9TamJrVEExMVpUTHpRX203V0tiNEpR';


function GalleryHeader() {
    const [slidesToShow, setSlidesToShow] = useState(3);
    const [settings, setSettings] = useState(
        {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToShow
        }
    );
    const [instaPhotos, setInstaPhotos] = useState([]);
    const theDate = new Date();

    const formatData = (data) => {
        let string = `${data.getDate}/${data.getMonth}/${data.getFullYear}`;
        return string;
    }

    const getGallery = async () => {
        // API TO GET ALL
        const response = await apiInsta.get(`/me/media?fields=id,media_type,media_url,username,caption,permalink&access_token=${TOKEN_API_INSTAGRAM}`);

        if (response.status === 200 || response.status === 304) {

            const returned = JSON.stringify(response.data.data);
            const images = await JSON.parse(returned);
            const dateNow = new Date();
            setInstaPhotos(images);
            localStorage.setItem('@topgymacademia:instaphotos', JSON.stringify(images));
            localStorage.setItem('@topgymacademia:instaphotos-timestamp', JSON.stringify({ hora: dateNow.getHours(), data: formatData(dateNow) }));
        }
    }

    React.useEffect(() => {
        let havePhotos = localStorage.getItem('@topgymacademia:instaphotos');
        let hourLastUpdate = localStorage.getItem('@topgymacademia:instaphotos-timestamp');

        if (instaPhotos.length == 0) {
            if (havePhotos != null) {
                if (hourLastUpdate != null) {
                    let hourAndDate = JSON.parse(hourLastUpdate);
                    if (hourAndDate.hour != theDate.getHours() && hourAndDate.data != formatData(theDate)) {
                        getGallery();
                    } else {
                        setInstaPhotos(JSON.parse(havePhotos));
                    }
                } else {
                    setInstaPhotos(JSON.parse(havePhotos));
                }
            } else {
                getGallery();
            }
        }

        if (window.innerWidth < 968) {
            setSlidesToShow(1);
        }
    });
    return (
        <>
            <Col md={12} className="page-header section-dark">
                <Container>
                    <h2 className="title" style={{ color: 'black', marginTop: 60 }}>Acompanhe-nos em nosso Instagram!</h2>
                    <h4 className="title" style={{ color: 'black' }}>
                        <a href="https://instagram.com/topgymacademia" target="_blank" style={{ color: 'green', textDecoration: 'none' }} >
                            @TOPGYMACADEMIA
                        </a>
                    </h4>
                    <Slider {...settings}>
                        {
                            instaPhotos.map((item, index) => {
                                return (
                                    <Box key={index} flex={slidesToShow} mr={2} onClick={() => window.open(item.permalink, '_blank')} style={{ cursor: 'pointer', '&:hover': { scale: 1.2 } }}>
                                        <img src={item.media_url} width="100%" style={{ cursor: 'pointer', '&:hover': { scale: 1.2 } }} />
                                    </Box>
                                );
                            })
                        }
                    </Slider>
                </Container>
            </Col>
        </>
    );
}

export default GalleryHeader;
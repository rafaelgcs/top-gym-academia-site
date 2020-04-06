import React, { useState, useCallback } from 'react';
import EquipeNavbar from 'components/Navbars/EquipeNavbar';
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
import IndexFooter from 'components/Footers/IndexFooter';
import api from 'services/api';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";
import GalleryHeader from 'components/Headers/GalleryHeader';
import NavbarLinks from 'components/Navbars/NavbarLinks';
import DefaultNavbar from 'components/Navbars/DefaultNavbar';


const photos = [
    {
        src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
        width: 1,
        height: 1
    },
    {
        src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/PpOHJezOalU/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/XiDA78wAZVw/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/x8xJpClTvR0/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/u9cG4cuJ6bU/4927x1000",
        width: 4927,
        height: 1000
    },
    {
        src: "https://source.unsplash.com/qGQNmBE7mYw/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/NuO6iTBkHxE/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/pF1ug8ysTtY/600x400",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/A-fubu9QJxE/800x533",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/5P91SF0zNsI/740x494",
        width: 4,
        height: 3
    }
];

const GalleryPage = (props) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

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
            <DefaultNavbar
                brand="Top Gym Academia"
                rightLinks={<NavbarLinks />}
                fixed
                // color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />
            <GalleryHeader />
            <div className="section section-dark text-center" id="gallery-gym">
                <Container>
                    <h2 className="title">Galeria TOP GYM ACADEMIA</h2>
                    <Gallery photos={photos} onClick={openLightbox} />
                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={photos.map(x => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.title
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </Container>

            </div>
            <IndexFooter />
        </div>
    );
}


export default GalleryPage;

import React, { useState, useCallback } from 'react';

import { Container } from "reactstrap";
// import api from 'services/api';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";
import GalleryHeader from '../../shared/components/Headers/GalleryHeader';
import NavbarLinks from '../../shared/components/Navbars/NavbarLinks';
import DefaultNavbar from '../../shared/components/Navbars/DefaultNavbar';
import DefaultFooter from '../../shared/components/Footers/DefaultFooter';
import ScrollToTopOnMount from '../views/ScrollToTopOnMount';
import FloatButton from '../../shared/components/CustomButtons/FloatButton';


const photos = [
    {
        src: require('../../shared/assets/img/all/001.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/002.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/003.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/004.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/005.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/006.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/007.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/008.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/009.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/010.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/011.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/012.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/013.jpg'),
        width: 4,
        height: 3
    },
    {
        src: require('../../shared/assets/img/all/014.jpg'),
        width: 4,
        height: 3
    },
];

const GalleryPage = (props) => {
    const [imageTop, setImageTop] = useState(<img alt="Top Gym Academia - Logo" src={require('../../shared/assets/img/logo-50x-black.png')} />);
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
            <DefaultFooter />
            <FloatButton />
        </div>
    );
}


export default GalleryPage;

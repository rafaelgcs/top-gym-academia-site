import React from 'react';
import { Box, CssBaseline, Container, Grid } from '@material-ui/core'
import { Button as RSButton, Row, Col } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'
import Dinero from 'dinero.js'
import { useSnackbar } from 'notistack';
import { api } from 'services/api';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
const defaultProductImage = require('modules/shared/assets/img/default-product.png')

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    bg: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper,
    },
    section: {
        // padding: '70px 0',
        paddingTop: 35,
        paddingBottom: 35,
        position: 'relative',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper)
    },
    distakedText: { color: 'green', fontWeight: 'bold' },
    title: {
        color: theme.palette.getContrastText(theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper),
        marginTop: 30,
        marginBottom: 25,
        minHeight: 32,
        textDecoration: 'none'
    },
    slider: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper,
        maxWidth: '80%',
        borderRadius: 15
    }
}));

const SectionStartDetail = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles()
    const { item, addItemCart } = props
    const getPrice = (valor, valor_p = 0) => {
        let str = (valor_p > 0 ? valor_p : valor).toString()
        let hasDot = str.indexOf('.')
        let hasOneAfter = str.split('.')

        str = str.replaceAll(',', '')
        str = str.replaceAll('.', '')
        if (!(hasDot >= 0)) {
            str = `${str}00`
        } else if (hasOneAfter.length > 1) {
            if (hasOneAfter[hasOneAfter.length - 1].length == 1) {
                str = `${str}0`
            }
        }
        return (Dinero({ amount: parseInt(str), currency: 'BRL' }).toFormat('$0.00')).replace('.', ',')
    }
    const settingSliderTop = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <div style={{ display: 'none' }} />,
        prevArrow: <div style={{ display: 'none' }} />,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const verifyDisponibilityToAddToCart = (item, qtd = 1) => {
        if (item.estoque.quantidade_disponivel == 0) {
            enqueueSnackbar("O item não está mais em estoque! Tente outro... :(", { variant: 'warning' })
        } else {
            addItemCart(item)
        }

    }

    const handleClick = async () => {
        await api.get(`product/${item.id}`)
            .then((response) => {
                if (response.status === 200) {
                    let res = response.data
                    verifyDisponibilityToAddToCart(res.data[0])
                } else {
                    enqueueSnackbar("Não foi possível encontrar o item para adicionar ao carrinho")
                }
            }).catch(error => {
                enqueueSnackbar("Erro ao buscar item para adicionar ao carrinho")
            })
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.section}>
                <Container maxWidth="lg" component="main" className={classes.bg}>
                    <Row>
                        <Col md={6}>
                            <Slider {...settingSliderTop} className={classes.slider}>
                                {
                                    item.images.length > 0 ?
                                        item.images.map((image) => (
                                            <div style={{ overflow: 'hidden', borderRadius: 100 }}>
                                                <img alt="product_image" className="d-none d-md-block" width="100%" src={image.image_url} />
                                            </div>
                                        ))
                                        :
                                        <img alt="product_image" className="d-none d-md-block" style={{ overflow: 'hidden', borderRadius: 15 }} width="80%" src={defaultProductImage} />
                                }
                            </Slider>
                        </Col>
                        <Col md={6}>
                            <h2 style={{ fontSize: 28, marginBottom: -25 }}>#{item.categoria.nome}</h2>

                            <h2 className={classes.title} style={{ fontSize: 60 }}>{item.nome}</h2>
                            <h2 className={classes.title} style={{ fontSize: 70 }}><span className={classes.distakedText}>{getPrice(item.valor, item.valor_promocional)}</span></h2>
                            <div className="d-block d-md-none mb-2" style={{ height: 200, backgroundImage: `url(${item.images.length > 0 ? item.images[0].image_url : defaultProductImage})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 15 }}>

                            </div>
                            <Grid lg={5} md={5} xs={12}>
                                <RSButton
                                    style={{ padding: '40 15', width: '100%' }}
                                    className="btn-round"
                                    color="success"
                                    onClick={handleClick}
                                >
                                    Adicione ao Carrinho
                                </RSButton>
                            </Grid>
                        </Col>
                    </Row>
                </Container>
            </div>

        </React.Fragment>
    );
}

export default SectionStartDetail;
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Slider from 'react-slick';
import { api } from 'services/api';
import SectionPricing from 'modules/store/components/Sections/SectionPricing'
import Dinero from 'dinero.js'
import ProductCard from 'modules/store/layouts/MainLayout/components/ProductCard';
import { Card, CardContent, Container, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { addItem } from 'store/reducer/cart'

const defaultProductImage = require('modules/shared/assets/img/default-product.png')


const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
        fontSize: 20,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    slider: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper,
        maxWidth: '100%',
        overflow: 'hidden'
    }
}));

const StoreHomePage = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const myLocation = useLocation()
    const { handleChangeCart } = useParams()
    const settingsSlider = {
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

    const settingsSliderProds = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: <div style={{ display: 'none' }} />,
        prevArrow: <div style={{ display: 'none' }} />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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

    const [featured, setFeatured] = useState([])
    const [loadedFeatured, setLoadedFeatured] = useState(false)
    const [grouped, setGrouped] = useState([])
    const [loadedGrouped, setLoadedGrouped] = useState(false)

    const getPrice = (valor, valor_p = 0) => {
        let str = (valor_p > 0 ? valor_p : valor).toString()
        let hasDot = str.indexOf('.')
        let hasOneAfter = str.split('.')

        str = str.replaceAll(',', '')
        str = str.replaceAll('.', '')
        if (!(hasDot >= 0)) {
            str = `${str}00`
        }else if(hasOneAfter.length > 1){
            if(hasOneAfter[hasOneAfter.length - 1].length == 1){
                str = `${str}0`
            }
        }
        return (Dinero({ amount: parseInt(str), currency: 'BRL' }).toFormat('$0.00')).replace('.', ',')
    }

    const addItemCart = (item) => {
        dispatch(addItem(item))
    }

    const renderProduct = (product) => {
        return (<ProductCard product={product} addItemCart={addItemCart} />)
    }

    useEffect(() => {
        const getFeatured = () => {
            api.get('product/featured').then((response) => {

                if (response.status === 200) {
                    let res = response.data
                    setFeatured(res.data)
                }

            }).finally(() => {
                setLoadedFeatured(true)
            })
        }

        getFeatured()
    }, [])

    useEffect(() => {
        const getGrouped = () => {
            api.get('product/grouped').then((response) => {
                if (response.status === 200) {
                    let res = response.data
                    setGrouped(res.data)
                }
            }).finally(() => {
                setLoadedGrouped(true)
            })
        }

        getGrouped()
    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            {
                featured.length > 0 && <Slider {...settingsSlider} className={classes.slider}>
                    {
                        featured.map((item) => {
                            return <SectionPricing item={item} />
                        })
                    }
                </Slider>
            }
            <Paper square className={classes.paper}>
                <Typography className={classes.text} variant="h2" gutterBottom>
                    Nossa Loja
                </Typography>
                <List className={classes.list}>
                    {grouped.map(({ id, produtos, nome }) => (
                        produtos.length > 0 &&
                        <React.Fragment key={id}>
                            <ListSubheader className={classes.subheader}>{nome}</ListSubheader>

                            <Container>
                                <Slider {...settingsSliderProds} className={classes.slider}>
                                    {
                                        produtos.map((prod) => {
                                            return (
                                                <div style={{ padding: 5 }}>
                                                    <Card style={{ borderRadius: 15 }} elevation={0}>
                                                        <CardContent>{renderProduct(prod)}</CardContent>
                                                    </Card>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                                {/* <Grid container spacing={1} alignContent="center" alignItems="center">
                                        {
                                            produtos.map((prod) => {
                                                return <Grid item lg={4} md={4} xs={6}> {renderProduct(prod)} </Grid>
                                            })
                                                // <ListItem button key={prod.id}>
                                                //     <ListItemAvatar>
                                                //         <Avatar alt="Profile Picture" src={prod.images.length > 0 ? prod.images[0].image_url : defaultProductImage} />
                                                //     </ListItemAvatar>
                                                //     <ListItemText primary={prod.nome} secondary={getPrice(prod.valor, prod.valor_promocional)} />
                                                // </ListItem>
                                            // ))
                                            // result.map((item) => {
                                            //     return <Grid item lg={4} md={4} xs={6}> {renderProduct(item)} </Grid>
                                            // })
                                        }
                                    </Grid> */}
                            </Container>


                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </React.Fragment >
    );
}

export default StoreHomePage
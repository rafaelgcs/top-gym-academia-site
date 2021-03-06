import React, { useState } from 'react'
import clsx from 'clsx'
import { Card, CardHeader, IconButton, CardMedia, CardContent, CardActions, Collapse, Typography, makeStyles, Grid, Fab } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Dinero from 'dinero.js'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { api } from 'services/api'
import { getCart, updateCart } from 'services/store/cart'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'

const defaultProductImage = require('../../../../shared/assets/img/default-product.png')
const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 15,
        overflow: 'hidden'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        opacity: 0.4,
        '&:hover': {
            opacity: 1,
        },
        cursor: 'pointer',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        transition: 'all .2s ease'
    },
    content: {
        padding: 5,
        paddingLeft: 15,
    },
    title: {
        color: theme.palette.getContrastText(theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper)
    },
    price: {
        background: theme.palette.type === 'light' ? theme.palette.background.paper : 'white',
        color: 'green',
        borderRadius: 8,
        padding: 4
    },
    iconCart: {
        position: 'absolute',
        top: -10,
        right: -10,
        zIndex: 5,
        width: 36,
        height: 36
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        color: theme.palette.getContrastText(theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper)
    },
    avatar: {
        backgroundColor: red[500],
    },
}))

const ProductCard = (props) => {
    const { enqueueSnackbar } = useSnackbar()

    const classes = useStyles()
    const { product, handleClose, addItemCart } = props
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

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

    const getTitle = (title) => {
        if (title.length > 25) {
            let str = `${title.slice(0, 24)}...`
            return str
        } else {
            return title
        }
    }

    const verifyDisponibilityToAddToCart = (item, qtd = 1) => {
        if (item.estoque.quantidade_disponivel == 0) {
            enqueueSnackbar("O item não está mais em estoque! Tente outro... :(", { variant: 'warning' })
        } else {
            addItemCart(item)
        }

    }

    const addItemToCart = async (qtd) => {
        await api.get(`product/${product.id}`)
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
        <div style={{ position: 'relative' }}>
            <Fab className={classes.iconCart} color="white" onClick={addItemToCart}>
                <AddShoppingCartIcon />
            </Fab>
            <Link to={`/loja/product/${product.apelido}`} onClick={handleClose}>
                <div className={clsx([classes.root])}>
                    <div className={classes.media} style={{ minHeight: 120, backgroundImage: `url(${product.images.length > 0 ? product.images[0].image_url : defaultProductImage})` }} />
                </div>
            </Link>
            <div className={classes.content}>
                <Grid container>
                    <Grid item lg={12} md={12} sx={12}>
                        <p className={classes.title}>{getTitle(product.nome)}</p>
                        <p><strong><small className={classes.price}>{getPrice(product.valor, product.valor_promocional)}</small></strong></p>
                    </Grid>
                </Grid>
            </div>
        </div>
    )

    // return (
    //     <Card className={classes.root} elevation={5}>
    //         {/* <CardHeader
    //             action={
    //                 <IconButton color="primary" aria-label="settings">
    //                     <AddShoppingCartIcon />
    //                 </IconButton>
    //             }
    //             title={product.nome}
    //         // subheader={"September 14, 2016"}
    //         /> */}
    //         <CardMedia
    //             className={classes.media}
    //             image={product.images.length > 0 ? product.images[0].image_url : defaultProductImage}
    //             title={product.nome}
    //         />
    //         <CardContent disableSpacing>
    //             <Grid container>
    //                 <Grid item>
    //                     <Grid container spacing={1}>
    //                         <Grid item lg={12} md={12} xs={12} alignContent="center" alignItems="center">
    //                             <Typography variant="h6" element="h6">
    //                                 {product.nome}
    //                             </Typography>
    //                         </Grid>
    //                         <Grid item lg={12} md={12} xs={12} alignContent="center" alignItems="center">
    //                             <Typography variant="h4" element="h4" style={{ display: 'inline-block' }}>
    //                                 {getPrice(product.valor, product.valor_promocional)}
    //                             </Typography>
    //                         </Grid>
    //                     </Grid>
    //                 </Grid>

    //                 <Grid item>
    //                     <Grid container spacing={1}>
    //                         <Grid item lg={7} md={7} xs={7} alignContent="center" alignItems="center">
    //                         </Grid>
    //                         <Grid item lg={4} md={4} xs={4} alignContent="center" alignItems="center">
    //                             <IconButton color="primary"
    //                                 className={classes.expand}
    //                                 style={{ display: 'inline-block' }}
    //                             >
    //                                 <AddShoppingCartIcon />
    //                             </IconButton>
    //                         </Grid>
    //                     </Grid>
    //                 </Grid>
    //             </Grid>
    //         </CardContent>
    //     </Card>
    // )
}

export default ProductCard
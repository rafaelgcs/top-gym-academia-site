import React, { useState } from 'react'
import clsx from 'clsx'
import { Card, CardHeader, IconButton, CardMedia, CardContent, CardActions, Collapse, Typography, makeStyles, Grid } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Dinero from 'dinero.js'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const defaultProductImage = require('../../../../shared/assets/img/default-product.png')
const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 15
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        opacity: 0.4,
        '&:hover': {
            opacity: 1,
        },
        cursor: 'pointer',
        transition: 'all .2s ease'
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
    const classes = useStyles()
    const { product } = props
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const getPrice = (valor, valor_p) => {
        let str = (valor_p > 0 ? valor_p : valor).toString()
        str = str.replaceAll(',', '')
        str = str.replaceAll('.', '')
        return (Dinero({ amount: parseInt(str), currency: 'BRL' }).toFormat('$0.00')).replace('.', ',')
    }

    return (
        <Card className={classes.root} elevation={5}>
            {/* <CardHeader
                action={
                    <IconButton color="primary" aria-label="settings">
                        <AddShoppingCartIcon />
                    </IconButton>
                }
                title={product.nome}
            // subheader={"September 14, 2016"}
            /> */}
            <CardMedia
                className={classes.media}
                image={product.images.length > 0 ? product.images[0].image_url : defaultProductImage}
                title={product.nome}
            />
            <CardActions disableSpacing>
                <div style={{ width: '100%' }}>
                    <Grid container spacing={1}>
                        <Grid item lg={12} md={12} xs={12} alignContent="center" alignItems="center">
                            <Typography variant="h6" element="h6">
                                {product.nome}
                            </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12} alignContent="center" alignItems="center">
                            <Typography variant="h3" element="h3" style={{ display: 'inline-block' }}>
                                {getPrice(product.valor, product.valor_promocional)}
                            </Typography>
                        </Grid>
                    </Grid>

                </div>

                <div style={{ width: '100%' }}>
                    <Grid container spacing={1}>
                        <Grid item lg={7} md={7} xs={7} alignContent="center" alignItems="center">
                        </Grid>
                        <Grid item lg={4} md={4} xs={4} alignContent="center" alignItems="center">
                            <IconButton color="primary"
                                className={classes.expand}
                                style={{ display: 'inline-block' }}
                            >
                                <AddShoppingCartIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
            </CardActions>
        </Card>
    )
}

export default ProductCard
import React, { useState } from 'react'
import clsx from 'clsx'
import { Card, CardHeader, IconButton, CardMedia, CardContent, CardActions, Collapse, Typography, makeStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Dinero from 'dinero.js'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const defaultProductImage = require('../../../../shared/assets/img/default-product.png')
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
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
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton color="primary" aria-label="settings">
                        <AddShoppingCartIcon />
                    </IconButton>
                }
                title={product.nome}
            // subheader={"September 14, 2016"}
            />
            <CardMedia
                className={classes.media}
                image={product.images.length > 0 ? product.images[0].image_url : defaultProductImage}
                title={product.nome}
            />
            <CardActions disableSpacing>
                <Typography variant="h4" element="h4">
                    {getPrice(product.valor, product.valor_promocional)}
                </Typography>
                <IconButton color="primary"
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                >
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
         </Card>
    )
}

export default ProductCard
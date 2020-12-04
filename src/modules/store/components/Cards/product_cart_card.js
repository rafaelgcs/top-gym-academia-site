import React from 'react'
import clsx from 'clsx'
import { Card, CardContent, Grid, makeStyles } from '@material-ui/core'
import Dinero from 'dinero.js'

const defaultProductImage = require('modules/shared/assets/img/default-product.png')

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
}))


const ProductCartCard = (props) => {
    const classes = useStyles()
    const { produto, index, cart, handleChangeCart } = props

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

    return (
        <Card>
            <CardContent>
                <Grid container spacing={1} lg={12} md={12} sx={12}>
                    <Grid item lg={2} md={2} sx={4} style={{ borderRadius: 15, overflow: 'hidden' }}>
                        <img width={120} src={produto.images.length > 0 ? produto.images[0].image_url : defaultProductImage} />
                    </Grid>
                    <Grid item lg={8} md={8} sx={8}>
                        <Grid container lg={12} md={12} sx={12}>
                            <Grid item lg={12} md={12} sx={12}>
                                <p>
                                    {produto.nome}
                                </p>
                            </Grid>
                            <Grid item lg={12} md={12} sx={12}>
                                <p>
                                    {getPrice(produto.valor)}
                                </p>
                            </Grid>
                            <Grid item lg={12} md={12} sx={12}>
                                <p>
                                    {`x ${cart.itens[index].quantidade}`}
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ProductCartCard
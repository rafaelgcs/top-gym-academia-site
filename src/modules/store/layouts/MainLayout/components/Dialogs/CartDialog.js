import React, { useEffect, useState } from 'react'
import { AppBar, Button, Card, CardContent, CircularProgress, Container, Dialog, DialogContent, DialogTitle, Fab, Grid, IconButton, InputAdornment, Slide, TextField, Toolbar, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { apiAuth } from 'services/api';
import ProductCard from '../ProductCard';
import { api } from 'services/api';
import { resetCart } from 'services/store/cart';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CartDialog = (props) => {
    const { show, handleClose, cart, handleChangeCart } = props
    const [itens, setItens] = useState([])

    const insertItemToCart = (product) => {
        let nItens = itens
        nItens.push(product)

        setItens(nItens)
    }

    const restartCart = () => {
        resetCart()
        handleChangeCart()
    }

    useEffect(() => {
        if (cart) {
            cart.itens.map((item) => {
                api.get(`product/${item.produto_id}`).then(response => {
                    if (response.status === 200) {
                        let res = response.data
                        if (res.success) {
                            insertItemToCart(res.data)
                        }

                    }
                }).catch(error => {

                })
            })
        }
    }, [cart])

    return (
        <Dialog fullScreen open={show} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        Carrinho de compras
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <div className="mt-5"></div>
                <Card className="mt-4 mb-2" elevation={0}>
                    <CardContent>
                        {
                            cart && <Grid container md={12} alignContent="center" alignItems="center">
                                <Grid item
                                    lg={12}
                                    md={12}
                                    xs={12}>
                                    <Button onClick={restartCart}>
                                        Abandonar Carrinho
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                        <Grid container md={12} alignContent="center" alignItems="center">
                            <Grid item
                                lg={12}
                                md={12}
                                xs={12}>
                                {
                                    itens.map((item, index) => {
                                        return <p>{item.nome} - {cart.itens[index].quantidade}</p>
                                    })
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default CartDialog
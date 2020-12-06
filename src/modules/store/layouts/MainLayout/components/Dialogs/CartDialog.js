import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Card, CardContent, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Slide, TextField, Toolbar, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { apiAuth } from 'services/api';
import ProductCard from '../ProductCard';
import { api } from 'services/api';
import { resetCart } from 'services/store/cart';
import ProductCartCard from 'modules/store/components/Cards/product_cart_card'
import Dinero from 'dinero.js'
import { withStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import { restartCart } from 'store/reducer/cart';
import { removeItem } from 'store/reducer/cart';
import { addItem } from 'store/reducer/cart';
import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated } from 'services/store/auth';
import { login } from 'services/store/auth';

const defaultProductImage = require('modules/shared/assets/img/default-product.png')

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const GreenButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#00a30e'),
        backgroundColor: '#00a30e',
        '&:hover': {
            backgroundColor: '#2dfc3f',
            color: theme.palette.getContrastText('#2dfc3f')
        },
    },
}))(Button)

const CartDialog = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { show, handleClose } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [openCheckoutLogin, setOpenCheckoutLogin] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [routeToNavigate, setRouteToNavigate] = useState("/loja")

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

    const restartCartClick = () => {
        dispatch(restartCart())
        enqueueSnackbar('Carrinho resetado com sucesso!', { variant: 'success' })
    }

    const handleClickSubItem = (item) => {
        dispatch(removeItem(item))
        enqueueSnackbar('Item removido!', { variant: 'success' })
    }

    const handleClickAddItem = (product_item) => {
        let indexOfItem = null;
        cart.itens.map((item, index) => {
            if (item.produto_id == product_item.id) {
                indexOfItem = index
            }
        })

        if (indexOfItem != null) {
            if (cart.itens[indexOfItem].quantidade <= product_item.estoque.quantidade_disponivel - 1) {
                dispatch(addItem(product_item))
                enqueueSnackbar("Produto inserido no carrinho ;)", { variant: "success" })
            } else {
                enqueueSnackbar("Infelizmente não temos mais este item em estoque... :(", { variant: "danger" })
            }
        } else {
            dispatch(addItem(product_item))
            enqueueSnackbar("Produto inserido no carrinho ;)", { variant: "success" })
        }
    }

    const handleChangeOpenCheckoutLogin = () => {
        setOpenCheckoutLogin(!openCheckoutLogin)

    }

    const finishOrder = () => {
        if (isAuthenticated()) {

        } else {
            handleChangeOpenCheckoutLogin()
        }

    }

    const onSubmitLoginInCheckout = (ev) => {
        ev.preventDefault()

        setIsSubmiting(true)
        let send = {
            email: email,
            password: password
        }
        send.remember = true
        api.post('/auth/login/client', send).then((response) => {
            if (response.status === 200) {
                let res = response.data

                if (res.success) {
                    if (login(res.data.user, res.data.access_token, res.data.expires_in, res.data.remember_user)) {
                        // goToRoute('/loja/checkout')
                        window.location.href = '/loja/checkout'
                    } else {
                        enqueueSnackbar('Não foi possível efetuar o login, tente novamente mais tarde.', { variant: 'danger' })
                    }
                } else {
                    enqueueSnackbar('Usuário e/ou senha incorretos!.', { variant: 'warning' })
                }
            }
        }).catch((error) => {
            enqueueSnackbar('Ops! Tivemos um problema no servidor, tente novamente mais tarde.', { variant: 'danger' })
        }).finally(() => {
            setIsSubmiting(false)
        })
    }

    const goToRoute = (route) => {
        setRouteToNavigate(route)
        setRedirect(!redirect)
    }

    return (
        <>
            {
                redirect && <Navigate to={routeToNavigate} />
            }
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
                            <List>
                                {
                                    cart.itens.length == 0 &&
                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar alt="Profile Picture" src={defaultProductImage} />
                                        </ListItemAvatar>
                                        <ListItemText primary={`Nenhum item no carrinho!`} secondary={"Boas compras! ;)"} />

                                    </ListItem>
                                }
                                {
                                    cart.itens.map((row, index) => {

                                        return (
                                            <Grid container lg={12} md={12} xs={12}>
                                                <Grid item lg={10} md={10} xs={11}>
                                                    <Link to={`/loja/product/${row.produto.apelido}`} onClick={handleClose}>
                                                        <ListItem button key={row.produto.id}>
                                                            <ListItemAvatar>
                                                                <Avatar alt="Profile Picture" src={row.produto.images.length > 0 ? row.produto.images[0].image_url : defaultProductImage} />
                                                            </ListItemAvatar>
                                                            <ListItemText primary={`${row.produto.nome} - Quantidade: ${row.quantidade}`} secondary={getPrice(row.produto.valor, row.produto.valor_promocional)} />

                                                        </ListItem>
                                                    </Link>
                                                </Grid>
                                                <Grid item lg={2} md={2} xs={1}>
                                                    <Grid container alignContent="center" alignItems="center" >
                                                        <Grid item lg={4} md={4} xs={4} >
                                                            <Fab size="small" onClick={() => handleClickAddItem(row.produto)}>+</Fab>
                                                            <Fab size="small" onClick={() => handleClickSubItem(row.produto)}>-</Fab>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }
                            </List>
                        </CardContent>

                        {
                            cart.itens.length > 0 && <Grid style={{ position: 'fixed', bottom: 0, width: '100%', padding: 10, left: 0, right: 0 }} container md={12} alignContent="center" alignItems="center" spacing={2}>
                                <Grid item
                                    lg={6}
                                    md={6}
                                    xs={6}>
                                    <Typography variant="h3" component="h3">
                                        Valor Total
                                </Typography>
                                </Grid>
                                <Grid item
                                    lg={6}
                                    md={6}
                                    xs={6}>
                                    <Typography variant="h2" align="right" component="h2">
                                        {getPrice(cart.valor)}
                                    </Typography>
                                </Grid>
                                <Grid item
                                    lg={6}
                                    md={6}
                                    xs={6}>
                                    <Button variant="contained" color="primary" fullWidth onClick={restartCartClick}>
                                        Abandonar Carrinho
                                </Button>
                                </Grid>
                                <Grid item
                                    lg={6}
                                    md={6}
                                    xs={6}>
                                    <GreenButton variant="contained" fullWidth onClick={finishOrder}>
                                        {
                                            isAuthenticated() ? "Realizar Pagamento" : "Finalizar Compra"
                                        }
                                    </GreenButton>
                                </Grid>
                            </Grid>
                        }
                    </Card>
                </DialogContent >
            </Dialog >
            {/* LOGIN in CHECKOUT */}
            <Dialog open={openCheckoutLogin} TransitionComponent={Transition}
                aria-labelledby="form-dialog-title"
                onClose={handleChangeOpenCheckoutLogin}>
                <form onSubmit={onSubmitLoginInCheckout}>
                    <DialogTitle id="form-dialog-title">Finalizando a compra</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Para finalizar, a compra, é necessário estar logado em nosso site... ;).
                        </DialogContentText>
                        <TextField
                            color="secondary"
                            variant="outlined"
                            autoFocus
                            margin="dense"
                            label="E-mail"
                            id="email"
                            type="email"
                            name="email"
                            fullWidth
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <TextField
                            color="secondary"
                            variant="outlined"
                            margin="dense"
                            label="Senha"
                            id="password"
                            name="password"
                            type="password"
                            fullWidth
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleChangeOpenCheckoutLogin} color="error">
                            Cancelar
                        </Button>
                        <Button onClick={handleChangeOpenCheckoutLogin} color="secondary">
                            Cadastrar
                        </Button>
                        <Button type="submit" color="success" disabled={isSubmiting}>
                            Entrar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            
        </>
    )
}

export default CartDialog
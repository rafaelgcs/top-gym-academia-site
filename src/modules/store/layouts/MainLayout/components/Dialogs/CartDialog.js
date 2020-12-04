import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Card, CardContent, CircularProgress, Container, Dialog, DialogContent, DialogTitle, Fab, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Slide, TextField, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search'
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

const defaultProductImage = require('modules/shared/assets/img/default-product.png')

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GreenButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#00a30e'),
        backgroundColor: '#00a30e',
        '&:hover': {
            backgroundColor: '#2dfc3f',
            color: theme.palette.getContrastText('#2dfc3f')
        },
    },
}))(Button);

const columns = [
    { id: 'image', label: 'Imagem' },
    { id: 'valueAndProduct', label: 'Produto', minWidth: 200, format: (value) => value.toLocaleString('pt-BR') },
    {
        id: 'quantity',
        label: 'Quantidade',
        minWidth: 150,
        align: 'right',
    },

];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const CartDialog = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const classes = useStyles();
    const { show, handleClose, handleChangeCart } = props
    const [itens, setItens] = useState([])

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

    const insertItemToCart = (product) => {
        let nItens = itens
        nItens.push(product)

        setItens(nItens)
    }

    const restartCartClick = () => {
        dispatch(restartCart())
        enqueueSnackbar('Carrinho resetado com sucesso!', { variant: 'success' })
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickSubItem = (item) => {
        dispatch(removeItem(item))
        enqueueSnackbar('Item removido!', { variant: 'success' })
    }

    const handleClickAddItem = (item) => {
        dispatch(addItem(item))
        enqueueSnackbar('Item adicionado!', { variant: 'success' })
    }

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
                        <List>
                            {
                                cart.itens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {

                                    return (
                                        <Grid container lg={12} md={12} xs={12}>
                                            <Grid item lg={8} md={8} xs={8}>
                                                <ListItem button key={row.produto.id}>
                                                    <ListItemAvatar>
                                                        <Avatar alt="Profile Picture" src={row.produto.images.length > 0 ? row.produto.images[0].image_url : defaultProductImage} />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={`${row.produto.nome} - Quantidade: ${row.quantidade}`} secondary={getPrice(row.produto.valor, row.produto.valor_promocional)} />

                                                </ListItem>
                                            </Grid>
                                            <Grid item lg={4} md={4} xs={4}>
                                                <Grid container alignContent="flex-end" alignItems="flex-end" >
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
                                <GreenButton variant="contained" fullWidth onClick={() => console.log("TODO: Pay")}>
                                    Finalizar Compra
                                </GreenButton>
                            </Grid>
                        </Grid>
                    }
                </Card>
            </DialogContent >
        </Dialog >
    )
}

export default CartDialog
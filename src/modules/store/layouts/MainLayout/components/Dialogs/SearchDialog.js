import React, { useState } from 'react'
import { AppBar, Card, CardContent, CircularProgress, Container, Dialog, DialogContent, DialogTitle, Fab, Grid, IconButton, InputAdornment, Slide, TextField, Toolbar, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { apiAuth } from 'services/api';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from 'store/reducer/cart'
import { useSnackbar } from 'notistack';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SearchDialog = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { show, handleClose, handleChangeCart } = props

    const [afterSearch, setAfterSearch] = useState(false)
    const [searching, setSearching] = useState(false)

    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])

    const onChange = (ev) => {
        setSearch(ev.target.value)
    }

    const doSearch = (ev) => {
        ev.preventDefault()
        setSearching(true)
        apiAuth.get(`product/byName/${search}`).then((response) => {
            if (response.status === 200) {
                let res = response.data
                setResult(res.data)
                setSearching(false)
                setAfterSearch(true)
            }
        })
    }

    const addItemCart = (product_item) => {
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

    const renderProduct = (product) => {
        return (<ProductCard product={product} addItemCart={addItemCart} handleClose={handleClose} />)
    }
    return (
        <Dialog fullScreen open={show} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        Busca
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <div className="mt-5"></div>
                <Card className="mt-4 mb-2" elevation={0}>
                    <CardContent>
                        <Grid container md={12} alignContent="center" alignItems="center">
                            <Grid item
                                lg={12}
                                md={12}
                                xs={12}>
                                <form onSubmit={doSearch}>
                                    <TextField
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Fab color="primary" aria-label="search" type="submit">
                                                        <SearchIcon />
                                                    </Fab>
                                                </InputAdornment>
                                            )
                                        }}
                                        placeholder="Efetuar busca"
                                        variant="outlined"
                                        value={search}
                                        onChange={onChange}
                                    />
                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {
                    searching ? <Grid
                        lg={12}
                        md={12}
                        xs={12}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress
                                size={40}
                                thickness={5}
                                color="inherit"
                            />
                            <p>
                                Efetuando Busca
                            </p>
                        </div>
                    </Grid> :
                        afterSearch ? result.length > 0 ?
                            <Container>
                                <Grid container spacing={2} alignContent="center" alignItems="center">
                                    {
                                        result.map((item) => {
                                            return <Grid item lg={4} md={4} xs={6}> {renderProduct(item)} </Grid>
                                        })
                                    }
                                </Grid>
                            </Container> :
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Desculpa :(
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Nenhum resultado da busca!
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Tente novamente com outro nome.
                                    </Typography>
                                </CardContent>
                            </Card> :
                            <Card>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item lg={3} md={3} xs={3}>
                                            <div className={"mt-3"}>
                                                <SearchIcon fontSize="large" />
                                            </div>
                                        </Grid>
                                        <Grid item lg={9} md={9} xs={9}>
                                            <Typography variant="h5" component="h2">
                                                Efetue uma busca
                                            </Typography>
                                            <Typography color="textSecondary">
                                                Do produto desejado
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                Basta inserir o nome do protudo na barra de pesquisa acima.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                }
            </DialogContent>
        </Dialog>
    )
}

export default SearchDialog
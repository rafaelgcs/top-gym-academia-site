import React, { useState } from 'react'
import { AppBar, Card, CardContent, CircularProgress, Container, Dialog, DialogContent, DialogTitle, Fab, Grid, IconButton, InputAdornment, Slide, TextField, Toolbar, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { apiAuth } from 'services/api';
import ProductCard from '../components/ProductCard';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SearchDialog = (props) => {
    const { show, handleClose } = props

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

    const handleChange = (ev) => {

    }

    const renderProduct = (product) => {
        return (<ProductCard product={product} />)
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
                            />
                            <p>
                                Efetuando Busca
                            </p>
                        </div>
                    </Grid> :
                        afterSearch ? result.length > 0 ?
                            <Container>
                                <Grid container spacing={1} alignContent="center" alignItems="center">
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
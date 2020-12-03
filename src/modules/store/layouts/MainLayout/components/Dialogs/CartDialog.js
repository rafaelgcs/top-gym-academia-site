import React, { useState } from 'react'
import { AppBar, Card, CardContent, CircularProgress, Container, Dialog, DialogContent, DialogTitle, Fab, Grid, IconButton, InputAdornment, Slide, TextField, Toolbar, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { apiAuth } from 'services/api';
import ProductCard from '../ProductCard';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CartDialog = (props) => {
    const { show, handleClose } = props

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
                        <Grid container md={12} alignContent="center" alignItems="center">
                            <Grid item
                                lg={12}
                                md={12}
                                xs={12}>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default CartDialog
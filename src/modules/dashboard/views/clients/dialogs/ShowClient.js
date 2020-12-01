import React, { useEffect, useState } from 'react'
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid
} from '@material-ui/core'
import Profile from '../../account/AccountView/Profile'

const ShowClientDialog = (props) => {
    const { open, client, handleClose, PaperComponent, resetPage } = props


    return (
        <Dialog
            maxWidth={"md"}
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            scroll="paper"

        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Visualização do Cliente - {client.nome}
            </DialogTitle>
            <DialogContent dividers={true}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid item md={6}>
                        <Profile user={client} />
                    </Grid>
                    <Grid item md={6}>
                        <Grid container spacing={2} md={12}>
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="E-mail"
                                    disable
                                    value={client.email}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} variant="contained" color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ShowClientDialog
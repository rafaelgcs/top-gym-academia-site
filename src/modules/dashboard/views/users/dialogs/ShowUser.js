import React, { useEffect, useState } from 'react'
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Grid,
    InputAdornment
} from '@material-ui/core'
import { apiAuth, refreshToken } from 'services/api'
import Profile from '../../account/AccountView/Profile'
import { useSnackbar } from 'notistack'

const ShowUserDialog = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const { open, user, handleClose, PaperComponent, resetPage } = props

    const [newUser, setNewUser] = useState({
        nome: null,
        sobrenome: null,
        email: null,
        password: null,
        password_confirmation: null,
        cpf: null,
        type: null
    })

    const handleChangeInputs = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        });
    };

    const verifyPasswords = () => {
        if (newUser.password == newUser.password_confirmation) {
            return true;
        } else {
            return false;
        }
    }

    const verifyInputs = () => {
        if (
            (newUser.nome != null && newUser.nome != "") &&
            (newUser.sobrenome != null && newUser.sobrenome != "") &&
            (newUser.email != null && newUser.email != "") &&
            (newUser.password != null && newUser.password != "") &&
            (newUser.password_confirmation != null && newUser.password_confirmation != "") &&
            (newUser.cpf != null && newUser.cpf != "")
        ) {
            return true
        } else {
            return false;
        }
    }

    const onSubmitForm = () => {
        if (verifyPasswords()) {
            if (verifyInputs()) {
                apiAuth.post('/user', newUser).then(response => {
                    if (response.status === 202 || response.status === 201 || response.status === 200) {
                        enqueueSnackbar('Usuário cadastrado com sucesso!', { variant: 'success' })
                        resetPage()
                    }
                }).catch(error => {
                    enqueueSnackbar("Aconteceu um erro, tente novamente mais tarde!", { variant: 'danger' })
                    if (error.response.status === 401) {
                        refreshToken()
                    }
                }).finally(() => {
                    handleClose()
                })
            } else {
                enqueueSnackbar("Favor preencher todos os campos obrigatórios do formulário!")
            }
        } else {
            enqueueSnackbar("As senhas inseridas não são iguais...")
        }
    }

    useEffect(() => {
        setNewUser({
            nome: user.nome,
            sobrenome: user.sobrenome,
            email: user.email,
            cpf: user.cpf ? user.cpf : "***.***.***-**",
            type: user.type
        })
    }, [user])

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
                Edição de Usuário
            </DialogTitle>
            <DialogContent dividers={true}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid item md={6}>
                        <Profile user={user} />
                    </Grid>
                    <Grid item md={6}>
                        <Grid container spacing={2} md={12}>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Nome do Usuário"
                                    name="nome"
                                    onChange={handleChangeInputs}
                                    required
                                    value={newUser.nome}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Sobrenome"
                                    name="sobrenome"
                                    onChange={handleChangeInputs}
                                    required
                                    value={newUser.sobrenome}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="CPF"
                                    name="cpf"
                                    typeof="number"
                                    onChange={handleChangeInputs}
                                    required
                                    value={newUser.cpf}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Tipo"
                                    name="type"
                                    onChange={handleChangeInputs}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={newUser.type}
                                    variant="outlined"
                                >
                                    <option value={"comum"}>
                                        {"Usuário Comum"}
                                    </option>
                                    <option value={"admin"}>
                                        {"Administrador"}
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="E-mail"
                                    name="email"
                                    onChange={handleChangeInputs}
                                    required
                                    type="email"
                                    value={newUser.email}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button autoFocus onClick={onSubmitForm} type="submit" variant="contained" color="primary">
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ShowUserDialog
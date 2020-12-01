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
import { apiAuth } from 'services/api'
import { Dropzone } from 'modules/shared/components/Dropzone'

const AddUserDialog = (props) => {
    const { showAddUserDialog, handleCloseAddUser, PaperComponent, resetPage } = props
    const [files, setFiles] = useState([])
    const extensionsAccepted = ['png', 'jpg', 'jpeg', 'gif']

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
                        alert('Usuário cadastrado com sucesso!')
                        resetPage()
                    }
                }).catch(error => {
                    console.log("erro", error)
                }).finally(() => {
                    handleCloseAddUser()
                })
            } else {
                alert("Favor preencher todos os campos obrigatórios do formulário!")
            }
        } else {
            alert("As senhas inseridas não são iguais...")
        }
    }

    return (
        <Dialog
            maxWidth={"md"}
            open={showAddUserDialog}
            onClose={handleCloseAddUser}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            scroll="paper"

        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Cadastro de Produto
                </DialogTitle>
            <DialogContent dividers={true}>
                <Grid
                    container
                    spacing={3}
                >
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
                            label="E-mail"
                            name="email"
                            onChange={handleChangeInputs}
                            required
                            type="email"
                            value={newUser.email}
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
                            requiredq q
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
                    <Grid item md={12} xs={12} lg={12} />
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Senha"
                            name="password"
                            type="password"
                            onChange={handleChangeInputs}
                            required
                            value={newUser.password}
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
                            label="Confirmação de senha"
                            name="password_confirmation"
                            type="password"
                            onChange={handleChangeInputs}
                            required
                            value={newUser.password_confirmation}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAddUser} color="primary">
                    Cancelar
                </Button>
                <Button autoFocus onClick={onSubmitForm} type="submit" variant="contained" color="primary">
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUserDialog
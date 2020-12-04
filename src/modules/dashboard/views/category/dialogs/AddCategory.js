import React, { useState } from 'react'
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Grid,
    InputAdornment,
    FormControl,
    OutlinedInput,
    InputLabel
} from '@material-ui/core'
import { apiAuth, refreshToken } from 'services/api'
import { useSnackbar } from 'notistack'

const AddCategoryDialog = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const { openDialogAddCategory, handleCloseAddCategory, PaperComponent } = props

    const [newCategory, setNewCategory] = useState({
        nome: '',
        descricao: ''
    })

    const handleChangeInputs = (event) => {
        setNewCategory({
            ...newCategory,
            [event.target.name]: event.target.value
        });
    };

    const onSubmitForm = () => {
        if (verifyInputs()) {
            apiAuth.post('/category', newCategory).then((response) => {
                if (response.status === 201 || response.status === 200) {
                    handleCloseAddCategory()
                    enqueueSnackbar("Categoria criada com sucesso!", { variant: "success" })
                } else {
                    enqueueSnackbar("Não foi possível enviar a categoria.", { variant: "danger" })
                }
            }).catch((error) => {
                if (error.response.status === 401) {
                    refreshToken()
                }
                enqueueSnackbar("Não foi possível enviar a categoria.", { variant: "danger" })
            })
        } else {

            enqueueSnackbar("Favor preencher todos os campos", { variant: "warning" })
        }
    }
    const verifyInputs = () => {
        if (newCategory.nome != "" && newCategory.nome != null && newCategory.descricao != "" && newCategory.descricao != null) {
            return true;
        } else {
            return false
        }
    }

    return (
        <Dialog
            maxWidth={"md"}
            open={openDialogAddCategory}
            onClose={handleCloseAddCategory}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            scroll="paper"

        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Cadastro de Categoria
                </DialogTitle>
            <DialogContent dividers={true}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        md={12}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Nome da Categoria"
                            name="nome"
                            onChange={handleChangeInputs}
                            required
                            value={newCategory.nome}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        item
                        md={12}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Descrição"
                            name="descricao"
                            onChange={handleChangeInputs}
                            required
                            value={newCategory.descricao}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAddCategory} color="primary">
                    Cancelar
                </Button>
                <Button autoFocus onClick={onSubmitForm} type="submit" variant="contained" color="primary">
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCategoryDialog
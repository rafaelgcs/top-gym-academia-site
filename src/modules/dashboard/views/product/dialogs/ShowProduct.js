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
    InputAdornment,
    Card,
    CardContent,
    Box,
    Container
} from '@material-ui/core'
import { apiAuth, refreshToken } from 'services/api'
import { Dropzone } from 'modules/shared/components/Dropzone'
import '../styles/hideArrowsSlider.css'
import Slider from 'react-slick'
import { useSnackbar } from 'notistack'

const defaultProductImage = require('../../../../shared/assets/img/default-product.png')

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <div style={{ display: 'none' }} />,
    prevArrow: <div style={{ display: 'none' }} />,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const ShowProductDialog = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const { openDialogShowProduto, product, handleChangeShowProduto, resetTable, PaperComponent } = props
    const [categories, setCategories] = useState([])
    const [files, setFiles] = useState([])
    const [qtdTotal, setQtdTotal] = useState(0)
    const [qtdDisponivel, setQtdDisponivel] = useState(0)
    const extensionsAccepted = ['png', 'jpg', 'jpeg', 'gif']

    const [newProduct, setNewProduct] = useState({
        nome: product.nome,
        apelido: product.apelido,
        valor: product.valor,
        valor_promocional: product.valor_promocional,
        categoria_id: product.categoria_id,
        ativo: product.ativo,
        principal: product.principal,
        tamanho: product.tamanho,
        altura: product.altura,
        peso: product.peso,
        largura: product.largura,
        profundidade: product.profundidade
    })

    const handleChangeInputs = (event) => {
        setNewProduct({
            ...newProduct,
            [event.target.name]: event.target.value
        });
    };

    // const verifyInputs = () => {
    //     if (
    //         (newProduct.nome != null && newProduct.nome != "") &&
    //         (newProduct.apelido != null && newProduct.apelido != "") &&
    //         (newProduct.valor != null && newProduct.valor != "") &&
    //         (newProduct.valor_promocional != null && newProduct.valor_promocional != "") &&
    //         (newProduct.tamanho != null && newProduct.tamanho != "") &&
    //         (newProduct.categoria_id != null && newProduct.categoria_id != "")
    //     ) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    const onSubmitForm = () => {
        apiAuth.put(`/product/${product.id}`, newProduct).then(response => {
            updateStock(response.data)
        }).catch(error => {
            enqueueSnackbar("Aconteceu um erro, tente novamente mais tarde!", { variant: 'danger' })
            if (error.response.status === 401) {
                refreshToken()
            }
        })
    }

    const updateStock = (product) => {
        let stock = {
            quantidade_total: qtdTotal,
            quantidade_disponivel: qtdDisponivel
        }
        apiAuth.put(`stock/${product.id}`, stock).then(response => {
            sendImages(product)
        }).catch(error => {
            enqueueSnackbar("Aconteceu um erro, tente novamente mais tarde!", { variant: 'danger' })
            if (error.response.status === 401) {
                refreshToken()
            }
        })

    }

    const sendImages = (product) => {

        if (files.length > 0) {
            files.map(file => {
                let form = new FormData();
                form.append('image', file)

                apiAuth.post(`product/${product.id}/image`, form, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then((response) => {
                    enqueueSnackbar("Imagens Enviadas Com Sucesso!")
                    resetTable()
                    handleChangeShowProduto()
                }).catch(error => {
                    enqueueSnackbar("Aconteceu um erro, tente novamente mais tarde!", { variant: 'danger' })
                    if (error.response.status === 401) {
                        refreshToken()
                    }
                })
            })
        } else {
            enqueueSnackbar("Produto atualizado com sucesso!")
            resetTable()
            handleChangeShowProduto()
        }
    }

    useEffect(() => {
        const getAllCategories = () => {
            apiAuth.get('category').then((response) => {
                if (response.status === 200) {
                    let res = response.data;
                    if (res.success) {
                        setCategories(res.data)
                    }
                }
            }).catch(error => {
                enqueueSnackbar("Aconteceu um erro, tente novamente mais tarde!", { variant: 'danger' })
                if (error.response.status === 401) {
                    refreshToken()
                }
            })
        }

        getAllCategories()
    }, [])

    useEffect(() => {
        setNewProduct({
            nome: product.nome,
            apelido: product.apelido,
            valor: product.valor,
            valor_promocional: product.valor_promocional,
            categoria_id: product.categoria_id,
            ativo: product.ativo,
            principal: product.principal,
            tamanho: product.tamanho,
            altura: product.altura,
            peso: product.peso,
            largura: product.largura,
            profundidade: product.profundidade
        })
        if (product.estoque) {
            setQtdDisponivel(product.estoque.quantidade_disponivel)
            setQtdTotal(product.estoque.quantidade_total)
        }
        setFiles([])
    }, [product])

    return (
        <Dialog
            maxWidth={"md"}
            open={openDialogShowProduto}
            onClose={handleChangeShowProduto}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            scroll="paper"

        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Exibição do Produto - {product.nome}
            </DialogTitle>
            <DialogContent dividers={true}>
                <Container>
                    <Slider {...settings} className="mb-5">
                        {product.images && product.images.map((imagem) => {
                            return (
                                <div style={{ padding: 5 }}>
                                    <Card style={{ borderRadius: 15 }} elevation={0}>
                                        <CardContent>
                                            <Box
                                                display="flex"
                                                justifyContent="center"
                                            >
                                                <img width={'100%'} style={{ borderRadius: 15 }} src={imagem.image_url ? imagem.image_url : defaultProductImage} />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        })}
                    </Slider>

                </Container>
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
                            label="Nome do Produto"
                            name="nome"
                            onChange={handleChangeInputs}
                            required
                            value={newProduct.nome}
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
                            label="Apelido"
                            name="apelido"
                            onChange={handleChangeInputs}
                            required
                            value={newProduct.apelido}
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
                            label="Valor"
                            name="valor"
                            onChange={handleChangeInputs}
                            required
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                            }}
                            value={newProduct.valor}
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
                            label="Valor Promocional"
                            name="valor_promocional"
                            onChange={handleChangeInputs}
                            required
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                            }}
                            value={newProduct.valor_promocional}
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
                            label="Tamanho do Produto"
                            name="tamanho"
                            onChange={handleChangeInputs}
                            required
                            value={newProduct.tamanho}
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
                            label="Categoria"
                            name="categoria_id"
                            onChange={handleChangeInputs}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={newProduct.categoria_id}
                            variant="outlined"
                        >
                            <option>
                                {"Nenhuma"}
                            </option>
                            {
                                categories.map(item => {
                                    return (
                                        <option value={item.id} key={item.id}>
                                            {item.nome}
                                        </option>
                                    )
                                })
                            }

                        </TextField>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Ativo?"
                            name="ativo"
                            onChange={handleChangeInputs}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={newProduct.ativo}
                            defaultValue={newProduct.ativo}
                            variant="outlined"
                        >
                            <option
                                value={true}
                            >
                                {"Sim"}
                            </option>
                            <option
                                value={false}
                            >
                                {"Não"}
                            </option>
                        </TextField>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Produto Principal?"
                            name="principal"
                            onChange={handleChangeInputs}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={newProduct.principal}
                            defaultValue={newProduct.principal}
                            variant="outlined"
                        >
                            <option
                                value={true}
                            >
                                {"Sim"}
                            </option>
                            <option
                                value={false}
                            >
                                {"Não"}
                            </option>
                        </TextField>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <p>Estoque</p>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Quantidade Total"
                            name="qtdTotal"
                            onChange={(ev) => setQtdTotal(ev.target.value)}
                            required
                            value={qtdTotal}
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
                            label="Quantidade Disponível"
                            name="qtdDisponivel"
                            onChange={(ev) => setQtdDisponivel(ev.target.value)}
                            required
                            value={qtdDisponivel}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <p>Medidas</p>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Altura"
                            name="altura"
                            onChange={handleChangeInputs}
                            value={newProduct.altura}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}
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
                            label="Peso"
                            name="peso"
                            onChange={handleChangeInputs}
                            value={newProduct.peso}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>
                            }}
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
                            label="Largura"
                            name="largura"
                            onChange={handleChangeInputs}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}
                            value={newProduct.largura}
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
                            label="Profundidade"
                            name="profundidade"
                            onChange={handleChangeInputs}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}
                            value={newProduct.profundidade}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        item
                        md={12}
                        xs={12}>
                        <Dropzone
                            textDropzone="Clique aqui ou arraste as imagens"
                            titleLoadedFiles="Os arquivos carregados são:"
                            progressBarColor="#91c5e3" // Bar Color Background - light blue
                            progressColor="#0c81c4" // Progress Color - blue
                            fileExtensions={extensionsAccepted}
                            files={files}
                            onChange={(selectedFiles) => setFiles(selectedFiles)}
                        />

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>

                <Button onClick={handleChangeShowProduto} color="primary">
                    Cancelar
                    </Button>
                <Button autoFocus onClick={onSubmitForm} type="submit" variant="contained" color="primary">
                    Enviar
                    </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ShowProductDialog
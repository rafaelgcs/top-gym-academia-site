import { CssBaseline, makeStyles } from '@material-ui/core'
import SectionStartDetail from 'modules/store/components/Sections/SectionStartDetail'
import SectionProductDescription from 'modules/store/components/Sections/SectionProductDescription'
import SectionPrice from 'modules/store/components/Skeletons/section_price'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { api } from 'services/api'
import { addItem } from 'store/reducer/cart'
import SectionDescription from 'modules/store/components/Skeletons/section_description'
import SectionStartDetailSK from 'modules/store/components/Skeletons/section_start_detail_sk'

const useStyles = makeStyles((theme) => ({
    bg: {
        minHeight: '100%',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.background.paper,
    }
}));

const ProductDetail = (props) => {
    const classes = useStyles()
    const { apelido } = useParams()
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const [product, setProduct] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const getProduct = () => {
            setLoaded(false)
            api.get(`product/byApelido/${apelido}`)
                .then((response) => {
                    if (response.status === 200) {
                        let res = response.data
                        if (res.success) {
                            setProduct(res.data[0])
                        } else {
                            enqueueSnackbar("Não foi possível encontrar o produto! Ele pode ter sido inativado ou não existe.", { variant: 'danger' })
                        }
                    }
                }).catch(error => {
                    enqueueSnackbar("Não foi possível encontrar o produto! Ele pode ter sido inativado ou não existe.", { variant: 'danger' })
                })
                .finally((res) => {
                    setLoaded(true)
                })
        }

        getProduct()
    }, [apelido])

    const addItemCart = (item) => {
        dispatch(addItem(item))
        enqueueSnackbar("Produto inserido ao carrinho ;)", { variant: 'success' })
    }

    return (
        <React.Fragment className={classes.bg}>
            <CssBaseline />
            { loaded ?
                <>
                    <SectionStartDetail item={product} addItemCart={addItemCart} />
                    <SectionProductDescription descricao={product.descricao} />
                </>
                // <SectionPricing item={product} addItemCart={addItemCart} />
                :
                <>
                    <SectionStartDetailSK />
                    <SectionDescription />
                </>
            }
        </React.Fragment>
    )
}

export default ProductDetail
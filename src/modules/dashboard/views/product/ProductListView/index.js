import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import data from './data';
import Draggable from 'react-draggable';
import AddProductDialog from '../dialogs/AddProduct';
import { apiAuth, refreshToken } from 'services/api';
import ShowProductDialog from '../dialogs/ShowProduct';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [searchProduct, setSearchProduct] = useState("");
  const [openDialogAddProduto, setOpenDialogAddProduto] = useState(false)
  const [openDialogShowProduto, setOpenDialogShowProduto] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1)
  const [maxPerPage, setMaxPerPage] = useState(12)
  const [offSet, setOffSet] = useState(0)

  const handleCloseAddProduto = () => {
    setOpenDialogAddProduto(!openDialogAddProduto)
  }
  const handleChangeShowProduto = () => {
    setOpenDialogShowProduto(!openDialogShowProduto)
  }

  const scrollToTop = () => window.scrollTo(0, 0)

  const changePage = (ev, item) => {
    if (item == 1) {
      setPage(item)
      setOffSet(0);
    } else {
      setPage(item)
      setOffSet((item - 1) * maxPerPage);
    }
    scrollToTop()
  }

  const handleChangeSearchProduct = (ev) => {
    setSearchProduct(ev.target.value)
  }

  const reorderPages = () => {
    if (filtered.length <= maxPerPage) {
      setPages(1)
      setPage(1)
      setOffSet(0)
    } else {
      if (filtered.length % maxPerPage == 0) {
        setPages(filtered.length / maxPerPage);
        setOffSet(0);
        setPage(1);
      } else {
        setPages(parseInt(filtered.length / maxPerPage) + 1);
        setOffSet(0);
        setPage(1);
      }
    }
  }

  const getProducts = () => {
    setLoading(true)
    apiAuth.get('/product').then((response) => {
      if (response.status === 200) {
        let res = response.data;

        if (res.success) {
          setProducts(res.data)
          if (res.data.length <= maxPerPage) {
            setPages(1)
          } else {
            if (res.data.length % maxPerPage == 0) {
              setPages(res.data.length / maxPerPage);
              setOffSet(0);
              setPage(1);
            } else {
              setPages(parseInt(res.data.length / maxPerPage) + 1);
              setOffSet(0);
              setPage(1);
            }
          }
        }
      }
    }).catch(error => {
      if (error.response.status === 401) {
        refreshToken()
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {

    getProducts()
  }, []);

  const filtered = products.filter((item) => {
    return item.nome.toLowerCase().indexOf(searchProduct.toLowerCase()) >= 0 || item.id.toString().indexOf(searchProduct) >= 0
  })

  useEffect(() => {
    if (loading) {
      reorderPages()
    }
  }, [loading])

  useEffect(() => {
    reorderPages()
  }, [searchProduct])

  return (
    <Page
      className={classes.root}
      title="Produtos"
    >
      <Container maxWidth={false}>
        <Toolbar searchProduct={searchProduct} handleChange={handleChangeSearchProduct} handleCloseAddProduto={handleCloseAddProduto} />
        {
          filtered.length > 0 && <Box
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <Pagination
              color="primary"
              count={pages}
              page={page}
              size="small"
              onChange={changePage}
            />
          </Box>
        }
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {
              loading ?
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <div style={{ textAlign: 'center' }}>
                    <CircularProgress
                      size={40}
                      thickness={5}
                    />
                  </div>
                </Grid> :
                filtered.map((product, index) => {
                  if (index >= offSet && index < maxPerPage * page) {
                    return (
                      <Grid
                        item
                        key={product.id}
                        lg={4}
                        md={6}
                        xs={6}
                      >
                        <div
                          style={{ cursor: 'pointer' }}
                          onClick={() => { setSelectedProduct(product); handleChangeShowProduto() }}
                        >

                          <ProductCard
                            className={classes.productCard}
                            product={product}
                          />
                        </div>
                      </Grid>
                    )
                  }
                })
            }
          </Grid>
        </Box>
        {
          filtered.length > 0 && <Box
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <Pagination
              color="primary"
              count={pages}
              page={page}
              size="small"
              onChange={changePage}
            />
          </Box>
        }
      </Container>
      {/* Dialogs */}
      <AddProductDialog resetTable={getProducts} openDialogAddProduto={openDialogAddProduto} PaperComponent={PaperComponent} handleCloseAddProduto={handleCloseAddProduto} />
      <ShowProductDialog resetTable={getProducts} openDialogShowProduto={openDialogShowProduto} product={selectedProduct} PaperComponent={PaperComponent} handleChangeShowProduto={handleChangeShowProduto} />
    </Page>
  );
};

export default ProductList;

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
import CategoryCard from './CategoryCard';
import data from './data';
import Draggable from 'react-draggable';
import AddProductDialog from '../dialogs/AddCategory';
import { apiAuth } from 'services/api';
import AddCategoryDialog from '../dialogs/AddCategory';

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

const CategoryList = () => {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [openDialogAddCategory, setOpenDialogAddCategory] = useState(false)
  const [searchCategory, setSearchCategory] = useState("")
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1)
  const [maxPerPage, setMaxPerPage] = useState(12)
  const [offSet, setOffSet] = useState(0)

  const handleCloseAddCategory = () => {
    setOpenDialogAddCategory(!openDialogAddCategory)
  }

  useEffect(() => {
    const getCategories = () => {
      apiAuth.get('/category').then((response) => {
        if (response.status === 200) {
          let res = response.data;

          if (res.success) {
            setCategory(res.data)
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
      }).finally(() => {
        setLoading(false)
      })
    }

    getCategories()
  }, []);

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

  const handleChangeSearchCategory = (ev) => {
    setSearchCategory(ev.target.value)
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

  const filtered = category.filter((item) => {
    return item.nome.toLowerCase().indexOf(searchCategory.toLowerCase()) >= 0 || item.id.toString().indexOf(searchCategory) >= 0
  })

  useEffect(() => {
    if (loading) {
      reorderPages()
    }
  }, [loading])

  useEffect(() => {
    reorderPages()
  }, [searchCategory])

  return (
    <Page
      className={classes.root}
      title="Categorias"
    >
      <Container maxWidth={false}>
        <Toolbar searchCategory={searchCategory} handleChange={handleChangeSearchCategory} handleCloseAddCategory={handleCloseAddCategory} />
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
                filtered.map((cat, index) => {
                  if (index >= offSet && index < maxPerPage * page) {
                    return (
                      <Grid
                        item
                        key={cat.id}
                        lg={4}
                        md={6}
                        xs={12}
                      >
                        <CategoryCard
                          className={classes.productCard}
                          category={cat}
                        />
                      </Grid>
                    )
                  }
                })}
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
      <AddCategoryDialog openDialogAddCategory={openDialogAddCategory} PaperComponent={PaperComponent} handleCloseAddCategory={handleCloseAddCategory} />
    </Page>
  );
};

export default CategoryList;

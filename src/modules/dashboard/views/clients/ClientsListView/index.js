import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { apiAuth, refreshToken } from 'services/api';
import ShowClientDialog from '../dialogs/ShowClient';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ClientsListView = () => {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles();
  const [clients, setClients] = useState([]);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchClient, setSearchClient] = useState("");
  const [selectedClient, setSelectedClient] = useState({});

  const handleChangeSearcClient = (ev) => {
    setSearchClient(ev.target.value)
  }

  const handleCloseDialogClient = () => {
    setShowClientDialog(!showClientDialog)
  }

  const getClientOfTheTable = (selecteds) => {
    if (selecteds.length == 1) {
      setSelectedClient(filtered[(selecteds[0] - 1)])
      handleCloseDialogClient()
    } else {
      enqueueSnackbar("Só é possível editar 1 usuário por vez.")
    }
  }

  const getClients = () => {
    setLoading(true)
    apiAuth.get('/client').then((response) => {
      if (response.status === 200) {
        let res = response.data;

        if (res.success) {
          setClients(res.data)
        }
      }
    }).catch(error => {
      enqueueSnackbar("Ops! Aconteceu algum problema, tente novamente mais tarde!", { variant: 'danger' })
      if (error.response.status === 401) {
        refreshToken()
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {

    getClients()
  }, []);

  const filtered = clients.filter((user) => {
    return `${user.nome} ${user.sobrenome}`.toLowerCase().indexOf(searchClient) >= 0
  })

  return (
    <Page
      className={classes.root}
      title="Clientes"
    >
      <Container maxWidth={false}>
        <Toolbar searchClient={searchClient} resetPage={getClients} handleChange={handleChangeSearcClient} />
        <Box mt={3}>
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
              <Results clients={filtered} showClient={getClientOfTheTable} />
          }
        </Box>
      </Container>
      {/* Dialogs */}
      <ShowClientDialog open={showClientDialog} handleClose={handleCloseDialogClient} client={selectedClient} />

    </Page>
  );
};

export default ClientsListView;

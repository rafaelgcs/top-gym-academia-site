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
import { apiAuth } from 'services/api';
import AddUserDialog from '../dialogs/AddUser';
import ShowUserDialog from '../dialogs/ShowUser';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UsersListView = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState({});

  const handleChangeSearchUser = (ev) => {
    setSearchUser(ev.target.value)
  }

  const handleCloseAddUser = () => {
    setShowAddUserDialog(!showAddUserDialog)
  }

  const handleCloseDialogUser = () => {
    setShowUserDialog(!showUserDialog)
  }

  const getUserOfTheTable = (selecteds) => {
    if (selecteds.length == 1) {
      setSelectedUser(filtered[(selecteds[0] - 1)])
      handleCloseDialogUser()
    } else {
      alert("Só é possível editar 1 usuário por vez.")
    }
  }

  const getUsers = () => {
    setLoading(true)
    apiAuth.get('/user/list/all').then((response) => {
      if (response.status === 200) {
        let res = response.data;

        if (res.success) {
          setUsers(res.data)
        }
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {

    getUsers()
  }, []);

  const filtered = users.filter((user) => {
    return `${user.nome} ${user.sobrenome}`.toLowerCase().indexOf(searchUser) >= 0
  })

  return (
    <Page
      className={classes.root}
      title="Usuários"
    >
      <Container maxWidth={false}>
        <Toolbar searchUser={searchUser} resetPage={getUsers} handleChange={handleChangeSearchUser} handleCloseAddUser={handleCloseAddUser} />
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
              <Results users={filtered} showUser={getUserOfTheTable} />
          }
        </Box>
      </Container>
      {/* Dialogs */}
      <AddUserDialog showAddUserDialog={showAddUserDialog} handleCloseAddUser={handleCloseAddUser} resetPage={getUsers} />
      <ShowUserDialog open={showUserDialog} handleClose={handleCloseDialogUser} user={selectedUser} resetPage={getUsers} />

    </Page>
  );
};

export default UsersListView;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ searchUser, handleChange, handleCloseAddUser, resetPage, className, ...rest }) => {
  const classes = useStyles();

  const [search, setSearch] = useState(searchUser)
  const doneTyping = () => {
    handleChange({ target: { value: search } })
  }

  const reset = () => {
    setSearch("")
    handleChange({ target: { value: "" } })
  }

  const onChange = (ev) => {
    setSearch(ev.target.value)
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button onClick={resetPage} className={classes.exportButton}>
          Recarregar Página
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleCloseAddUser}
        >
          Novo Usuário
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container md={12}>
              <Grid item
                lg={8}
                md={8}
                xs={12}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="black"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Buscar usuário"
                  variant="outlined"
                  value={search}
                  onChange={onChange}
                />
              </Grid>
              <Grid item md={4} alignContent="end" className={"mt-2"}>
                <Grid container md={12} spacing={1}>
                  <Grid item
                    lg={6}
                    md={6}
                    xs={6}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Button
                        size="large"
                        color="primary"
                        variant="outlined"
                        onClick={reset}
                      >
                        Resetar
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item
                    lg={6}
                    md={6}
                    xs={6}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={doneTyping}
                      >
                        Buscar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;

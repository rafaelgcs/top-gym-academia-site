import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { getUser } from 'services/auth';
moment.locale('pt-br')

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ user, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.nome}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.sobrenome}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`Criado em: ${moment(user.created_at).format('DD/MM/YYYY HH:mm')}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Atualizar Foto de Perfil
        </Button>
      </CardActions> */}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;

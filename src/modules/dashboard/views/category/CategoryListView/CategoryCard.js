import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import getInitials from '../../../utils/getInitials';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  avatar: {
    width: 60,
    height: 60,
    fontSize: 40
  }
}));

const CategoryCard = ({ className, category, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            className={classes.avatar}
            src="/static/images/avatars/avatar_6.png"
          >
            {getInitials(category.nome)}
          </Avatar>
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {category.nome}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {category.descricao}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Atualizado em... {moment(category.updated_at).format('DD/MM/YYYY HH:mm')}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

CategoryCard.propTypes = {
  className: PropTypes.string,
  category: PropTypes.object.isRequired
};

export default CategoryCard;

import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto'
    }
}));

const LandingLayout = () => {
    const classes = useStyles();

    return (
        <Outlet />
    );
};

export default LandingLayout;

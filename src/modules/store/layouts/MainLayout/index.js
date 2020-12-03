import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { makeStyles, ThemeProvider, Zoom, useTheme, Fab } from '@material-ui/core'
import BottomBar from './BottomBar'
import { useMediaQuery } from 'react-responsive'
import TopBar from './TopBar'
import SearchDialog from './components/Dialogs/SearchDialog'
import theme from 'modules/store/theme'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import { green } from '@material-ui/core/colors'
import clsx from 'clsx'
import CartDialog from './components/Dialogs/CartDialog'


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
        overflow: 'hidden',
        paddingTop: 64
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
    },
    fab: {
        position: 'absolute',
        right: theme.spacing(2),
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
    },
}));


const StoreMainLayout = () => {
    const classes = useStyles()
    const [openSearchDialog, setOpenSearchDialog] = useState(false)
    const [openCartDialog, setOpenCartDialog] = useState(false)
    const myTheme = useTheme(theme)
    const [value, setValue] = React.useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleChangeIndex = () => {
        setValue(!value)
    }

    const transitionDuration = {
        enter: myTheme.transitions.duration.enteringScreen,
        exit: myTheme.transitions.duration.leavingScreen,
    }

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const handleCloseSearchDialog = () => {
        setOpenSearchDialog(!openSearchDialog)
    }
    const handleCloseCartDialog = () => {
        setOpenCartDialog(!openCartDialog)
    }

    const fabs = [
        {
            color: 'primary',
            className: classes.fab,
            icon: <AddIcon />,
            label: 'Add',
        },
        {
            color: 'secondary',
            className: classes.fab,
            icon: <EditIcon />,
            label: 'Edit',
        },
        {
            color: 'inherit',
            className: clsx(classes.fab, classes.fabGreen),
            icon: <UpIcon />,
            label: 'Expand',
        },
    ];

    return (
        <ThemeProvider theme={theme} >
            <div className={classes.root}>
                <TopBar handleCloseSearchDialog={handleCloseSearchDialog} />
                <div className={classes.wrapper}>
                    <div className={classes.contentContainer}>
                        <div className={classes.content}>
                            <Outlet />
                        </div>
                    </div>
                </div>
                {isTabletOrMobile && <>
                    {fabs.map((fab, index) => (
                        <Zoom
                            key={fab.color}
                            in={value}
                            timeout={transitionDuration}
                            style={{
                                transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                            }}
                            unmountOnExit
                        >
                            <Fab aria-label={fab.label} style={{ bottom: myTheme.spacing((10 + (index * 8))) }} className={fab.className} color={fab.color}>
                                {fab.icon}
                            </Fab>
                        </Zoom>
                    ))}
                    <BottomBar handleCloseSearchDialog={handleCloseSearchDialog} handleClickMore={handleChangeIndex} handleClickShowCart={handleCloseCartDialog} />
                </>}
                {/* Dialogs */}
                <SearchDialog
                    show={openSearchDialog}
                    handleClose={handleCloseSearchDialog}
                />
                <CartDialog
                    show={openCartDialog}
                    handleClose={handleCloseCartDialog}
                />
            </div>
        </ThemeProvider>
    )
}

export default StoreMainLayout
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import BottomBar from './BottomBar'
import { useMediaQuery } from 'react-responsive'
import TopBar from './TopBar'
import SearchDialog from './Dialogs/SearchDialog'


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
    }
}));


const StoreMainLayout = () => {
    const classes = useStyles()
    const [openSearchDialog, setOpenSearchDialog] = useState(false)

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const handleCloseSearchDialog = () => {
        setOpenSearchDialog(!openSearchDialog)
    }

    return (
        <div className={classes.root}>
            <TopBar handleCloseSearchDialog={handleCloseSearchDialog} />
            <div className={classes.wrapper}>
                <div className={classes.contentContainer}>
                    <div className={classes.content}>
                        <Outlet />
                    </div>
                </div>
            </div>
            {isTabletOrMobile && <BottomBar handleCloseSearchDialog={handleCloseSearchDialog} />}
            {/* Dialogs */}
            <SearchDialog
                show={openSearchDialog}
                handleClose={handleCloseSearchDialog}
            />
        </div>
    )
}

export default StoreMainLayout
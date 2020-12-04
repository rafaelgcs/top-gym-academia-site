import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Badge, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}))

const BottomBar = (props) => {
    const { handleCloseSearchDialog, handleClickShowCart, handleClickMore, cart, handleChangeCart } = props
    const classes = useStyles()
    const [invisibleCartBadge, setInvisibleCartBadge] = useState(false)


    return (
        <>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    {
                        cart && cart.itens.length > 0 &&
                        <Fab color="green" aria-label="add" className={classes.fabButton} onClick={handleClickShowCart}>
                            <Badge
                                invisible={cart.itens != null ? cart.itens.length == 0 : true}
                                badgeContent={cart.itens != null ? cart.itens.length : 0}
                                color="primary"
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </Fab>
                    }
                    <div className={classes.grow} />
                    <IconButton color="inherit" onClick={handleCloseSearchDialog}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit" onClick={() => { handleClickMore(1) }}>
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

        </>
    )
}

export default BottomBar
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
    AppBar,
    Badge,
    Box,
    Hidden,
    IconButton,
    Toolbar,
    makeStyles,
    Button
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'
import InputIcon from '@material-ui/icons/Input'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { logout, isAuthenticated } from 'services/store/auth'
import Logo from 'modules/shared/components/Logo'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
    root: {
        minHeight: 64,
    },
    avatar: {
        width: 60,
        height: 60
    }
}))

const TopBar = ({
    handleCloseSearchDialog,
    handleClickShowCart,
    className,
    onMobileNavOpen,
    ...rest
}) => {
    const cart = useSelector(state => state.cart)
    const getTotalItens = (itens) => {
        let total = 0

        itens.map((item) => {
            total += item.quantidade
        })

        return total
    }
    const classes = useStyles()
    const [notifications] = useState([])

    const doLogout = () => {
        if (logout()) {
            window.location.href = "/loja"
        }
    }

    return (
        <AppBar
            className={clsx(classes.root, className)}
            elevation={0}
            {...rest}
        >
            <Toolbar>
                <RouterLink to="/loja">
                    <Logo />
                </RouterLink>
                <Box flexGrow={1} />
                <Hidden mdDown>
                    <IconButton color="inherit" onClick={handleCloseSearchDialog}>
                        <SearchIcon />
                    </IconButton>
                    {
                        cart && cart.itens.length > 0 &&
                        <IconButton className="ml-2" color="inherit" onClick={handleClickShowCart}>
                            <Badge
                                invisible={cart.itens != null ? cart.itens.length == 0 : true}
                                badgeContent={cart.itens != null ? getTotalItens(cart.itens) : 0}
                                color="white"
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    }
                    {
                        isAuthenticated() ?
                            <IconButton className="ml-2" onClick={doLogout} color="inherit">
                                <AccountCircleIcon />
                            </IconButton> :
                            <RouterLink to="/loja/login">
                                <Button className="ml-2" color="inherit">
                                    Login
                                </Button>
                            </RouterLink>
                    }
                </Hidden>
                <Hidden lgUp>
                    <IconButton
                        color="inherit"
                        onClick={onMobileNavOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}

TopBar.propTypes = {
    className: PropTypes.string,
    onMobileNavOpen: PropTypes.func
}

export default TopBar

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
    makeStyles
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'
import InputIcon from '@material-ui/icons/Input'
import { logout } from 'services/auth'
import Logo from 'modules/shared/components/Logo'

const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
        width: 60,
        height: 60
    }
}))

const TopBar = ({
    handleCloseSearchDialog,
    className,
    onMobileNavOpen,
    ...rest
}) => {
    const classes = useStyles()
    const [notifications] = useState([])

    const doLogout = () => {
        if (logout()) {
            window.location.href = "/admin/login"
        }
    }

    return (
        <AppBar
            className={clsx(classes.root, className)}
            elevation={0}
            {...rest}
        >
            <Toolbar>
                <RouterLink to="/">
                    <Logo />
                </RouterLink>
                <Box flexGrow={1} />
                <Hidden mdDown>
                    <IconButton color="inherit" onClick={handleCloseSearchDialog}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge
                            badgeContent={1}
                            color="white"
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <IconButton onClick={doLogout} color="inherit">
                        <InputIcon />
                    </IconButton>
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

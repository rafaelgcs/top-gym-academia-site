import React, { useState } from 'react'
import { Navigate } from 'react-router'
import CartDialog from 'modules/store/layouts/MainLayout/components/Dialogs/CartDialog'

const CheckoutCartView = () => {
    const [redirect, setRedirect] = useState(false)
    const goToHome = () => {
        setRedirect(!redirect)
    }
    return (
        redirect ? <Navigate to="/loja" /> :
            <CartDialog show={!redirect} handleClose={goToHome} />
    )
}

export default CheckoutCartView
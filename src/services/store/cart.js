const { getUser } = require("./auth")

const CART_KEY = process.env.REACT_APP_CART_KEY_STORE
// const CART_KEY = process.env.REACT_APP_CART_KEY_STORE


/*
CART
{
    itens: [
        {
            quantidade: 0,
            produto_id: null
        }
    ],
    valor: 0.0,
    status: 0,
    cliente: null,
}

*/
const getCart = () => {
    let cart = localStorage.getItem(CART_KEY)
    if (cart != null && cart != undefined) {
        return JSON.parse(cart)
    } else {
        return null
    }
}

const updateCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
    return true
}

const resetCart = () => {
    localStorage.removeItem(CART_KEY)
    return true
}

const addItemToCart = (produto, quantidade) => {
    let cart = localStorage.getItem(CART_KEY)
    let user = getUser()
    if (cart != null && cart != undefined) {
        cart = JSON.parse(cart)
        let valor = cart.valor
        let itens = cart.itens




        // return JSON.parse(cart)
    } else {
        let valor = 0
        let itens = []


    }
}

// export const cart = (value) => localStorage.setItem(CART_KEY, value);
// export const restartCart = () => localStorage.removeItem(CART_KEY);
// export const getLocalCart = () => localStorage.getItem(CART_KEY);

const verifyItemInCart = (obj) => {
    let cart = getCart()
    let counter = cart.itens.filter(item => item.obj.id == obj.id).length;

    if (counter == 0) {
        return false;
    }

    return true;
}

// const insertItemInCart = async (item) => {

//     let newCart = getCart();

//     let isExist = verifyItemInCart(item);
//     // newCart.status = 1;
//     if (item.estoque.quantidade_disponivel == 0 || item.estoque.quantidade_disponivel == newCart.itemSelected.saidas) {
//         // setMessageSnackBar("O item não está mais em estoque...");
//         // setSnackOpen(true);
//     } else {
//         if (!isExist) {
//             let item = { id: newCart.itemSelected.id, obj: newCart.itemSelected, quantidade: 1, valor: newCart.itemSelected.p_final };
//             newCart.itens.push(item);
//             newCart.valor = calcNewCartValue(newCart).toFixed(2);
//             setCart(newCart);
//         } else {
//             let item = newCart.itens.filter(item => item.obj.id == newCart.itemSelected.id)[0];
//             if (item.quantidade < item.obj.stock) {
//                 item.quantidade += 1;
//                 item.valor = parseFloat(parseFloat(newCart.itemSelected.p_final) + parseFloat(item.valor)).toFixed(2);
//                 newCart.valor = parseFloat(calcNewCartValue(newCart).toFixed(2));
//                 setCart(newCart);
//             } else {
//                 setMessageSnackBar("O item não está mais em estoque...");
//                 setSnackOpen(true);
//             }
//         }
//     }
//     localCart(JSON.stringify(newCart));
//     await sleep(100);
//     setLoadingCartTable(false);
//     setLoadingCartValue(false);
// }


export { getCart, updateCart, resetCart }
import { createAction, createReducer } from '@reduxjs/toolkit'
import { updateCart } from 'services/store/cart'
import { getCart, resetCart } from 'services/store/cart'

const INITIAL_STATE = getCart() != null ? getCart() : {
    itens: [],
    valor: 0.0,
    status: 0,
    cliente: null
}

export const addItem = createAction('ADD_ITEM')
export const restartCart = createAction('RESET_CART')
export const removeItem = createAction('REMOVE_ITEM')

export default createReducer(INITIAL_STATE, {
    [addItem.type]: (state, action) => {

        let indexOfItem = null;
        state.itens.map((item, index) => {
            if (item.produto_id == action.payload.id) {
                indexOfItem = index
            }
        })

        if (indexOfItem != null) {
            state.itens[indexOfItem].quantidade += 1
        } else {
            let nItem = {
                quantidade: 1,
                produto_id: action.payload.id,
                produto: action.payload
            }
            state.itens.push(nItem)
        }

        state.valor = (parseFloat(action.payload.valor_promocional > 0 ? action.payload.valor_promocional : action.payload.valor) + parseFloat(state.valor)).toFixed(2)
        updateCart(state)
    },
    [removeItem.type]: (state, action) => {
        let indexOfItem = null;
        state.itens.map((item, index) => {
            if (item.produto_id == action.payload.id) {
                indexOfItem = index
            }
        })

        if (indexOfItem != null) {
            state.itens[indexOfItem].quantidade -= 1
            if (state.itens[indexOfItem].quantidade == 0) {
                state.itens.splice(indexOfItem, 1)
            }

            let nValue = parseFloat((parseFloat(state.valor) - parseFloat(action.payload.valor_promocional > 0 ? action.payload.valor_promocional : action.payload.valor)).toFixed(2))
            nValue = parseFloat(state.valor) - parseFloat(action.payload.valor_promocional > 0 ? action.payload.valor_promocional : action.payload.valor)
            nValue = parseFloat((parseFloat(state.valor) - parseFloat(action.payload.valor_promocional > 0 ? action.payload.valor_promocional : action.payload.valor)).toFixed(2))
            
            if(nValue <= 0){
                state.valor = 0.0
            }else{
                state.valor = nValue
            }
            if (state.itens.length == 0) {
                resetCart()
                state.itens = []
                state.valor = 0.0
                state.status = 0
                state.cliente = null
            } else {
                updateCart(state)
            }
        }
    },
    [restartCart.type]: (state, action) => {
        resetCart()
        state.itens = []
        state.valor = 0.0
        state.status = 0
        state.cliente = null
    }
})


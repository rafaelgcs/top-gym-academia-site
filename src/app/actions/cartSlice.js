import { createSlice } from '@reduxjs/toolkit'
import { indexOf } from 'lodash';
import { getCart } from 'services/store/cart';

const cartSlice = createSlice({
    name: 'cart',
    initialState: getCart(),
    reducers: {
        reset: state => {
            state = {
                itens: [],
                valor: 0.0,
                status: 0,
                cliente: null
            }
        },
        addItem: (state, action) => {
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
                    produto_id: action.payload.id
                }
                state.itens.push(nItem)
            }

            state.valor += (action.payload.valor_promocional > 0 ? action.payload.valor_promocional : action.payload.valor)
        },
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
})

import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    ADD_BRAND,
    ADD_WOOD
} from '../actions/types';


export default function (state = {}, action) {
    switch (action.type) {//
        case GET_PRODUCTS_BY_SELL:
            return { ...state, bySell: action.payload }
        case GET_PRODUCTS_BY_ARRIVAL:
            return { ...state, byArrival: action.payload }
        case GET_BRANDS:
            return { ...state, brands: action.payload }
        case ADD_BRAND:
            return { ...state, addBrand: action.payload.success, brands: action.payload.brands }
        case GET_WOODS:
            return { ...state, woods: action.payload }
        case ADD_WOOD:
            return { ...state, addWood: action.payload.success, woods: action.payload.woods }
        case GET_PRODUCTS_TO_SHOP: //we will get two things from products_actions
            return {
                ...state,
                toShop: action.payload.articles,
                toShopSize: action.payload.size
            }
        case ADD_PRODUCT:
            return {
                ...state, addProduct: action.payload
            }
        case CLEAR_PRODUCT:
            return {
                ...state, addProduct: action.payload
            }
        default:
            return state;
    }
}
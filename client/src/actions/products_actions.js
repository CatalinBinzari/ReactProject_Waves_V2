import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';


export function getProductsBySell() {
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }

}

export function getProductsByArrival() {
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

export function getProductsToShop(skip, limit, filters = [], previousState = []) {
    const data = { //object with data to submit to server
        limit,
        skip,
        filters
    }
    const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
        .then(response => {//from server we get an object with 2 things inside, size && articles
            let newState = [ //merge what we had with what we want to have from the server, may be empty array
                ...previousState, //empty array or previous 6,12,18...
                ...response.data.articles
            ]

            return {
                size: response.data.size,
                articles: newState
            }
        });
    return { //with redux we have to return smth
        //the reducer will be getting this
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }
}
////////////////////////
//     Categories
////////////////////////

export function getBrands() {
    const request = axios.get(`${PRODUCT_SERVER}/brands`).then(response => response.data);
    console.log('prods')
    return {
        type: GET_BRANDS,
        payload: request
    }
}

export function getWoods() {
    const request = axios.get(`${PRODUCT_SERVER}/woods`).then(response => response.data);
    console.log('woods')
    return {
        type: GET_WOODS,
        payload: request
    }
}
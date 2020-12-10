import axios from './http'

function REGISTER(option) {
    return axios.post('/loading/register', option);
}

function LOGIN(option) {
    return axios.post('/loading/login', option);
}

function UPDATE_USER_INFO(option) {
    return axios.post('/user/modify', option);
}

function GET_SHOP_LIST(option) {
    return axios.post('/commodity/list', option)
}

function GET_SHOP_LIST_BY_KEYWORD(option) {
    return axios.post('/commodity/hotword', option)
}

function GET_USER_INFO(option) {
    return axios.post('/user/search', option);
}

function GET_USER_PASSWORD(option) {
    return axios.post('/user/getpassword', option)
}

function UPDATE_USER_PASSWORD(option) {
    return axios.post('/user/identifypassword', option)
}

function GET_PRODUCT_DETAIL(option) {
    return axios.post('/commodity/detail', option)
}

function GET_SELLER_INFO(option) {
    return axios.post('/commodity/getseller', option)
}

function DEL_PRODUCT(option) {
    return axios.post('/commodity/delcom', option)
}

function GET_PRODUCT_PUBLISH(option) {
    return axios.post('/commodity/getselled', option)
}

function PURCHASE(option) {
    return axios.post('/commodity/purchase', option)
}

function GET_PRODUCT_BY_ID(option) {
    return axios.post('/commodity/gethistory', option)
}

function GET_PURCHASE_TRACE(option) {
    return axios.post('/commodity/getorder', option)
}

function PUBLISH(option) {
    return axios.post('/commodity/publish', option)
}

function GET_ORDER(option) {
    return axios.post('/commodity/sellerorder', option)
}

function ADD_TO_STARLIST(option) {
    return axios.post('/star/add', option)
}

function DEL_FROM_STARLIST(option) {
    return axios.post('/star/delstar', option)
}

function GET_STARLIST(option) {
    return axios.post('/star/getstar', option)
}

function GET_AVATAR(option) {
    return axios.post('/user/getpic', option)
}

export {
    REGISTER,
    LOGIN,
    UPDATE_USER_INFO,
    GET_SHOP_LIST,
    GET_SHOP_LIST_BY_KEYWORD,
    GET_USER_INFO,
    GET_USER_PASSWORD,
    UPDATE_USER_PASSWORD,
    GET_PRODUCT_DETAIL,
    GET_SELLER_INFO,
    DEL_PRODUCT,
    GET_PRODUCT_PUBLISH,
    PURCHASE,
    GET_PRODUCT_BY_ID,
    GET_PURCHASE_TRACE,
    PUBLISH,
    GET_ORDER,
    ADD_TO_STARLIST,
    DEL_FROM_STARLIST,
    GET_STARLIST,
    GET_AVATAR
}
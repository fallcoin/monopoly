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
    return axios.post('/commodity/keyword', option)
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

export {
    REGISTER,
    LOGIN,
    UPDATE_USER_INFO,
    GET_SHOP_LIST,
    GET_SHOP_LIST_BY_KEYWORD,
    GET_USER_INFO,
    GET_USER_PASSWORD,
    UPDATE_USER_PASSWORD
}
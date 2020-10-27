import axios from './http'

function REGISTER(option) {
    return axios.post('/loading/register', option);
}

function LOGIN(option) {
    return axios.post('/loading/login', option);
}

export {
    REGISTER,
    LOGIN
}
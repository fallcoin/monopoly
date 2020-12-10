import { imagePrefix } from '../../config/index'

const state = {
    token: '',
    user_id: '',
    avatar: ''
}

const mutations = {
    SET_TOKEN: (state, param) => {
        state.token = param;
    },
    SET_USER_ID: (state, param) => {
        state.user_id = param;
    },
    SET_AVATAR: (state, param) => {
        state.avatar = imagePrefix + param
    }
}

const actions = {
    SET_TOKEN: ({ commit }, payload) => {
        commit('SET_TOKEN', payload);
    },
    SET_USER_ID: ({ commit }, payload) => {
        commit('SET_USER_ID', payload);
    },
    SET_AVATAR: ({ commit }, payload) => {
        commit('SET_AVATAR', payload)
    }
}

const getters = {
    getToken: (state) => {
        return state.token;
    },
    getUserId: (state) => {
        return state.user_id;
    },
    getAvatar: (state) => {
        return state.avatar
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

const state = {
    token: '',
    user_id: ''
}

const mutations = {
    SET_TOKEN: (state, param) => {
        state.token = param;
    },
    SET_USER_ID: (state, param) => {
        state.user_id = param;
    }
}

const actions = {
    SET_TOKEN: ({ commit }, payload) => {
        commit('SET_TOKEN', payload);
    },
    SET_USER_ID: ({ commit }, payload) => {
        commit('SET_USER_ID', payload);
    }
}

const getters = {
    getToken: (state) => {
        return state.token;
    },
    getUserId: (state) => {
        return state.user_id;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

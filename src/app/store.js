import Vuex from 'vuex';
import storage from 'common/tools/storage-helper'
let store = null;

const state = {
    loading: false,
    token: null
}

const getters = {
    loading: state=>state.loading,
    token: state => state.token
}

const mutations = {
    UPDATE_LOADING (state, payload) {
        state.loading=payload
    },
    UPDATE_TOAST (state, payload) {
        Vue.modal.toast({ 'message': payload, 'duration': 1 })
    },
    UPDATE_TOKEN (state, token) {
        state.token = token
    }
}

const actions = {

    AC_GetToken({dispatch, commit}, params) {
        return dispatch('AC_GetTokenFromMemory').then(token => {
            return token?token:dispatch('AC_GetTokenFromStorage')
        })
    },
    AC_GetTokenFromMemory({dispatch, commit, state}, params) {
        return  state.token
    },

    AC_GetTokenFromStorage({dispatch, commit, state}, params) {
        return storage.getItem('token').then(token => {
            commit('UPDATE_TOKEN', token)
            return token
        })
    },

    AC_GetTokenFromNetwork({dispatch, commit, state}, params) {
        return Vue.http.post('service/commserver/AuthService/loginIn', params).then(response => {
            return storage.setItem('token', response.HTTP_ACCESS_TOKEN)
        }).then(token => {
            commit('UPDATE_TOKEN', token)
            return token 
        })
    },
}


export default function Store(Vue){
  if (!store){
    Vue.use(Vuex);
    store = new Vuex.Store({
        state,
        getters,
        mutations,
        actions
    })
  }
  return {
    store
  };
};

import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || ''
  },
  mutations: {
    auth(state, token) {
      state.token = token;
    },
    authemail(state, email) {
      state.email = email;
    },
    logout(state) {
        state.token = '';
        localStorage.clear('token');
        router.push('login')
    }
  },
  actions: {
    async register({ commit }, registerData) {
      let token = (await axios.post("http://localhost:5000/api/users/register", registerData)).data;
      localStorage.setItem("token", token)
      axios.defaults.headers.common['Authorization'] = token;
      commit("logout", token);
    },
    async login({ commit }, loginData) {
        let token = (await axios.post("http://localhost:5000/api/users/login", loginData)).data;
        localStorage.setItem("token", token)
        localStorage.setItem("email", loginData.email)
        axios.defaults.headers.common['Authorization'] = token;
        commit("auth", token);
        commit("authemail", loginData.email);
    },
    async save({ commit }, saveData) {
      let token = (await axios.post("http://localhost:5000/api/users/save", saveData)).data;
      localStorage.setItem("token", token)
      axios.defaults.headers.common['Authorization'] = token;
      commit("auth", token);
    },
    async delete({ commit }, deleteData) {
      let token = (await axios.post(`http://localhost:5000/api/users/deleteCity/${deleteData.name}`, deleteData)).data;
      localStorage.setItem("token", token)
      axios.defaults.headers.common['Authorization'] = token;
      commit("auth", token);
    }
  },
  modules: {
  }
})

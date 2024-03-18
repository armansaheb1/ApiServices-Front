import { createStore } from 'vuex'

export default createStore({
  state: {
    side: false,
    language: false,
    loginPopUp: false,
    sidebarVisible: '',
    sidebarUnfoldable: true,
    theme: 'light',
  },
  getters: {
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    initializeStore (state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
      if (localStorage.getItem('admin')) {
        state.Admin = localStorage.getItem('admin')
        state.isAdmin = true
      } else {
        state.Admin = ''
        state.isAdmin = false
      }
    },
    setToken (state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken (state) {
      state.token = ''
      state.isAuthenticated = false
    },
  },
  actions: {
  },
  modules: {
  }
})

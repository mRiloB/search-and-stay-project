import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  persist: true,
  state: () => ({
    isAuthenticated: false,
    token: ''
  }),
  getters: {},
  actions: {
    login () {
      this.isAuthenticated = true
      this.token = '40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8'
    }
  },
});

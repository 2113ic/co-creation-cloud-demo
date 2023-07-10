import { defineStore } from 'pinia'

export const useServiceListInfoStore = defineStore('serviceListInfo', {
  state: () => ({
    list: [],
    total: 0
  }),
  actions: {},
})

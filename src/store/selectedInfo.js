import { defineStore } from 'pinia'

export const useSelectedInfoStore = defineStore('selectedInfo', {
  state: () => ({
    info: {
      pageNum: 1,
      pageSize: 10,
      keywords: '',
      serviceTypeId: '',
      serviceTypeId2: '',
      technicalId: '',
      dataOrigin: '',
      province: '',
      logicStatus: 1,
    },
  }),
  actions: {},
})

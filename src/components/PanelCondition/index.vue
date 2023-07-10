<script setup>
import ConditionItem from './ConditionItem.vue'

import { ref, onMounted, provide } from 'vue'
import { useSelectedInfoStore } from '@/store/selectedInfo'
import { useServiceListInfoStore } from '@/store/serviceListInfo'
import { getTechnicalList, getServiceType, getServiceList } from '@/api/search'

import dataOrigin from '@/assets/data/dataOrigin'
import province from '@/assets/data/province'

const noLimit = [
  {
    id: '',
    name: '不限',
    children: [],
  },
]
const flag = 'selected'
const serviceTypeList = ref(null)
const technicalList = ref(null)
let info = useSelectedInfoStore().info
const serviceListInfo = useServiceListInfoStore()
const secondMenuList = ref([])

onMounted(async () => {
  const serviceTypes = (await getServiceType()).data
  const technicals = (await getTechnicalList()).data.list

  serviceTypeList.value = noLimit.concat(serviceTypes)
  technicalList.value = noLimit.concat(technicals)
})

provide('handleServiceType', handle)

async function handle(evt, item, title) {
  const target = evt.target
  const loadingMask = document.querySelector('.loading-mask')
  const id = item.id === undefined ? item.value : item.id
  const updatedInfo = {
    serviceTypeId: title === '服务类型' ? id : info.serviceTypeId,
    serviceTypeId2: title === '二级菜单' ? id : info.serviceTypeId2,
    technicalId: title === '技术领域' ? id : info.technicalId,
    dataOrigin: title === '数据来源' ? id : info.dataOrigin,
    province: title === '地区' ? id : info.province,
  }

  loadingMask.classList.add('show')
  if (updatedInfo.serviceTypeId && updatedInfo.serviceTypeId2) {
    item.children = null
  }

  info = { ...updatedInfo }
  const result = (await getServiceList({ ...info })).data

  serviceListInfo.list = result.list
  serviceListInfo.total = result.total
  item.children && (secondMenuList.value = noLimit.concat(item.children))
  ;[...target.parentNode.children].findIndex((el) => {
    if (el.classList.contains(flag)) {
      el.classList.remove(flag)
    }
  })
  target.classList.add(flag)
  loadingMask.classList.remove('show')
}
</script>

<template>
  <div class="panel-condition">
    <ConditionItem
      title="服务类型"
      :list="serviceTypeList"
      :secondList="secondMenuList"
      @updateServiceType="handle"
    ></ConditionItem>
    <ConditionItem
      title="技术领域"
      :list="technicalList"
      @updateServiceType="handle"
    ></ConditionItem>
    <ConditionItem
      title="数据来源"
      :list="dataOrigin"
      @updateServiceType="handle"
    ></ConditionItem>
    <ConditionItem
      title="地区"
      :list="province"
      @updateServiceType="handle"
    ></ConditionItem>
  </div>
</template>

<style lang="scss">
.panel-condition {
  padding: 0 20px;
  margin-bottom: 30px;
  background: #fff;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
}
</style>

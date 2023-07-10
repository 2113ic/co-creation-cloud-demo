<script setup>
import TheHeader from '@/components/TheHeader/index.vue'
import PanelCondition from '@/components/PanelCondition/index.vue'
import TheService from '@resource/TheService.vue'
import TheRequire from '@resource/TheRequire.vue'
import TheInnovation from '@resource/TheInnovation.vue'
import { Search, Loading } from '@element-plus/icons-vue'

import { ref, watch, onMounted } from 'vue'
import { getServiceList } from '@/api/search'
import { useSelectedInfoStore } from '@/store/selectedInfo'
import { useServiceListInfoStore } from '@/store/serviceListInfo'

const props = defineProps(['tab'])
const tabItemRefs = ref()
const selectedInfo = useSelectedInfoStore().info
const serviceListInfo = useServiceListInfoStore()

const tabs = [
  { title: '服务', url: '/resource-search?tab=1' },
  { title: '需求', url: '/resource-search?tab=2' },
  { title: '科创资源', url: '/resource-search?tab=3' },
]

onMounted(async () => {
  const loadingMask = document.querySelector('.loading-mask')
  const setActiveTab = (newTab, oldTab) => {
    const tabItems = tabItemRefs.value

    tabItems[+newTab - 1].$el.classList.add('active')
    oldTab && tabItems[+oldTab - 1].$el.classList.remove('active')
  }

  loadingMask.classList.add('show')
  watch(() => props.tab, setActiveTab, {
    immediate: true,
  })

  const { list, total } = (await getServiceList({ ...selectedInfo })).data

  serviceListInfo.list = list
  serviceListInfo.total = total
  loadingMask.classList.remove('show')
})

async function getServiceListBycurPage(curPage) {
  const loadingMask = document.querySelector('.loading-mask')

  loadingMask.classList.add('show')
  const { list, total } = (
    await getServiceList({
      ...selectedInfo,
      pageNum: curPage,
    })
  ).data

  serviceListInfo.list = list
  serviceListInfo.total = total
  serviceListInfo.pageNum = curPage
  loadingMask.classList.remove('show')
}
</script>

<template>
  <TheHeader></TheHeader>

  <div class="resource-search">
    <el-card class="box-card page-w">
      <template #header>
        <div class="panel-header">
          <div class="title-box">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAABHNCSVQICAgIfAhkiAAAAUhJREFUOE/tlL9Kw1AYxc9JCyIodLKLID5Bi6MI/kFdipgOtmP7JtY3SUd1aKR1UdEO4ijtE4jgUqeCgghJjyRaiMQ0qVJcmuly8/vOuTn3y0ckeMyGMjPpQUVE1cMpWO+OUbeL7MeVcxRQasoE3ApJ8ydOkk0jZR0XeBalEzI4OFeeGlQgVElk4k7ovZfQB2GJRv20wE6wxjcIRkAgn0Q0ihHQCUbIcsuxAe7/RTTSzIuw3HI1CfGhZugOSk23RuLwK9ujk71UzVuPux8yuO4pR8C8un8rPvWcnN+OjvvIgR58M4PLSqeWRu0vZtPd7ZXZhgB7K8uuzw6dbp7ldY51cfuCy7vXX6W2szqH3bV5T7W6ucD61CAU4zSi2M7634gm/qMNv3/ckRDFfxsVQSg26ISABH+O8VNc6wA3EtYmxNQW2Z74uP4A+kAQbn8IYmUAAAAASUVORK5CYII="
              style="margin-right: 16px"
              alt="icon"
            />
            <span>资源大厅</span>
          </div>
          <div class="search-box">
            <el-input
              v-model="selectedInfo.keywords"
              placeholder="请输入资源名称或用户名搜索"
            >
              <template #append>
                <el-button
                  type="primary"
                  :icon="Search"
                  @click="getServiceListBycurPage(1)"
                >
                  搜索
                </el-button>
              </template>
            </el-input>
          </div>
        </div>
      </template>
      <div class="panel-tabs">
        <RouterLink
          class="tab-item"
          v-for="tab of tabs"
          :key="tab.title"
          :to="tab.url"
          ref="tabItemRefs"
        >
          {{ tab.title }}
        </RouterLink>
      </div>

      <div class="panel-main">
        <PanelCondition></PanelCondition>

        <!-- 这里不使用 ===，原因是让 props.tab 隐式转为 number 类型 -->
        <TheService
          v-if="props.tab == 1"
          :data="serviceListInfo.list"
        ></TheService>
        <TheRequire v-else-if="props.tab == 2"></TheRequire>
        <TheInnovation v-else></TheInnovation>

        <div class="loading-mask">
          <el-icon class="is-loading">
            <Loading />
          </el-icon>
        </div>
      </div>
      <el-pagination
        class="pagination"
        layout="prev, pager, next, jumper"
        :page-size="selectedInfo.pageSize"
        :total="serviceListInfo.total"
        @current-change="getServiceListBycurPage"
        hide-on-single-page
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<style lang="scss">
.resource-search {
  padding: 30px 0;

  // Override element-plus el-card padding size and box-shadow.
  .el-card {
    --el-card-padding: 30px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.06);
  }

  .el-card__header {
    border: none;
  }

  .el-card__body {
    padding-top: 0;
  }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;

  .title-box {
    display: flex;
    align-items: center;
    height: 22px;

    span {
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
      color: #303133;
    }
  }

  .search-box {
    width: 540px;
    height: 100%;

    .el-input-group {
      height: inherit;
    }

    .el-input-group__append {
      padding: 0 24px;
      color: white;
      background-color: var(--el-color-primary);
      box-shadow: none;
    }
  }
}

.panel-main {
  position: relative;

  .loading-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2000;

    display: none;
    margin: 0;
    opacity: 0;
    background-color: hsla(0, 0%, 100%, 0.9);
    transition: opacity 0.3s;

    &.show {
      display: block;
      opacity: 1;
    }

    .is-loading {
      position: absolute;
      top: 50%;
      width: 100%;
      margin-top: -21px;
      text-align: center;
    }
  }
}

.panel-tabs {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 30px;
  margin-bottom: 10px;
  background: #f7f8f9;
  border-radius: 4px;

  .tab-item {
    position: relative;
    padding: 14px 6px;
    margin-right: 120px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 8px;
      width: 0;
      height: 2px;
      background-color: var(--el-color-primary);
      border-radius: 2px;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }

    &.active,
    &:hover {
      color: var(--el-color-primary);
    }
  }
}

.pagination {
  justify-content: center;
  margin-top: 32px;
}
</style>

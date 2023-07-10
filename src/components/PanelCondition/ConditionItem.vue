<script setup>
import ConditionItem from './ConditionItem.vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { ref, toRefs, inject } from 'vue'
import { useSelectedInfoStore }    from '@/store/selectedInfo'

const detailsRef = ref()
const isPackUp = ref(true)
let info = useSelectedInfoStore().info
const emits = defineEmits(['updateServiceType'])
const handleServiceType = inject('handleServiceType')
const props = defineProps({
  title: String,
  list: Array,
  secondList: Array,
})
const { title, list, secondList } = toRefs(props)

function toggleShow() {
  isPackUp.value = !detailsRef.value.classList.toggle('height-auto')
}
</script>

<template>
  <div class="condition-item">
    <div class="condition-title">{{ title }}</div>
    <div class="condition-content" ref="detailsRef">
      <div
        class="condition-tag"
        v-for="item of list"
        :key="item.id"
        :class="{ selected: !item.label && !item.id }"
        @click="emits('updateServiceType', $event, item, title)"
      >
        {{ item.name || item.label }}
      </div>
    </div>

    <!-- prettier-ignore -->
    <div class="condition-opt" @click="toggleShow">
      <div class="condition-down" v-show="isPackUp">
        更多 <el-icon><ArrowDown /></el-icon>
      </div>
      <div class="condition-up" v-show="!isPackUp">
        收起 <el-icon><ArrowUp /></el-icon>
      </div>
    </div>
  </div>
  <ConditionItem
    v-if="secondList && secondList.length > 1"
    title="二级菜单"
    :list="secondList"
    @update-service-type="handleServiceType"
  ></ConditionItem>
</template>

<style lang="scss">
.height-auto {
  height: auto !important;
}

.condition-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border-top: 1px dashed var(--el-border-color-lighter);
  overflow: hidden;

  &:first-of-type {
    border: none;
  }

  .condition-title {
    align-self: flex-start;
    min-width: 120px;
    line-height: 30px;
    padding-left: 10px;
    margin-top: 10px;
    color: var(--el-color-info);
    font-size: 14px;
  }

  .condition-opt {
    align-self: flex-start;
    min-width: 48px;
    height: 30px;
    margin-top: 10px;
    color: var(--el-color-primary);
    cursor: pointer;
  }

  .condition-down,
  .condition-up {
    height: 100%;
    line-height: 30px;
    cursor: pointer;

    .el-icon {
      vertical-align: -10%;
    }
  }
}

.condition-content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  height: 40px;

  .condition-tag {
    line-height: 20px;
    padding: 5px 10px;
    margin-right: 10px;
    margin-top: 10px;
    border-radius: 2px;
    cursor: pointer;

    &.selected {
      color: #fff;
      background-color: var(--el-color-primary);
    }
  }
}
</style>

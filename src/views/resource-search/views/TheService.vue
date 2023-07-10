<script setup>
const props = defineProps({
  data: Array,
})
</script>

<template>
  <div class="result-box">
    <div class="result_header">
      <div class="result_header_item" style="flex: 420px">服务名称</div>
      <div class="result_header_item" style="flex: 440px; padding-left: 80px">
        发布用户
      </div>
      <div class="result_header_item" style="flex: 300px">服务类型</div>
      <div class="result_header_item" style="flex: 200px">成功成交数</div>
      <div class="result_header_item" style="flex: 180px">信用评价</div>
    </div>
    <div class="result_body">
      <div
        class="result_body_item"
        v-if="data.length > 0"
        v-for="item of data"
        :key="item.id"
      >
        <div class="item_col font-bold" style="flex: 1 1 420px">
          <p class="title line-clamp-2" :title="item.title">{{ item.title }}</p>
          <el-tag class="top-tag" type="danger" v-if="item.istopAt">
            精选
          </el-tag>
        </div>
        <div class="item_col font-bold" style="flex: 1 1 440px">
          <img
            class="avatar"
            :src="item.avatarUrl || '/images/default_avatar.png'"
            alt="avatar"
          />
          <p class="org_name">{{ item.orgName }}</p>
        </div>
        <div class="item_col" style="flex: 1 1 300px">
          <p>{{ item.serviceTypeName }}</p>
        </div>
        <div class="item_col font-bold warning" style="flex: 1 1 200px">
          <p>{{ item.totalDeal }}</p>
        </div>
        <div class="item_col font-bold primary" style="flex: 1 1 180px">
          <p>{{ item.avgScore }}</p>
        </div>
      </div>
      <div v-else class="empty-box">这里空空如也</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.font-bold {
  font-size: 16px;
  font-weight: 600;
}

.top-tag {
  margin: 12px;
}

.warning {
  color: var(--el-color-warning);
}

.primary {
  color: var(--el-color-primary);
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.empty-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  font-size: 18px;
  color: var(--el-text-color-secondary);
}

.result_header {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 600;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;

  .result_header_item {
    height: 100%;
    line-height: 48px;
    padding: 0 20px;
    color: var(--el-text-color-secondary);
  }
}

.result_body {
  margin-top: 10px;

  .result_body_item {
    position: relative;
    display: flex;
    height: 80px;
    padding: 0 20px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid var(--el-border-color-lighter);
    cursor: pointer;

    &:hover {
      border-color: var(--el-color-primary);

      .title,
      .org_name {
        color: var(--el-color-primary);
      }
    }

    .item_col {
      display: flex;
      align-items: center;
      padding-left: 16px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 20px;
      border-radius: 2px;
    }
  }
}
</style>

<script setup>
import Logo from './Logo.vue'

const navList = [
  { title: '服务产品', url: '/resource-search?tab=1' },
  { title: '科创需求', url: '/resource-search?tab=2' },
  { title: '专利论文', url: '/resource-search?tab=3' },
  { title: '交易大数据', url: '/data' },
]
</script>

<template>
  <div class="layout-header">
    <div class="page-w layout-header-main">
      <div class="left-box">
        <Logo></Logo>
        <div class="mid_nav">
          <RouterLink
            class="nav-link"
            v-for="navItem of navList"
            :key="navItem.title"
            :to="navItem.url"
          >
            {{ navItem.title }}
          </RouterLink>
        </div>
      </div>
      <div class="right-login-box">
        <RouterLink to="/login" class="login-btn">
          <el-button type="primary" to="/login">登录</el-button>
        </RouterLink>
        <el-button plain>注册</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-header {
  height: 50px;
  background-color: white;
}

.layout-header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.left-box {
  display: flex;
  align-items: center;

  .nav-link {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #606266;
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary-light-3);
    }
  }

  .nav-link + .nav-link {
    margin-left: 24px;
  }
}

.login-btn {
  margin-right: 12px;
}
</style>

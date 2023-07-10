<template>
  <a href="/" class="logo-box">
    <img src="/logo.png" alt="共创云 logo" />
    <h1>共创云</h1>
  </a>
</template>

<style lang="scss" scoped>
.logo-box {
  display: flex;
  align-items: center;
  margin-right: 50px;

  img {
    width: 30px;
    height: 30px;
    -o-object-fit: cover;
    object-fit: cover;
    margin-right: 10px;
  }

  h1 {
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    color: var(--el-color-primary);
  }
}
</style>

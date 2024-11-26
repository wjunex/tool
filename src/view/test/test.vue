<template>
  <div class="container">
    <div class="w-item">
      <div class="left">测试</div>
      <div class="center">
        <div class="item" v-for="(item, index) in [1, 2, 3]" :key="index">
          <div>测试</div>
          <div>测试</div>
        </div>
      </div>
      <div class="right">测试</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    padding: 12px;
    color: #f5f5f5;
    font-size: 14px;
  }

  .w-item {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 12px;
    background: #bfbfbf;

    .left,
    .right {
      background: #8c8c8c;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
    }

    .center {
      flex: 1;
      padding: 0 12px;
      background: #595959;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        background: #444444;
        margin-bottom: 8px; // 添加间距以分隔每个item
        border-radius: 4px; // 圆角效果提升外观
      }
    }
  }
</style>

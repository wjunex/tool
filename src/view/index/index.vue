<template>
  <div id="app">
    <header>
      <h1>欢迎来到本站</h1>
    </header>
    <main>
      <section>
        <h2>网站说明</h2>
        <p>本站正在建设中，将会用于技术分享。</p>
      </section>
      <section>
        <h3>联系方式</h3>
        <p>电子邮件：wjun@88.com</p>
      </section>
    </main>
    <footer>
      <p>
        © 2024 昔我往矣 杨柳依依 |
        <span class="button" @click="openUrl('https://beian.miit.gov.cn/')"
          >黔ICP备2024042286号</span
        >
      </p>
    </footer>
  </div>
</template>

<script setup>
  const openUrl = (url) => {
    window.open(url);
  };
</script>

<style scoped lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }

  header {
    background-color: #2c3e50;
    color: #fff;
    text-align: center;
    padding: 20px;
  }

  main {
    padding: 20px;
  }

  footer {
    background-color: #2c3e50;
    color: #fff;
    text-align: center;
    padding: 10px;
    position: fixed;
    width: 100%;
    bottom: 0;
  }

  .button {
    cursor: pointer;
    &:active {
      opacity: 0.7;
    }
  }
</style>

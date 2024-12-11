<template>
  <div id="app">
    <header>
      <h1>欢迎来到我的网站</h1>
    </header>
    <main>
      <section>
        <h2>备案说明</h2>
        <p>本网站正在进行备案，备案号将在完成后添加。</p>
      </section>
      <section>
        <h3>联系方式</h3>
        <p>电子邮件：wjun@88.com</p>
      </section>
    </main>
    <footer>
      <p>© 2024 我的个人网站 | 备案号：xxxxxx</p>
    </footer>
  </div>
</template>

<script></script>

<style scoped>
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

  h1,
  h2,
  h3 {
    /* color: #333; */
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
</style>

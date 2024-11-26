import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router";

// 引入组件库的少量全局样式变量
import "tdesign-vue-next/es/style/index.css";

const app = createApp(App);
app.use(router);

app.mount("#app");

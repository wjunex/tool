<template>
  <div class="container">
    <div class="log">
      <p @click="logs = []">收发记录</p>
      <span v-for="item in logs">
        <span style="padding-right: 8px; color: #333">{{ item.time }}</span>
        <span style="padding-right: 8px; color: #333">{{
          typeMap.get(item.type)
        }}</span>
        <div style="word-break: break-all; white-space: pre-wrap">
          {{ item.data }}
        </div>
      </span>
    </div>
    <div>
      <div class="work">
        <t-input
          v-model="config.url"
          clearable
          placeholder="请输入需要嵌入的页面"
        />
        <t-textarea
          v-model="config.message"
          clearable
          placeholder="请输入需要发送的参数（对象为JSON格式）"
          :autosize="{ minRows: 3, maxRows: 3 }"
          style="margin: 12px 0"
        />
        <div class="flex align-center justify-between">
          <t-button @click="sendMessage">发送</t-button>

          <t-select
            style="width: 200px"
            v-model="config.iframeWidth"
            @change="reload"
          >
            <t-option key="1" label="PC视图" value="100%" />
            <t-option key="2" label="H5视图" value="600px" />
          </t-select>
        </div>
      </div>
      <div class="iframe">
        <iframe
          :src="config.url"
          id="iframe"
          :style="`width: ${config.iframeWidth}; height: 100%;border:none`"
          @load="sendMessage"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { MessagePlugin } from "tdesign-vue-next";
  import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
  import dayjs from "dayjs";

  const typeMap = new Map([
    ["send", "已向嵌套网站发送消息："],
    ["recive", "接收到嵌套网站消息："],
  ]);

  const config = ref({
    url: "",
    message: "",
    iframeWidth: "100%",
  });

  watch(
    config,
    (config) => {
      localStorage.setItem("iframeConfig", JSON.stringify(config));
    },
    { deep: true }
  );

  const sendMessage = () => {
    let params = config.value.message;
    if (!params) return;
    const iframe = document.getElementById("iframe");
    try {
      params = JSON.parse(params);
      iframe?.contentWindow.postMessage(params, "*");
      setLogs("send", config.value.message);
    } catch (error) {
      console.log(error);
      MessagePlugin.error("JSON解析失败，请输入正确的JSON格式！");
    }
  };

  const reload = () => {
    let tempUrl = config.value.url;
    config.value.url = "";
    nextTick(() => {
      config.value.url = tempUrl;
    });
  };

  const logs = ref([]);

  const setLogs = (type, data) => {
    const log = {
      type,
      data,
      time: dayjs().format("HH:mm:ss"),
    };
    logs.value.unshift(log);
  };

  window.addEventListener("message", (event) => {
    if (!config.value.url?.startsWith(event.origin)) return;
    setLogs("recive", JSON.stringify(event.data));
  });

  onMounted(() => {
    const configCache = localStorage.getItem("iframeConfig");
    if (configCache) {
      config.value = JSON.parse(configCache);
    }
  });
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: stretch;

    .work {
      width: 85vw;
      height: 20vh;
      border-left: 1px solid #ddd;
      padding: 12px;
      box-sizing: border-box;
    }

    .iframe {
      background-color: #fff;
      width: 85vw;
      height: 80vh;
      // border: 1px solid #ddd;
    }

    .log {
      flex: 1;
      padding: 12px;
      box-sizing: border-box;
      font-size: 14px;
      overflow-y: auto;
    }
  }
</style>

<template>
  <div class="container">
    <div class="log" :style="`width: ${logWidth};`">
      <div style="padding: 12px">
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
    </div>
    <div style="display: flex; flex-direction: column; flex: 1">
      <div class="work" :class="{ hidden: config.menuVisible }">
        <div style="padding: 12px 12px 4px 12px">
          <div style="display: flex; align-items: center">
            <t-input
              v-model="config.url"
              clearable
              placeholder="请输入需要嵌入的页面"
            />
            <icon-font
              name="setting-1"
              @click="config.settingVisible = true"
              class="setting-btn"
            />
          </div>
          <div style="display: flex; align-items: center">
            <t-textarea
              v-model="config.message"
              clearable
              placeholder="请输入需要发送的参数（对象为JSON格式）"
              :autosize="{ minRows: 1, maxRows: 3 }"
              style="margin: 12px 0"
            />
            <div class="flex align-center justify-between">
              <t-button @click="sendMessage" style="margin: 0 12px"
                >发送</t-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="iframe">
        <div
          v-if="config.menuVisible"
          class="setting-btn-fixed"
          @click="config.settingVisible = true"
        >
          <icon-font name="setting-1" />
        </div>
        <iframe
          :src="config.url"
          id="iframe"
          :style="`width: ${config.iframeWidth}; height: 100%;border:none`"
          @load="sendMessage"
        ></iframe>
      </div>
    </div>
  </div>

  <t-drawer
    v-model:visible="config.settingVisible"
    header="设置"
    :close-btn="true"
    :footer="false"
  >
    <t-form>
      <t-form-item label="视图模式">
        <t-select v-model="config.iframeWidth" @change="reload">
          <t-option key="1" label="PC视图" value="100%" />
          <t-option key="2" label="H5视图" value="600px" />
        </t-select>
      </t-form-item>
      <t-form-item label="收发记录">
        <t-switch v-model="config.logVisible"></t-switch>
      </t-form-item>
      <t-form-item label="全屏模式">
        <t-switch v-model="config.menuVisible"></t-switch>
      </t-form-item>
    </t-form>
  </t-drawer>
</template>

<script setup>
  import { MessagePlugin } from "tdesign-vue-next";
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
  import dayjs from "dayjs";
  import { IconFont } from "tdesign-icons-vue-next";

  const typeMap = new Map([
    ["send", "已向嵌套网站发送消息："],
    ["recive", "接收到嵌套网站消息："],
  ]);

  const logWidth = computed(() => {
    return config.value.logVisible ? "200px" : "0px";
  });

  const config = ref({
    url: "",
    message: "",
    iframeWidth: "100%",
    logVisible: false,
    settingVisible: false,
    menuVisible: true,
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
      width: 100%;
      border-left: 1px solid #ddd;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      transition: all 0.3s;
    }

    .hidden {
      height: 0;
    }

    .iframe {
      background-color: #fff;
      width: 100%;
      flex: 1;
      // border: 1px solid #ddd;
    }

    .log {
      box-sizing: border-box;
      font-size: 14px;
      overflow-x: hidden;
      overflow-y: auto;
      transition: all 0.3s;
    }

    .setting-btn {
      margin: 0 12px;
      color: #999;

      &-fixed {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        background: #fff;
        border-radius: 50%;
        position: fixed;
        font-size: 20px;
        user-select: none;
        cursor: pointer;
        right: 26px;
        bottom: 140px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2),
          0px 1px 3px rgba(0, 0, 0, 0.1); /* 阴影 */
        transition: box-shadow 0.3s ease-in-out;
        &:hover {
          box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3),
            0px 2px 6px rgba(0, 0, 0, 0.15); /* 鼠标悬停时的阴影 */
        }
      }
    }
  }
</style>

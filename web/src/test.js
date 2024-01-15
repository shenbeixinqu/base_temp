import Vue from "vue";
import axios from "axios";
import router from "@/router";
import qs from "qs";
import {
  baseURL,
  contentType,
  debounce,
  requestTimeout,
  statusName,
  successCode,
} from "@/config";
import { isArray } from "@/utils/validate";

let loadingInstance;

//操作正常Code数组
const codeVerificationArray = isArray(successCode)
  ? [...successCode]
  : [...[successCode]];
/**
 * axios 请求拦截器配置
 */

const requestConf = (config) => {
  if (
    config.data &&
    config.header["ontent-Type"] ==
      "application/x-www-form-urlencoded;charset=UTF-8"
  ) {
    config.data = qs.stringify(config.data);
  }
  if (debounce.some((item) => config.url.includes(item))) {
    loadingInstance = Vue.prototype.$baseLoading();
  }
  return config;
};

/**
 * @description 响应拦截器
 * @param config 请求配置
 * @param data  response 数据
 * @param status Http status
 * @param statusText HTTP status text
 */
const handleData = async ({ config, data, status, statusText }) => {
  console.log("config", config, "statusText", statusText);
  if (loadingInstance) loadingInstance.close();
  // 若data.code存在 覆盖默认code
  let code = data && data[statusName] ? data[statusName] : status;
  if (codeVerificationArray.indexOf(data[statusName]) + 1) code = 200;
  switch (code) {
    case 200:
      return data;
    case 403:
      router.push({ path: "/403" }).then(() => {});
      break;
  }
};

/**
 * @description axios初始化
 */

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  header: {
    "Content-Type": contentType,
  },
});

/**
 * @description axios请求拦截器
 */

instance.interceptors.request.use(requestConf, (error) => {
  return Promise.reject(error);
});

/**
 * @description axios 响应拦截器
 */
instance.interceptors.response.use(
  (response) => handleData(response),
  (error) => {
    const { response } = error;
    return handleData(response);
    // if (response === undefined) {
    //   Vue.prototype.$baseMessage(
    //     "未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起",
    //     "error",
    //     "vab-hey-message-error"
    //   );
    //   return {};
    // } else return handleData(response);
  }
);

export default instance;

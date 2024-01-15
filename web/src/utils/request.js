import Vue from "vue";
import axios from "axios";
import {
  baseURL,
  contentType,
  requestTimeout,
  statusName,
  successCode,
  messageName,
} from "@/config";
import store from "@/store";
import qs from "qs";
import router from "@/router";
import { isArray } from "@/utils/validate";
import { debounce } from "../config/setting.config";

let loadingInstance;

// 操作正常Code数组
const codeVerificationArray = isArray(successCode)
  ? [...successCode]
  : [...[successCode]];

const CODE_MESSAGE = {
  200: "服务器成功返回请求数据",
  201: "新建或修改数据成功",
  202: "一个请求已经进入后台排队(异步任务)",
  204: "删除数据成功",
  400: "发出信息有误",
  401: "用户没有权限(令牌失效、用户名、密码错误、登录过期)",
  402: "令牌过期",
  403: "用户得到授权，但是访问是被禁止的",
  404: "访问资源不存在",
  406: "请求格式不可得",
  410: "请求资源被永久删除，且不会被看到",
  500: "服务器发生错误",
  502: "网关错误",
  503: "服务不可用，服务器暂时过载或维护",
  504: "网关超时",
};

/**
 * axios 请求拦截器配置
 * @param config
 * @returns {any}
 */
const requestConf = (config) => {
  const token = store.getters["user/token"];

  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  if (
    config.data &&
    config.headers["Content-Type"] ===
      "application/x-www-form-urlencoded;charset=UTF-8"
  )
    config.data = qs.stringify(config.data);
  if (debounce.some((item) => config.url.includes(item)))
    loadingInstance = Vue.prototype.$baseLoading();
  return config;
};

/**
 * axios 响应拦截器
 * @param config 请求配置
 * @param data response数据
 * @param status HTTP status
 * @param statusText Http status text
 * @return {Promise}
 */
const handleData = async ({ config, data, status, statusText }) => {
  if (loadingInstance) loadingInstance.close();
  //如果data.code存在 覆盖默认code
  let code = data && data[statusName] ? data[statusName] : status;
  // 如果code正常 status修改为200
  if (codeVerificationArray.indexOf(data[statusName]) + 1) code = 200;
  switch (code) {
    case 200:
      return data;
    case 403:
      router.push({ path: "/403" }).then(() => {});
      break;
  }
  // todo
  const errMsg = `${config.url} 后端接口 ${code} 异常：${
    data && data[messageName]
      ? data[messageName]
      : CODE_MESSAGE[code]
      ? CODE_MESSAGE[code]
      : statusText
  }`;
  this.$message({
    type: "error",
    msg: errMsg,
  });
};

/**
 * @description axios 初始化
 */

const instance = axios.create({
  baseURL: baseURL,
  // baseURL: "http://10.1.1.181:6789",
  timeout: requestTimeout,
  headers: {
    "Content-Type": contentType,
  },
});

/**
 * @description axios 请求拦截器
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
    if (response === undefined) {
      this.$message({
        type: "error",
        message: "未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起",
      });
      return {};
    } else return handleData(response);
  }
);

export default instance;

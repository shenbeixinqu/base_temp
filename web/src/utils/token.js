import { storage, tokenTableName } from "@/config";
import cookie from "js-cookie";

/**
 * @description 获取token
 */

export function getToken() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.getItem(tokenTableName);
    } else if ("sessionStorage" === storage) {
      return sessionStorage.getItem(tokenTableName);
    } else if ("cookie" === storage) {
      return cookie.get(tokenTableName);
    } else {
      return localStorage.getItem(tokenTableName);
    }
  } else {
    return localStorage.getItem(tokenTableName);
  }
}

/**
 * @description 存储token
 */

export function setToken(token) {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.setItem(tokenTableName, token);
    } else if ("sessionStorage" === storage) {
      return sessionStorage.setItem(tokenTableName, token);
    } else if ("cookie" === storage) {
      return cookie.set(tokenTableName, token);
    } else {
      return localStorage.setItem(tokenTableName, token);
    }
  } else {
    return localStorage.setItem(tokenTableName, token);
  }
}

/**
 * @description 移除token
 */

export function removeToken() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem(tokenTableName);
    } else if ("sessionStorage" === storage) {
      return sessionStorage.removeItem(tokenTableName);
    } else if ("cookie" === storage) {
      return cookie.remove(tokenTableName);
    } else {
      return localStorage.removeItem(tokenTableName);
    }
  } else {
    return localStorage.removeItem(tokenTableName);
  }
}

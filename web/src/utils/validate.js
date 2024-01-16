/**
 * @description 判读是否为外链
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|\/\/)/.test(path);
}

/**
 * @description 判断是否是json
 * @param value
 * @return { boolean }
 */

export function isJson(value) {
  if (typeof value === "string") {
    const obj = JSON.parse(value);
    return !!(typeof obj === "object" && obj);
  }
  return false;
}

/**
 * @description 判断是否为数组
 * @param arg
 */

export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}

/**
 * @description 检查密码是否小于6位
 * @param value
 * @return { boolean }
 */

export function isPassword(value) {
  return value.length >= 6;
}

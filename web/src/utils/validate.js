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
    const obj = JSON.parse(value)
    return !!(typeof obj === 'object' && obj)
  }
  return false
}


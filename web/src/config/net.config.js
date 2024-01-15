/**
 * @description 导出网络配置
 */

module.exports = {
  baseURL: "http://10.1.1.181:5002",
  // baseURL: "http://10.1.1.181:6789",
  contentType: "application/json;charset=UTF-8",
  requestTimeout: 10000,
  // 操作code 支持String int
  successCode: [200, 0, "200", "0"],
  // 数组状态名称
  statusName: "code",
  // 状态信息的字段名称
  messageName: "msg",
};

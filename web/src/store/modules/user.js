import { getRoleInfo, login } from "@/api/user.js";
import { getToken, setToken } from "@/utils/token";
import { isArray, isString } from "lodash";

const state = () => ({
  token: getToken(),
  username: "admin",
  avatar: "https://i.gtimg.cn/club/item/face/img/2/15922_100.gif",
});

const getters = {
  token: (state) => state.token,
  avatar: (state) => state.avatar,
  username: (state) => state.username,
};

const mutations = {
  /**
   * @description 设置token
   */

  setToken(state, token) {
    state.token = token;
    // 写入本地缓存
    setToken(token);
  },
  /**
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username;
  },
  /**
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
};

const actions = {
  /**
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    console.log("userinfo", userInfo);
    const {
      data: { token },
    } = await login(userInfo);
    console.log("token", token);
    commit("setToken", token);
  },

  /**
   * @description 用户接口信息
   * @param {*} { commit dispatch state}
   */
  async getUserInfo({ commit, dispatch }) {
    const searchData = { token_value: localStorage.getItem("pro-token") };
    const {
      data: { username, roles, ability, avatar },
    } = await getRoleInfo(searchData);
    // 检查返回数据是否正确 无对应参数 使用默认值
    if (
      (username && !isString(username)) ||
      (avatar && !isString(avatar)) ||
      (roles && !isArray(roles)) ||
      (ability && !isArray(ability))
    ) {
      const err = "接口异常,请检查返回JSON格式是否正确";
      throw err;
    } else {
      localStorage.setItem("pro-token", `${username}-token`);
      if (username) commit("setUsername", username);
      if (avatar) commit("setAvatar", avatar);
      if (roles) dispatch("acl/setRole", roles, { root: true });
      if (ability) dispatch("acl/setAbility", ability, { root: true });
    }
  },

  setToken({ commit }, token) {
    commit("setToken", token);
  },
};

export default { state, getters, mutations, actions };

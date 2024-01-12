import { getToken, setToken } from "@/utils/token"

const state = () => ({
  token: getToken(),
  username: "admin",
  avatar: "https://i.gtimg.cn/club/item/face/img/2/15922_100.gif",
})

const getters = {
  token: (state) => state.token,
  avatar: (state) =>  state.avatar,
  username: (state) => state.username
}

const mutations = {
  /**
   * @description 设置token
   */

  setToken(state, token) {
    state.token = token;
    // 写入本地缓存
    setToken(token)
  }

}

const actions = {
  setToken({ commit }, token) {
    commit("setToken", token)
  }
}

export default { state, getters, mutations, actions}
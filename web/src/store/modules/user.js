const state = () => ({
  username: "admin",
  avatar: "https://i.gtimg.cn/club/item/face/img/2/15922_100.gif",
})

const getters = {
  avatar: (state) =>  state.avatar,
  username: (state) => state.username
}

const mutations = {

}

const actions = {

}

export default { state, getters, mutations, actions}
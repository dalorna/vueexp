function initialState() {
  return {
    DataList: []
  }
}
const state = initialState()

const getters = {
  DataList(state) {
    return state.DataList
  }
}

const actions = {
  setDataList(context, list) {
    if (list.length > 0) {
      context.commit('DataList', list)
    }
  }
}
const mutations = {
  DataList(state, list) {
    state.DataList = list
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}

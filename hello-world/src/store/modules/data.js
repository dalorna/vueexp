function initialState() {
  return {
    DataList: [],
    SportsList: [
      {name: 'Cricket', id: '1'},
      {name: 'Football', id: '2'},
      {name: 'Golf', id: '3'},
      {name: 'Hockey', id: '4'},
      {name: 'Rugby', id: '5'},
      {name: 'Snooker', id: '6'},
      {name: 'Tennis', id: '7'},
      {name: 'Baseball', id: '8'},
      {name: 'Basketball', id: '9'},
      {name: 'Soccer', id: '10'}]
  }
}
const state = initialState()

const getters = {
  DataList(state) {
    return state.DataList
  },
  SportsList(state) {
    return state.SportsList
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

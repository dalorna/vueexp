function initialState() {
    return {
        DataList: []
    };
}

const state = initialState();

const getters = {
    DataList(state) {
        return state.DataList;
    },
};

const actions = {
    setData(items) {
        this.commit('DataList', items)
    }
}

const mutations = {
    DataList(state, types) {
        state.DataList = types;
    }
}

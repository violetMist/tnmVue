import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	count: 1
};

const mutations = {
	ADD_TODO (state, text) {
		state.count += text;
	}
}

export default new Vuex.Store({
	state,
	mutations
});
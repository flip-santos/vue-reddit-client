import Vue from 'vue'
import Vuex from 'vuex'
import { 
	LOAD_ARTICLE, 
	REMOVE_ARTICLE, 
	UPDATE_BEFORE, 
	UPDATE_AFTER, 
	UPDATE_LIMIT, 
	TOGGLE_MENU
} from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	limit: 2,
  	before: '',
  	after: '',
  	read_articles: [],
  	current_article: {},
  	menu_visible: true,
  },
  mutations: {
		[UPDATE_LIMIT] (state, payload) {
  		state.limit = payload
  	},

  	[TOGGLE_MENU] (state) {
  		state.menu_visible = !state.menu_visible
  	},

  	[LOAD_ARTICLE] (state, payload) {
  		state.current_article = payload
  	},

  	[UPDATE_BEFORE] (state, name) {
  		state.before = name
  	},

  	[UPDATE_AFTER] (state, name) {
  		state.after = name
  	},
  	
  	[REMOVE_ARTICLE] (state, id) {
  		state.read_articles.push(id)
  	},

  },
  actions: {
   	toggleMenu (context) {
      context.commit(TOGGLE_MENU)
    },
    loadArticle (context, article) {
      context.commit(LOAD_ARTICLE, article)
    },
    updateLimit (context, limit) {
      context.commit(UPDATE_LIMIT, limit)
    },
  },
})

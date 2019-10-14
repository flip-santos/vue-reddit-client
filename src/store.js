import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

// Default State values
const DEFAULT_STATE = {
  limit: 50,
  before: '',
  after: '',
  current_article: {},
  menu_visible: true,
  removed_articles: [],
  opened_articles: [],
}

// Mutation Types
// const FILTER_ARTICLES = 'FILTER_ARTICLES'
const LOAD_ARTICLE = 'LOAD_ARTICLE'
const REMOVE_ARTICLE = 'REMOVE_ARTICLE'
const RESET_ARTICLES = 'RESET_ARTICLES'
const TOGGLE_MENU = 'TOGGLE_MENU'
const UPDATE_AFTER = 'UPDATE_AFTER'
const UPDATE_LISTED_ARTICLES = 'UPDATE_LISTED_ARTICLES'
const UPDATE_BEFORE = 'UPDATE_BEFORE'
const UPDATE_LIMIT = 'UPDATE_LIMIT'

function onlyUnique(value, index, self) {
  console.log(value, index, self) 
  return self.indexOf(value) === index;
}

export default new Vuex.Store({
  state: {
    after: DEFAULT_STATE.after,
    before: DEFAULT_STATE.before,
    limit: DEFAULT_STATE.limit,
    
    menu_visible: DEFAULT_STATE.menu_visible,
    
    opened_articles: DEFAULT_STATE.opened_articles,
    removed_articles: DEFAULT_STATE.removed_articles,
    current_article: DEFAULT_STATE.current_article,
    
  },

  mutations: {
		[UPDATE_LIMIT] (state, payload) {
  		state.limit = payload
  	},

  	[UPDATE_BEFORE] (state, name) {
  		state.before = name
  	},

  	[UPDATE_AFTER] (state, name) {
  		state.after = name
  	},
  	
    [TOGGLE_MENU] (state) {
  		state.menu_visible = !state.menu_visible
  	},

  	[LOAD_ARTICLE] (state, article) {
  		state.current_article = article
      let opened_articles = state.opened_articles
      opened_articles.push(article.id)
      state.opened_articles = _.uniq(opened_articles)
  	},

    [RESET_ARTICLES] (state, payload) {
      state.current_article = DEFAULT_STATE.current_article
      state.limit = DEFAULT_STATE.limit
      state.after = DEFAULT_STATE.after
      state.before = DEFAULT_STATE.before
    },
  	
  	[REMOVE_ARTICLE] (state, id) {
      if(state.current_article.id === id) {
        state.current_article = {}
      }
      let removed_articles = state.removed_articles
      removed_articles.push(id)
      state.removed_articles = _.uniq(removed_articles)
  	},
    
  },

  actions: {
    updateLimit (context, limit) {
      context.commit(UPDATE_LIMIT, limit)
    },
    updateBefore (context, name) {
      context.commit(UPDATE_BEFORE, name)
    },
    updateAfter (context, name) {
      context.commit(UPDATE_AFTER, name)
    },
   	toggleMenu (context) {
      context.commit(TOGGLE_MENU)
    },
    
    loadArticle (context, article) {
      context.commit(LOAD_ARTICLE, article)
    },
    removeArticle(context, id) {
      context.commit(REMOVE_ARTICLE, id)
    },
  },

})

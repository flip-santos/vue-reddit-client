import Vue from 'vue'
import App from './App.vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo';
import { setContext } from 'apollo-link-context';

Vue.config.productionTip = false

Vue.use(VueApollo)

const httpLink = new HttpLink({
	uri: 'http://localhost:5000'
})

const middlewareLink = setContext(() => ({
  headers: {}
}));

const cache = new InMemoryCache();

const link = middlewareLink.concat(httpLink)

const apolloClient = new ApolloClient({
	link,
	cache,
	connectToDevTools: true
})

const apolloProvider = new VueApollo({
	defaultClient: apolloClient
})

new Vue({
	provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app')

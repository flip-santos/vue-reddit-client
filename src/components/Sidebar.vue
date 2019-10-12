<template>
	<section class="sidebar-component">

  	<!-- <button v-if="get_filtered_articles.length > 0" @click="updateAfter(get_filtered_articles[get_filtered_articles.length -1].name)">More!</button> -->
  	<!-- <button v-else @click="resetArticles">Reload!</button> -->

  	<ul>
    	<li>{{filtered_articles.length}} articles left</li>
    	<li>{{removed_articles.length}} removed articles</li>
    	<li>{{opened_articles.length}} articles viewed</li>
    </ul>
    
    <div v-if="!is_loading">
			<ul class="sidebar-component__list">
				<li class="sidebar-component__list-item" v-for="article in filtered_articles" :key="article.id">
					<div class="sidebar-component__article-read">
						{{ article.clicked }}
					</div>
					<div class="sidebar-component__article-subreddit">r/{{ article.subreddit }}</div>
					<div class="sidebar-component__article-author">u/{{ article.author }} • {{ get_UTC_hours(article.created) }} hours ago</div>
					<div class="sidebar-component__article-thumbnail">
						<img class="sidebar-component__article-thumbnail-img" :src="article.thumbnail" :alt="article.title" />
					</div>
					<h3 class="sidebar-component__article-title" @click="loadArticle(article)">
						{{ article.title }}
					</h3>
					<div class="sidebar-component__article-actions">
						<!-- <a href="#">{{ article.num_comments }} comments</a> -->
						<!-- <a href="#">Dismiss</a> -->
						<button @click="removeArticle(article.id)">Remove article</button>
					</div>
				</li>
			</ul>
    </div>
    <div v-else>
    	Loading...
    </div>

    

	</section>
</template>

<style type="text/css">
	.sidebar-component {}
	.sidebar-component__list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.sidebar-component__list-item {
		margin: 10px 0;
		padding: 10px;
		border-bottom: solid 1px gray;
	}
	.sidebar-component__article-read {}
	.sidebar-component__article-subreddit {}
	.sidebar-component__article-author {}
	.sidebar-component__article-thumbnail {}
	.sidebar-component__article-thumbnail-img {}
	.sidebar-component__article-title {}
	.sidebar-component__article-actions {}
</style>

<script>
	// import gql from 'graphql-tag'
	import GET_TOP_ARTICLES from '../graphql/getTopArticles.gql'
	import { mapState, mapActions, mapMutations } from 'vuex'
	import _ from 'lodash'

	export default {
		name: 'Sidebar',

		data() {
			return {
				fetched_articles: [],
			}
		},

		computed: {
		 ...mapState([
		 		'limit',
				'before',
				'after',
				'removed_articles',
				'opened_articles',
		 	]),
		  is_loading() {
		  	if(this.$apolloData) {
		  		return Boolean(this.$apolloData.loading)
		  	}
		  },
		  filtered_articles() {
		  	return _.filter(this.fetched_articles, (item) => {
	    		if(this.removed_articles.indexOf(item.id) === -1) {
	    			return item
	    		}
	    	})
		  }
		},

		apollo: {
		  getTopArticles: {
		  	query: GET_TOP_ARTICLES,
		    variables () {
		      return {
	          limit: this.limit,
	          before: this.before,
						after: this.after
		      }
		    },
		    update (data) {
		    	this.fetched_articles = data.getTopArticles		    	
		    	return data
		    }
		  }
		},

		methods: {
			...mapActions([
				'loadArticle',
				'updateAfter',
				'removeArticle',
				'resetArticles',
			]),
			get_UTC_hours(utc) {
				let d = new Date(utc)
				return d.getHours() === 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())
			},
		},

	}
</script>



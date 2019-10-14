<template>
	<section class="sidebar-component">

  	<div v-if="!is_loading">
			<ul class="sidebar-component__list">
				<li class="sidebar-component__list-item" :class="{'--read': is_opened_article(article.id)}" v-for="article in filtered_articles" :key="article.id">
					<div class="sidebar-component__article-read" :class="{'--read': is_opened_article(article.id)}">
						{{ article.clicked }}
					</div>
					<md-button class="sidebar-component__remove-button md-icon-button" @click="removeArticle(article.id)">
		        <md-icon>delete</md-icon>
		      </md-button>
					<div class="sidebar-component__article-subreddit">r/{{ article.subreddit }}</div>
					<div class="sidebar-component__article-author">u/{{ article.author }} • {{ get_UTC_hours(article.created) }} hours ago</div>
					<div 
						class="sidebar-component__article-thumbnail md-elevation-1" 
						:style="{'background-image': `url(${ article.thumbnail })`}" 
						v-if="is_url(article.thumbnail)" 
						@click="loadArticle(article)"/>
					<h3 class="sidebar-component__article-title" @click="loadArticle(article)">
						{{ article.title }}
					</h3>
					<div class="sidebar-component__article-comments">
						<md-icon class="sidebar-component__article-comments-icon">question_answer</md-icon> {{ article.num_comments }} comments
					</div>
				</li>
			</ul>
			
			<md-button class="sidebar-component__load-button md-raised md-primary"
				v-if="filtered_articles.length > 0" 
				@click="updateAfter(filtered_articles[filtered_articles.length -1].name)">
				Load More!
			</md-button>
			<md-button class="sidebar-component__load-button md-raised md-primary"
				v-else
				@click="resetArticles">
				Reload!
			</md-button>

    </div>

    <div v-else>
    	<div class="sidebar-component__spinner">
    		<spinner />
    	</div>
    </div>

	</section>
</template>

<style lang="scss">
	@import '../styles/variables';

	$item-padding: 10px;

	.sidebar-component {}
	.sidebar-component__list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.sidebar-component__list-item {
		position: relative;
		padding: $item-padding;
		border-top: solid 2px;
		border-color: $pink;
		transition: all 200ms ease;
		background-color: transparent;
		z-index: 1;
		&.--read {
			border-color: $light-gray;
			transition: border-color 200ms ease;
		}
		&:hover {
			transition: background-color 200ms ease;
			background-color: $light-gray;
		}
	}
	.sidebar-component__article-read {
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 20px 20px 0 0;
		border-color: $pink transparent transparent;
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		transition: border-color 200ms ease;
		&.--read {
			border-color: $light-gray transparent transparent;
			transition: border-color 200ms ease;
		}
	}
	.sidebar-component__article-subreddit {
		font-weight: $font-bold;
		font-size: 14px;

	}
	.sidebar-component__article-author {
		font-weight: 400;
		font-size: 12px;
		line-height: 12px;
		color: $dark-gray;
		margin-bottom: $spacer-xs*2;
	}
	.sidebar-component__article-thumbnail {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		width: 100%;
		height: 100px;
		cursor: pointer;
		// border-radius: 4px;
	}
	
	.sidebar-component__article-title {
		margin-top: $spacer-xs;
		margin-bottom: 15px;
		color: $dark-gray;
		font-size: $font-lg;
		line-height: $font-lg;
		cursor: pointer;
	}
	.sidebar-component__article-comments {
		font-size: $font-sm;
		color: $medium-gray;
	}
	.sidebar-component__load-button {
		width: 100%;
		// transform: translateX(-$item-padding);
		margin: 0 !important;
	}
	.sidebar-component__remove-button {
		position: absolute !important;
		right: 0;
		bottom: 2px;
	}
	.sidebar-component__article-comments-icon {
		color: $medium-gray;
	}
	.sidebar-component__spinner {
		position: relative;
		min-height: 100vh;
	}
</style>

<script>
	import GET_TOP_ARTICLES from '../graphql/getTopArticles.gql'
	import { mapState, mapActions, mapMutations } from 'vuex'
	import _ from 'lodash'
	import Spinner from './Spinner.vue';

	export default {
		name: 'Sidebar',

		components: {
			Spinner,
		},

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
			is_opened_article(id) {
				return this.opened_articles.includes(id)
			},
			is_url(url) {
				if(url) {
					let pattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
					return pattern.test(url)
				}
			},
		},

	}
</script>



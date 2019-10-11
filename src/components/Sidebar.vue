<template>
	<section class="sidebar-component">
		<ApolloQuery :query="require('../graphql/getTopArticles.gql')" :variables="{ limit, before, after }" >
		
				<template slot-scope="{ result: { loading, error, data } }">
					<!-- Loading -->
		      <div v-if="loading" class="loading apollo">Loading...</div>

		      <!-- Error -->
		      <div v-else-if="error" class="error apollo">An error occured</div>

		      <!-- Result -->
		      <div v-else-if="data" class="result apollo">
						<ul class="sidebar-component__list">
							<li class="sidebar-component__list-item" v-for="article in data.getTopArticles" :key="article.id">
								<div class="sidebar-component__article-read">
									{{ article.clicked }}
								</div>
								<div class="sidebar-component__article-subreddit">r/{{ article.subreddit }}</div>
								<div class="sidebar-component__article-author">u/{{ article.author }} • {{ get_UTC_hours(article.created) }} hours ago</div>
								<div class="sidebar-component__article-thumbnail">
									<img class="sidebar-component__article-thumbnail-img" :src="article.thumbnail" :alt="article.title" />
								</div>
								<h3 class="sidebar-component__article-title">
									{{ article.title }}
								</h3>
								<div class="sidebar-component__article-actions">
									<a href="#">{{ article.num_comments }} comments</a>
									<a href="#">Dismiss</a>
								</div>
							</li>
						</ul>
		      </div>

		      <!-- No result -->
		      <div v-else class="no-result apollo">No result :(</div>					
				</template>

			</ul>
    </ApolloQuery>
	</section>
</template>

<style type="text/css">
	.sidebar-component {}
	.sidebar-component__list {}
	.sidebar-component__list-item {}
	.sidebar-component__article-read {}
	.sidebar-component__article-subreddit {}
	.sidebar-component__article-author {}
	.sidebar-component__article-thumbnail {}
	.sidebar-component__article-thumbnail-img {}
	.sidebar-component__article-title {}
	.sidebar-component__article-actions {}
</style>

<script>
	// import GET_TOP_ARTICLES from '../graphql/GetTopArticles.gql'
	// import gql from 'graphql-tag' 

	export default {
		name: 'Sidebar',

		// apollo: {
	 //    getTopArticles: GET_TOP_ARTICLES
	 //  },
		data () {
			return {
				limit: 2,
				before: '',
				after: ''
			}
		},

		methods: {
			get_UTC_hours(utc) {
				let d = new Date(utc)
				return d.getHours() === 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())
			}
		}
	}
</script>



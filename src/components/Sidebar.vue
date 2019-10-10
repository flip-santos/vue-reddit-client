<template>
	<section class="sidebar-component">
		<ul class="sidebar-component__list">
			
			<li 
				class="sidebar-component__list-item"
				v-for="article in articles"
				:key="article.id">
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
	import ARTICLE from '../graphql/Article.gql'
	import gql from 'graphql-tag' 

	export default {
		name: 'Sidebar',

		apollo: {
	    articles: ARTICLE
	  },

		methods: {
			get_UTC_hours(utc) {
				let d = new Date(utc)
				return d.getHours() === 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())
			}
		}
	}
</script>
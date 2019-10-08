<template>
	<section class="sidebar-component">
		<ul class="sidebar-component__list">
			
			<li 
				class="sidebar-component__list-item"
				v-for="article in articles"
				:key="article.data.id">
				<div class="sidebar-component__article-read">
					{{ article.data.clicked }}
				</div>
				<div class="sidebar-component__article-subreddit">r/{{ article.data.subreddit }}</div>
				<div class="sidebar-component__article-author">u/{{ article.data.author }} • {{ get_UTC_hours(article.data.created) }} hours ago</div>
				<div class="sidebar-component__article-thumbnail">
					<img class="sidebar-component__article-thumbnail-img" :src="article.data.thumbnail" :alt="article.data.title" />
				</div>
				<h3 class="sidebar-component__article-title">
					{{ article.data.title }}
				</h3>
				<div class="sidebar-component__article-actions">
					<a href="#">{{ article.data.num_comments }} comments</a>
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
	// import payload from '../assets/payload.json'
	import gql from 'graphql-tag';

	export default {
		name: 'Sidebar',
		
		apollo: {
			articles: {
				query: gql`
					query articles {
						id,
						permalink,
						author,
						created
					}
				`,
				variables: {
					// input: `03e082be-5e10-4351-a968-5f28d3e50565`
				},
				update: result => result.articles
			}
		},

		data() {
			return {
				// articles: payload.data.children
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
<template>
	<section class="sidebar-component">
		<ul class="sidebar-component__list">
			
			<li class="sidebar-component__list-item" v-for="article in articles" :key="article.data.id">
				<span class="sidebar-component__article-read" :class="{'--clicked': article.data.clicked}" />
				<div class="sidebar-component__article-subreddit">r/{{ article.data.subreddit }}</div>
				<div class="sidebar-component__article-author">u/{{ article.data.author }} • {{ get_UTC_hours(article.data.created) }} hours ago</div>
				
				<div class="sidebar-component__article-title">
					<div class="sidebar-component__article-thumbnail" v-if="article.data.thumbnail" :style="{'background-image' : `url(${article.data.thumbnail})`}" />
					{{ article.data.title }}
				</div>
				
				<div class="sidebar-component__article-actions">
					<a href="#">{{ article.data.num_comments }} comments</a>
					<a href="#">Dismiss</a>
				</div>
			</li>

		</ul>
	</section>
</template>

<style lang="scss">
	@import '@/assets/variables.scss';
	.sidebar-component {
		
		$spacer: 20px;
		$fast: 200ms;
		$bullet-size: 10px;
		$thumbnail-size: 100px;
		
		&__list {}
		
		&__list-item {
			position: relative;
			padding: $spacer;
			border-bottom: solid 1px $light-gray;
			overflow: auto;
		}
		
		&__article-read {
			position: absolute;
			top: $spacer;
			right: $spacer;
			width: $bullet-size;
			height: $bullet-size;
			border-radius: 50%;
			background-color: $red;
			opacity: 1;
			transition: opacity $fast linear;
			&.--clicked {
				opacity: 0;
				transition: opacity $fast linear;
			}
		}
		
		&__article-subreddit {
			font-weight: 600;
			font-size: $font-size-md;
		}
		&__article-author {
			font-weight: 400;
			font-size: $font-size-sm;	
		}
		&__article-thumbnail {
			float: left;
			margin-right: $spacer/2;
			width: $thumbnail-size;
			height: $thumbnail-size;
			border-radius: 10px;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: top left;
			transform: translateY(6px);
		}
		&__article-title {
			font-weight: 700;
			font-size: $font-size-lg;
			line-height: 22px;
		}
		&__article-actions {}
	}
</style>

<script>
	import payload from '../assets/payload.json'
	export default {
		name: 'Sidebar',
		data() {
			return {
				articles: payload.data.children
			}
		},
		methods: {
			get_UTC_hours(utc) {
				let d = new Date(utc)
				return d.getHours() === 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())
			},
			get_thumbnail(imageSrc) {
				// this part is just for fun. If a image is broken, or doesn't exists, a random cute cat will appear ;)
				let min = Math.ceil(200);
		    let max = Math.floor(300);
		    let random = Math.floor(Math.random() * (max - min + 1)) + min;
				return imageSrc ? imageSrc : `http://placekitten.com/${random}/${random}`
			}
		}
	}
</script>
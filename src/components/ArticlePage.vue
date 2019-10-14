<template>
	<section class="article-page-component">
		<h1 class="article-page-component__title">{{article.title}}</h1>
    <img :src="article.thumbnail" atl="" />
    <h2>Avaliable article data:</h2>
    <ul>
      <li>ID: {{article.id}}</li>
      <li>Author: {{article.author }}</li>
      <li>Created: {{article.created}}</li>
      <li>Name: {{article.name}}</li>
      <li>Number of comments: {{article.num_comments}}</li>
      <li>Permalink: {{article.permalink}}</li>
      <li>Preview: {{article.preview.enabled}}</li>
      <li v-for="image in article.preview.images" :key="image.id">
        <img :src="image.source.url" :alt="image.source.url">
        <ul>
          <li>Width: {{image.source.width}}</li>
          <li>Height: {{image.source.height}}</li>
        </ul>
      </li>
      <li>Subreddit: {{article.subreddit}}</li>
      <li>Thumbnail: {{article.thumbnail}}</li>
      <li>Visited: {{article.visited}}</li>
    </ul>
    <p><a :href="`https://reddit.com${article.permalink}`" target="_blank">Read article in Reddit</a></p>

	</section>
</template>
<style lang="scss">
	@import '../styles/variables';
	.article-page-component {
		&__title {
			color: $pink;
			font-size: 36px;
      line-height: 40px
		}
    a {
      color: $pink !important;
      font-size: $font-lg;
    }
	}
</style>

<script>
	export default {
		props: {
			article: Object,
		}
	}
</script>
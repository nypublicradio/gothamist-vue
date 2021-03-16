<template>
  <div class="recent-stories">
    <v-card
      v-for="(story, index) in recentStories"
      :key="index"
      class="gothamist mod-small"
      image="http://placehold.it/150x150"
      :image-height="150"
      :image-width="150"
      :title="story.title"
      :title-link="story.url"
      :tags="story.tags"
    >
      <article-metadata
        publish-date="2 HOURS AGO"
      >
        <template v-slot:comments>
          <v-counter
            icon="comment"
            value="40"
            href="http://www.google.com"
          />
        </template>
      </article-metadata>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'RecentStories',
  components: {
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard')
  },
  data () {
    return {
      recentStories: null
    }
  },
  async mounted () {
    await this.$axios
      .get('/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=4')
      .then(response => (
        this.recentStories = response.data.items
      ))
  }
}
</script>

<style lang="scss">
.recent-stories .card {
  margin-bottom: var(--space-4);
}
</style>

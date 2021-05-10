<template>
  <div class="recent-stories">
    <v-card
      v-for="(story, index) in recentStories"
      :key="index"
      class="gothamist mod-small"
      :image="story.lead_asset[0] && story.lead_asset[0].value.default_image ? story.lead_asset[0].value.default_image.file : defaultImage"
      :image-height="150"
      :image-width="150"
      :title="story.title"
      :title-link="story.url"
      :tags="story.tags"
    >
<!--      <article-metadata-->
<!--        :publish-date="story.meta.first_published_at"-->
<!--      >-->
<!--        <template v-slot:comments>-->
<!--          <v-counter-->
<!--            icon="comment"-->
<!--            value="40"-->
<!--            href="http://www.google.com"-->
<!--          />-->
<!--        </template>-->
<!--      </article-metadata>-->
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RecentStories',
  components: {
    // ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    // VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard')
  },
  props: {
    type: {
      type: String,
      default: 'news'
    }
  },
  data () {
    return {
      recentStories: null
    }
  },
  computed: {
    ...mapState('global', {
      defaultImage: state => state.defaultImage
    })
  },
  async mounted () {
    await this.$axios
      .get('/pages/?type=' + this.type + '.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=4')
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

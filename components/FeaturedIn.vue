<template>
  <div class="featured-in">
    {{ featuredStory }}
    <v-card
      v-if="featuredStory"
      class="gothamist mod-vertical mod-large"
      :image="featuredStory.story.lead_asset[0] && featuredStory.story.lead_asset[0].value.default_image ? featuredStory.story.lead_asset[0].value.default_image.file : defaultImage"
      :image-height="150"
      :image-width="150"
      :title="featuredStory.story.title"
      :title-link="featuredStory.story.url"
      :tags="featuredStory.story.tags"
    >
      <article-metadata
        :publish-date="featuredStory.story.meta.first_published_at"
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
import { mapState } from 'vuex'

export default {
  name: 'FeaturedIn',
  components: {
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard')
  },
  data () {
    return {
      featuredStory: null
    }
  },
  computed: {
    ...mapState('global', {
      defaultImage: state => state.defaultImage
    })
  }
  // async mounted () {
  //   await this.$axios
  //     .get('/pages/?type=' + this.type + '.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=1')
  //     .then(response => (
  //       this.featuredStory = response.data.items
  //     ))
  // }
}
</script>

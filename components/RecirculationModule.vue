<template>
  <div class="c-block-group">
    <div class="c-block-group__col c-block-group__col1">
      <h2>Recent in {{ relatedArticle.ancestry[0].title }}</h2>
      <v-card
        v-for="(story, index) in recentStories"
        :key="index"
        class="gothamist mod-small"
        :image="story.leadAsset[0] && story.leadAsset[0].value.defaultImage ? story.leadAsset[0].value.defaultImage.file : defaultImage"
        :image-height="150"
        :image-width="150"
        :title="story.title"
        :title-link="story.url"
        :tags="story.tags"
      />
    </div>
    <div class="c-block-group__col c-block-group__col2">
      <h2>Featured in {{ relatedArticle.ancestry[0].title }}</h2>
      <v-card
        v-for="(story, index) in featuredStories"
        :key="index"
        class="gothamist mod-small"
        :image="story.leadAsset[0] && story.leadAsset[0].value.defaultImage ? story.leadAsset[0].value.default_image.file : defaultImage"
        :image-height="150"
        :image-width="150"
        :title="story.title"
        :title-link="story.url"
        :tags="story.tags"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

function dedupeStories (needle, haystack) {
  return haystack.filter(article => article.id !== needle.id)
}

export default {
  name: 'RecirculationModule',
  components: {
    VCard: () => import('nypr-design-system-vue/src/components/VCard')
  },
  props: {
    relatedArticle: {
      type: Object,
      default: () => {}
    }
  },
  async fetch () {
    const recent = this.$axios.get(`/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&descendant_of=${this.relatedArticle.ancestry[0].id}&limit=4`)
    const featured = this.$axios.get(`/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&descendant_of=${this.relatedArticle.ancestry[0].id}&limit=5&show_as_feature=true`)

    await Promise.all([recent, featured])
      .then(([recentResponse, featuredResponse]) => {
        // remove the current story from recent stories
        const recentStories = dedupeStories(this.relatedArticle, recentResponse.data.items)
        let featuredStories = dedupeStories(this.relatedArticle, featuredResponse.data.items)

        // remove recent articles from featured articles
        recentStories.forEach((recentStory) => { featuredStories = dedupeStories(recentStory, featuredStories) })
        this.recentStories = recentStories.slice(0, 3)
        this.featuredStories = featuredStories.slice(0, 1)
      })
  },
  data () {
    return {
      recentStories: null,
      featuredStories: null
    }
  },
  computed: {
    ...mapState('global', {
      defaultImage: state => state.defaultImage
    })
  }
}
</script>

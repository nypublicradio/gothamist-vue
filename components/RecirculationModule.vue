<template>
  <div class="recirculation-module l-grid l-grid--2up">
    <div class="recirculation-module-group  recirculation-module-group-1">
      <h2 class="recirculation-module-header">
        Recent in {{ relatedArticle.ancestry[0].title }}
      </h2>
      <v-card
        v-for="(story, index) in recentStories"
        :key="index"
        class="gothamist mod-small"
        :image="imageUrl(story)"
        :image-width="$mq | mq({small: 100, medium: 150})"
        :image-height="100"
        :image-max-width="getImageFromStory(story) && getImageFromStory(story).width || Infinity"
        :image-max-height="getImageFromStory(story) && getImageFromStory(story).height || Infinity"
        :title="story.title"
        :title-link="'/' + story.ancestry[0].slug + '/' + story.meta.slug"
      >
        <article-metadata>
          <template v-slot:authors>
            <v-byline
              prefix=""
              :authors="story.relatedAuthors"
            />
          </template>
        </article-metadata>
      </v-card>
    </div>
    <div class="recirculation-module-group recirculation-module-group-2">
      <h2 class="recirculation-module-header">
        Featured in {{ relatedArticle.ancestry[0].title }}
      </h2>
      <v-card
        v-for="(story, index) in featuredStories"
        :key="index"
        class="gothamist mod-large mod-vertical"
        :image="imageUrl(story)"
        :image-width="$mq | mq({small: 600, medium: 378})"
        :image-height="$mq | mq({small: 430, medium: 252})"
        :image-max-width="getImageFromStory(story) && getImageFromStory(story).width || Infinity"
        :image-max-height="getImageFromStory(story) && getImageFromStory(story).height || Infinity"
        :title="story.title"
        :title-link="'/' + story.ancestry[0].slug + '/' + story.meta.slug"
        :subtitle="story.listingSummary || story.description"
      >
        <article-metadata>
          <template v-slot:authors>
            <v-byline
              prefix=""
              :authors="story.relatedAuthors"
            />
          </template>
        </article-metadata>
      </v-card>
    </div>
  </div>
</template>
<script>
import { getImageFromStory } from '~/mixins/helpers'

function dedupeStories (needle, haystack) {
  return haystack.filter(article => article.id !== needle.id)
}

export default {
  name: 'RecirculationModule',
  components: {
    VCard: () => import('nypr-design-system-vue/src/components/VCard'),
    VByline: () => import('nypr-design-system-vue/src/components/VByline'),
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata')
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
  methods: {
    getImageFromStory,
    imageUrl (story) {
      const image = getImageFromStory(story)
      if (image) {
        return this.$config.imageBase + image.id + '/fill-%width%x%height%/'
      } else {
        return this.$config.defaultImages[story.ancestry[0].slug] ||
          this.$config.defaultImages.default || ''
      }
    }
  }
}
</script>

<style lang="scss">
.recirculation-module-group-1 > div:not(:last-of-type) {
  margin-bottom: var(--space-4);
}

.recirculation-module-header {
  display: inline-block;
  line-height: var(--line-height-9);
  font-size: var(--font-size-9);
  font-family: var(--font-family-header);
  letter-spacing: var(--letter-spacing-header);
  font-weight: var(--font-weight-header);
  background-image: linear-gradient(rgba(var(--color-text-muted),.2),rgba(var(--color-text-muted),.2));
  background-position: center bottom .2em;
  background-size: 100% .55em;
  background-repeat: no-repeat;
  padding: 0 var(--space-2);
  margin-bottom: var(--space-3);
  margin-left: calc(var(--space-2) * -1);
  @media all and (min-width: $medium) {
    line-height: var(--line-height-11);
    font-size: var(--font-size-11);
  }
}
</style>

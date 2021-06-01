<template>
  <div class="author-page">
    <div class="l-container l-container--14col l-wrap">
      <header
        v-if="authorPage"
        class="c-search-results__header--no-border u-spacing"
      >
        <h1 class="is-vishidden">
          {{ authorPage.title }}
        </h1>
        <div class="c-search-results__result-number">
          Articles By
        </div>
        <div class="c-search-results__term">
          {{ authorPage.title }}
        </div>
      </header>
      <v-spacer />
      <hr
        class="u-border-accent u-hide-until--m"
        aria-hidden="true"
      >
      <v-spacer size="double" />
      <loading-icon v-if="!moreResultsLoaded && moreResults.length === 0" />
      <section
        v-if="moreResults"
      >
        <div
          v-for="(chunk, chunkIndex) in moreResultsChunks"
          :key="chunkIndex"
          class="u-space--double--bottom"
        >
          <v-card
            v-for="(story, index) in moreResultsChunks[chunkIndex]"
            :key="index"
            class="gothamist u-space--double--bottom mod-large"
            :show-gallery-icon="hasGallery(story.leadAsset)"
            :image="getArticleImage(story.leadAsset, story.ancestry[0].slug, story.listingImage)"
            :image-height="150"
            :image-width="150"
            :title="story.title"
            :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
            :subtitle="story.description"
            :tags="formatTags(story.ancestry[0].title, story.ancestry[0].slug, story.sponsoredContent, story.tags)"
          >
            <article-metadata
              :publish-date="!story.updatedDate ? fuzzyDateTime(story.meta.firstPublishedAt) : null"
              :updated-date="story.updatedDate ? fuzzyDateTime(story.updatedDate) : null"
            >
              <template
                v-if="story.legacyId"
                v-slot:comments
              >
                <v-counter
                  icon="comment"
                  :value="getCommentCountById(story.legacyId, moreResultsDisqusData)"
                  :href="`/${story.ancestry[0].slug}/${story.meta.slug}?to=comments`"
                />
              </template>
            </article-metadata>
          </v-card>
        </div>
        <v-spacer size="double" />
        <div
          v-if="moreResults.length < totalCount && moreResults.length > 0"
          class="l-container u-align-center"
        >
          <v-button
            class="more-results"
            :disabled="!moreResultsLoaded"
            @click="getMoreResults"
          >
            <span v-if="moreResultsLoaded">More Results</span>
            <loading-icon v-if="!moreResultsLoaded" />
          </v-button>
        </div>
      </section>
      <p
        v-if="moreResults.length === 0 && moreResultsLoaded"
        class="c-listing__sections-title u-align--center u-space--double--bottom"
      >
        No Results
      </p>
      <v-spacer />
    </div>
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'
import disqus from '@/mixins/disqus'
import { mapState } from 'vuex'

const {
  formatTags,
  fuzzyDateTime,
  getArticleImage,
  hasGallery
} = require('~/mixins/helpers')

export default {
  name: 'Search',
  components: {
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    LoadingIcon: () => import('nypr-design-system-vue/src/components/animations/LoadingIcon'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [gtm, disqus],
  async asyncData ({
    $axios,
    params,
    error
  }) {
    const path = `${params.slug}`
    const page = await $axios.get(`/pages/find/?html_path=staff/${path}`)
      .catch(() => {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      })
    return {
      authorPage: page?.data,
      slug: params.slug
    }
  },
  data () {
    return {
      authorPage: [],
      moreResults: [],
      moreResultsDisqusThreadIds: [],
      moreResultsDisqusData: null,
      moreResultsLoaded: false,
      moreResultsOffset: 0,
      slug: null,
      totalCount: 0
    }
  },
  computed: {
    ...mapState('global', {
      defaultImage: state => state.defaultImage,
      defaultImageArts: state => state.defaultImageArts,
      defaultImageFood: state => state.defaultImageFood,
      defaultImageNews: state => state.defaultImageNews
    }),
    moreResultsChunks () {
      const chunkedArray = []
      const chunkSize = 12
      let index = 0
      while (index < this.moreResults.length) {
        chunkedArray.push(this.moreResults.slice(index, chunkSize + index))
        index += chunkSize
      }
      return chunkedArray
    }
  },
  mounted () {
    this.getMoreResults()
  },
  methods: {
    formatTags,
    fuzzyDateTime,
    getArticleImage,
    async getMoreResults () {
      this.moreResultsLoaded = false
      await this.$axios
        .get('/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&author_slug=' + this.slug + '&limit=12&offset=' + this.moreResultsOffset)
        .then((response) => {
          this.totalCount = response.data.meta.totalCount
          this.moreResults = this.moreResults.concat(response.data.items)
          this.moreResultsOffset += 12
          this.moreResultsLoaded = true
          response.data.items.forEach((item) => {
            this.moreResultsDisqusThreadIds.push(item.legacyId)
          })
        })
      this.moreResultsDisqusData = await this.getCommentCount(this.moreResultsDisqusThreadIds)
      this.gaEvent('Click Tracking', 'Load More Results', 'StaffArticlesPage', this.moreResultsOffset + ' articles loaded')
    },
    hasGallery,
    search () {
      this.moreResults = []
      this.moreResultsDisqusThreadIds = []
      this.moreResultsDisqusData = null
      this.moreResultsOffset = 0
      this.getMoreResults()
    }
  },
  head () {
    return {
      title: this.authorPage.title + ' - Gothamist',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.authorPage.title + ' - Gothamist'
        },
        {
          hid: 'og_url',
          name: 'og:url',
          content: 'https://www.gothamist.com' + this.$route.fullPath
        },
        {
          hid: 'og_title',
          name: 'og:title',
          content: this.authorPage.title + ' - Gothamist'
        },
        {
          hid: 'og_description',
          name: 'og:description',
          content: this.authorPage.title + ' - Gothamist'
        },
        {
          hid: 'twitter_title',
          name: 'twitter:title',
          content: this.authorPage.title + ' - Gothamist'
        },
        {
          hid: 'twitter_description',
          name: 'twitter:description',
          content: this.authorPage.title + ' - Gothamist'
        },
        {
          hid: 'twitter_url',
          name: 'twitter:url',
          content: 'https://www.gothamist.com' + this.$route.fullPath
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.author-page .loading-icon {
  width: 75px !important;
  margin: 0;
}

.author-page .loading-icon path {
  stroke: RGB(var(--color-gray));
}

.author-page .button .loading-icon path {
  stroke: RGB(var(--color-text));
}
</style>

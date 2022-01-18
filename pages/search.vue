<template>
  <div class="search">
    <div class="l-container l-container--14col l-wrap">
      <header class="c-search-results__header u-spacing">
        <h1 class="is-vishidden">
          Search Results
        </h1>
        <div
          v-if="totalCount && moreResults && moreResults.length > 0"
          class="c-search-results__result-number"
        >
          <strong v-html="totalCount" /> Results for:
        </div>
        <form
          id="search"
          aria-hidden="true"
          class="c-search-results__form c-search"
          @submit.prevent="search"
        >
          <label for="search" class="is-vishidden"> Search this site </label>
          <input
            v-model="q"
            name="q"
            placeholder="Search"
            class="c-search__input"
            type="search"
          >
          <button
            role="button"
            class="o-button o-button--c-quaternary c-search__button"
            type="submit"
            @click="gaEvent('Click Tracking', 'Search', q)"
          >
            <span class="c-search__icon o-icon o-icon--search u-icon--xs">
              <search-icon />
            </span>
            <span class="is-vishidden">Search</span>
          </button>
        </form>
      </header>
      <v-spacer size="quad" />
      <section v-if="moreResultsNuggets && moreResultsNuggets.length > 0">
        <div
          v-for="(nugget, nuggetIndex) in moreResultsNuggets"
          :key="nuggetIndex"
          class="u-space--double--bottom"
        >
          <v-card
            v-for="(story, index) in moreResultsNuggets[nuggetIndex]"
            :key="index"
            class="gothamist u-space--double--bottom"
            :class="$mq | mq({ xsmall: '', medium: 'mod-large' })"
            :show-gallery-icon="hasGallery(story.result.leadAsset)"
            :image="
              getArticleImage(
                story.result.leadAsset,
                story.result.ancestry[0].slug,
                story.listingImage
              )
            "
            :image-width="$mq | mq({ xsmall: 100, medium: 360 })"
            :image-height="$mq | mq({ xsmall: 100, medium: 240 })"
            :image-max-height="
              getArticleImageHeight(
                story.result.leadAsset,
                story.result.listingImage
              ) || Infinity
            "
            :image-max-width="
              getArticleImageWidth(
                story.result.leadAsset,
                story.result.listingImage
              ) || Infinity
            "
            :title="story.result.title"
            :title-link="`/${story.result.ancestry[0].slug}/${story.result.meta.slug}`"
            :subtitle="story.result.description"
            :tags="
              formatTags(
                story.result.ancestry[0].title,
                story.result.ancestry[0].slug,
                story.result.sponsoredContent,
                story.result.tags
              )
            "
          >
            <article-metadata
              :publish-date="
                !story.result.updatedDate
                  ? fuzzyDateTime(story.result.publicationDate) ||
                    fuzzyDateTime(story.result.meta.firstPublishedAt)
                  : null
              "
              :updated-date="
                story.result.updatedDate
                  ? fuzzyDateTime(story.result.updatedDate)
                  : null
              "
            >
              <template
                v-if="
                  getCommentCountById(
                    String(story.result.legacyId || story.result.uuid),
                    moreResultsDisqusData
                  )
                "
                v-slot:comments
              >
                <v-counter
                  icon="comment"
                  :value="
                    getCommentCountById(
                      String(story.result.legacyId || story.result.uuid),
                      moreResultsDisqusData
                    )
                  "
                  :href="`/${story.result.ancestry[0].slug}/${story.result.meta.slug}#comments`"
                />
              </template>
            </article-metadata>
          </v-card>
        </div>
        <v-spacer size="double" />
        <div
          v-if="
            totalCount &&
              moreResults &&
              moreResults.length < totalCount &&
              moreResults.length > 0
          "
          class="l-container u-align-center"
        >
          <v-button
            class="more-results"
            :disabled="!moreResultsLoaded"
            @click="getMoreResults"
          >
            <span v-if="moreResultsLoaded">More Results</span>
            <span v-if="!moreResultsLoaded">Loading...</span>
          </v-button>
        </div>
      </section>
      <v-spacer />
    </div>
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'
import disqus from '@/mixins/disqus'
import { mapState } from 'vuex'
import { setTargeting, clearTargeting } from '~/mixins/htl'

const {
  formatTags,
  fuzzyDateTime,
  getArticleImage,
  getArticleImageHeight,
  getArticleImageWidth,
  hasGallery
} = require('~/mixins/helpers')

export default {
  name: 'Search',
  mixins: [gtm, disqus],
  data () {
    return {
      q: '',
      moreResults: [],
      moreResultsDisqusThreadIds: [],
      moreResultsDisqusData: null,
      moreResultsLoaded: false,
      moreResultsOffset: 0,
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
    moreResultsNuggets () {
      const nuggetArray = []
      const nuggetSize = 6
      let index = 0
      while (index < this.moreResults.length) {
        nuggetArray.push(this.moreResults.slice(index, nuggetSize + index))
        index += nuggetSize
      }
      return nuggetArray
    }
  },
  mounted () {
    if (this.$route.query.q) {
      this.q = this.$route.query.q
    }
    this.getMoreResults()
    setTargeting({ Template: 'Search Results' })
  },
  beforeUnmount () {
    clearTargeting(['Template'])
  },
  methods: {
    formatTags,
    fuzzyDateTime,
    getArticleImage,
    getArticleImageHeight,
    getArticleImageWidth,
    async getMoreResults () {
      this.moreResultsLoaded = false
      let endpoint = '/search/?limit=12&q=' + this.q
      if (this.moreResultsOffset > 0) {
        endpoint =
          '/search/?limit=12&offset=' + this.moreResultsOffset + '&q=' + this.q
      }
      await this.$axios.get(endpoint).then((response) => {
        this.totalCount = response.data.meta.totalCount
        this.moreResults = this.moreResults.concat(response.data.items)
        this.moreResultsOffset += 12
        this.moreResultsLoaded = true
        response.data.items.forEach((item) => {
          this.moreResultsDisqusThreadIds.push(
            item.result.legacyId || item.result.uuid
          )
        })
      })
      this.moreResultsDisqusData = await this.getCommentCount(
        this.moreResultsDisqusThreadIds
      )
      this.gaEvent(
        'Click Tracking',
        'Load More Results',
        'SearchPage',
        this.moreResultsOffset + ' articles loaded'
      )
    },
    hasGallery,
    search () {
      history.pushState({}, null, this.$route.path + '?q=' + this.q)
      this.moreResults = []
      this.moreResultsDisqusThreadIds = []
      this.moreResultsDisqusData = null
      this.moreResultsOffset = 0
      this.getMoreResults()
    }
  },
  head () {
    return {
      title: 'Search Results - Gothamist',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Search Results - Gothamist'
        },
        {
          hid: 'og_url',
          name: 'og:url',
          content: 'https://www.gothamist.com' + this.$route.fullPath
        },
        {
          hid: 'og_title',
          name: 'og:title',
          content: 'Search Results - Gothamist'
        },
        {
          hid: 'og_description',
          name: 'og:description',
          content: 'Search Results - Gothamist'
        }
      ]
    }
  }
}
</script>

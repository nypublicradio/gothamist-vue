<template>
  <div class="search">
    <div class="l-container l-container--14col l-wrap">
      <header class="c-search-results__header u-spacing">
        <h1 class="is-vishidden">
          Search Results
        </h1>
        <div
          v-if="totalCount && moreResults.length > 0"
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
          <label
            for="search"
            class="is-vishidden"
          >
            Search this site
          </label>
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
            :show-gallery-icon="hasGallery(story.result.leadAsset)"
            :image="getArticleImage(story.result.leadAsset, story.result.ancestry[0].slug, story.listingImage)"
            :image-height="150"
            :image-width="150"
            :title="story.result.title"
            :title-link="`/${story.result.ancestry[0].slug}/${story.result.meta.slug}`"
            :subtitle="story.result.description"
            :tags="formatTags(story.result.ancestry[0].title, story.result.ancestry[0].slug, story.result.sponsoredContent, story.result.tags)"
          >
            <article-metadata
              :publish-date="!story.result.updatedDate ? fuzzyDateTime(story.result.meta.firstPublishedAt) : null"
              :updated-date="story.result.updatedDate ? fuzzyDateTime(story.result.updatedDate) : null"
            >
              <template
                v-if="story.result.legacyId"
                v-slot:comments
              >
                <v-counter
                  icon="comment"
                  :value="getCommentCountById(story.result.legacyId, moreResultsDisqusData)"
                  :href="`/${story.result.ancestry[0].slug}/${story.result.meta.slug}?to=comments`"
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
            <span v-if="!moreResultsLoaded">Loading...</span>
          </v-button>
        </div>
      </section>
      <p
        v-if="q && moreResults.length === 0 && moreResultsLoaded"
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
    SearchIcon: () => import('nypr-design-system-vue/src/components/icons/SearchIcon'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
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
    if (this.$route.query.q) {
      this.q = this.$route.query.q
    }
    this.getMoreResults()
  },
  methods: {
    formatTags,
    fuzzyDateTime,
    getArticleImage,
    async getMoreResults () {
      this.moreResultsLoaded = false
      let endpoint = '/search/?limit=12&q=' + this.q
      if (this.moreResultsOffset > 0) {
        endpoint = '/search/?limit=12&offset=' + this.moreResultsOffset + '&q=' + this.q
      }
      await this.$axios
        .get(endpoint)
        .then((response) => {
          this.totalCount = response.data.meta.totalCount
          this.moreResults = this.moreResults.concat(response.data.items)
          this.moreResultsOffset += 12
          this.moreResultsLoaded = true
          response.data.items.forEach((item) => {
            this.moreResultsDisqusThreadIds.push(item.result.legacyId)
          })
        })
      this.moreResultsDisqusData = await this.getCommentCount(this.moreResultsDisqusThreadIds)
      this.gaEvent('Click Tracking', 'Load More Results', 'SearchPage', this.moreResultsOffset + ' articles loaded')
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
        },
        {
          hid: 'twitter_title',
          name: 'twitter:title',
          content: 'Search Results - Gothamist'
        },
        {
          hid: 'twitter_description',
          name: 'twitter:description',
          content: 'Search Results - Gothamist'
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
.c-search {
  display: flex;
  justify-content: space-between;
}

.c-search__input {
  font-family: var(--font-family-body);
  letter-spacing: var(--letter-spacing-body);
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  display: inline-flex;
  justify-content: center;
}

.c-search-results__form .c-search__button {
  padding: var(--space-2);
  background-color: transparent;
  height: auto;
  width: 40px;
  display: inline-flex;
  justify-content: center;
  border: none;
  position: relative;
  cursor: pointer;
  @include media(">medium") {
    width: 60px;
  }
}

.search .card-image-wrapper,
.search .card-image {
  @include media("<medium") {
    min-width: 100px;
    width: 100px;
    height: 100px;
  }
}

.search .loading-icon {
  width: 75px !important;
  margin: 0;
}

.search .loading-icon path {
  stroke: RGB(var(--color-gray));
}

.search .button .loading-icon path {
  stroke: RGB(var(--color-text));
}
</style>

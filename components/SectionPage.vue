<template>
  <div class="section">
    <header class="c-section__header">
      <h1 class="c-section__heading u-font--secondary-style u-font--secondary">
        {{ name }}
      </h1>
    </header>
    <template v-if="!featuredStoriesLoaded">
      <loading-icon />
      <v-spacer size="double" />
    </template>
    <div class="l-container l-container--14col l-wrap">
      <section v-if="featuredStories && featuredStories.length === 2">
        <div class="featured-stories l-grid l-grid--2up l-grid--large-gutters">
          <v-card
            v-for="(featuredStory, index) in featuredStories"
            :key="index"
            class="gothamist u-space--double--bottom mod-vertical mod-large"
            :show-gallery-icon="hasGallery(featuredStory.leadAsset)"
            :image="getArticleImage(featuredStory.leadAsset, featuredStory.ancestry[0].slug, featuredStory.listingImage)"
            :image-height="150"
            :image-width="150"
            :title="featuredStory.title"
            :title-link="`/${featuredStory.ancestry[0].slug}/${featuredStory.meta.slug}`"
            :subtitle="featuredStory.description"
            :tags="featuredStory.sponsoredContent ? [{ name: 'sponsored' }] : ''"
          >
            <article-metadata
              :publish-date="!featuredStory.updatedDate ? fuzzyDateTime(featuredStory.meta.firstPublishedAt) : null"
              :updated-date="featuredStory.updatedDate ? fuzzyDateTime(featuredStory.updatedDate) : null"
            >
              <template
                v-if="featuredStory.legacyId"
                v-slot:comments
              >
                <v-counter
                  icon="comment"
                  :value="getCommentCountById(featuredStory.legacyId, moreResultsDisqusData)"
                  :href="`/${featuredStory.ancestry[0].slug}/${featuredStory.meta.slug}?to=comments`"
                />
              </template>
            </article-metadata>
          </v-card>
        </div>
        <hr
          class="u-border-accent u-hide-until--m"
          aria-hidden="true"
        >
        <v-spacer size="triple" />
      </section>
      <loading-icon v-if="!moreResultsLoaded" />
      <section v-if="filteredMoreResults">
        <div
          v-for="(chunk, chunkIndex) in moreResultsChunks"
          :key="chunkIndex"
        >
          <div>
            <v-card
              v-for="(story, index) in moreResultsChunks[chunkIndex].slice(0,4)"
              :key="index"
              class="gothamist u-space--double--bottom mod-large"
              :show-gallery-icon="hasGallery(story.leadAsset)"
              :image="getArticleImage(story.leadAsset, story.ancestry[0].slug, story.listingImage)"
              :image-height="150"
              :image-width="150"
              :title="story.title"
              :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
              :subtitle="story.description"
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
          <div
            v-if="chunkIndex%2 === 0"
            class="ad-container"
          >
            <hr
              class="u-border-accent u-hide-until--m u-space--double--bottom"
              aria-hidden="true"
            >
            ad goes here
            <hr
              class="u-border-accent u-hide-until--m u-space--double--top"
              aria-hidden="true"
            >
          </div>
          <div>
            <v-card
              v-for="(story, index) in moreResultsChunks[chunkIndex].slice(4,11)"
              :key="index"
              class="gothamist u-space--double--bottom mod-large"
              :show-gallery-icon="hasGallery(story.leadAsset)"
              :image="getArticleImage(story.leadAsset, story.ancestry[0].slug, story.listingImage)"
              :image-height="150"
              :image-width="150"
              :title="story.title"
              :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
              :subtitle="story.description"
              :tags="story.sponsoredContent ? [{ name: 'sponsored' }] : ''"
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
        </div>
        <v-spacer size="double" />
        <div
          v-if="moreResults && moreResults.length > 0"
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
  name: 'Section',
  components: {
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    LoadingIcon: () => import('nypr-design-system-vue/src/components/animations/LoadingIcon'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [gtm, disqus],
  props: {
    name: {
      type: String,
      default: null
    },
    descendantOf: {
      type: Number,
      default: null,
      required: true
    }
  },
  async fetch () {
    // get featured stories
    await this.$axios
      .get('pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&descendant_of=' + this.descendantOf + '&limit=2&show_as_feature=true')
      .then((response) => {
        this.featuredStories = response.data.items
        response.data.items.forEach((item) => {
          this.featuredStoriesDisqusThreadIds.push(item.legacyId)
        })
        this.featuredStoriesLoaded = true
      })
  },
  data () {
    return {
      featuredStories: null,
      featuredStoriesDisqusThreadIds: [],
      featuredStoriesDisqusData: null,
      featuredStoriesLoaded: false,
      moreResults: [],
      moreResultsDisqusThreadIds: [],
      moreResultsDisqusData: null,
      moreResultsLoaded: false,
      moreResultsOffset: 0
    }
  },
  computed: {
    ...mapState('global', {
      defaultImage: state => state.defaultImage,
      defaultImageArts: state => state.defaultImageArts,
      defaultImageFood: state => state.defaultImageFood,
      defaultImageNews: state => state.defaultImageNews
    }),
    filteredMoreResults () {
      // de-dupe the results: take out the 2 featured stories
      if (this.featuredStories && this.featuredStories.length === 2) {
        let tempArray = this.moreResults
        tempArray = tempArray.filter((item) => {
          return (item.id !== this.featuredStories[0].id && item.id !== this.featuredStories[1].id)
        })
        return tempArray
      } else {
        return this.moreResults
      }
    },
    moreResultsChunks () {
      const chunkedArray = []
      const chunkSize = 6
      let index = 0
      while (index < this.filteredMoreResults.length) {
        chunkedArray.push(this.filteredMoreResults.slice(index, chunkSize + index))
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
        .get('/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&descendant_of=' + this.descendantOf + '&limit=12&offset=' + this.moreResultsOffset)
        .then((response) => {
          this.moreResults = this.moreResults.concat(response.data.items)
          this.moreResultsOffset += 12
          this.moreResultsLoaded = true
          response.data.items.forEach((item) => {
            this.moreResultsDisqusThreadIds.push(item.legacyId)
          })
        })
      this.moreResultsDisqusData = await this.getCommentCount(this.moreResultsDisqusThreadIds)
      this.gaEvent('Click Tracking', 'Load More Results', 'SectionPage', this.moreResultsOffset + ' articles loaded')
    },
    hasGallery,
    search () {
      this.moreResults = []
      this.moreResultsDisqusThreadIds = []
      this.moreResultsDisqusData = null
      this.moreResultsOffset = 0
      this.getMoreResults()
    }
  }
}
</script>

<style lang="scss">
.ad-container {
  padding: var(--space-2) 0 var(--space-6);
  font-style: italic;
}

.button.more-results {
  background-color: RGB(var(--color-banana-yellow));
  max-width: 310px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: var(--font-size-6);
  font-weight: 700;
  letter-spacing: 2px;

  &:hover {
    background-color: RGB(var(--color-banana-yellow));
  }
}

.section .featured-stories .card.mod-vertical {
  @include media("<medium") {
    flex-direction: row;
    margin-bottom: 0;
  }
}

.section .featured-stories .card.mod-vertical .card-details {
  @include media("<medium") {
    margin: 0 0 0 var(--space-3);
    padding-top: 0;
  }
}

.section .card.gothamist.mod-large .card-title {
  @include media("<medium") {
    margin: 0;
  }
}

.section .card-image-wrapper,
.section .card-image {
  @include media("<medium") {
    min-width: 100px;
    width: 100px;
    height: 100px;
  }
}

.section .loading-icon {
  width: 75px !important;
  margin: 0;
}

.section .loading-icon path {
  stroke: RGB(var(--color-gray));
}

.section .button .loading-icon path {
  stroke: RGB(var(--color-text));
}
</style>

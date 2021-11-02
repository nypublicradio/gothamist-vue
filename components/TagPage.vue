<template>
  <div
    v-if="slug"
    class="tags-page"
    :class="{'curated': designedHeader }"
  >
    <!-- designed header -->
    <div
      v-if="designedHeader && designedHeader.length > 0"
      class="tags-page-listing-image"
    >
      <img
        :alt="designedHeader[0].value.image.alt"
        :src="designedHeader[0].value.image.file"
      >
      <v-spacer size="triple" />
    </div>

    <!-- header & top page zone -->

    <div class="gothamist-banners l-container l-container--xl l-wrap">
      <gothamist-breaking-news class="l-container l-container--16col" />
      <gothamist-marketing-banners class="l-container l-container--16col" />
    </div>

    <div class="l-container l-container--14col l-wrap">
      <header v-if="title">
        <h1 class="tags-page-header">
          {{ title }}
        </h1>
      </header>
      <v-spacer size="double" />
      <section v-if="topPageZone">
        <v-streamfield :streamfield="topPageZone" />
        <v-spacer size="double" />
      </section>
    </div>
    <!-- results -->
    <loading-icon v-if="$fetchState.pending" />
    <div class="l-container l-container--14col l-wrap">
      <template v-if="!designedHeader">
        <hr
          class="u-border-accent u-hide-until--m u-space--double--bottom"
          aria-hidden="true"
        >
      </template>
      <section v-if="results && results.length > 0 && moreResultsNuggets">
        <div
          v-for="(nugget, nuggetIndex) in moreResultsNuggets"
          :key="nuggetIndex"
        >
          <div>
            <v-card
              v-for="(story, index) in moreResultsNuggets[nuggetIndex].slice(0,3)"
              :key="index"
              class="gothamist u-space--double--bottom mod-large"
              :show-gallery-icon="hasGallery(story.leadAsset)"
              :image="getArticleImage(story.leadAsset, story.ancestry[0].slug, story.listingImage)"
              :image-height="560"
              :image-width="413"
              :image-max-height="getArticleImageHeight(story.leadAsset, story.listingImage) || Infinity"
              :image-max-width="getArticleImageWidth(story.leadAsset, story.listingImage) || Infinity"
              :title="story.title"
              :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
              :subtitle="story.description"
              :tags="formatTags(story.ancestry[0].title, story.ancestry[0].slug, story.sponsoredContent, story.tags)"
            >
              <article-metadata
                :publish-date="!story.updatedDate ? (fuzzyDateTime(story.publicationDate) || fuzzyDateTime(story.meta.firstPublishedAt)) : null"
                :updated-date="story.updatedDate ? fuzzyDateTime(story.updatedDate) : null"
              >
                <template
                  v-if="getCommentCountById(String(story.legacyId || story.uuid), disqusData)"
                  v-slot:comments
                >
                  <v-counter
                    icon="comment"
                    :value="getCommentCountById(String(story.legacyId || story.uuid), disqusData)"
                    :href="`/${story.ancestry[0].slug}/${story.meta.slug}#comments`"
                  />
                </template>
              </article-metadata>
            </v-card>
          </div>
          <section v-if="midPageZone && nuggetIndex === 0">
            <v-streamfield
              class="l-container l-container--10col article-body"
              :streamfield="midPageZone"
            />
            <v-spacer size="double" />
          </section>
          <div>
            <v-card
              v-for="(story, index) in moreResultsNuggets[nuggetIndex].slice(3,6)"
              :key="index"
              class="gothamist u-space--double--bottom mod-large"
              :show-gallery-icon="hasGallery(story.leadAsset)"
              :image="getArticleImage(story.leadAsset, story.ancestry[0].slug, story.listingImage)"
              :image-height="560"
              :image-width="413"
              :image-max-height="getArticleImageHeight(story.leadAsset, story.listingImage) || Infinity"
              :image-max-width="getArticleImageWidth(story.leadAsset, story.listingImage) || Infinity"
              :title="story.title"
              :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
              :subtitle="story.description"
              :tags="formatTags(story.ancestry[0].title, story.ancestry[0].slug, story.sponsoredContent, story.tags)"
            >
              <article-metadata
                :publish-date="!story.updatedDate ? (fuzzyDateTime(story.publicationDate) || fuzzyDateTime(story.meta.firstPublishedAt)) : null"
                :updated-date="story.updatedDate ? fuzzyDateTime(story.updatedDate) : null"
              >
                <template
                  v-if="getCommentCountById(String(story.legacyId || story.uuid), disqusData)"
                  v-slot:comments
                >
                  <v-counter
                    icon="comment"
                    :value="getCommentCountById(String(story.legacyId || story.uuid), disqusData)"
                    :href="`/${story.ancestry[0].slug}/${story.meta.slug}#comments`"
                  />
                </template>
              </article-metadata>
            </v-card>
          </div>
          <div
            v-if="nuggetIndex%2 === 0"
            class="ad-container"
          >
            <hr
              class="u-border-accent u-hide-until--m u-space--double--bottom"
              aria-hidden="true"
            >
            <div
              v-if="nuggetIndex === 0"
              key="interior_midpage_1"
              class="htlad-interior_midpage_1 ad-div mod-break-margins mod-ad-disclosure"
            />
            <div
              v-else
              key="interior_midpage_repeating"
              class="htlad-interior_midpage_repeating ad-div mod-break-margins mod-ad-disclosure"
            />
            <hr
              class="u-border-accent u-hide-until--m u-space--double--top"
              aria-hidden="true"
            >
          </div>
          <div>
            <v-card
              v-for="(story, index) in moreResultsNuggets[nuggetIndex].slice(6,13)"
              :key="index"
              class="gothamist u-space--double--bottom mod-large"
              :show-gallery-icon="hasGallery(story.leadAsset)"
              :image="getArticleImage(story.leadAsset, story.ancestry[0].slug, story.listingImage)"
              :image-height="560"
              :image-width="413"
              :image-max-height="getArticleImageHeight(story.leadAsset, story.listingImage) || Infinity"
              :image-max-width="getArticleImageWidth(story.leadAsset, story.listingImage) || Infinity"
              :title="story.title"
              :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
              :subtitle="story.description"
              :tags="formatTags(story.ancestry[0].title, story.ancestry[0].slug, story.sponsoredContent, story.tags)"
            >
              <article-metadata
                :publish-date="!story.updatedDate ? (fuzzyDateTime(story.publicationDate) || fuzzyDateTime(story.meta.firstPublishedAt)) : null"
                :updated-date="story.updatedDate ? fuzzyDateTime(story.updatedDate) : null"
              >
                <template
                  v-if="getCommentCountById(String(story.legacyId || story.uuid), disqusData)"
                  v-slot:comments
                >
                  <v-counter
                    icon="comment"
                    :value="getCommentCountById(String(story.legacyId || story.uuid), disqusData)"
                    :href="`/${story.ancestry[0].slug}/${story.meta.slug}#comments`"
                  />
                </template>
              </article-metadata>
            </v-card>
          </div>
        </div>
        <loading-icon v-if="$fetchState.pending && results.length > 0" />
        <v-spacer size="double" />
        <div
          v-if="results.length < totalCount && results.length > 0"
          class="l-container u-align-center"
        >
          <v-button
            class="more-results"
            :disabled="$fetchState.pending"
            @click="getMoreResults"
          >
            <span v-if="!$fetchState.pending">More Results</span>
            <span v-if="$fetchState.pending">Loading...</span>
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
  getArticleImageHeight,
  getArticleImageWidth,
  hasGallery
} = require('~/mixins/helpers')

export default {
  name: 'Section',
  mixins: [gtm, disqus],
  props: {
    designedHeader: {
      type: Array,
      default: null
    },
    midPageZone: {
      type: Array,
      default: null
    },
    slug: {
      type: String,
      default: null,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    topPageZone: {
      type: Array,
      default: null
    }
  },
  async fetch () {
    await this.$axios
      .get('pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=12&tag_slug=' + this.slug + '&offset=' + this.offset)
      .then((response) => {
        this.totalCount = response.data.meta.totalCount
        this.results = this.results.concat(response.data.items)
        this.offset += 12
        response.data.items.forEach((item) => {
          this.disqusThreadIds = this.disqusThreadIds || []
          this.disqusThreadIds.push(item.legacyId || item.uuid)
        })
        // if there are no live articles and there is no custom tag page for this tag, redirect to the 404 page
        if (this.totalCount === 0 && (!this.designedHeader || this.designedHeader.length === 0) && (!this.topPageZone || this.topPageZone.length === 0) && (!this.midPageZone || this.midPageZone.length === 0)) {
          return this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
        }
      })
  },
  data () {
    return {
      results: [],
      disqusThreadIds: [],
      disqusData: null,
      offset: 0,
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
      while (index < this.results.length) {
        nuggetArray.push(this.results.slice(index, nuggetSize + index))
        index += nuggetSize
      }
      return nuggetArray
    }
  },
  watch: {
    async disqusThreadIds () {
      this.disqusData = await this.getCommentCount(this.disqusThreadIds)
    }
  },
  methods: {
    formatTags,
    fuzzyDateTime,
    getArticleImage,
    getArticleImageHeight,
    getArticleImageWidth,
    async getMoreResults () {
      await this.$fetch()
      this.gaEvent('Click Tracking', 'Load More Results', 'TagPage', this.offset + ' articles loaded')
    },
    hasGallery
  }
}
</script>

<style lang="scss">
.ad-container {
  padding: var(--space-2) 0 var(--space-6);
  font-style: italic;
}

.tags-page.curated {
  margin-top: -70px;
}

.tags-page .tags-page-listing-image img {
  object-fit: cover;
  max-height: 95px;
  width: 100%;
  @include media(">medium") {
    max-height: 277px;
  }
}

.tags-page.curated header {
  padding-top: var(--space-8);
}

.tags-page .tags-page-header {
  width: fit-content;
  @include typeface(tags, 10);
  padding: var(--space-2) var(--space-3);
  background-color: RGB(var(--color-tag-highlight));
  color: RGB(var(--color-text-inverse));
  text-transform: lowercase;
  @include media(">medium") {
    @include typeface(tags, 14);
  }
}

.tags-page .streamfield {
  max-width: 100%;
}

.tags-page .streamfield iframe {
  margin: auto;
}

.tags-page .loading-icon {
  width: 75px !important;
  margin: 0;
}

.tags-page .loading-icon path {
  stroke: RGB(var(--color-gray));
}

.tags-page .button .loading-icon path {
  stroke: RGB(var(--color-text));
}
</style>

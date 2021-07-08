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
    <loading-icon v-if="!moreResultsLoaded" />
    <div class="l-container l-container--14col l-wrap">
      <template v-if="!designedHeader">
        <hr
          class="u-border-accent u-hide-until--m u-space--double--bottom"
          aria-hidden="true"
        >
      </template>
      <section v-if="moreResults && moreResults.length > 0 && moreResultsNuggets">
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
          <div
            v-if="nuggetIndex%2 === 0"
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
              v-for="(story, index) in moreResultsNuggets[nuggetIndex].slice(6,13)"
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
        </div>
        <loading-icon v-if="!moreResultsLoaded && moreResults.length > 0" />
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
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    VStreamfield: () => import('../components/VStreamfield')
  },
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
  data () {
    return {
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
    this.getMoreResults()
  },
  methods: {
    formatTags,
    fuzzyDateTime,
    getArticleImage,
    async getMoreResults () {
      this.moreResultsLoaded = false
      await this.$axios
        .get('pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=12&tag_slug=' + this.slug + '&offset=' + this.moreResultsOffset)
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
      this.gaEvent('Click Tracking', 'Load More Results', 'TagPage', this.moreResultsOffset + ' articles loaded')
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

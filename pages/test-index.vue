<template>
  <div>
    <div class="l-container l-container--xl l-wrap">
      <v-spacer />
      <!-- featured area -->
      <section
        v-if="featuredStories"
        class="c-featured-blocks"
      >
        <h2 class="c-featured-blocks__heading">
          <span class="c-featured-blocks__heading-icon o-icon u-icon--s u-path-fill--quaternary">
            <svg
              role="img"
              class="o-arrow-stylish-arrow-icon"
              viewBox="3 3 18 18"
              width="40"
              height="40"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>arrow</title>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.236 5L19.836 7.736L21 8.906L14.772 15.128L16.884 17.24L6.174 19.04L5.01 17.894L3 10.232L6.552 11.702L13.236 5ZM5.898 17L13.416 15.71L11.214 14.792L17.886 8.126L13.5 6.326L6.816 12.986L4.614 12.062L5.898 17.006V17Z"
                fill="black"
              />
            </svg>
          </span>
          Featured
        </h2>
        <div class="l-grid featured-grid">
          <!-- left column / large featured card -->
          <v-card
            :show-gallery-icon="hasGallery(featuredStories[0].leadAsset)"
            :title="featuredStories[0].title"
            :title-link="`/${featuredStories[0].ancestry[0].slug}/${featuredStories[0].meta.slug}`"
            :subtitle="featuredStories[0].description"
            :image="getArticleImage(featuredStories[0].leadAsset, featuredStories[0].ancestry[0].slug)"
            :image-height="533"
            :image-width="800"
            class="featured-grid-col1 gothamist mod-vertical mod-large"
            :tags="formatTags(featuredStories[0].ancestry[0].title, featuredStories[0].ancestry[0].slug, featuredStories[0].sponsoredContent, featuredStories[0].tags)"
          >
            <article-metadata
              :publish-date="!featuredStories[0].updatedDate ? fuzzyDateTime(featuredStories[0].meta.firstPublishedAt) : null"
              :updated-date="featuredStories[0].updatedDate ? fuzzyDateTime(featuredStories[0].updatedDate) : null"
            >
              <template
                v-if="featuredStoriesDisqusData && featuredStoriesDisqusData.data.response[0]"
                v-slot:comments
              >
                <v-counter
                  icon="comment"
                  :value="featuredStoriesDisqusData.data.response[0].posts"
                  :href="`/${featuredStories[0].ancestry[0].slug}/${featuredStories[0].meta.slug}?to=comments`"
                />
              </template>
            </article-metadata>
          </v-card>
          <!--- right column / small featured cards -->
          <ul>
            <li
              v-for="(story, index) in featuredStories.slice(1,featuredStories.length)"
              :key="index"
            >
              <v-card
                :show-gallery-icon="hasGallery(story.leadAsset)"
                class="gothamist mod-small u-space--double--bottom"
                :image="getArticleImage(story.leadAsset, story.ancestry[0].slug)"
                :image-height="150"
                :image-width="150"
                :title="story.title"
                :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
                :tags="formatTags(story.ancestry[0].title, story.ancestry[0].slug, story.sponsoredContent, story.tags)"
              >
                <article-metadata
                  :publish-date="!story.updatedDate ? fuzzyDateTime(story.meta.firstPublishedAt) : null"
                  :updated-date="story.updatedDate ? fuzzyDateTime(story.updatedDate) : null"
                />
              </v-card>
            </li>
          </ul>
        </div>
      </section>
      <v-spacer />
      <!-- news river -->
    </div>
    <section
      v-if="river"
    >
      <!-- section 1 -->
      <div class="l-container l-container--14col l-wrap">
        <div class="l-grid l-grid--large-gutters l-grid--right-rail">
          <div>
            <v-card
              v-for="(story, index) in filteredRiver.slice(0,7)"
              :key="index"
              class="gothamist u-space--double--bottom"
              :class="story.sponsoredContent ? 'mod-vertical mod-large' : 'mod-small'"
              :show-gallery-icon="hasGallery(story.leadAsset)"
              :image="getArticleImage(story.leadAsset, story.ancestry[0].slug)"
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
                <template v-slot:comments>
                  <v-counter
                    icon="comment"
                    :value="40"
                    :href="`/${story.ancestry[0].slug}/${story.meta.slug}?to=comments`"
                  />
                </template>
              </article-metadata>
            </v-card>
          </div>
          <div class="ad-container">
            ad goes here
          </div>
        </div>
        <v-spacer />
      </div>
      <div class="l-container ad-container">
        ad goes here
      </div>
      <!-- section 2 -->
      <div class="l-container l-container--10col l-wrap">
        <v-spacer size="triple" />
        <v-card
          v-for="(story, index) in filteredRiver.slice(7,14)"
          :key="index"
          class="gothamist u-space--double--bottom"
          :class="story.sponsoredContent ? 'mod-vertical mod-large' : 'mod-small'"
          :show-gallery-icon="hasGallery(story.leadAsset)"
          :image="getArticleImage(story.leadAsset, story.ancestry[0].slug)"
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
            <template v-slot:comments>
              <v-counter
                icon="comment"
                :value="40"
                :href="`/${story.ancestry[0].slug}/${story.meta.slug}?to=comments`"
              />
            </template>
          </article-metadata>
        </v-card>
        <v-spacer />
      </div>
      <div class="l-container ad-container">
        ad goes here
      </div>
      <!-- section 3 -->
      <div class="l-container l-container--14col l-wrap">
        <v-spacer size="triple" />
        <div class="l-grid l-grid--large-gutters l-grid--right-rail">
          <div>
            <v-card
              v-for="(story, index) in filteredRiver.slice(14,21)"
              :key="index"
              class="gothamist u-space--double--bottom"
              :class="story.sponsoredContent ? 'mod-vertical mod-large' : 'mod-small'"
              :show-gallery-icon="hasGallery(story.leadAsset)"
              :image="getArticleImage(story.leadAsset, story.ancestry[0].slug)"
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
                <template v-slot:comments>
                  <v-counter
                    icon="comment"
                    :value="40"
                    :href="`/${story.ancestry[0].slug}/${story.meta.slug}?to=comments`"
                  />
                </template>
              </article-metadata>
            </v-card>
          </div>
          <div class="ad-container">
            ad goes here
          </div>
        </div>
        <v-spacer />
      </div>
      <homepage-donate-banner />
      <div class="l-container l-container--14col l-wrap">
        <v-spacer size="triple" />
        <div class="l-grid l-grid--large-gutters l-grid--right-rail">
          <div>
            <v-card
              v-for="(story, index) in filteredRiver.slice(21,28)"
              :key="index"
              class="gothamist u-space--double--bottom"
              :class="story.sponsoredContent ? 'mod-vertical mod-large' : 'mod-small'"
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
                <template v-slot:comments>
                  <v-counter
                    icon="comment"
                    :value="40"
                    :href="`/${story.ancestry[0].slug}/${story.meta.slug}?to=comments`"
                  />
                </template>
              </article-metadata>
            </v-card>
          </div>
          <div class="ad-container">
            ad goes here
          </div>
        </div>
        <v-spacer />
      </div>
      <!-- more results -->
      <template v-if="moreResults.length > 0">
        <div class="l-container l-container--14col l-wrap">
          <v-spacer size="triple" />
          <div
            v-for="(chunk, chunkIndex) in moreResultsChunks"
            :key="chunkIndex"
            class="l-grid l-grid--large-gutters l-grid--right-rail u-space--double--bottom"
          >
            <div>
              <v-card
                v-for="(story, index) in moreResultsChunks[chunkIndex]"
                :key="index"
                class="gothamist u-space--double--bottom"
                :class="story.sponsoredContent ? 'mod-vertical mod-large' : 'mod-small'"
                :show-gallery-icon="hasGallery(story.leadAsset)"
                :image="getArticleImage(story.leadAsset, story.ancestry[0].slug)"
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
                  <template v-slot:comments>
                    <v-counter
                      icon="comment"
                      :value="40"
                      :href="`/${story.ancestry[0].slug}/${story.meta.slug}?to=comments`"
                    />
                  </template>
                </article-metadata>
              </v-card>
            </div>
            <div class="ad-container">
              ad goes here
            </div>
          </div>
          <v-spacer />
        </div>
      </template>
    </section>
    <v-spacer size="quad" />
    <div class="l-container l-container--14col l-wrap u-align-center">
      <v-button
        class="more-results"
        :disabled="!moreResultsLoaded"
        @click="getMoreResults"
      >
        <span v-if="moreResultsLoaded">More Results</span>
        <loading-icon v-if="!moreResultsLoaded" />
      </v-button>
      <v-spacer size="quad" />
      <read-more-in />
    </div>
    <v-spacer size="quad" />
  </div>
</template>

<script>
import disqus from '@/mixins/disqus'
import gtm from '@/mixins/gtm'
import { mapState } from 'vuex'

const {
  formatTags,
  fuzzyDateTime,
  getArticleImage,
  hasGallery
} = require('~/mixins/helpers')
export default {
  name: 'HomePage', // this is the template name which is used for GTM
  components: {
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    HomepageDonateBanner: () => import('../components/HomepageDonateBanner'),
    LoadingIcon: () => import('nypr-design-system-vue/src/components/animations/LoadingIcon'),
    ReadMoreIn: () => import('../components/ReadMoreIn'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [disqus, gtm],
  async fetch () {
    // get featured stories
    await this.$axios
      .get('/pages/?type=news.ArticlePage&fields=ancestry%2Cdescription%2Clead_asset%2Clegacy_id%2Clisting_image%2Cpublication_date%2Cshow_as_feature%2Csponsored_content%2Ctags%2Cupdated_date%2Curl%2Cuuid&order=-publication_date&show_on_index_listing=true&limit=4&show_as_feature=true&sponsored_content=false')
      .then((response) => {
        this.featuredStories = response.data.items
        response.data.items.forEach((item) => {
          this.featuredStoriesDisqusThreadIds.push(item.uuid)
        })
      })
    // get the article river
    await this.$axios
      .get('/pages/?type=news.ArticlePage&fields=ancestry%2Cdescription%2Clead_asset%2Clegacy_id%2Clisting_image%2Cpublication_date%2Cshow_as_feature%2Csponsored_content%2Ctags%2Cupdated_date%2Curl%2Cuuid&order=-publication_date&show_on_index_listing=true&limit=32')
      .then(response => (
        this.river = response.data.items
      ))
  },
  data () {
    return {
      featuredStories: null,
      featuredStoriesDisqusThreadIds: [],
      featuredStoriesDisqusData: null,
      moreResults: [],
      moreResultsLoaded: true,
      offset: 32,
      river: null
    }
  },
  computed: {
    ...mapState('global', {
      defaultImage: state => state.defaultImage,
      defaultImageArts: state => state.defaultImageArts,
      defaultImageFood: state => state.defaultImageFood,
      defaultImageNews: state => state.defaultImageNews
    }),
    filteredRiver () {
      // de-dupe the river: take out the 4 featured stories
      let tempArray = this.river
      tempArray = tempArray.filter((item) => {
        return (item.id !== this.featuredStories[0].id && item.id !== this.featuredStories[1].id && item.id !== this.featuredStories[2].id && item.id !== this.featuredStories[3].id)
      })
      return tempArray
    },
    moreResultsChunks () {
      const chunkedArray = []
      const chunkSize = 8
      let index = 0
      while (index < this.moreResults.length) {
        chunkedArray.push(this.moreResults.slice(index, chunkSize + index))
        index += chunkSize
      }
      return chunkedArray
    }
  },
  async mounted () {
    // get disqus comment counts
    this.featuredStoriesDisqusData = await this.getCommentCount(this.featuredStoriesDisqusThreadIds)
  },
  methods: {
    formatTags,
    fuzzyDateTime,
    getArticleImage,
    async getMoreResults () {
      this.moreResultsLoaded = false
      await this.$axios
        .get('/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=32&offset=' + this.offset)
        .then((response) => {
          this.moreResults = this.moreResults.concat(response.data.items)
          this.offset += 32
          this.moreResultsLoaded = true
        })
      this.gaEvent('Click Tracking', 'Load More Results', 'HomePage', this.offset + ' articles loaded')
    },
    hasGallery
  }
}
</script>

<style lang="scss">
.c-featured-blocks {
  padding: var(--space-7) 0 0;
  @include media(">medium") {
    padding: var(--space-7) var(--space-7) 0;
  }
}

.featured-grid {
  grid-template-columns: 1fr;
  @media all and (min-width: 1100px) {
    grid-gap: 50px;
    grid-template-columns: 1fr 360px;
  }
}

.featured-grid .card.featured-grid-col1 {
  @include media(">large") {
    width: 590px;
    max-width: 590px;
  }
}

.card.gothamist.mod-large .card-image-wrapper {
  width: 100%;
  min-width: 100%;
  @include media("<large") {
    height: 300px;
  }
  @include media(">large") {
    width: 560px;
    max-width: 100%;
  }
}

.featured-grid .card.gothamist.mod-large .card-title .o-gallery-icon {
  height: 20px;
  margin: 0 0 -2px;
}

//.featured-grid-col1 {
//  margin-bottom: -100px;
//  padding: 0 var(--space-3);
//  background-color: RGB(var(--color-background));
//}

.ad-container {
  padding: var(--space-4);
  font-style: italic;
}

.homepage .l-grid--right-rail {
  display: none;
  @include media(">large") {
    display: grid;
  }
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
</style>

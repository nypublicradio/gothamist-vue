<template>
  <div>
    <div class="l-container l-container--xl c-featured-blocks__wrapper">
      <v-spacer size="hex" />
      <!-- featured area -->
      <loading-icon v-if="!featuredStoriesLoaded" />
      <section
        v-if="featuredStories"
        class="c-featured-blocks l-wrap"
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
                v-if="featuredStories[0].legacyId"
                v-slot:comments
              >
                <v-counter
                  icon="comment"
                  :value="getCommentCountById(featuredStories[0].legacyId, featuredStoriesDisqusData) || 0"
                  :href="`/${featuredStories[0].ancestry[0].slug}/${featuredStories[0].meta.slug}#comments`"
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
                >
                  <template
                    v-if="story.legacyId && getCommentCountById(story.legacyId, featuredStoriesDisqusData) > 0"
                    v-slot:comments
                  >
                    <v-counter
                      icon="comment"
                      :value="getCommentCountById(story.legacyId, featuredStoriesDisqusData)"
                      :href="`/${story.ancestry[0].slug}/${story.meta.slug}#comments`"
                    />
                  </template>
                </article-metadata>
              </v-card>
            </li>
          </ul>
        </div>
      </section>
      <v-spacer />
    </div>
    <!-- sponsored story -->
    <div
      v-if="sponsoredStory && sponsoredStory.length > 0"
      class="l-container l-container--16col l-wrap"
    >
      <div class="c-sponsored-tout u-breakout o-border-accent">
        <h2 class="c-sponsored-tout__heading">
          Sponsored
        </h2>
        <v-card
          :show-gallery-icon="hasGallery(sponsoredStory[0].leadAsset)"
          :title="sponsoredStory[0].title"
          :title-link="`/${sponsoredStory[0].ancestry[0].slug}/${sponsoredStory[0].meta.slug}`"
          :subtitle="sponsoredStory[0].description"
          :image="getArticleImage(sponsoredStory[0].leadAsset, sponsoredStory[0].ancestry[0].slug)"
          :image-height="533"
          :image-width="800"
          class="gothamist mod-large"
          :tags="formatTags(sponsoredStory[0].ancestry[0].title, sponsoredStory[0].ancestry[0].slug, sponsoredStory[0].sponsoredContent, sponsoredStory[0].tags)"
        >
          <article-metadata
            :publish-date="!sponsoredStory[0].updatedDate ? fuzzyDateTime(sponsoredStory[0].meta.firstPublishedAt) : null"
            :updated-date="sponsoredStory[0].updatedDate ? fuzzyDateTime(sponsoredStory[0].updatedDate) : null"
          >
            <template
              v-if="sponsoredStory[0].legacyId && getCommentCountById(sponsoredStory[0].legacyId, sponsoredStoryDisqusData) > 0"
              v-slot:comments
            >
              <v-counter
                icon="comment"
                :value="getCommentCountById(sponsoredStory[0].legacyId, sponsoredStoryDisqusData)"
                :href="`/${sponsoredStory[0].ancestry[0].slug}/${sponsoredStory[0].meta.slug}#comments`"
              />
            </template>
          </article-metadata>
        </v-card>
      </div>
      <v-spacer size="triple" />
    </div>
    <!-- news river -->
    <loading-icon v-if="!riverLoaded" />
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
              :class="story.showAsFeature ? 'mod-vertical mod-large' : 'mod-small'"
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
                <template
                  v-if="story.legacyId && getCommentCountById(story.legacyId, riverDisqusData) > 0"
                  v-slot:comments
                >
                  <v-counter
                    icon="comment"
                    :value="getCommentCountById(story.legacyId, riverDisqusData) || 0"
                    :href="`/${story.ancestry[0].slug}/${story.meta.slug}#comments`"
                  />
                </template>
              </article-metadata>
            </v-card>
          </div>
          <div class="ad-wrapper-outer">
            <div class="ad-wrapper-inner">
              <div class="htlad-index_rectangle_1" />
              <div class="ad-label">
                Advertisement
              </div>
            </div>
          </div>
        </div>
        <v-spacer />
      </div>
      <div class="ad-wrapper-outer">
        <div class="ad-wrapper-inner">
          <div class="htlad-index_leaderboard_2" />
          <div class="ad-label">
            Advertisement
          </div>
        </div>
      </div>
      <!-- section 2 -->
      <div class="l-container l-container--10col l-wrap">
        <v-spacer size="triple" />
        <v-card
          v-for="(story, index) in filteredRiver.slice(7,14)"
          :key="index"
          class="gothamist u-space--double--bottom"
          :class="story.showAsFeature ? 'mod-vertical mod-large' : 'mod-small'"
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
            <template
              v-if="story.legacyId && getCommentCountById(story.legacyId, riverDisqusData) > 0"
              v-slot:comments
            >
              <v-counter
                icon="comment"
                :value="getCommentCountById(story.legacyId, riverDisqusData) || 0"
                :href="`/${story.ancestry[0].slug}/${story.meta.slug}#comments`"
              />
            </template>
          </article-metadata>
        </v-card>
        <v-spacer />
      </div>
      <div class="ad-wrapper-outer">
        <div class="ad-wrapper-inner">
          <div class="htlad-index_leaderboard_3" />
          <div class="ad-label">
            Advertisement
          </div>
        </div>
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
              :class="story.showAsFeature ? 'mod-vertical mod-large' : 'mod-small'"
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
                <template
                  v-if="story.legacyId && getCommentCountById(story.legacyId, riverDisqusData) > 0"
                  v-slot:comments
                >
                  <v-counter
                    icon="comment"
                    :value="getCommentCountById(story.legacyId, riverDisqusData) || 0"
                    :href="`/${story.ancestry[0].slug}/${story.meta.slug}#comments`"
                  />
                </template>
              </article-metadata>
            </v-card>
          </div>
          <div class="ad-wrapper-outer">
            <div class="ad-wrapper-inner">
              <div class="htlad-index_rectangle_2" />
              <div class="ad-label">
                Advertisement
              </div>
            </div>
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
              :class="story.showAsFeature ? 'mod-vertical mod-large' : 'mod-small'"
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
                  v-if="story.legacyId && getCommentCountById(story.legacyId, riverDisqusData) > 0"
                  v-slot:comments
                >
                  <v-counter
                    icon="comment"
                    :value="getCommentCountById(story.legacyId, riverDisqusData) || 0"
                    :href="`/${story.ancestry[0].slug}/${story.meta.slug}#comments`"
                  />
                </template>
              </article-metadata>
            </v-card>
          </div>
          <div class="ad-wrapper-outer">
            <div class="ad-wrapper-inner">
              <div class="htlad-index_rectangle_3" />
              <div class="ad-label">
                Advertisement
              </div>
            </div>
          </div>
        </div>
        <v-spacer />
      </div>
      <!-- more results -->
      <template v-if="filteredMoreResults.length > 0">
        <div class="l-container l-container--14col l-wrap">
          <v-spacer size="triple" />
          <div
            v-for="(nugget, nuggetIndex) in moreResultsNuggets"
            :key="nuggetIndex"
            class="l-grid l-grid--large-gutters l-grid--right-rail u-space--double--bottom"
          >
            <div>
              <v-card
                v-for="(story, index) in moreResultsNuggets[nuggetIndex]"
                :key="index"
                class="gothamist u-space--double--bottom"
                :class="story.showAsFeature ? 'mod-vertical mod-large' : 'mod-small'"
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
                  <template
                    v-if="story.legacyId && getCommentCountById(story.legacyId, moreResultsDisqusData) > 0"
                    v-slot:comments
                  >
                    <v-counter
                      icon="comment"
                      :value="getCommentCountById(story.legacyId, moreResultsDisqusData) || 0"
                      :href="`/${story.ancestry[0].slug}/${story.meta.slug}#comments`"
                    />
                  </template>
                </article-metadata>
              </v-card>
            </div>
            <div class="ad-wrapper-outer">
              <div class="ad-wrapper-inner">
                <div class="htlad-index_rectangle_repeating" />
                <div class="ad-label">
                  Advertisement
                </div>
              </div>
            </div>
          </div>
          <v-spacer />
        </div>
      </template>
      <loading-icon v-if="!moreResultsLoaded" />
    </section>
    <v-spacer size="quad" />
    <div class="l-container l-container--14col l-wrap u-align-center">
      <v-button
        v-if="moreResultsLoaded"
        class="more-results"
        @click="getMoreResults"
      >
        <span>More Results</span>
      </v-button>
      <v-button
        v-if="!moreResultsLoaded"
        class="more-results"
        disabled
      >
        <span>Loading...</span>
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
  hasGallery,
  isLessThan24Hours,
  isMoreThan24Hours,
  isLessThan48Hours,
  isMoreThan48Hours
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
          this.featuredStoriesDisqusThreadIds.push(item.legacyId)
        })
        this.featuredStoriesLoaded = true
      })
    // get sponsored story
    await this.$axios
      .get('/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=1&sponsored_content=true')
      .then((response) => {
        this.sponsoredStory = response.data.items
        this.sponsoredStory.forEach((sponsoredStory) => {
          // add thread ID to disqus array
          this.sponsoredStoryDisqusThreadIds.push(sponsoredStory.legacyId)
          // if the story is less than 24 hours old, do nothing and keep it in the sponsoredStory array
          // if the story is flagged as featured and is more than 24 hours old and less than 48 hours old
          if (sponsoredStory.showAsFeature && isMoreThan24Hours(sponsoredStory.publicationDate) && isLessThan48Hours(sponsoredStory.publicationDate)) {
            // replace the 4th featured story with this sponsored story
            this.featuredStories[3] = sponsoredStory
            this.featuredStoriesDisqusThreadIds[3] = this.sponsoredStoryDisqusThreadIds[0]
            // remove it from the sponsoredStory array
            this.sponsoredStory = []
          }
          // if the story is not flagged as featured and is more than 24 hours old and less than 48 hours old
          if (!sponsoredStory.showAsFeature && isMoreThan24Hours(sponsoredStory.publicationDate) && isLessThan48Hours(sponsoredStory.publicationDate)) {
            // it should appear in the river and nowhere else, remove it from the sponsoredStory array so it doesn't get de-duped
            this.sponsoredStory = []
          }
          // if the story is more than 48 hours old
          if (isMoreThan48Hours(sponsoredStory.publicationDate)) {
            // it should appear in the river and nowhere else, remove it from the sponsoredStory array so it doesn't get de-duped
            this.sponsoredStory = []
          }
        })
        this.sponsoredStoryLoaded = true
      })
    // get featured story
    await this.$axios
      .get('/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=1&show_as_feature=true&sponsored_content=true')
      .then((response) => {
        this.featuredStory = response.data.items
        this.featuredStory.forEach((featuredStory) => {
          // add thread ID to disqus array
          this.featuredStoryDisqusThreadIds.push(featuredStory.legacyId)
          // if the story is more than 24 hours old and less than 48 hours old
          if (isMoreThan24Hours(featuredStory.publicationDate) && isLessThan48Hours(featuredStory.publicationDate)) {
            // replace the 4th featured story with this sponsored story
            this.featuredStories[3] = featuredStory
            this.featuredStoriesDisqusThreadIds[3] = this.featuredStoryDisqusThreadIds[0]
          }
          // if the story is less than 24 hours old and there's no other sponsored story, make this the sponsored story
          if (isLessThan24Hours(featuredStory.publicationDate) && this.sponsoredStory.length === 0) {
            this.sponsoredStory = this.featuredStory
          }
          // if the story is more than 48 hours old, do nothing
        })
        this.featuredStoryLoaded = true
      })
    // get the article river
    await this.$axios
      .get('/pages/?type=news.ArticlePage&fields=ancestry%2Cdescription%2Clead_asset%2Clegacy_id%2Clisting_image%2Cpublication_date%2Cshow_as_feature%2Csponsored_content%2Ctags%2Cupdated_date%2Curl%2Cuuid&order=-publication_date&show_on_index_listing=true&limit=32')
      .then((response) => {
        this.river = response.data.items
        response.data.items.forEach((item) => {
          this.riverDisqusThreadIds.push(item.legacyId)
        })
        this.riverLoaded = true
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
      moreResultsLoaded: true,
      offset: 32,
      river: null,
      riverDisqusThreadIds: [],
      riverDisqusData: null,
      riverLoaded: false,
      sponsoredStory: null,
      sponsoredStoryDisqusThreadIds: [],
      sponsoredStoryDisqusData: null,
      sponsoredStoryLoaded: false,
      featuredStory: null,
      featuredStoryDisqusThreadIds: [],
      featuredStoryDisqusData: null,
      featuredStoryLoaded: false
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
      // de-dupe the river: take out the 4 featured stories
      let tempArray = this.moreResults
      tempArray = tempArray.filter((item) => {
        return (item.id !== this.featuredStories[0].id && item.id !== this.featuredStories[1].id && item.id !== this.featuredStories[2].id && item.id !== this.featuredStories[3].id)
      })
      return tempArray
    },
    filteredRiver () {
      // de-dupe the river: take out the 4 featured stories and the sponsored story
      let tempArray = this.river
      tempArray = tempArray.filter((item) => {
        if (this.sponsoredStory.length > 0) {
          return (item.id !== this.sponsoredStory[0].id && item.id !== this.featuredStories[0].id && item.id !== this.featuredStories[1].id && item.id !== this.featuredStories[2].id && item.id !== this.featuredStories[3].id)
        } else {
          return (item.id !== this.featuredStories[0].id && item.id !== this.featuredStories[1].id && item.id !== this.featuredStories[2].id && item.id !== this.featuredStories[3].id)
        }
      })
      return tempArray
    },
    moreResultsNuggets () {
      const nuggetArray = []
      const nuggetSize = 8
      let index = 0
      while (index < this.filteredMoreResults.length) {
        nuggetArray.push(this.filteredMoreResults.slice(index, nuggetSize + index))
        index += nuggetSize
      }
      return nuggetArray
    }
  },
  watch: {
    // get disqus comment counts
    async featuredStoriesDisqusThreadIds () {
      this.featuredStoriesDisqusData = await this.getCommentCount(this.featuredStoriesDisqusThreadIds)
    },
    async sponsoredStoryDisqusThreadIds () {
      this.sponsoredStoryDisqusData = await this.getCommentCount(this.sponsoredStoryDisqusThreadIds)
    },
    async riverDisqusThreadIds () {
      this.riverDisqusData = await this.getCommentCount(this.riverDisqusThreadIds)
    },
    async moreResultsDisqusThreadIds () {
      this.moreResultsDisqusData = await this.getCommentCount(this.moreResultsDisqusThreadIds)
    }
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
          response.data.items.forEach((item) => {
            this.moreResultsDisqusThreadIds.push(item.legacyId)
          })
        })
      this.moreResultsDisqusData = await this.getCommentCount(this.moreResultsDisqusThreadIds)
      this.gaEvent('Click Tracking', 'Load More Results', 'HomePage', this.offset + ' articles loaded')
    },
    hasGallery,
    isLessThan24Hours,
    isMoreThan24Hours,
    isLessThan48Hours,
    isMoreThan48Hours
  }
}
</script>

<style lang="scss">
.c-featured-blocks.l-wrap {
  padding: var(--space-7) var(--space-3) 0;
  @include media(">medium") {
    padding: var(--space-7) var(--space-7) 0!important;
  }
}

.c-featured-blocks__wrapper {
  @include media(">medium") {
    margin: 0 auto;
    padding-left: var(--space-3);
    padding-right: var(--space-3);
    width: 100%;
    position: relative;
  }
}

.c-featured-blocks .featured-grid {
  grid-template-columns: 1fr;
  @include media(">medium") {
    grid-template-columns: 1fr 300px;
  }
  @include media(">xlarge") {
    grid-gap: 35px;
    grid-template-columns: 1fr 370px;
  }
  @include media(">xxlarge") {
    grid-template-columns: 1fr 370px;
  }
}

.c-featured-blocks .featured-grid .card.featured-grid-col1 {
  @include media(">xlarge") {
    width: 590px;
    max-width: 590px;
  }
}
</style>

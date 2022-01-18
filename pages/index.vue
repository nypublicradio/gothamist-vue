<template>
  <div>
    <div class="l-container l-container--xl c-featured-blocks__wrapper">
      <!-- featured area -->
      <loading-icon v-if="$fetchState.pending" />
      <section
        v-if="featuredSection && !$fetchState.pending"
        class="c-featured-blocks l-wrap"
      >
        <h2 class="c-featured-blocks__heading">
          <span
            class="c-featured-blocks__heading-icon o-icon u-icon--s u-path-fill--quaternary"
          >
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
            class="featured-grid-col1 gothamist mod-vertical mod-large"
            :show-gallery-icon="hasGallery(featuredSection[0].leadAsset)"
            :title="getTitle(featuredSection[0])"
            :title-link="`/${featuredSection[0].ancestry[0].slug}/${featuredSection[0].meta.slug}`"
            :subtitle="getSubtitle(featuredSection[0])"
            :image="
              getArticleImage(
                featuredSection[0].leadAsset,
                featuredSection[0].ancestry[0].slug,
                featuredSection[0].listingImage
              )
            "
            :image-width="640"
            :image-height="426"
            :image-max-height="
              getArticleImageHeight(
                featuredSection[0].leadAsset,
                featuredSection[0].listingImage
              ) || 426
            "
            :image-max-width="
              getArticleImageWidth(
                featuredSection[0].leadAsset,
                featuredSection[0].listingImage
              ) || 640
            "
            :tags="
              formatTags(
                featuredSection[0].ancestry[0].title,
                featuredSection[0].ancestry[0].slug,
                featuredSection[0].sponsoredContent,
                featuredSection[0].tags
              )
            "
          >
            <article-metadata
              :publish-date="
                !featuredSection[0].updatedDate
                  ? fuzzyDateTime(featuredSection[0].publicationDate) ||
                    fuzzyDateTime(featuredSection[0].meta.firstPublishedAt)
                  : null
              "
              :updated-date="
                featuredSection[0].updatedDate
                  ? fuzzyDateTime(featuredSection[0].updatedDate)
                  : null
              "
            >
              <template
                v-if="
                  getCommentCountById(
                    String(
                      featuredSection[0].legacyId || featuredSection[0].uuid
                    ),
                    disqusData
                  )
                "
                v-slot:comments
              >
                <v-counter
                  icon="comment"
                  :value="
                    getCommentCountById(
                      String(
                        featuredSection[0].legacyId || featuredSection[0].uuid
                      ),
                      disqusData
                    ) || 0
                  "
                  :href="`/${featuredSection[0].ancestry[0].slug}/${featuredSection[0].meta.slug}#comments`"
                />
              </template>
            </article-metadata>
          </v-card>
          <!--- right column / small featured cards -->
          <ul>
            <li
              v-for="(story, index) in featuredSection.slice(
                1,
                featuredSection.length
              )"
              :key="index"
            >
              <v-card
                :show-gallery-icon="hasGallery(story.leadAsset)"
                class="gothamist mod-small u-space--double--bottom"
                :image="
                  getArticleImage(
                    story.leadAsset,
                    story.ancestry[0].slug,
                    story.listingImage
                  )
                "
                :image-width="$mq | mq({ xsmall: 100, medium: 150 })"
                :image-height="$mq | mq({ xsmall: 100, medium: 150 })"
                :image-max-height="
                  getArticleImageHeight(story.leadAsset, story.listingImage) ||
                    Infinity
                "
                :image-max-width="
                  getArticleImageWidth(story.leadAsset, story.listingImage) ||
                    Infinity
                "
                :title="getTitle(story)"
                :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
                :tags="
                  formatTags(
                    story.ancestry[0].title,
                    story.ancestry[0].slug,
                    story.sponsoredContent,
                    story.tags
                  )
                "
              >
                <article-metadata
                  :publish-date="
                    !story.updatedDate
                      ? fuzzyDateTime(story.publicationDate) ||
                        fuzzyDateTime(story.meta.firstPublishedAt)
                      : null
                  "
                  :updated-date="
                    story.updatedDate ? fuzzyDateTime(story.updatedDate) : null
                  "
                >
                  <template
                    v-if="
                      getCommentCountById(
                        String(story.legacyId || story.uuid),
                        disqusData
                      )
                    "
                    v-slot:comments
                  >
                    <v-counter
                      icon="comment"
                      :value="
                        getCommentCountById(
                          String(story.legacyId || story.uuid),
                          disqusData
                        )
                      "
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
      v-if="
        sponsoredSection && sponsoredSection.length > 0 && !$fetchState.pending
      "
      class="l-container l-container--16col l-wrap"
    >
      <div class="c-sponsored-tout u-breakout o-border-accent">
        <h2 class="c-sponsored-tout__heading">
          Sponsored
        </h2>
        <v-card
          class="gothamist mod-large"
          :show-gallery-icon="hasGallery(sponsoredSection[0].leadAsset)"
          :title="getTitle(sponsoredSection[0])"
          :title-link="`/${sponsoredSection[0].ancestry[0].slug}/${sponsoredSection[0].meta.slug}`"
          :subtitle="getSubtitle(sponsoredSection[0])"
          :image="
            getArticleImage(
              sponsoredSection[0].leadAsset,
              sponsoredSection[0].ancestry[0].slug,
              sponsoredSection[0].listingImage
            )
          "
          :image-height="426"
          :image-width="640"
          :image-max-height="
            getArticleImageHeight(
              sponsoredSection[0].leadAsset,
              sponsoredSection[0].listingImage
            ) || 426
          "
          :image-max-width="
            getArticleImageWidth(
              sponsoredSection[0].leadAsset,
              sponsoredSection[0].listingImage
            ) || 640
          "
          :tags="
            formatTags(
              sponsoredSection[0].ancestry[0].title,
              sponsoredSection[0].ancestry[0].slug,
              sponsoredSection[0].sponsoredContent,
              sponsoredSection[0].tags
            )
          "
        >
          <article-metadata
            :publish-date="
              !sponsoredSection[0].updatedDate
                ? fuzzyDateTime(sponsoredSection[0].publicationDate) ||
                  fuzzyDateTime(sponsoredSection[0].meta.firstPublishedAt)
                : null
            "
            :updated-date="
              sponsoredSection[0].updatedDate
                ? fuzzyDateTime(sponsoredSection[0].updatedDate)
                : null
            "
          >
            <template
              v-if="
                getCommentCountById(
                  String(
                    sponsoredSection[0].legacyId || sponsoredSection[0].uuid
                  ),
                  disqusData
                )
              "
              v-slot:comments
            >
              <v-counter
                icon="comment"
                :value="
                  getCommentCountById(
                    String(
                      sponsoredSection[0].legacyId || sponsoredSection[0].uuid
                    ),
                    disqusData
                  )
                "
                :href="`/${sponsoredSection[0].ancestry[0].slug}/${sponsoredSection[0].meta.slug}#comments`"
              />
            </template>
          </article-metadata>
        </v-card>
      </div>
      <v-spacer size="triple" />
    </div>
    <!-- news river -->
    <section v-if="riverSection && !$fetchState.pending">
      <!-- section 1 -->
      <div class="l-container l-container--16col l-wrap">
        <div class="l-grid l-grid--large-gutters l-grid--right-rail">
          <div>
            <v-card
              v-for="(story, index) in filteredRiver.slice(0, 7)"
              :key="index"
              class="gothamist u-space--double--bottom"
              :class="
                story.showAsFeature ? 'mod-vertical mod-large' : 'mod-small'
              "
              :show-gallery-icon="hasGallery(story.leadAsset)"
              :image="
                getArticleImage(
                  story.leadAsset,
                  story.ancestry[0].slug,
                  story.listingImage
                )
              "
              :image-width="story.showAsFeature ? 640 : 150"
              :image-height="story.showAsFeature ? 426 : 150"
              :image-max-height="
                getArticleImageHeight(story.leadAsset, story.listingImage) ||
                  Infinity
              "
              :image-max-width="
                getArticleImageWidth(story.leadAsset, story.listingImage) ||
                  Infinity
              "
              :title="getTitle(story)"
              :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
              :subtitle="getSubtitle(story)"
              :tags="
                formatTags(
                  story.ancestry[0].title,
                  story.ancestry[0].slug,
                  story.sponsoredContent,
                  story.tags
                )
              "
            >
              <article-metadata
                :publish-date="
                  !story.updatedDate
                    ? fuzzyDateTime(story.publicationDate) ||
                      fuzzyDateTime(story.meta.firstPublishedAt)
                    : null
                "
                :updated-date="
                  story.updatedDate ? fuzzyDateTime(story.updatedDate) : null
                "
              >
                <template
                  v-if="
                    getCommentCountById(
                      String(story.legacyId || story.uuid),
                      disqusData
                    )
                  "
                  v-slot:comments
                >
                  <v-counter
                    icon="comment"
                    :value="
                      getCommentCountById(
                        String(story.legacyId || story.uuid),
                        disqusData
                      ) || 0
                    "
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
      <mq-layout mq="medium+">
        <div class="ad-wrapper-outer">
          <div class="ad-wrapper-inner">
            <div class="htlad-index_leaderboard_2" />
            <div class="ad-label">
              Advertisement
            </div>
          </div>
        </div>
      </mq-layout>
      <!-- section 2 -->
      <div class="l-container l-container--10col l-wrap">
        <v-spacer size="triple" />
        <v-card
          v-for="(story, index) in filteredRiver.slice(7, 14)"
          :key="index"
          class="gothamist u-space--double--bottom"
          :class="story.showAsFeature ? 'mod-vertical mod-large' : 'mod-small'"
          :show-gallery-icon="hasGallery(story.leadAsset)"
          :image="
            getArticleImage(
              story.leadAsset,
              story.ancestry[0].slug,
              story.listingImage
            )
          "
          :image-width="story.showAsFeature ? 640 : 150"
          :image-height="story.showAsFeature ? 426 : 150"
          :image-max-height="
            getArticleImageHeight(story.leadAsset, story.listingImage) ||
              Infinity
          "
          :image-max-width="
            getArticleImageWidth(story.leadAsset, story.listingImage) ||
              Infinity
          "
          :title="getTitle(story)"
          :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
          :subtitle="getSubtitle(story)"
          :tags="
            formatTags(
              story.ancestry[0].title,
              story.ancestry[0].slug,
              story.sponsoredContent,
              story.tags
            )
          "
        >
          <article-metadata
            :publish-date="
              !story.updatedDate
                ? fuzzyDateTime(story.publicationDate) ||
                  fuzzyDateTime(story.meta.firstPublishedAt)
                : null
            "
            :updated-date="
              story.updatedDate ? fuzzyDateTime(story.updatedDate) : null
            "
          >
            <template
              v-if="
                getCommentCountById(
                  String(story.legacyId || story.uuid),
                  disqusData
                )
              "
              v-slot:comments
            >
              <v-counter
                icon="comment"
                :value="
                  getCommentCountById(
                    String(story.legacyId || story.uuid),
                    disqusData
                  ) || 0
                "
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
      <div class="l-container l-container--16col l-wrap">
        <v-spacer size="triple" />
        <div class="l-grid l-grid--large-gutters l-grid--right-rail">
          <div>
            <v-card
              v-for="(story, index) in filteredRiver.slice(14, 21)"
              :key="index"
              class="gothamist u-space--double--bottom"
              :class="
                story.showAsFeature ? 'mod-vertical mod-large' : 'mod-small'
              "
              :show-gallery-icon="hasGallery(story.leadAsset)"
              :image="
                getArticleImage(
                  story.leadAsset,
                  story.ancestry[0].slug,
                  story.listingImage
                )
              "
              :image-width="story.showAsFeature ? 640 : 150"
              :image-height="story.showAsFeature ? 426 : 150"
              :image-max-height="
                getArticleImageHeight(story.leadAsset, story.listingImage) ||
                  Infinity
              "
              :image-max-width="
                getArticleImageWidth(story.leadAsset, story.listingImage) ||
                  Infinity
              "
              :title="getTitle(story)"
              :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
              :subtitle="getSubtitle(story)"
              :tags="
                formatTags(
                  story.ancestry[0].title,
                  story.ancestry[0].slug,
                  story.sponsoredContent,
                  story.tags
                )
              "
            >
              <article-metadata
                :publish-date="
                  !story.updatedDate
                    ? fuzzyDateTime(story.publicationDate) ||
                      fuzzyDateTime(story.meta.firstPublishedAt)
                    : null
                "
                :updated-date="
                  story.updatedDate ? fuzzyDateTime(story.updatedDate) : null
                "
              >
                <template
                  v-if="
                    getCommentCountById(
                      String(story.legacyId || story.uuid),
                      disqusData
                    )
                  "
                  v-slot:comments
                >
                  <v-counter
                    icon="comment"
                    :value="
                      getCommentCountById(
                        String(story.legacyId || story.uuid),
                        disqusData
                      ) || 0
                    "
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
              v-for="(story, index) in filteredRiver.slice(21, 28)"
              :key="index"
              class="gothamist u-space--double--bottom"
              :class="
                story.showAsFeature ? 'mod-vertical mod-large' : 'mod-small'
              "
              :show-gallery-icon="hasGallery(story.leadAsset)"
              :image="
                getArticleImage(
                  story.leadAsset,
                  story.ancestry[0].slug,
                  story.listingImage
                )
              "
              :image-width="story.showAsFeature ? 640 : 150"
              :image-height="story.showAsFeature ? 426 : 150"
              :image-max-height="
                getArticleImageHeight(story.leadAsset, story.listingImage) ||
                  Infinity
              "
              :image-max-width="
                getArticleImageWidth(story.leadAsset, story.listingImage) ||
                  Infinity
              "
              :title="getTitle(story)"
              :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
              :subtitle="getSubtitle(story)"
              :tags="
                formatTags(
                  story.ancestry[0].title,
                  story.ancestry[0].slug,
                  story.sponsoredContent,
                  story.tags
                )
              "
            >
              <article-metadata
                :publish-date="
                  !story.updatedDate
                    ? fuzzyDateTime(story.publicationDate) ||
                      fuzzyDateTime(story.meta.firstPublishedAt)
                    : null
                "
                :updated-date="
                  story.updatedDate ? fuzzyDateTime(story.updatedDate) : null
                "
              >
                <template
                  v-if="
                    getCommentCountById(
                      String(story.legacyId || story.uuid),
                      disqusData
                    )
                  "
                  v-slot:comments
                >
                  <v-counter
                    icon="comment"
                    :value="
                      getCommentCountById(
                        String(story.legacyId || story.uuid),
                        disqusData
                      ) || 0
                    "
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
                :class="
                  story.showAsFeature ? 'mod-vertical mod-large' : 'mod-small'
                "
                :show-gallery-icon="hasGallery(story.leadAsset)"
                :image="
                  getArticleImage(
                    story.leadAsset,
                    story.ancestry[0].slug,
                    story.listingImage
                  )
                "
                :image-width="story.showAsFeature ? 640 : 150"
                :image-height="story.showAsFeature ? 426 : 150"
                :image-max-height="
                  getArticleImageHeight(story.leadAsset, story.listingImage) ||
                    Infinity
                "
                :image-max-width="
                  getArticleImageWidth(story.leadAsset, story.listingImage) ||
                    Infinity
                "
                :title="getTitle(story)"
                :title-link="`/${story.ancestry[0].slug}/${story.meta.slug}`"
                :subtitle="getSubtitle(story)"
                :tags="
                  formatTags(
                    story.ancestry[0].title,
                    story.ancestry[0].slug,
                    story.sponsoredContent,
                    story.tags
                  )
                "
              >
                <article-metadata
                  :publish-date="
                    !story.updatedDate
                      ? fuzzyDateTime(story.publicationDate) ||
                        fuzzyDateTime(story.meta.firstPublishedAt)
                      : null
                  "
                  :updated-date="
                    story.updatedDate ? fuzzyDateTime(story.updatedDate) : null
                  "
                >
                  <template
                    v-if="
                      getCommentCountById(
                        String(story.legacyId || story.uuid),
                        disqusData
                      )
                    "
                    v-slot:comments
                  >
                    <v-counter
                      icon="comment"
                      :value="
                        getCommentCountById(
                          String(story.legacyId || story.uuid),
                          disqusData
                        ) || 0
                      "
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
      <v-button v-if="!moreResultsLoaded" class="more-results" disabled>
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
import axios from 'axios'

const {
  formatTags,
  fuzzyDateTime,
  getArticleImage,
  getArticleImageHeight,
  getArticleImageWidth,
  hasGallery,
  isLessThan24Hours,
  isMoreThan24Hours,
  isLessThan48Hours,
  getTitle,
  getSubtitle
} = require('~/mixins/helpers')

export default {
  name: 'HomePage', // this is the template name which is used for GTM
  mixins: [disqus, gtm],
  async fetch () {
    // get default featured stories - i.e. the four latest featured stories
    const mainRequest = this.$axios.get(
      '/pages/?type=news.ArticlePage&fields=ancestry%2Cdescription%2Clead_asset%2Clegacy_id%2Clisting_image%2Cpublication_date%2Cshow_as_feature%2Csponsored_content%2Ctags%2Cupdated_date%2Curl%2Cuuid%2Clisting_title%2Clisting_summary&order=-publication_date&show_on_index_listing=true&limit=4&show_as_feature=true&sponsored_content=false'
    )
    // get the article river
    const riverRequest = this.$axios.get(
      '/pages/?type=news.ArticlePage&fields=ancestry%2Cdescription%2Clead_asset%2Clegacy_id%2Clisting_image%2Cpublication_date%2Cshow_as_feature%2Csponsored_content%2Ctags%2Cupdated_date%2Curl%2Cuuid%2Clisting_title%2Clisting_summary&order=-publication_date&show_on_index_listing=true&limit=32'
    )
    // get the sponsored content
    const sponsoredContentRequest = this.$axios.get(
      '/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=1&sponsored_content=true'
    )
    // get the featured sponsored content
    const featuredSponsoredContentRequest = this.$axios.get(
      '/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=1&show_as_feature=true&sponsored_content=true'
    )
    // get the curated collection that is attached to the homepage
    const curatedContentRequest = this.$axios.get('/pages/find/?html_path=/')

    await axios
      .all([
        mainRequest,
        riverRequest,
        sponsoredContentRequest,
        featuredSponsoredContentRequest,
        curatedContentRequest
      ])
      .then(
        axios.spread(
          (
            main,
            river,
            sponsoredContent,
            featuredSponsoredContent,
            curatedContent
          ) => {
            const mainStories = main.data.items
            const riverStories = river.data.items
            const sponsoredContentStories = sponsoredContent.data.items.filter(
              (story) => {
                return isLessThan24Hours(story.publicationDate)
              }
            )
            const featuredSponsoredContentStories =
              featuredSponsoredContent.data.items.filter((story) => {
                return (
                  isMoreThan24Hours(story.publicationDate) &&
                  isLessThan48Hours(story.publicationDate)
                )
              })
            const curatedContentStories =
              curatedContent.data.pageCollectionRelationship[0]?.pages || []

            // set featuredSection to be the top four featured stories
            this.featuredSection = mainStories.slice(0, 4)
            // if there is a collection of curated content on the homepage replace with the curated content
            this.featuredSection.forEach((story, index) => {
              if (curatedContentStories[index]) {
                this.featuredSection[index] = curatedContentStories[index]
              }
            })
            // if there is a featured sponsored story (24 to 48 hours old) replace the fourth story with the sponsored story
            if (featuredSponsoredContentStories[0]) {
              this.featuredSection[3] = featuredSponsoredContentStories[0]
            }

            this.sponsoredSection = sponsoredContentStories

            this.riverSection = riverStories

            this.disqusThreadIds = [].concat(
              this.featuredSection.map(story =>
                String(story.legacyId || story.uuid)
              ),
              this.sponsoredSection.map(story =>
                String(story.legacyId || story.uuid)
              ),
              this.riverSection.map(story =>
                String(story.legacyId || story.uuid)
              )
            )
          }
        )
      )
  },
  data () {
    return {
      featuredSection: null,
      sponsoredSection: null,
      riverSection: null,
      disqusThreadIds: [],
      disqusData: null,
      moreResults: [],
      moreResultsLoaded: true,
      offset: 32
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
        return (
          item.id !== this.featuredSection[0].id &&
          item.id !== this.featuredSection[1].id &&
          item.id !== this.featuredSection[2].id &&
          item.id !== this.featuredSection[3].id
        )
      })
      return tempArray
    },
    filteredRiver () {
      // de-dupe the river: take out the 4 featured stories and the sponsored story

      let filteredRiver = this.riverSection.filter((story) => {
        const featuredIDs = this.featuredSection.map(item => item.id)
        return !featuredIDs.includes(story.id)
      })

      if (this.sponsoredSection && this.sponsoredSection.length > 0) {
        filteredRiver = filteredRiver.filter((story) => {
          return story.id !== this.sponsoredSection?.[0].id
        })
      }
      return filteredRiver
    },
    moreResultsNuggets () {
      const nuggetArray = []
      const nuggetSize = 8
      let index = 0
      while (index < this.filteredMoreResults.length) {
        nuggetArray.push(
          this.filteredMoreResults.slice(index, nuggetSize + index)
        )
        index += nuggetSize
      }
      return nuggetArray
    }
  },
  watch: {
    // get disqus comment counts
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
    getTitle,
    getSubtitle,
    async getMoreResults () {
      this.moreResultsLoaded = false
      await this.$axios
        .get(
          '/pages/?type=news.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=32&offset=' +
            this.offset
        )
        .then((response) => {
          this.moreResults = this.moreResults.concat(response.data.items)
          this.offset += 32
          this.moreResultsLoaded = true
          response.data.items.forEach((item) => {
            this.disqusThreadIds.push(item.legacyId || item.uuid)
          })
        })
      this.disqusData = await this.getCommentCount(this.disqusThreadIds)
      this.gaEvent(
        'Click Tracking',
        'Load More Results',
        'HomePage',
        this.offset + ' articles loaded'
      )
    },
    hasGallery,
    isLessThan24Hours,
    isMoreThan24Hours,
    isLessThan48Hours
  }
}
</script>

<style lang="scss">
.c-featured-blocks.l-wrap {
  padding: var(--space-7) var(--space-3) 0;
  @include media('>medium') {
    padding: var(--space-7) var(--space-7) 0 !important;
  }
}

.c-featured-blocks__wrapper {
  @include media('>medium') {
    margin: 0 auto;
    padding-left: var(--space-3);
    padding-right: var(--space-3);
    width: 100%;
    position: relative;
  }
}

.c-featured-blocks .featured-grid {
  grid-template-columns: 1fr;
  @include media('>medium') {
    grid-template-columns: 1fr 300px;
  }
  @include media('>xlarge') {
    grid-gap: 35px;
    grid-template-columns: 1fr 370px;
  }
  @include media('>xxlarge') {
    grid-template-columns: 1fr 370px;
  }
}

.c-featured-blocks .featured-grid .card.featured-grid-col1 {
  @include media('>xlarge') {
    width: 590px;
    max-width: 590px;
  }
}
.c-featured-blocks .card.featured-grid-col1 img {
  height: 100%;
}
</style>

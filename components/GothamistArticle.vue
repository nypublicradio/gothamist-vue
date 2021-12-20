<template>
  <div class="article l-container l-wrap">
    <div v-if="article.body" class="l-container l-container--12col">
      <breadcrumbs class="article-breadcrumbs" :breadcrumbs="breadcrumbs" />
      <h1 class="article-title" v-html="article.title" />
      <article-metadata
        :publish-date="article.formattedPublishDate"
        :updated-date="article.formattedUpdatedDate"
        class="l-container l-container--10col"
      >
        <template v-slot:authors>
          <v-byline :authors="article.authors" />
        </template>
        <template v-slot:comments>
          <v-counter
            v-if="commentCount"
            icon="comment"
            text="Comments"
            :value="commentCount"
            href="#comments"
            @click.native="scrollToComments"
          />
        </template>
        <template v-slot:photos>
          <v-counter
            v-if="article.gallery"
            icon="gallery"
            text="Photos"
            :value="galleryCount"
            :href="galleryLink"
          />
        </template>
      </article-metadata>
      <div class="article-lead-asset l-container l-container--10col">
        <share-tools class="article-share-tools">
          <share-tools-item
            action="share"
            service="facebook"
            :url="article.url"
            :utm-parameters="{
              medium: 'social',
              source: 'facebook',
              campaign: 'shared_facebook'
            }"
            @share="gaEvent('NTG social', 'social share', ...arguments)"
          />
          <share-tools-item
            action="share"
            service="twitter"
            :url="article.url"
            :share-parameters="{ text: article.title, via: 'gothamist' }"
            :utm-parameters="{
              medium: 'social',
              source: 'twitter',
              campaign: 'shared_twitter'
            }"
            @share="gaEvent('NTG social', 'social share', ...arguments)"
          />
          <share-tools-item
            action="share"
            service="reddit"
            :url="article.url"
            :share-parameters="{ title: article.title }"
            :utm-parameters="{
              medium: 'social',
              source: 'reddit',
              campaign: 'shared_reddit'
            }"
            @share="gaEvent('NTG social', 'social share', ...arguments)"
          />
          <share-tools-item
            action="share"
            service="email"
            :url="article.url"
            :share-parameters="{ body: article.title + ' - %URL%' }"
            :utm-parameters="{
              medium: 'social',
              source: 'email',
              campaign: 'shared_email'
            }"
            @share="gaEvent('NTG social', 'social share', ...arguments)"
          />
        </share-tools>
        <div
          v-if="
            leadAsset &&
              leadAsset.type !== undefined &&
              leadAsset.type === 'lead_image' &&
              leadAsset.value.image
          "
          class="article-lead-image"
        >
          <image-with-caption
            variation="gothamist"
            :alt-text="leadAsset.value.image.alt"
            :image="`${$config.imageBase}${leadAsset.value.image.id}/fill-%width%x%height%|format-jpeg%7Cjpegquality-80/`"
            :image-url="leadAsset.value.imageLink"
            :width="661"
            :height="496"
            :max-width="leadAsset.value.image.width || Infinity"
            :max-height="leadAsset.value.image.height || Infinity"
            :credit="leadAsset.value.image.credit"
            :caption="leadAsset.value.caption || leadAsset.value.image.caption"
            :credit-url="leadAsset.value.image.creditLink"
          />
        </div>
        <div v-if="article.gallery" class="article-lead-image">
          <gallery-preview
            :count="galleryCount"
            :images="galleryImages"
            :gallery-url="galleryLink"
            variation="gothamist"
          />
        </div>
      </div>
      <v-spacer size="double" />
      <LazyHydrate when-visible>
        <v-streamfield
          :key="article.uuid"
          ref="article-body"
          v-watch-scroll="updateScrollPercent"
          class="l-container l-container--10col article-body c-article__body"
          :streamfield="article.body"
          @hook:mounted="insertAd"
          @hook:updated="insertAd"
        />
      </LazyHydrate>
      <v-spacer size="quad" />
      <RelatedAuthors
        class="l-container l-container--10col"
        :authors="article.relatedAuthors"
        default-photo="/static-images/defaults/users/default-user.jpg"
      />
      <v-spacer size="quad" />
      <div class="l-container l-container--10col">
        <article-page-newsletter
          :key="article.uuid"
          v-observe-visibility="{
            callback: handleNewsletterImpression,
            once: true
          }"
          title="NYC news never sleeps. Get the Gothamist Daily newsletter and don't miss a moment."
          class="article-newsletter"
          @newsletter-signup-success="handleNewsletterSignupSuccess"
        />
        <div class="article-tag-list">
          <v-tag
            v-for="(tag, index) in article.tags"
            :key="index"
            :slug="'/tags/' + tag.slug"
            :name="`#${tag.name}`"
          />
        </div>
        <do-you-know-the-scoop
          :disable-comments="article.disableComments"
          class="article-scoop"
        />
      </div>

      <div
        v-if="!article.sensitiveContent"
        class="htlad-interior_midpage_2 ad-div mod-break-margins mod-ad-disclosure no-print"
      />

      <div
        id="comments"
        v-observe-visibility="{
          callback: loadComments,
          intersection: { rootMargin: '300px 0px 0px 0px', threshold: 0.01 }
        }"
      />
      <template v-if="!article.disableComments && showComments">
        <disqus-embed
          v-if="article"
          :identifier="String(article.legacyId || article.uuid)"
          :url="article.url"
          @new-comment="handleNewComment"
        />
        <v-spacer size="quin" />
      </template>

      <dismissible-area prefix="donateBanner" :views-before-showable="2">
        <template v-slot="dismissibleArea">
          <donate-banner
            v-observe-visibility="{
              callback: bannerVisibilityChanged,
              once: true
            }"
            :class="{ 'is-onscreen': bannerOnscreen }"
            @close="dismissibleArea.handleDismissed"
            @donate-click="bannerDonateClicked"
          />
        </template>
      </dismissible-area>
    </div>
    <div v-else class="l-container l-container--12col">
      <v-spacer size="quad" />
      <p>skeleton loading component goes here</p>
      <v-spacer size="quad" />
    </div>
    <div class="l-container l-container--14col">
      <recirculation-module
        :related-article="article"
        class="article-recirculation"
      />
      <read-more-in class="article-read-more-in" />
    </div>
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'
import disqus from '@/mixins/disqus'
import LazyHydrate from 'vue-lazy-hydration'
import RelatedAuthors from './RelatedAuthors.vue'
import { getImagePath } from '~/mixins/image'
import { insertAdDiv } from '~/utils/insert-ad-div'
import { getScrollDepth } from '~/mixins/helpers'
import {
  getStructuredData,
  getOgImage,
  getSection,
  getBreadcrumbs
} from '~/utils/metadata'

export default {
  name: 'GothamistArticle',
  components: {
    LazyHydrate,
    RelatedAuthors
  },
  directives: {
    'watch-scroll': {
      bind (el, binding) {
        el._scrollEvent = () => {
          binding.value(getScrollDepth(el))
        }
        window.addEventListener('scroll', el._scrollEvent, { passive: true })
      },
      unbind (el, binding) {
        window.removeEventListener('scroll', el._scrollEvent, { passive: true })
      }
    }
  },
  mixins: [gtm, disqus],
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      bannerOnscreen: false,
      scrollPercent: 0,
      scrollMilestones: [0, 25, 50, 75, 100],
      currentlyWatching: [],
      path: 'https://gothamist.com' + this.$route.fullPath,
      ogImage: getOgImage(this.article),
      disqusData: null,
      commentCount: null,
      disqusThreadIds: [],
      baseMeta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ],
      twitterMeta: [
        {
          hid: 'twitter_card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter_site',
          name: 'twitter:site',
          content: '@gothamist'
        }
      ],
      showComments: false
    }
  },
  computed: {
    gtmData () {
      return {
        articleTags: this.tags,
        articleAuthors: this.authors,
        articleSection: this.section,
        articleTitle: this.article?.title,
        articlePublishTime: this.article?.publicationDate,
        milestone: 0
      }
    },
    leadAsset () {
      return this.article.leadAsset[0]
    },
    section () {
      return getSection(this.article)
    },
    breadcrumbs () {
      return getBreadcrumbs(this.article)
    },
    galleryCount () {
      if (this.article.gallery) {
        return this.article.gallery.slides.length
      } else {
        return 0
      }
    },
    galleryImages () {
      if (this.article.gallery) {
        return this.article.gallery.slides.slice(0, 4).map((slide) => {
          const image = slide.value.slideImage.image
          return {
            url: image.file,
            template:
              this.$config.imageBase + image.id + '/fill-%width%x%height%/',
            thumbnail: image.file,
            alt: image.alt,
            credit: image.credit,
            creditUrl: image.creditLink,
            caption: slide.value.slideImage.caption,
            title: slide.slideTitle,
            width: image.width,
            height: image.height,
            description: ''
          }
        })
      } else {
        return []
      }
    },
    galleryLink () {
      return this.article.gallery.url.replace(/^https:\/\/[^/]*/, '')
    },
    imageMeta ({ $config: { imageBase } }) {
      return this.ogImage
        ? [
          {
            hid: 'og_image',
            property: 'og:image',
            content: imageBase + getImagePath(this.ogImage, 1200, 650)
          },
          {
            hid: 'og_image_width',
            property: 'og:image:width',
            content: '1200'
          },
          {
            hid: 'og_image_height',
            property: 'og:image:height"',
            content: '650'
          },
          {
            hid: 'og_image_alt',
            property: 'og:image:alt"',
            content: this.ogImage.alt
          }
        ]
        : []
    },
    ogMeta () {
      return [
        {
          hid: 'og_site_name',
          property: 'og:site_name',
          content: 'Gothamist'
        },
        {
          hid: 'og_url',
          property: 'og:url"',
          content: this.url
        },
        {
          hid: 'og_description',
          property: 'og:description',
          content: this.article.socialText || this.article.description
        },
        {
          hid: 'og_title',
          property: 'og:title',
          content: this.article.socialTitle || this.article.title
        },
        {
          hid: 'og_type',
          property: 'og:type',
          content: this.article.type
        },
        {
          hid: 'og_locale',
          property: 'og:locale',
          content: 'en_US'
        }
      ]
    },
    articleMeta () {
      return [
        {
          hid: 'article_published_time',
          property: 'article:published_time',
          content: this.article.meta.firstPublishedAt?.toString()
        },
        {
          hid: 'article_modified_time',
          property: 'article:modified_time',
          content: this.article.updatedDate?.toString()
        },
        {
          hid: 'article_section',
          property: 'article:section',
          content: this.article.ancestry[0].name
        },
        {
          hid: 'article_tag',
          property: 'article:tag',
          content: this.article.tags.map(tag => tag.name)
        },
        ...this.article.authors.map((author) => {
          return {
            // hid: 'article author', -- not unique
            property: 'article:author',
            content: 'https://gothamist.com' + author.url
          }
        })
      ]
    },
    structuredData ({ $config: { imageBase } }) {
      return getStructuredData({ article: this.article, imageBase })
    },
    authors () {
      let authors = ''
      this.article?.authors.forEach((author) => {
        authors += author.firstName + ' ' + author.lastName + ','
      })
      return authors
    },
    tags () {
      let tags = ''
      this.article?.tags.forEach((crumb) => {
        tags += crumb.name + ','
      })
      return tags
    }
  },
  watch: {
    $route () {
      this.resetScrollMilestones()
    },
    scrollPercent () {
      this.currentlyWatching.forEach((threshold, index) => {
        if (this.scrollPercent >= threshold) {
          this.trackScrollDepth(threshold)
          this.currentlyWatching.splice(index, 1)
        }
        if (this.scrollPercent >= 75 && threshold === 75) {
          this.bannerOnscreen = true
        }
      })
    }
  },
  async mounted () {
    this.resetScrollMilestones()
    // get disqus comment counts
    this.disqusThreadIds.push(this.article.legacyId || this.article.uuid)
    this.disqusData = await this.getCommentCount(this.disqusThreadIds)
    this.commentCount = await this.getCommentCountById(
      String(this.article.legacyId || this.article.uuid),
      this.disqusData
    )
    if (location.hash === '#comments') {
      this.scrollToComments()
    }
  },
  methods: {
    updateScrollPercent (percent) {
      this.scrollPercent = percent
    },
    resetScrollMilestones () {
      this.currentlyWatching = this.scrollMilestones.slice()
    },
    trackScrollDepth (percentScrolled) {
      this.gtmData.milestone = percentScrolled
      this.gaArticleEvent(
        'NTG article milestone',
        percentScrolled + '%',
        this.gtmData.articleTitle,
        this.gtmData
      )
    },
    bannerDonateClicked () {
      this.gaArticleEvent(
        'Article Page',
        'Donate Banner Clicked',
        this.gtmData.articleTitle,
        this.gtmData
      )
    },
    bannerVisibilityChanged (isVisible) {
      if (isVisible) {
        this.gaArticleEvent(
          'Article Page',
          'Donate Banner Is Visible',
          this.gtmData.articleTitle,
          this.gtmData
        )
      }
    },
    scrollToComments () {
      document.querySelector('#comments')?.scrollIntoView()
    },
    insertAd () {
      if (
        this.article &&
        this.$refs['article-body'] &&
        !this.article.sensitiveContent
      ) {
        this.$refs['article-body'].$nextTick(() => {
          insertAdDiv('insertedAd', this.$refs['article-body'].$el, {
            classNames: [
              'htlad-interior_midpage_1',
              'ad-div',
              'mod-break-margins',
              'mod-ad-disclosure'
            ],
            reset: true
          })
        })
      }
    },
    handleNewComment () {
      this.gaEvent('NTG user', 'comment added', this.article?.title)
    },
    handleNewsletterImpression (isVisible) {
      if (isVisible) {
        this.gaEvent(
          'NTG newsletter',
          'newsletter modal impression 1',
          this.article.title
        )
      }
    },
    handleNewsletterSignupSuccess () {
      this.gaEvent('NTG newsletter', 'newsletter signup 1', 'success')
    },
    loadComments (isVisible) {
      if (isVisible) {
        this.showComments = true
      }
    }
  },
  head () {
    return {
      title: `${this.article?.title} - Gothamist`,
      script: [
        {
          type: 'application/ld+json',
          json: this.structuredData
        }
      ],
      link: [
        {
          rel: 'amphtml',
          href: this.$config.champUrl + this.$route.path
        }
      ],
      meta: [].concat(
        this.baseMeta,
        this.imageMeta,
        this.twitterMeta,
        this.ogMeta,
        this.articleMeta
      )
    }
  }
}
</script>

<style lang="scss">
.article-breadcrumbs {
  position: relative;
  display: flex;
  margin-bottom: var(--space-4);
}

.article-breadcrumbs:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  left: -4px;
  top: calc(50% + 1px);
  background-image: linear-gradient(
    to right,
    transparent 50%,
    RGB(var(--color-gray)) 50%
  );
  background-position: right bottom;
  background-repeat: repeat-x;
  background-size: 16px 1px;
}

.article-metadata {
  margin-bottom: var(--space-4);
}

.article-title {
  font-family: var(--font-family-header);
  letter-spacing: var(--letter-spacing-header);
  font-weight: var(--font-weight-header);
  line-height: var(--line-height-13);
  font-size: var(--font-size-13);
  margin-bottom: var(--space-4);
  @media all and (min-width: $medium) {
    line-height: var(--line-height-16);
    font-size: var(--font-size-16);
  }
}

.article-share-tools {
  // width: 48.5px;
  text-align: center;
  margin-bottom: var(--space-4);
  @media all and (min-width: $medium) {
    position: absolute;
    top: 0;
    left: -61px;
    background-image: linear-gradient(
      to bottom,
      transparent 50%,
      RGB(var(--color-gray)) 50%
    );
    background-size: 1px 16px;
    background-repeat: repeat-y;
    background-position: right bottom;
  }
}

.article-share-tools .c-share-tools__group {
  flex-direction: row;
  @media all and (min-width: $medium) {
    flex-direction: column;
  }
}

.article-tag-list {
  margin-bottom: var(--space-6);

  .tag {
    display: inline-block;
    margin: 0 var(--space-2) var(--space-3) 0;
  }
}

.article-scoop {
  margin-bottom: var(--space-6);
}

.article-newsletter {
  margin-bottom: var(--space-5);
}

.article-recirculation {
  margin-bottom: var(--space-8);
}

.article-read-more-in {
  margin-bottom: var(--space-6);
}
.person {
  margin-bottom: var(--space-6);
}
</style>

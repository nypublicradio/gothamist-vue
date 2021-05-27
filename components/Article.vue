<template>
  <div class="article l-container l-wrap">
    <div
      v-if="article.body"
      class="l-container l-container--12col"
    >
      <breadcrumbs
        class="article-breadcrumbs"
        :breadcrumbs="
          [{name: section, slug: article.ancestry[0].slug}]
            .concat(article.sponsoredContent ? {name: 'Sponsored'} : [])
        "
      />
      <h1 class="article-title">
        {{ article.title }}
      </h1>
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
            v-if="article.commentCount > 0"
            icon="comment"
            text="Comments"
            :value="article.commentCount"
            href="#comments"
          />
        </template>
        <template v-slot:photos>
          <v-counter
            v-if="article.gallery"
            icon="gallery"
            text="Photos"
            :value="galleryImages.length"
            :href="`/gallery/${leadAsset.section}/${leadAsset.slug}`"
          />
        </template>
      </article-metadata>
      <div class="article-lead-asset l-container l-container--10col">
        <share-tools class="article-share-tools">
          <share-tools-item
            action="share"
            service="facebook"
            :url="article.url"
            :utm-parameters="{medium: 'social', source: 'facebook', campaign: 'shared_facebook'}"
          />
          <share-tools-item
            action="share"
            service="twitter"
            :url="article.url"
            :share-parameters="{text: article.title, via: 'gothamist'}"
            :utm-parameters="{medium: 'social', source: 'twitter', campaign: 'shared_twitter'}"
          />
          <share-tools-item
            action="share"
            service="reddit"
            :url="article.url"
            :share-parameters="{title: article.title}"
            :utm-parameters="{medium: 'social', source: 'reddit', campaign: 'shared_reddit'}"
          />
          <share-tools-item
            action="share"
            service="email"
            :url="article.url"
            :share-parameters="{body: article.title + ' - %URL%'}"
            :utm-parameters="{medium: 'social', source: 'email', campaign: 'shared_email'}"
          />
        </share-tools>
        <div
          v-if="leadAsset && leadAsset.type !== undefined && leadAsset.type === 'lead_image'"
          class="article-lead-image"
        >
          <image-with-caption
            variation="gothamist"
            :alt-text="leadAsset.value.image.alt"
            :url-template="`https://cms.demo.nypr.digital/images/${leadAsset.value.image.id}/fill-%width%x%height%/`"
            :aspect-ratio="4/3"
            :width-in-viewport="96"
            :credit="leadAsset.value.image.credit"
            :caption="leadAsset.value.caption || leadAsset.value.image.caption"
            :credit-url="leadAsset.value.image.creditLink"
          />
        </div>
        <div
          v-if="article.gallery"
          class="article-lead-image"
        >
          <gallery-preview
            :count="galleryImages.length"
            :images="galleryImages"
          />
        </div>
      </div>
      <v-spacer size="quad" />
      <v-streamfield
        class="l-container l-container--10col article-body"
        :streamfield="article.body"
      />
      <v-spacer size="quad" />
      <article-page-newsletter title="NYC news never sleeps. Get the Gothamist Daily newsletter and don't miss a moment." class="article-newsletter" />
      <div class="article-tag-list">
        <v-tag
          v-for="(tag, index) in article.tags"
          :key="index"
          :slug="tag.slug"
          :name="`#${tag.name}`"
        />
      </div>
      <do-you-know-the-scoop class="article-scoop" />
      <!-- AD -->
      <!-- DISQUS -->

      <div
        v-if="showDonateBanner"
        v-observe-visibility="{callback: bannerVisibilityChanged, once: true}"
      >
        <donate-banner
          :class="{'is-onscreen': bannerOnscreen}"
          @close="bannerClosed"
          @donate-click="bannerDonateClicked"
        />
      </div>
    </div>
    <div
      v-else
      class="l-container l-container--12col"
    >
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
export default {
  name: 'Article',
  components: {
    VStreamfield: () => import('./VStreamfield'),
    Breadcrumbs: () => import('./Breadcrumbs'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VByline: () => import('nypr-design-system-vue/src/components/VByline'),
    ImageWithCaption: () => import('nypr-design-system-vue/src/components/ImageWithCaption'),
    GalleryPreview: () => import('nypr-design-system-vue/src/components/GalleryPreview'),
    ReadMoreIn: () => import('./ReadMoreIn'),
    VTag: () => import('nypr-design-system-vue/src/components/VTag'),
    DoYouKnowTheScoop: () => import('./DoYouKnowTheScoop'),
    DonateBanner: () => import('./DonateBanner'),
    ArticlePageNewsletter: () => import('./ArticlePageNewsletter'),
    RecirculationModule: () => import('./RecirculationModule')
  },
  props: {
    article: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      bannerOnscreen: false,
      showDonateBanner: !this.$cookies.donateBannerDismissed && this.$cookies.articleViews < 3
    }
  },
  computed: {
    leadAsset () {
      return this.article.leadAsset[0]
    },
    section () {
      return this.article.meta.parent.title
    },
    galleryImages () {
      if (this.article.gallery) {
        return this.article.gallery.slides
          .slice(4)
          .map((slide) => {
            const image = slide.value.slideImage.image
            return {
              url: image.file,
              thumbnail: image.file,
              alt: image.alt,
              credit: image.credit,
              creditUrl: image.creditLink,
              caption: slide.value.slideImage.caption,
              title: slide.slideTitle,
              description: ''
            }
          })
      } else {
        return []
      }
    }
  },
  methods: {
    bannerClosed () {
      // only show the banner once a day
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      this.$cookies.set('donateBannerClosed', true, { expires: tomorrow })
    },
    bannerDonateClicked () {
      // track a ga event here
    },
    bannerVisibilityChanged (isVisible) {
      if (isVisible) {
        this.bannerOnscreen = true
        // track a ga impression event here
      }
    }
  },
  head () {
    return {
      title: `${this.article?.title} - Gothamist`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Article Page Description'
        }
      ]
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
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  left: -4px;
  top: calc(50% + 1px);
  background-image: linear-gradient(to right, transparent 50%, RGB(var(--color-gray)) 50%);
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
  width: 48.5px;
  text-align: center;
  margin-bottom: var(--space-4);
  @media all and (min-width: $medium) {
    position: absolute;
    top: 0;
    left: -61px;
    background-image: linear-gradient(to bottom, transparent 50%, RGB(var(--color-gray)) 50%);
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
</style>

<template>
  <div class="streamfield o-rte-text">
    <template v-for="block in streamfield">
      <!-- block-quote -->
      <div
        v-if="block.type === 'block_quote'"
        :key="block.id"
        class="streamfield-block-quote"
      >
        <blockquote>
          <p>
            {{ block.value.blockQuote }}
          </p>
        </blockquote>
      </div>

      <!-- code -->
      <div
        v-else-if="block.type === 'code'"
        :key="block.id"
        class="streamfield-code u-spacing"
        v-html="block.value.code"
      />

      <!-- content collection -->
      <div
        v-else-if="block.type === 'content_collection'"
        :key="block.id"
        class="streamfield-content-collection"
      >
        <div class="featured-stories l-grid l-grid--2up l-grid--large-gutters">
          <v-card
            v-for="(story, index) in block.value.pages"
            :key="index"
            class="gothamist u-space--double--bottom mod-vertical mod-large"
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
            />
          </v-card>
        </div>
      </div>

      <!-- embed -->
      <div
        v-else-if="block.type === 'embed'"
        :key="block.id"
        class="streamfield-embed"
        v-html="block.value.embed"
      />

      <!-- heading -->
      <div
        v-else-if="block.type === 'heading'"
        :key="block.id"
        class="streamfield-heading"
      >
        <h3>{{ block.value }}</h3>
      </div>

      <!-- image -->
      <div
        v-else-if="block.type === 'image'"
        :key="block.id"
        class="streamfield-image"
      >
        <image-with-caption
          variation="gothamist"
          :alt-text="block.value.image.alt"
          :caption="block.value.caption || block.value.image.caption"
          :credit="block.value.image.credit"
          :credit-url="block.value.image.creditLink"
          :image="block.value.image.file"
          :width="block.value.image.width"
          :height="block.value.image.height"
        />
      </div>

      <!-- paragraph -->
      <div
        v-else-if="block.type === 'paragraph'"
        :key="block.id"
        class="streamfield-paragraph u-spacing"
        v-html="block.value"
      />

      <!-- pull-quote -->
      <div
        v-else-if="block.type === 'pull-quote'"
        :key="block.id"
        class="streamfield-pull-quote"
      >
        <pull-quote
          :quote="block.value.pullQuote"
          :author="block.value.attribution"
        />
      </div>
    </template>
  </div>
</template>

<script>
const {
  formatTags,
  fuzzyDateTime,
  getArticleImage,
  hasGallery
} = require('~/mixins/helpers')

export default {
  name: 'Streamfield',
  components: {
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    ImageWithCaption: () => import('nypr-design-system-vue/src/components/ImageWithCaption'),
    PullQuote: () => import('nypr-design-system-vue/src/components/PullQuote'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard')
  },
  props: {
    streamfield: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    // you can't have script tags in v-html
    // so we need to load the twitter embeds script manually
    if (window.twttr) {
      // the script is already loaded, so just reload the embeds
      window.twttr.widgets.load()
    } else if (!document.getElementById('twttr-widgets')) {
      const embed = document.createElement('script')
      embed.id = 'twttr-widgets'
      embed.src = 'https://platform.twitter.com/widgets.js'
      document.body.appendChild(embed)
    }
    // load newsletter signup embeds manually
    if (document.querySelectorAll('[data-pym-src]').length > 0) {
      const embed = document.createElement('script')
      embed.id = 'nprapps'
      embed.src = 'https://pym.nprapps.org/pym.v1.min.js'
      document.body.appendChild(embed)
    }
  },
  methods: {
    formatTags,
    fuzzyDateTime,
    getArticleImage,
    hasGallery
  }
}
</script>

<style lang="scss">
.streamfield-block {
  margin-bottom: var(--space-4);

  &:last-of-type {
    margin-bottom: 0;
  }
}

.streamfield-block .twitter-tweet {
  margin: auto;
}

.streamfield-block .featured-stories .card.mod-vertical .card-image-wrapper,
.streamfield-block .featured-stories .card.mod-vertical .card-image {
  @include media("<medium") {
    min-width: 100px;
    width: 100px;
    height: 100px;
  }
}

.streamfield-block .featured-stories .card.mod-vertical .card-image-wrapper {
  @include media(">medium") {
    height: 285px;
  }
}
</style>

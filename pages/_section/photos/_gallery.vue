<template>
  <div
    v-if="page"
    class="gallery"
  >
    <div class="gallery-close" @click="goToArticle">
      <a>
        <close-icon />
      </a>
    </div>
    <div
      v-if="page.slides.length > 0"
      class="l-wrap l-container l-container--xl"
    >
      <div @click="goToArticle">
        <a
          class="gallery-back-to-link"
        >
          <simple-arrow-left />
          <span>
            {{ articleTitle }}
          </span>
        </a>
      </div>
      <v-spacer size="double" />
      <div
        v-for="(slide, index) in page.slides"
        :key="index"
        :ref="'image' + (index + 1)"
        v-observe-visibility="{
          callback: (isVisible, entry) => visibilityChanged(isVisible, entry, index + 1),
          intersection: {
            threshold: 0.5
          }
        }"
      >
        <div
          class="c-slide__count"
          :style="'width: ' + slide.value.slideImage.image.width + 'px'"
        >
          Slide {{ index + 1 }} of {{ page.slides.length }}
        </div>
        <v-spacer />
        <image-with-caption
          :style="'width: ' + slide.value.slideImage.image.width + 'px'"
          class="u-color-group-dark"
          variation="gothamist"
          :alt-text="slide.value.slideImage.image.alt"
          :image="`${$config.imageBase}${slide.value.slideImage.image.id}/fill-%width%x%height%|format-jpeg%7Cjpegquality-80/`"
          :width="slide.value.slideImage.image.width"
          :max-width="slide.value.slideImage.image.width"
          :max-height="slide.value.slideImage.image.height"
          :height="slide.value.slideImage.image.height"
          :credit="slide.value.slideImage.image.credit"
          :caption="slide.value.slideImage.image.caption"
          :credit-url="slide.value.slideImage.image.creditLink"
        />
        <v-spacer size="triple" />
        <div v-if="index === 2 || (index + 1) % 6 === 0" class="ad-wrapper-outer">
          <div class="ad-wrapper-inner">
            <div class="htlad-interior_midpage_gallery" />
            <div class="ad-label">
              Advertisement
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-spacer size="triple" />
    <div class="gallery-footer">
      <gothamist-arrow />
      <div>End</div>
      <v-spacer size="triple" />
      <v-button
        class="back-to-article"
        @click="goToArticle"
      >
        Back To Article
      </v-button>
    </div>
    <v-spacer size="quad" />
  </div>
</template>

<script>
import gtm from '~/mixins/gtm'
import { setTargeting, clearTargeting } from '~/mixins/htl'

const { formatTitle } = require('~/mixins/helpers')

export default {
  name: 'ArticleGallery', // this is the template name which is used for GTM
  mixins: [gtm],
  async asyncData ({
    $axios,
    params,
    error
  }) {
    const path = `${params.section}/photos/${params.gallery}`
    const page = await $axios.get(`/pages/find/?html_path=${path}`)
      .catch(() => {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      })
    return {
      page: page?.data,
      title: page?.data.title
    }
  },
  data () {
    return {
      page: null,
      pageLoaded: false,
      slug: this.$route.params.slug,
      title: null,
      articleScrollTop: 0
    }
  },
  computed: {
    articleLink () {
      if (this.page.relatedArticles && this.page.relatedArticles.length > 0) {
        return (this.page.relatedArticles[0].path).replace('/home/', '/')
      } else {
        return ''
      }
    },
    articleTitle () {
      if (this.page.relatedArticles && this.page.relatedArticles.length > 0) {
        return this.page.relatedArticles[0].title
      } else {
        return ''
      }
    },
    ogImage () {
      if (this.page && this.page.socialImage) {
        return this.page.socialImage.file
      } else if (this.page && this.page.slides && this.page.slides.length > 0) {
        return this.page.slides[0].value.slideImage.image.file
      } else {
        return 'https://gothamist.com/static-images/home_og_1200x650.png'
      }
    }
  },
  beforeMount () {
    const doc = document.documentElement
    const articleScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    this.articleScrollTop = articleScrollTop
  },
  mounted () {
    // support deep linking
    window.scrollTo(0, 0)
    if (this.$route.query.image && this.$refs['image' + this.$route.query.image] !== undefined) {
      const imageElement = this.$refs['image' + this.$route.query.image]
      const top = imageElement[0].offsetTop
      window.scrollTo(0, top + 72)
    }
    this.pageLoaded = true
    setTargeting({ Template: 'Article Gallery' })
  },
  beforeUnmount () {
    clearTargeting(['Template'])
  },
  methods: {
    formatTitle,
    goToArticle () {
      this.$router.push({
        path: this.articleLink,
        query: {
          articleScrollTop: this.articleScrollTop
        }
      })
      // this.$router.push({
      //   path: this.articleLink
      // })
    },
    visibilityChanged (isVisible, entry, imageId) {
      if (isVisible && this.pageLoaded) {
        this.$router.replace({
          path: this.$route.path,
          query: { image: imageId }
        })
        this.gaEvent('Gallery Slide View', 'Slide ' + imageId)
      }
    }
  },
  head () {
    return {
      title: this.title + ' - Gothamist',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.title + ' - Gothamist'
        },
        {
          hid: 'og_url',
          name: 'og:url',
          content: 'https://gothamist.com' + this.$route.fullPath
        },
        {
          hid: 'og_title',
          name: 'og:title',
          content: this.title + ' - Gothamist'
        },
        {
          hid: 'og_description',
          name: 'og:description',
          content: this.title + ' - Gothamist'
        },
        {
          hid: 'og_image',
          name: 'og:image',
          content: this.ogImage
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.gallery .gallery-close {
  position: fixed;
  top: 16px;
  right: 20px;
  z-index: 9999;
  width: 16px;
  display: none;

  @include media(">medium") {
    display: block;
  }

  path {
    fill: RGB(var(--color-white));
    transition: var(--animation-duration-standard);
  }

  &:hover {
    cursor: pointer;

    path {
      fill: RGB(var(--color-reddish-orange));
    }
  }
}

.gallery a {
  text-decoration: none;
}

.gallery .gallery-back-to-link {
  display: flex;
  font-family: var(--font-family-pragati);
  font-size: var(--font-size-8);
  align-items: flex-end;
  color: RGB(var(--color-white));
  cursor: pointer;
  span {
    padding-bottom: 4px;
    border-bottom: 2px dotted RGB(var(--color-white));
  }

  &:hover {
    span {
      background: RGB(var(--color-reddish-orange));
    }
  }
}

.gallery .o-simple-arrow-left-icon {
  width: 16px;
  display: inline-block;
  margin-right: var(--space-3);
}

.gallery-footer {
  text-align: center;
  @include typeface(small, 3);
  color: RGB(var(--color-gray));
  text-transform: uppercase;
}

.gallery-footer .o-gothamist-arrow-icon {
  transform: rotate(90deg);
  width: 30px;
}

.gallery .o-simple-arrow-left-icon path,
.gallery-footer .o-gothamist-arrow-icon path {
  fill: RGB(var(--color-white));
}

.gallery .c-slide__count {
  margin: auto;
  max-width: 100%;
}

.gallery .image-with-caption {
  margin: auto;
  display: block;
  max-width: 100%;
}

.gallery .image-with-caption .gothamist-caption {
  font-family: var(--font-family-barlow);
  font-size: var(--font-size-5);
}

.gallery .image-with-caption .image-with-caption-credit-link,
.gallery .image-with-caption .image-with-caption-credit {
  font-family: var(--font-family-b612);
  font-size: var(--font-size-4);
}

.gallery .image-with-caption .o-gothamist-arrow-icon {
  display: none;
}

.gallery .image-with-caption-credit span {
  text-transform: uppercase;
}

.gallery .image-with-caption-credit-link {
  cursor: pointer;
  padding-bottom: 2px;
  border-bottom: 2px dotted RGB(var(--color-link));
  text-decoration: none;
  color: RGB(var(--color-link));

  &:hover {
    color: RGB(var(--color-link-hover));
    background-color: RGB(var(--color-reddish-orange));
  }
}
</style>

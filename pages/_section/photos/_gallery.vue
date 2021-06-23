<template>
  <div
    v-if="page"
    class="gallery"
  >
    <div class="gallery-close">
      <nuxt-link :to="articleLink">
        <close-icon />
      </nuxt-link>
    </div>
    <v-spacer size="triple" />
    <div v-if="page.slides.length > 0" class="l-wrap l-container l-container--xl">
      <nuxt-link
        :to="articleLink"
        class="gallery-back-to-link"
      >
        <simple-arrow-left />
        <span>
          {{ articleTitle }}
        </span>
      </nuxt-link>
      <v-spacer size="double" />
      <div
        v-for="(slide, index) in page.slides"
        :key="index"
        :ref="'image' + (index + 1)"
      >
        <div class="c-slide__count">
          Slide {{ index + 1 }} of {{ page.slides.length }}
        </div>
        <v-spacer />
        <image-with-caption
          variation="gothamist"
          :alt-text="slide.value.slideImage.image.alt"
          :url-template="`https://cms.demo.nypr.digital/images/${slide.value.slideImage.image.id}/fill-%width%x%height%/`"
          :aspect-ratio="4/3"
          :width-in-viewport="96"
          :credit="slide.value.slideImage.image.credit"
          :caption="slide.value.slideImage.image.caption"
          :credit-url="slide.value.slideImage.image.creditLink"
        />
        <v-spacer size="triple" />
      </div>
      <div>ad goes here</div>
    </div>
    <v-spacer size="triple" />
    <div class="gallery-footer">
      <gothamist-arrow />
      <div>End</div>
      <v-spacer size="triple" />
      <nuxt-link :to="articleLink">
        <v-button class="back-to-article">
          Back To Article
        </v-button>
      </nuxt-link>
    </div>
    <v-spacer size="quad" />
  </div>
</template>

<script>
import gtm from '~/mixins/gtm'

const { formatTitle } = require('~/mixins/helpers')

export default {
  layout: 'gallery',
  name: 'Photos', // this is the template name which is used for GTM
  components: {
    CloseIcon: () => import('nypr-design-system-vue/src/components/icons/CloseIcon'),
    ImageWithCaption: () => import('nypr-design-system-vue/src/components/ImageWithCaption'),
    GothamistArrow: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistArrow'),
    SimpleArrowLeft: () => import('nypr-design-system-vue/src/components/icons/SimpleArrowLeft'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
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
      slug: this.$route.params.slug,
      title: null
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
        return this.page.socialImage
      } else if (this.page && this.page.slides && this.page.slides.length > 0) {
        return this.page.slides[0].value.slideImage.image.file
      } else {
        return 'https://gothamist.com/static-images/home_og_1200x650.png'
      }
    }
  },
  mounted () {
    // if the image url parameter exists, scroll to that id
    // const imageElement = this.$refs['image' + this.$route.query.image]
    // console.log(this.$route.query.image)
    // console.log(this.$refs)
    // console.log(imageElement[0])
    // const top = element.offsetTop
    // const imageElement = document.getElementById('image' + this.$route.query.image)
    // imageElement[0].scrollIntoView()
    // this.$refs['image' + this.$route.query.image].scrollTop = 0
    // const a = document.getelementbyid('image' + this.$route.query.image)
    // a.scrollTop = a.scrollHeight
  },
  methods: {
    formatTitle
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
        },
        {
          hid: 'twitter_image',
          name: 'twitter:image',
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

  path {
    fill: RGB(var(--color-white));
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
</style>

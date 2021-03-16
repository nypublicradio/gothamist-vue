<template>
  <div class="error-page l-container l-container--11col">
    <v-spacer size="quad" />
    <strong v-if="error.statusCode === 404" class="c-basic__header-kicker">
      404 Page Error
    </strong>
    <strong v-else class="c-basic__header-kicker">
      500 Server Error
    </strong>
    <v-spacer />
    <h1
      v-if="error.statusCode === 404"
      class="c-basic__heading o-3d-heading"
      data-test-404-heading
    >
      The page you're looking for doesn't appear to exist.
    </h1>
    <h1
      v-else
      class="c-basic__heading o-3d-heading"
    >
      Sorry, an error occurred.
    </h1>
    <v-spacer size="triple" />
    <image-with-caption
      variation="gothamist"
      alt-text="Realize the key to Zubaz is wearing them high. No need to rock these low. They do the work for you."
      image="/404.jpg"
      caption="Realize the key to Zubaz is wearing them high. No need to rock these low. They do the work for you."
    />
    <v-spacer size="double" />
    <p>
      Welcome! The Gothamist page you're looking for doesn't appear to exist. Would you like to visit our
      <nuxt-link to="/">
        Homepage
      </nuxt-link>
      ? Or you can
      <nuxt-link to="/search">
        search
      </nuxt-link>
      for what you're looking for.
    </p>
    <v-spacer size="quad" />
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'

export default {
  name: 'ErrorPage',
  components: {
    ImageWithCaption: () => import('nypr-design-system-vue/src/components/ImageWithCaption'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [gtm],
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  mounted () {
    // this.gaEvent('Non-Player', 'URL Error', '404', window.location.href)
  }
}
</script>

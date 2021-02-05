<template>
  <div class="error-page l-container">
    <v-spacer size="quad" />
    <v-spacer size="quad" />
    <h1 v-if="error.statusCode === 404">
      Sorry, the page you are looking for was not found.
    </h1>
    <h1 v-else>
      Sorry, an error occurred.
    </h1>
    <v-spacer />
    <nuxt-link to="/">
      Click here to go back to the home page
    </nuxt-link>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers'
import gtm from '@/mixins/gtm'

export default {
  name: 'ErrorPage',
  components: {
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [helpers, gtm],
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.gaEvent('Non-Player', 'URL Error', '404', window.location.href)
  }
}
</script>

<style lang="scss">
.error-page h1 {
  color: RGB(var(--color-white));
}
</style>

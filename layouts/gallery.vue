<template>
  <div class="gallery">
    <gothamist-header :gallery="true" />
    <main :class="$route.name">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { setTargeting, clearTargeting } from '~/mixins/htl'

export default {
  name: 'Gothamist',
  components: {
    GothamistHeader: () => import('../components/GothamistHeader')
  },
  async mounted () {
    // set the navigation
    await this.$store.dispatch('global/setNavigation')
    setTargeting({
      Template: 'Article Gallery',
      is_testing: this.$config.environment === 'demo' ? 'yes' : 'no',
      is_home: this.isHomepage ? 'yes' : 'no',
      host: location?.host,
      url: this.$route.path,
      urlSegments: this.$route.path.split('/').filter(segment => segment.length > 0)
    })
  },
  beforeUnmount () {
    clearTargeting(['Template']) // other params are always overwritten by the watch function in the default layout
  },
  head () {
    return {
      link: [
        {
          skip: this.$config.environment !== 'demo',
          hid: 'htlcss',
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://htlbid.com/stage/v3/gothamist.com/htlbid.css'
        },
        {
          skip: this.$config.environment === 'demo',
          hid: 'htlcss',
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://htlbid.com/v3/gothamist.com/htlbid.css'
        }
      ],
      script: [
        {
          skip: this.$config.environment !== 'demo',
          hid: 'htljs',
          src: 'https://htlbid.com/stage/v3/gothamist.com/htlbid.js',
          defer: true
        },
        {
          skip: this.$config.environment === 'demo',
          hid: 'htljs',
          src: 'https://htlbid.com/v3/gothamist.com/htlbid.js',
          defer: true
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.gallery {
  background-color: RGB(var(--color-dark-gray));
  color: RGB(var(--color-white));
  height: 100%;
}
</style>

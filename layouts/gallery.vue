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
      is_testing: this.$config.environment === 'PROD' ? 'no' : 'yes',
      is_home: this.isHomepage ? 'yes' : 'no',
      host: location?.host,
      url: this.$route.path,
      urlSegments: this.$route.path.split('/').filter(segment => segment.length > 0)
    })
  },
  beforeUnmount () {
    clearTargeting(['Template']) // other params are always overwritten by the watch function in the default layout
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

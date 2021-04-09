<template>
  <div :class="$route.name">
    <gothamist-header />
    <main>
      <Nuxt />
    </main>
    <gothamist-footer />
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'

export default {
  name: 'Gothamist',
  components: {
    GothamistFooter: () => import('../components/GothamistFooter'),
    GothamistHeader: () => import('../components/GothamistHeader')
  },
  mixins: [gtm],
  async mounted () {
    await this.$store.dispatch('global/setNavigation')
  }
}
</script>

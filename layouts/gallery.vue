<template>
  <div class="gallery">
    <gothamist-header :gallery="true" />
    <main :class="$route.name">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'Gothamist',
  components: {
    GothamistHeader: () => import('../components/GothamistHeader')
  },
  async mounted () {
    // set the navigation
    await this.$store.dispatch('global/setNavigation')
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

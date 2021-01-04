<template>
  <div>
    <gothamist-header />
    <main>
      <Nuxt />
    </main>
    <lazy-hydrate ssr-only>
      <gothamist-footer />
    </lazy-hydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

export default {
  name: 'Gothamist',
  components: {
    LazyHydrate,
    GothamistFooter: () => import('../components/GothamistFooter'),
    GothamistHeader: () => import('../components/GothamistHeader')
  }
}
</script>

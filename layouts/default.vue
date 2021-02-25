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
export default {
  name: 'Gothamist',
  components: {
    GothamistFooter: () => import('../components/GothamistFooter'),
    GothamistHeader: () => import('../components/GothamistHeader')
  }
}
</script>

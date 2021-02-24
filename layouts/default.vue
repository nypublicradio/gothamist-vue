<template>
  <div>
    <gothamist-header v-once />
    <main>
      <Nuxt />
    </main>
    <gothamist-footer v-once />
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

<template>
  <div>
    <div class="l-container">
      <v-spacer size="quad" />
      <p>home page</p>
      <v-spacer size="quad" />
      <read-more-in />
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    ReadMoreIn: () => import('../components/ReadMoreIn'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  }
}
</script>

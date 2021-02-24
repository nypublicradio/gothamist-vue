<template>
  <div>
    <div class="l-container">
      <v-spacer size="quad" />
      <p>article page</p>
      <v-spacer size="quad" />
      {{ articleData }}
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  data () {
    return {
      articleData: null
    }
  },
  async mounted () {
    await this.$axios.get('pages/?slug=emconsider-em-new-podcast')
      .then(response => (
        this.articleData = response.data
      ))
  }
}
</script>

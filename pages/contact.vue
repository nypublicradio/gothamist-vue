<template>
  <div>
    <div v-if="contactPage" class="l-container">
      <v-spacer size="quad" />
      <header class="c-basic__header u-spacing">
        <h1 class="c-basic__heading o-3d-heading">
          {{ contactPage.title }}
        </h1>
      </header>
      <v-spacer size="quad" />
      <div class="contact-page" v-html="contactPage.body[0].value" />
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  components: {
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  data () {
    return {
      contactPage: null
    }
  },
  async mounted () {
    await this.$axios
      .get('/pages/find/?html_path=contact')
      .then(response => (
        this.contactPage = response.data
      ))
  }
}
</script>

<style lang="scss">

.contact-page p, .contact-page h2 {
  margin-bottom: var(--space-3);
}

.contact-page {
  max-width: var(--article-content-width);
  margin: auto;
}

</style>

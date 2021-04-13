<template>
  <div>
    <div v-if="contactPage" class="l-container l-container--14col">
      <v-spacer size="quad" />
      <header class="c-basic__header u-spacing">
        <h1 class="c-basic__heading o-3d-heading">
          {{ contactPage.title }}
        </h1>
      </header>
      <v-spacer size="quad" />
      <div class="contact-page">
        <v-streamfield :streamfield="contactPage.body" />
      </div>
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'
export default {
  name: 'Information', // this is the template name which is used for GTM
  components: {
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    VStreamfield: () => import('../components/VStreamfield')
  },
  mixins: [gtm],
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

.u-padding--quad--top {
  padding-top: calc(var(--space-3) * 3);
}
.contact-page p, .contact-page h2 {
  margin-bottom: var(--space-3);
}

.contact-page {
  max-width: var(--article-content-width);
  margin: auto;
}

</style>

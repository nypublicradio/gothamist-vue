<template>
  <div>
    <div
      v-if="page"
      class="l-container l-container--14col l-wrap"
    >
      <header class="c-basic__header u-spacing">
        <h1 class="c-basic__heading o-3d-heading">
          {{ page.title }}
        </h1>
      </header>
      <v-spacer size="quad" />
      <div class="information-page">
        <v-streamfield :streamfield="page.body" />
      </div>
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'

export default {
  name: 'InformationPage', // this is the template name which is used for GTM
  components: {
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    VStreamfield: () => import('../components/VStreamfield')
  },
  mixins: [gtm],
  props: {
    page: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>

<style lang="scss">
.information-page p, .information-page h2 {
  margin-bottom: var(--space-3);
}

.information-page {
  max-width: var(--article-content-width);
  margin: auto;
}
</style>

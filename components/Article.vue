<template>
  <div class="article">
    <div
      v-if="dataLoaded"
      class="l-container l-container--12col"
    >
      <v-spacer size="quad" />
      <h1 v-html="article.title" />
      <v-spacer size="quad" />
      ID: {{ article.id }}
      <v-spacer size="quad" />
      Section: {{ article.meta.parent.title }}
      <v-spacer size="quad" />
      Slug: {{ article.meta.slug }}
      <v-spacer size="quad" />
      <v-streamfield :streamfield="article.body" />
      <v-spacer size="quad" />
    </div>
    <div
      v-else
      class="l-container l-container--12col"
    >
      <v-spacer size="quad" />
      <p>skeleton loading component goes here</p>
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  components: {
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    VStreamfield: () => import('./VStreamfield')
  },
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    dataLoaded () {
      return this.article.body !== null
    }
  },
  head: {
    title: 'Article Page Title',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Article Page Description'
      }
    ]
  }
}
</script>

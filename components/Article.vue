<template>
  <div>
    <div
      v-if="dataLoaded"
      class="l-container"
    >
      <v-spacer size="quad" />
      <h1 v-html="articleData.title" />
      <v-spacer size="quad" />
      ID: {{ articleID }}
      <v-spacer size="quad" />
      Section: {{ articleSection }}
      <v-spacer size="quad" />
      Slug: {{ articleSlug }}
      <v-spacer size="quad" />
      {{ articleData }}
      <v-spacer size="quad" />
    </div>
    <div
      v-else
      class="l-container"
    >
      <v-spacer size="quad" />
      <p>show skeleton component</p>
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
import pages from '@/mixins/pages'
import helpers from '~/mixins/helpers'

export default {
  name: 'Article',
  components: {
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [pages, helpers],
  data () {
    return {
      articleSection: this.getSection(this.$route.path),
      articleSlug: this.getSlug(this.$route.path),
      articleID: null,
      articleData: null
    }
  },
  computed: {
    dataLoaded () {
      return this.articleData !== null
    }
  },
  async mounted () {
    await this.getID(this.articleSlug).then(id => (
      this.articleID = id
    ))
    await this.getData(this.articleID).then(data => (
      this.articleData = data
    ))
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

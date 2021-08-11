<template>
  <div class="gothamist-breaking-news">
    <template
      v-for="(banner, index) in breakingNewsBanner"
      class="l-container l-container--xl l-wrap"
    >
      <v-banner
        v-if="banner.value"
        :key="index"
        tag="Breaking News"
        :headline="banner.value.title"
        :headline-link="banner.value.link"
        :description="banner.value.description"
      />
    </template>
  </div>
</template>

<script>
export default {
  components: {
    VBanner: () => import('nypr-design-system-vue/src/components/VBanner')
  },
  async fetch () {
    await this.$axios
      .get(`/sitewide_components/${this.$config.siteId}/`)
      .then(response => (
        this.breakingNewsBanner = response.data.breakingNews
      ))
  },
  data () {
    return {
      breakingNewsBanner: null
    }
  }
}
</script>

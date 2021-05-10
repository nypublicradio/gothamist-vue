<template>
  <div :class="$route.name">
    <gothamist-header />
    <main>
      <v-spacer size="quad" />
      <div>
        <div
          v-for="(banner, index) in breakingNewsBanner"
          :key="index"
          class="l-container l-container--xl l-wrap"
        >
          <template v-if="banner.value">
            <v-spacer size="double" />
            <v-banner
              tag="Breaking News"
              :headline="banner.value.title"
              :headline-link="banner.value.link"
              :description="banner.value.description"
            />
          </template>
        </div>
      </div>
      <div>
        <div
          v-for="(banner, index) in productMarketingBanner"
          :key="index"
          class="l-container l-container--xl l-wrap"
        >
          <template v-if="banner.value">
            <v-spacer size="double" />
            <product-marketing-banner
              :title="banner.value.title"
              :description="banner.value.description"
              :cta="banner.value.button_text"
              :link="banner.value.button_link"
            />
          </template>
        </div>
      </div>
      <Nuxt />
    </main>
    <gothamist-footer />
  </div>
</template>

<script>
export default {
  name: 'Gothamist',
  components: {
    VBanner: () => import('nypr-design-system-vue/src/components/VBanner'),
    GothamistFooter: () => import('../components/GothamistFooter'),
    GothamistHeader: () => import('../components/GothamistHeader'),
    ProductMarketingBanner: () => import('../components/ProductMarketingBanner'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  data () {
    return {
      breakingNewsBanner: null,
      productMarketingBanner: null
    }
  },
  async mounted () {
    // set the navigation
    await this.$store.dispatch('global/setNavigation')
    // check for breaking news banner
    await this.$axios
      .get('/sitewide_components/1/')
      .then(response => (
        this.breakingNewsBanner = response.data.breaking_news
      ))
    // check for product marketing banner
    await this.$axios
      .get('/system_messages/1/')
      .then(response => (
        this.productMarketingBanner = response.data.product_banners
      ))
  }
}
</script>

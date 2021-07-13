<template>
  <div :class="{'home-page' : isHomepage}">
    <div class="htlad-skin" />
    <div class="ad-wrapper-outer mod-header u-color-group-dark">
      <div class="ad-wrapper-inner">
        <div v-if="isHomepage" key="index-leaderboard" class="htlad-index_leaderboard_1" />
        <div v-else key="interior-leaderboard" class="htlad-interior_leaderboard" />
        <div class="ad-label">
          Advertisement
        </div>
      </div>
    </div>
    <gothamist-header />
    <main :class="$route.name">
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
  computed: {
    isHomepage () {
      return this.$route.name === 'index'
    }
  },
  async mounted () {
    // htlbid
    const htlbid = window.htlbid = window.htlbid || {}
    htlbid.cmd = htlbid.cmd || []
    htlbid.cmd.push(() => {
      htlbid.layout('universal') // Leave as 'universal' or add custom layout
      htlbid.setTargeting('is_testing', this.$config.environment === 'PROD' ? 'no' : 'yes') // Set to "no" for production
      htlbid.setTargeting('is_home', this.isHomepage ? 'yes' : 'no') // Set to "yes" on the homepage
      htlbid.setTargeting('host', location?.host)
      htlbid.setTargeting('url', this.$route.path)
      htlbid.setTargeting('urlSegments', this.$route.path.split('/').filter(segment => segment.length > 0))
    })
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

<style lang="scss">
html {
  scroll-padding-top: 72px;
}

.home-page main {
  margin-top: 0px;
}

.ad-wrapper-outer {
  color: RGB(var(--color-text-muted));
}

.ad-wrapper-outer.mod-header {
  background: RGB(var(--color-background));
  width: 100%;
}

.ad-wrapper-inner {
  width: fit-content;
  margin: auto;
}

.ad-label {
    font-family: var(--font-family-small);
    letter-spacing: var(--letter-spacing-small);
    font-weight: var(--font-weight-small);
    font-size: var(--font-size-1);
    line-height: var(--line-height-1);
    margin-top: var(--space-2);
    text-transform: uppercase;
    text-align: right;
}

div:empty + .ad-label {
 display: none;
}

</style>

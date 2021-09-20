<template>
  <div :class="{'home-page' : isHomepage}">
    <div
      v-if="!isSensitiveContent"
      class="htlad-skin"
    />
    <div
      v-if="!isSensitiveContent"
      class="ad-wrapper-outer mod-header u-color-group-dark no-print"
    >
      <div class="ad-wrapper-inner">
        <div
          v-if="isHomepage"
          key="index-leaderboard"
          class="htlad-index_leaderboard_1"
        />
        <div
          v-else
          key="interior-leaderboard"
          class="htlad-interior_leaderboard"
        />
        <div class="ad-label">
          Advertisement
        </div>
      </div>
    </div>
    <gothamist-header />
    <main :class="$route.name">
      <div v-if="this.$route.name !== 'tags-slug'" class="gothamist-banners l-container l-container--xl l-wrap">
        <gothamist-breaking-news class="l-container l-container--16col" />
        <gothamist-marketing-banners class="l-container l-container--16col" />
      </div>
      <Nuxt keep-alive />
    </main>
    <gothamist-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setTargeting } from '~/mixins/htl'

export default {
  name: 'Gothamist',
  components: {
    GothamistFooter: () => import('../components/GothamistFooter'),
    GothamistHeader: () => import('../components/GothamistHeader'),
    GothamistMarketingBanners: () => import('../components/GothamistMarketingBanners'),
    GothamistBreakingNews: () => import('../components/GothamistBreakingNews')
  },
  computed: {
    isHomepage () {
      return this.$route.name === 'index'
    },
    ...mapState('global', ['isSensitiveContent'])
  },
  watch: {
    $route () {
      this.setAdTargeting()
    }
  },
  async mounted () {
    this.setAdTargeting()
    // set the navigation
    await this.$store.dispatch('global/setNavigation')
  },
  methods: {
    setAdTargeting () {
      // remove any existing ads
      document.querySelectorAll('.htlunit-interior_leaderboard').forEach(function (el) {
        el.remove()
      })
      // htlbid key value targeting for ads
      setTargeting({
        layout: 'universal',
        is_testing: this.$config.environment === 'demo' ? 'yes' : 'no',
        is_home: this.isHomepage ? 'yes' : 'no',
        host: location?.host,
        url: this.$route.path,
        urlSegments: this.$route.path.split('/').filter(segment => segment.length > 0)
      })
    }
  },
  head () {
    return {
      link: [
        {
          skip: this.$config.environment !== 'demo',
          hid: 'htlcss',
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://htlbid.com/stage/v3/gothamist.com/htlbid.css'
        },
        {
          skip: this.$config.environment === 'demo',
          hid: 'htlcss',
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://htlbid.com/v3/gothamistv2.com/htlbid.css'
        }
      ],
      script: [
        {
          skip: this.$config.environment !== 'demo',
          hid: 'htljs',
          src: 'https://htlbid.com/stage/v3/gothamist.com/htlbid.js',
          defer: true
        },
        {
          skip: this.$config.environment === 'demo',
          hid: 'htljs',
          src: 'https://htlbid.com/v3/gothamistv2.com/htlbid.js',
          defer: true
        }
      ]
    }
  }
}
</script>

<style lang="scss">
html {
  scroll-padding-top: 72px;
}

.home-page main {
  margin-top: 0;
}

.home-page .gothamist-header {
  padding-bottom: calc(45px +  var(--space-6)); //45px = overhanging logo height
}

.ad-wrapper-outer {
  color: RGB(var(--color-text-muted));
}

.ad-wrapper-outer.mod-header {
  position: relative;
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

.ad-div.mod-break-margins {
  position: relative;
  min-height: 270px;
}

.ad-div.mod-break-margins > div {
  position: absolute;
  top: 0;
  width: max-content;
}

.ad-div.mod-ad-disclosure > div > div > div::after {
    content: "Advertisement";
    display: block;
    color: RGB(var(--color-text-muted));
    font-family: var(--font-family-small);
    letter-spacing: var(--letter-spacing-small);
    font-weight: var(--font-weight-small);
    font-size: var(--font-size-1);
    line-height: var(--line-height-1);
    margin-top: var(--space-2);
    text-transform: uppercase;
    text-align: right;
}

</style>

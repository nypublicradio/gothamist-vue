<template>
  <div :class="{'home-page' : isHomepage}">
    <div
      v-if="!isSensitiveContent && !isGallery"
      class="htlad-skin"
    />
    <div
      class="ad-wrapper-outer mod-header u-color-group-dark no-print"
    >
      <div
        v-if="!isSensitiveContent && !isGallery"
        class="ad-wrapper-inner"
      >
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
      <div v-if="!isTagPage && !isGallery" class="gothamist-banners l-container l-container--xl l-wrap">
        <gothamist-breaking-news class="l-container l-container--16col" />
        <gothamist-marketing-banners class="l-container l-container--16col" />
      </div>
      <transition @after-enter="handleTransitionEnter">
        <Nuxt keep-alive :keep-alive-props="{ include: ['HomePage','Section','Tag'] }" />
      </transition>
    </main>
    <gothamist-footer v-if="!isGallery" />
  </div>
</template>

<script>
/* global htlbid */
import { mapState } from 'vuex'
import gtm from '@/mixins/gtm'
import { setTargeting } from '~/mixins/htl'

export default {
  name: 'Gothamist',
  mixins: [gtm],
  computed: {
    isHomepage () {
      return this.$route.name === 'index'
    },
    isGallery () {
      return this.$route.name === 'section-photos-gallery'
    },
    isTagPage () {
      return this.$route.name === 'tags-slug'
    },
    ...mapState('global', ['isSensitiveContent'])
  },
  watch: {
    $route (newRoute, oldRoute) {
      this.$store.commit('global/setPreviousPath', oldRoute.fullPath)
    }
  },
  mounted () {
    this.handleNewPage()
  },
  methods: {
    handleNewPage () {
      this.setAdTargeting()
      this.setTrackingData()
      this.logPageView()
      this.$store.dispatch('global/setNavigation')
    },
    setAdTargeting () {
      // remove any existing ads
      /* document.querySelectorAll('.htlunit-interior_leaderboard').forEach(function (el) {
        el.remove()
      })
      document.querySelectorAll('.htlunit-interior_midpage_gallery').forEach(function (el) {
        el.remove()
      }) */

      document.querySelectorAll('.htl-ad').forEach(function (el) {
        el.remove()
      })
      document.querySelectorAll('.htl-ad-gpt').forEach(function (el) {
        el.remove()
      })

      // htlbid key value targeting for ads
      window.htlbid = window.htlbid || {}
      htlbid.cmd = htlbid.cmd || []
      htlbid.cmd.push(() => {
        htlbid.layout('universal')
      })
      setTargeting({
        is_testing: this.$config.environment === 'demo' ? 'yes' : 'no',
        is_home: this.isHomepage ? 'yes' : 'no',
        host: location?.host,
        url: this.$route.path,
        urlSegments: this.$route.path.split('/').filter(segment => segment.length > 0)
      })
    },
    handleTransitionEnter () {
      this.$nextTick(() => {
        this.handleNewPage()
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
        },
        {
          hid: 'canonical_url',
          href: 'https://gothamist.com' + this.$route.path,
          rel: 'canonical'
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
  scroll-padding-top: 74px;
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
  display: flex;
  background: RGB(var(--color-background));
  width: 100%;
  min-height: 74px;
  @include media(">medium") {
    min-height: 274px;
  }
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
  visibility: hidden;
}

.ad-div.mod-break-margins {
  position: relative;
  min-height: 274px;
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

.section-photos-gallery {
  margin-top: 0;
  background-color: RGB(var(--color-dark-gray));
  color: RGB(var(--color-white));
  height: 100%;
}

@for $i from 1 through 20 {
  .ad-wrapper-inner .htl-ad-gpt#htlad-#{$i}-gpt, .htl-ad .htl-ad-gpt#htlad-#{$i}-gpt{
    position: relative !important;
  }
  .htlunit-interior_leaderboard_adhesion .htl-ad-gpt#htlad-#{$i}-gpt{
    position: fixed !important;
  }
}

.htl-ad{
  z-index: 1 !important;
}

</style>

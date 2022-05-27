<template>
  <div :class="{ 'home-page': isHomepage }">
    <div v-if="!isSensitiveContent && !isGallery" class="htlad-skin" />
    <div class="ad-wrapper-outer mod-header u-color-group-dark no-print">
      <div v-if="!isSensitiveContent && !isGallery" class="ad-wrapper-inner">
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
      <div
        v-if="!isTagPage && !isGallery"
        class="gothamist-banners l-container l-container--xl l-wrap"
      >
        <gothamist-breaking-news class="l-container l-container--16col" />
        <gothamist-marketing-banners class="l-container l-container--16col" />
      </div>
      <transition @after-enter="handleTransitionEnter">
        <Nuxt
          keep-alive
          :keep-alive-props="{ include: ['HomePage', 'Section', 'Tag'] }"
        />
      </transition>
    </main>
    <gothamist-footer v-if="!isGallery" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
/* global htlbid */
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
      this.setExperimentTracking()
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
        urlSegments: this.$route.path
          .split('/')
          .filter(segment => segment.length > 0)
      })
    },
    setExperimentTracking () {
      if (this.$exp.experimentID && this.$exp.isEligible({ route: this.$route })) {
        this.$gtm.push({
          optimizeExperimentId: this.$exp.experimentID,
          optimizeVariantId: this.$exp.$variantIndexes.join('-')
        })
      }
    },
    handleTransitionEnter () {
      this.$nextTick(() => {
        this.handleNewPage()
      })
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: this.$features.classes.join(' ')
      },
      link: [
        {
          skip: this.$config.environment !== 'demo',
          hid: 'htlcss',
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://htlbid.com/stage/v3/gothamist-legacy.com/htlbid.css'
        },
        {
          skip: this.$config.environment === 'demo',
          hid: 'htlcss',
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://htlbid.com/v3/gothamist-legacy.com/htlbid.css'
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
          src: 'https://htlbid.com/stage/v3/gothamist-legacy.com/htlbid.js',
          defer: true
        },
        {
          skip: this.$config.environment === 'demo',
          hid: 'htljs',
          src: 'https://htlbid.com/v3/gothamist-legacy.com/htlbid.js',
          defer: true
        }
      ]
    }
  }
}
</script>

<style lang="scss">
$ad-wrapper-desktop: 274px;
$ad-wrapper-mobile: 74px;
$main-margin-top: 70px;

html {
  scroll-padding-top: 85px;
}

// prevents the footer from showing in the viewport before content is loaded, which affects our content shift score
main {
  min-height: calc(
    100vh -
      (var(--heading-height) + #{$ad-wrapper-mobile} + #{$main-margin-top})
  );
  @include media('>medium') {
    min-height: calc(
      100vh -
        (var(--heading-height) + #{$ad-wrapper-desktop} + #{$main-margin-top})
    );
  }
}

.home-page main {
  margin-top: calc(45px + var(--space-6)); //45px = overhanging logo height
}

.ad-wrapper-outer {
  color: RGB(var(--color-text-muted));
}

.ad-wrapper-outer.mod-header {
  position: relative;
  display: flex;
  background: RGB(var(--color-background));
  width: 100%;
  min-height: $ad-wrapper-mobile;
  @include media('>medium') {
    min-height: $ad-wrapper-desktop;
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
  min-height: $ad-wrapper-desktop;
}

.ad-div.mod-break-margins > div {
  position: absolute;
  top: 0;
  width: max-content;
}

.ad-div.mod-ad-disclosure > div > div > div::after {
  content: 'Advertisement';
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

// this makes the content 640px wide on the home page
.home-page .l-container--10col {
  max-width: calc((var(--max-width) / 16) * 10.5);
}
// this makes the content 640px wide
.home-page .l-container--16col {
  max-width: calc((var(--max-width) / 16) * 15.75);
}
</style>

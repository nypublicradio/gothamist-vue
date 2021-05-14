<template>
  <div class="gothamist-header">
    <the-header
      :donate-url="donateUrl"
      class="u-color-group-dark"
      :class="{'home-page-header' : isHomepage}"
      @componentEvent="gaEvent('Click Tracking','Donate', 'Header')"
    >
      <template v-slot:menu>
        <the-menu
          class="not-fixed u-color-group-dark"
          :primary-nav="headerNav"
          :secondary-nav="footerNav"
          :legal-nav="legalNav"
        >
          <template v-slot:logo>
            <div>
              <nuxt-link
                to="/"
                aria-label="gothamist home page"
              >
                <gothamist-logo />
              </nuxt-link>
            </div>
          </template>
          <template v-slot:button>
            <div>
              <v-button
                :href="donateUrl"
                target="_blank"
                class="c-main-header__donate"
                label="Donate"
                @click="gaEvent('Click Tracking','Donate', 'Side Menu')"
              />
            </div>
          </template>
          <template v-slot:component>
            <div>
              <v-button
                :href="'mailto:' + tipsEmail"
                target="_blank"
                label="Send A Story Idea"
                class="c-main-header__send-story"
                @click="gaEvent('Click Tracking','Send A Story Idea', 'Side Menu')"
              />
            </div>
          </template>
          <template v-slot:search>
            <div>
              <v-search
                action="/search"
                @searchBarSubmit="gaEvent('Side Menu','user_search')"
              />
            </div>
          </template>
          <template v-slot:social>
            <div>
              <share-tools label="Follow Us">
                <share-tools-item
                  service="facebook"
                  username="gothamist"
                  @componentEvent="gaEvent('NTG social','Social Share', ...arguments)"
                />
                <share-tools-item
                  service="twitter"
                  username="gothamist"
                  @componentEvent="gaEvent('NTG social','Social Share', ...arguments)"
                />
                <share-tools-item
                  service="instagram"
                  username="gothamist"
                  @componentEvent="gaEvent('NTG social','Social Share', ...arguments)"
                />
                <share-tools-item
                  service="youtube"
                  username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
                  @componentEvent="gaEvent('NTG social','Social Share', ...arguments)"
                />
              </share-tools>
            </div>
          </template>
        </the-menu>
      </template>
      <template v-slot:logo>
        <nuxt-link
          to="/"
          class="c-main-header__logo"
          aria-label="gothamist home page"
        >
          <gothamist-logo title="Gothamist" />
        </nuxt-link>
      </template>
      <template v-slot:navigation>
        <secondary-navigation
          orientation="horizontal"
          :nav-items="headerNav"
          @componentEvent="gaEvent('Click Tracking', ...arguments, 'Header')"
        />
      </template>
      <template v-slot:search>
        <v-search
          class="header-search-bar"
          action="/search"
          show-search-icon
          show-close-icon
          closed-on-load
          :search-is-active="false"
          transition="slide-left"
          :donate-url="donateUrl"
          @searchBarOpen="gaEvent('Click Tracking', 'user_search_open', 'Side Menu')"
          @searchBarSubmit="gaEvent('Click Tracking','user_search', 'Side Menu')"
        />
      </template>
      <template v-slot:bottom>
        <scroll-meter
          v-if="scrollMeterTarget"
          :scroll-target-selector="scrollMeterTarget"
        />
      </template>
    </the-header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gtm from '@/mixins/gtm'

export default {
  name: 'GothamistHeader',
  components: {
    SecondaryNavigation: () => import('nypr-design-system-vue/src/components/SecondaryNavigation'),
    TheHeader: () => import('nypr-design-system-vue/src/components/TheHeader'),
    GothamistLogo: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogo'),
    // GothamistLogoStacked: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogoStacked'),
    VSearch: () => import('nypr-design-system-vue/src/components/VSearch'),
    TheMenu: () => import('nypr-design-system-vue/src/components/TheMenu'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    ScrollMeter: () => import('./ScrollMeter')
  },
  mixins: [gtm],
  data () {
    return {
      isHomepage: false,
      scrollMeterTarget: null
    }
  },
  computed: {
    ...mapState('global', {
      donateUrl: state => state.donateUrl,
      tipsEmail: state => state.tipsEmail,
      footerNav: state => state.footerNav,
      headerNav: state => state.headerNav,
      legalNav: state => state.legalNav
    })
  },
  mounted () {
    if (this.$nuxt.$route.name === 'test') {
      this.isHomepage = true
    } else if (this.$route.name === 'section-article') {
      this.scrollMeterTarget = '.article-body'
    }
  }
}
</script>

<style lang="scss">
.gothamist-header {
  position:relative;
}
.progress-bar {
  position: absolute;
  width: 100%;
}

</style>

<template>
  <div class="gothamist-header">
    <the-header
      ref="header"
      :donate-url="donateButtonUrl"
      class="u-color-group-dark"
      :class="{'sticky' : isScrolled}"
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
          <gothamist-logo-stacked title="Gothamist" />
          <gothamist-logo title="Gothamist" />
        </nuxt-link>
      </template>
      <template v-if="!gallery" v-slot:navigation>
        <secondary-navigation
          orientation="horizontal"
          :nav-items="headerNav"
          @componentEvent="gaEvent('Click Tracking', ...arguments, 'Header')"
        />
      </template>
      <template v-if="!gallery" v-slot:search>
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
      <template v-if="gallery" v-slot:social>
        <share-tools label="Share">
          <share-tools-item
            action="share"
            service="facebook"
            :url="url"
            :utm-parameters="{medium: 'social', source: 'facebook', campaign: 'shared_facebook'}"
          />
          <share-tools-item
            action="share"
            service="twitter"
            :url="url"
            :share-parameters="{text: title, via: 'gothamist'}"
            :utm-parameters="{medium: 'social', source: 'twitter', campaign: 'shared_twitter'}"
          />
          <share-tools-item
            action="share"
            service="reddit"
            :url="url"
            :share-parameters="{title: title}"
            :utm-parameters="{medium: 'social', source: 'reddit', campaign: 'shared_reddit'}"
          />
          <share-tools-item
            action="share"
            service="email"
            :url="url"
            :share-parameters="{body: title + ' - %URL%'}"
            :utm-parameters="{medium: 'social', source: 'email', campaign: 'shared_email'}"
          />
        </share-tools>
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
    GothamistLogoStacked: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogoStacked'),
    VSearch: () => import('nypr-design-system-vue/src/components/VSearch'),
    TheMenu: () => import('nypr-design-system-vue/src/components/TheMenu'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    ScrollMeter: () => import('./ScrollMeter')
  },
  mixins: [gtm],
  props: {
    gallery: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isScrolled: false,
      scrollMeterTarget: null,
      title: null,
      url: null
    }
  },
  computed: {
    ...mapState('global', {
      donateUrl: state => state.donateUrl,
      tipsEmail: state => state.tipsEmail,
      footerNav: state => state.footerNav,
      headerNav: state => state.headerNav,
      legalNav: state => state.legalNav
    }),
    donateButtonUrl () {
      if (this.gallery) {
        return null
      } else {
        return this.donateUrl
      }
    }
  },
  mounted () {
    this.title = document.title
    this.url = 'https://gothamist.com' + this.$route.path
    if (this.$route.name === 'section-article') {
      this.scrollMeterTarget = '.article-body'
    }
    if (this.$route.name === 'section-photos-gallery') {
      this.scrollMeterTarget = '.gallery'
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll (e) {
      if (window.innerWidth < 850) {
        this.isScrolled = e.target.documentElement.scrollTop > 35
      } else {
        this.isScrolled = e.target.documentElement.scrollTop > 45
      }
    }
  }
}
</script>

<style lang="scss">
.gothamist-header {
  position: relative;
}

.progress-bar {
  position: absolute;
  width: 100%;
}

.gothamist-header .c-side-menu {
  margin-right: var(--space-4);
  margin-left: var(--space-2);
}

//home page header logo
.home-page .c-main-header {
  --home-page-header-padding: 20px;
  --home-page-header-padding-desktop: 50px;
  padding-top: var(--home-page-header-padding);
  transition: padding var(--animation-duration-standard);
  background: RGB(var(--color-background-darker));
  @include media(">medium") {
    padding-top: var(--home-page-header-padding-desktop);
  }
}

.home-page .c-main-header.sticky {
  padding-top: 0;
}

.c-main-header .c-main-header__logo .gothamist-logo-icon--stacked {
  display: none;
}

.home-page .c-main-header .c-main-header__logo .gothamist-logo-icon--stacked {
  display: block;
}

.home-page .c-main-header .c-main-header__logo .gothamist-logo-icon {
  display: none;
}

.home-page .c-main-header.sticky .c-main-header__logo .gothamist-logo-icon {
  display: inline-block;
}

.home-page .c-main-header.sticky .c-main-header__logo .gothamist-logo-icon--stacked {
  display: none;
}

.home-page .c-main-header:not(.sticky) .c-main-header__logo,
.home-page .c-main-header .gothamist-logo-icon--stacked {
  position: absolute;
  width: 110px;
  height: 115px;
  top: -5px;
  left: 40px;
  @include media(">medium") {
    width: 135px;
    height: 142px;
    top: -15px;
    margin-left: calc(50% - var(--xl-container) / 2 + var(--space-5));
  }
}

.home-page .c-main-header__logo .gothamist-logo-icon--stacked .gothamist-letters path {
  fill: RGB(var(--color-black));
}
</style>

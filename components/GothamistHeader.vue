<template>
  <div
    v-observe-visibility="{callback: headerVisibilityChanged, intersection: {threshold: 1}}"
    class="gothamist-header"
    :class="{'is-stuck': isHeaderStuck}"
  >
    <the-header
      ref="header"
      :donate-url="donateButtonUrl"
      class="u-color-group-dark"
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
                  @follow="gaEvent('NTG social','Social Follow', ...arguments)"
                />
                <share-tools-item
                  service="twitter"
                  username="gothamist"
                  @follow="gaEvent('NTG social','Social Follow', ...arguments)"
                />
                <share-tools-item
                  service="instagram"
                  username="gothamist"
                  @follow="gaEvent('NTG social','Social Follow', ...arguments)"
                />
                <share-tools-item
                  service="youtube"
                  username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
                  @follow="gaEvent('NTG social','Social Follow', ...arguments)"
                />
              </share-tools>
            </div>
          </template>
        </the-menu>
      </template>
      <template
        v-if="showLogo"
        v-slot:logo
      >
        <nuxt-link
          to="/"
          class="c-main-header__logo"
          aria-label="gothamist home page"
        >
          <gothamist-logo-stacked title="Gothamist" />
          <gothamist-logo title="Gothamist" />
        </nuxt-link>
      </template>
      <template
        v-if="showNavigation"
        v-slot:navigation
      >
        <secondary-navigation
          orientation="horizontal"
          :nav-items="headerNav"
          @componentEvent="gaEvent('Click Tracking', ...arguments, 'Header')"
        />
      </template>
      <template
        v-if="showSearch"
        v-slot:search
      >
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
      <template
        v-if="showSocial"
        v-slot:social
      >
        <share-tools label="SHARE">
          <share-tools-item
            action="share"
            service="facebook"
            :url="url + '&utm_medium=social&utm_source=facebook&utm_campaign=shared_facebook'"
            :utm-parameters="{medium: 'social', source: 'facebook', campaign: 'shared_facebook'}"
            @share="gaEvent('NTG social','Social Share', ...arguments)"
          />
          <share-tools-item
            action="share"
            service="twitter"
            :url="url + '&utm_medium=social&utm_source=twitter&utm_campaign=shared_twitter'"
            :share-parameters="{text: title, via: 'gothamist'}"
            :utm-parameters="{medium: 'social', source: 'twitter', campaign: 'shared_twitter'}"
            @share="gaEvent('NTG social','Social Share', ...arguments)"
          />
          <share-tools-item
            action="share"
            service="reddit"
            :url="url + '&utm_medium=social&utm_source=reddit&utm_campaign=shared_reddit'"
            :share-parameters="{title: title}"
            :utm-parameters="{medium: 'social', source: 'reddit', campaign: 'shared_reddit'}"
            @share="gaEvent('NTG social','Social Share', ...arguments)"
          />
          <share-tools-item
            action="share"
            service="email"
            :url="url"
            :share-parameters="{body: title + ' - %URL%'}"
            :utm-parameters="{medium: 'social', source: 'email', campaign: 'shared_email'}"
            @share="gaEvent('NTG social','Social Share', ...arguments)"
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

const ARTICLE_ROUTE = 'section-article'
const GALLERY_ROUTE = 'section-photos-gallery'

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
  data () {
    return {
      isHeaderStuck: false,
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
      if (this.$route.name === GALLERY_ROUTE) {
        return null
      } else {
        return this.donateUrl
      }
    },
    scrollMeterTarget () {
      switch (this.$route.name) {
        case ARTICLE_ROUTE:
          return '.article-body'
        case GALLERY_ROUTE:
          return '.gallery'
        default:
          return null
      }
    },
    showLogo () {
      // Hide the logo at small widths when showing the social menu
      return !(this.socialHeader && ['xsmall', 'small'].includes(this.$mq))
    },
    showNavigation () {
      // hide the nav on the 'social header' view
      return !this.socialHeader
    },
    showSocial () {
      // show the social share on the 'social header' view
      return this.socialHeader
    },
    showSearch () {
      // hide the search on the gallery view
      return !(this.$route.name === GALLERY_ROUTE)
    },
    socialHeader () {
      return this.isHeaderStuck &&
      (this.$route.name === ARTICLE_ROUTE || this.$route.name === GALLERY_ROUTE)
    }
  },
  watch: {
    '$route' () {
      this.updateShareData()
    }
  },
  mounted () {
    this.updateShareData()
    new MutationObserver(() => {
      this.updateShareData()
    }).observe(document.querySelector('title'), { childList: true })
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    headerVisibilityChanged (isVisible, entry) {
      this.isHeaderStuck = entry.intersectionRatio < 1
    },
    updateShareData () {
      this.title = document.title
      if (this.$route.query.image) {
        this.url = 'https://gothamist.com' + this.$route.path + '?image=' + this.$route.query.image
      } else {
        this.url = 'https://gothamist.com' + this.$route.path
      }
    }
  }
}
</script>

<style lang="scss">
.gothamist-header {
  position: sticky;
  z-index: 5000;
  top: -1px;
  width: 100%;
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
.home-page .gothamist-header {
  --home-page-header-padding: 20px;
  --home-page-header-padding-desktop: 50px;
  top: calc(-1px - var(--home-page-header-padding));
  @include media(">medium") {
    top: calc(-1px - var(--home-page-header-padding-desktop));
  }
}

.home-page .c-main-header {
  padding-top: var(--home-page-header-padding);
  transition: padding var(--animation-duration-standard);
  transform-origin: top;
  background: RGB(var(--color-background-darker));
  @include media(">medium") {
    padding-top: var(--home-page-header-padding-desktop);
  }
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

.home-page .gothamist-header.is-stuck {
  .c-main-header__logo .gothamist-logo-icon {
    display: inline-block;
  }
  .c-main-header__logo .gothamist-logo-icon--stacked {
    display: none;
  }
}

.home-page .gothamist-header:not(.is-stuck) .c-main-header__logo{
  position: absolute;
  width: 110px;
  height: 115px;
  top: -11px;
  left: 66px;
  @include media(">medium") {
    width: 135px;
    height: 142px;
    top: -30px;
  }
  @include media(">1255px") {
    left: calc((100vw - var(--max-width-xl)) / 2);
  }
}

.home-page .gothamist-header .gothamist-logo-icon--stacked {
  width: 100%;
  height: 100%;
}

.home-page .c-main-header__logo .gothamist-logo-icon--stacked .gothamist-letters path {
  fill: RGB(var(--color-black));
}

.c-main-header .c-share-tools__label {
  display: none;
  @include media(">large") {
    display: block;
  }
}

.c-main-header .c-share-tools__label {
  display: none;
  @include media(">large") {
    display: block;
  }
}

.c-main-header__right {
  display: inline-grid;
  width: max-content;
  @include media('>small') {
    display: flex;
  }

  .share-tools-button,
  .c-share-tools__link  {
    min-width: 44px;
  }

  .share-tools-button:nth-child(3),
  .share-tools-button:nth-child(4) {
    display: none;
    @include media(">400px") {
      display: block;
    }
  }
}

.c-main-header .c-main-header__right .c-share-tools__group.c-share-tools__group {
  display: flex;
  width: max-content;
  margin-right: var(--space-3);
}

.c-main-header__branding:empty {
    display: none;
}
</style>

<template>
  <div>
    <the-header
      :donate-url="donateUrl"
      class="u-color-group-dark"
    >
      <template v-slot:menu>
        <the-menu
          class="not-fixed u-color-group-dark"
          :primary-nav="headerNav"
          :secondary-nav="footerNav"
        >
          <template v-slot:logo>
            <nuxt-link
              to="/"
              aria-label="gothamist home page"
            >
              <gothamist-logo />
            </nuxt-link>
          </template>
          <template v-slot:button>
            <div>
              <v-button
                :href="donateUrl"
                class="c-main-header__donate"
                label="Donate"
              />
            </div>
          </template>
          <template v-slot:component>
            <div>
              <v-button
                :href="'mailto:' + tipsEmail"
                label="Send Us A Story Idea"
                class="send-story"
              />
            </div>
          </template>
          <template v-slot:search>
            <div>
              <v-search action="/search" />
            </div>
          </template>
          <template v-slot:social>
            <div>
              <share-tools label="Follow Us">
                <share-tools-item
                  service="facebook"
                  username="gothamist"
                />
                <share-tools-item
                  service="twitter"
                  username="gothamist"
                />
                <share-tools-item
                  service="instagram"
                  username="gothamist"
                />
                <share-tools-item
                  service="youtube"
                  username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
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
        />
      </template>
      <template v-slot:search>
        <search-icon
          class="u-icon--xs"
          @click.native="searchIsActive = true"
        />
        <transition name="slide-left">
          <v-search
            v-if="searchIsActive"
            class="header-search-bar"
            show-close-icon
            action="/search"
            @searchBarClose="searchIsActive = false"
          />
        </transition>
      </template>
    </the-header>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GothamistHeader',
  components: {
    SecondaryNavigation: () => import('nypr-design-system-vue/src/components/SecondaryNavigation'),
    TheHeader: () => import('nypr-design-system-vue/src/components/TheHeader'),
    GothamistLogo: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogo'),
    // GothamistLogoStacked: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogoStacked'),
    SearchIcon: () => import('nypr-design-system-vue/src/components/icons/SearchIcon'),
    VSearch: () => import('nypr-design-system-vue/src/components/VSearch'),
    TheMenu: () => import('nypr-design-system-vue/src/components/TheMenu'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem')
  },
  data () {
    return {
      searchIsActive: false,
      isHomepage: false
    }
  },
  computed: {
    ...mapState('global', {
      donateUrl: state => state.donateUrl,
      tipsEmail: state => state.tipsEmail,
      footerNav: state => state.footerNav,
      headerNav: state => state.headerNav
    })
  },
  mounted () {
    if (this.$route.name === 'index') {
      this.isHomepage = true
    }
  }
}
</script>

<style lang="scss">
.c-side-menu {
  margin-right: var(--space-3);
}

.c-side-menu .menu-hamburger {
  width: 16px;
}

.menu .menu-logo {
  margin: auto;
  width: 180px;
}

.menu .menu-primary-navigation .c-secondary-nav__item,
.menu .menu-secondary-navigation .c-secondary-nav__item {
  margin-bottom: var(--space-4);
  padding-left: 0;

  &::after {
    display: none;
  }

  &:last-of-type a::before {
    display: none;
  }
}

.menu .menu-primary-navigation .c-secondary-nav__link {
  border-bottom: 2px dotted RGB(var(--color-banana-yellow));
  color: RGB(var(--color-banana-yellow));
  display: inline-block;
  padding-bottom: 2px;
  font-size: var(--font-size-9);
  line-height: 1;

  &:hover {
    color: RGB(var(--color-white));
    background-color: RGB(var(--color-reddish-orange));
  }
}

.menu .menu-secondary-navigation .c-secondary-nav__link {
  color: RGB(var(--color-white));
  display: inline-block;
  padding-bottom: 2px;
  border-bottom: 2px dotted RGB(var(--color-white));
  text-transform: uppercase;
  font-family: var(--font-family-small) !important;
  letter-spacing: var(--letter-spacing-small) !important;
  line-height: var(--line-height-3);
  font-weight: var(--font-weight-small) !important;
  font-size: var(--font-size-4) !important;
  margin: 0 var(--space-3);

  &:hover {
    color: RGB(var(--color-white));
    background-color: RGB(var(--color-reddish-orange));
  }
}

.menu .menu-secondary-navigation .c-secondary-nav__item {
  display: inline-block;
}

.menu .menu-panel .menu-copyright {
  font-family: var(--font-family-small);
  letter-spacing: var(--letter-spacing-small);
  font-weight: var(--font-weight-small);
  line-height: var(--line-height-1);
  font-size: var(--font-size-2);
}

.menu .menu-panel .menu-terms-links a {
  color: RGB(var(--color-banana-yellow));
  text-decoration: none;
  text-transform: uppercase;
  padding: 8px 0;
  line-height: var(--line-height-1);
  font-size: var(--font-size-2);
  font-family: var(--font-family-small);
  letter-spacing: var(--letter-spacing-small);
  font-weight: var(--font-weight-small);
}

.menu .menu-button .button,
.menu .menu-button .send-story {
  max-width: 310px;
  width: 100%;
  height: 60px;
  line-height: 60px;
}

.menu .menu-button .button .button-label,
.menu .menu-button .send-story .button-label {
  font-size: var(--font-size-6);
}

.c-main-header .search-bar-input {
  border-radius: 0 !important;
}

.c-main-header .search-bar,
.menu .menu-search .search-bar {
  margin: 0 auto var(--space-4) !important;
}

.c-main-header .search-bar .button,
.menu .menu-panel .search-bar .button {
  background-color: RGB(var(--color-banana-yellow));

  &:hover {
    background-color: RGB(var(--color-reddish-orange));
    transform: none;

    &::before {
      display: none;
    }
  }
}

.c-main-header .search-bar .search-bar-close {
  background-color: RGB(var(--color-white));

  &::before {
    display: none;
  }

  &:hover {
    background-color: RGB(var(--color-white));

    path {
      fill: RGB(var(--color-reddish-orange));
    }
  }
}

.c-main-header .search-bar .search-bar-close svg {
  margin-top: 0;
}

.c-main-header .search-bar .search-bar-close path {
  fill: RGB(var(--color-reddish-orange));
}

.menu .menu-button .send-story {
  background-color: RGB(var(--color-banana-yellow));
}

// search bar
.c-main-header .header-search-bar {
  position: absolute;
  right: 0;
  top: 2px;
}

// home page logo
//.index .c-main-header {
//  padding-top: 50px;
//  background: RGB(var(--color-background-darker));
//}
//
//.index .c-main-header__logo,
//.index .c-main-header__logo svg {
//  position: absolute;
//  width: 135px;
//  height: 142px;
//  top: -15px;
//}
//
//.index .c-main-header__logo .gothamist-logo-icon--stacked .gothamist-letters path {
//  fill: RGB(var(--color-black));
//}
</style>

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
                label="Send A Story Idea"
                class="c-main-header__send-story"
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
// home page header logo
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
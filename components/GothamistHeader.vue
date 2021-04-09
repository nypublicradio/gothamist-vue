<template>
  <div>
    <the-header
      :donate-url="donateUrl"
      @componentEvent="gaEvent('Click Tracking','Donate', 'Header')"
      class="u-color-group-dark"
    >
      <template v-slot:menu>
        <the-menu
          class="not-fixed u-color-group-dark"
          :primary-nav="headerNav"
          :secondary-nav="footerNav"
          :legal-nav="legalNav"
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
                @componentEvent="gaEvent('Click Tracking','Donate', 'Side Menu')"
                :href="donateUrl"
                target="_blank"
                class="c-main-header__donate"
                label="Donate"
              />
            </div>
          </template>
          <template v-slot:component>
            <div>
              <v-button
                @click="gaEvent('Click Tracking','Send A Story Idea', 'Side Menu')"
                :href="'mailto:' + tipsEmail"
                target="_blank"
                label="Send A Story Idea"
                class="c-main-header__send-story"
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
          @componentEvent="gaEvent('Click Tracking', ...arguments, 'Header')"
          orientation="horizontal"
          :nav-items="headerNav"
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
    VSearch: () => import('nypr-design-system-vue/src/components/VSearch'),
    TheMenu: () => import('nypr-design-system-vue/src/components/TheMenu'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem')
  },
  mixins: [gtm],
  data () {
    return {
      isHomepage: false
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
    if (this.$route.name === 'index') {
      this.isHomepage = true
    }
  }
}
</script>

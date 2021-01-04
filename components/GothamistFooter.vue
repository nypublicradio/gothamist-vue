<template>
  <the-header :donate-url="$store.getters['global/donateUrl']">
    <template v-slot:logo>
      <a
        href="https://wnyc.org"
        target="_blank"
        rel="noopener"
      >
        <gothamist-logo-stacked title="Gothamist" />
        <span class="is-vishidden">(New tab)</span>
      </a>
    </template>
    <template v-slot:navigation>
      <div>
        <secondary-navigation
          orientation="horizontal"
          :nav-items="$store.getters['global/primaryNav']"
        />
      </div>
    </template>
    <template v-slot:search>
      <search-icon />
      <div v-if="searchIsActive">
        <v-search />
      </div>
    </template>
    <template v-slot:menu>
      <v-menu
        class="not-fixed"
        :primary-nav="$store.getters['global/primaryNav']"
        :secondary-nav="$store.getters['global/primaryNav']"
      >
        <template v-slot:logo>
          <gothamist-logo />
        </template>
        <template v-slot:button>
          <v-button
            href="http://www.google.com"
            label="Primary Button"
          />
        </template>
        <template v-slot:component>
          <p class="u-align--center">
            <em>slot for component</em>
          </p>
        </template>
        <template v-slot:search>
          <v-search action="/search" />
        </template>
        <template v-slot:social>
          <share-tools label="Connect">
            <share-tools-item
              service="facebook"
              username="WNYC"
            />
            <share-tools-item
              service="twitter"
              username="WNYC"
            />
            <share-tools-item
              service="instagram"
              username="WNYC"
            />
            <share-tools-item
              service="youtube"
              username="UCbysmY4hyViQAAYEzOR-uCQ"
            />
          </share-tools>
        </template>
      </v-menu>
    </template>
  </the-header>
</template>

<script>
export default {
  name: 'GothamistHeader',
  components: {
    SecondaryNavigation: () => import('nypr-design-system-vue/src/components/SecondaryNavigation'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    TheHeader: () => import('nypr-design-system-vue/src/components/TheHeader'),
    GothamistLogo: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogo'),
    GothamistLogoStacked: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogoStacked'),
    SearchIcon: () => import('nypr-design-system-vue/src/components/icons/SearchIcon'),
    VSearch: () => import('nypr-design-system-vue/src/components/VSearch'),
    VMenu: () => import('nypr-design-system-vue/src/components/VMenu')
  },
  data () {
    return {
      searchIsActive: false
    }
  }
}
</script>

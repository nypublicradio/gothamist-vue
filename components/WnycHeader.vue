<template>
  <the-header :donate-url="donateUrl">
    <template v-slot:menu>
      <the-menu
        class="not-fixed u-color-group-dark"
        :primary-nav="headerNav"
      >
        <template v-slot:logo>
          <a href="https://www.WNYC.org" target="_blank">
            <wnyc-logo />
          </a>
        </template>
      </the-menu>
    </template>
    <template v-slot:logo>
      <a
        href="https://wnyc.org"
        target="_blank"
        rel="noopener"
      >
        <wnyc-logo title="WNYC" />
        <span class="is-vishidden">(New tab)</span>
      </a>
    </template>
    <template v-slot:navigation>
      <div>
        <secondary-navigation
          orientation="horizontal"
          :nav-items="headerNav"
        />
      </div>
    </template>
  </the-header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WnycHeader',
  components: {
    SecondaryNavigation: () => import('nypr-design-system-vue/src/components/SecondaryNavigation'),
    TheHeader: () => import('nypr-design-system-vue/src/components/TheHeader'),
    TheMenu: () => import('nypr-design-system-vue/src/components/TheMenu'),
    WnycLogo: () => import('nypr-design-system-vue/src/components/icons/wnyc/WnycLogo')
  },
  computed: {
    ...mapState('global', {
      donateUrl: state => state.donateUrl,
      headerNav: state => state.headerNav
    })
  }
}
</script>

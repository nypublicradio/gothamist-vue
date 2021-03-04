<template>
  <div>
    <back-to-top />
    <the-footer
      :slogan="footerSlogan"
      :primary-nav="footerNav"
      :legal-nav="legalNav"
      subheader1="About Us"
    >
      <template v-slot:logo>
        <nuxt-link
          to="/"
          aria-label="gothamist home page"
        >
          <gothamist-logo-stacked />
        </nuxt-link>
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
      <template v-slot:rightComponent>
        <div>
          newsletter goes here
        </div>
      </template>
    </the-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GothamistFooter',
  components: {
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    GothamistLogoStacked: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogoStacked'),
    TheFooter: () => import('nypr-design-system-vue/src/components/TheFooter'),
    BackToTop: () => import('../components/BackToTop')
  },
  computed: {
    ...mapState('global', {
      footerNav: state => state.footerNav,
      footerSlogan: state => state.footerSlogan,
      legalNav: state => state.legalNav
    })
  }
}
</script>

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
      <template v-slot:rightComponent>
        <div>
          <gothamist-footer-newsletter />
        </div>
      </template>
    </the-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gtm from '@/mixins/gtm'

export default {
  name: 'GothamistFooter',
  components: {
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    GothamistLogoStacked: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistLogoStacked'),
    TheFooter: () => import('nypr-design-system-vue/src/components/TheFooter'),
    GothamistFooterNewsletter: () => import('../components/GothamistFooterNewsletter'),
    BackToTop: () => import('../components/BackToTop')
  },
  mixins: [gtm],
  computed: {
    ...mapState('global', {
      footerNav: state => state.footerNav,
      footerSlogan: state => state.footerSlogan,
      legalNav: state => state.legalNav
    })
  }
}
</script>

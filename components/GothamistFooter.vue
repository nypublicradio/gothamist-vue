<template>
  <div>
    <the-footer
      slogan="Gothamist is a website about New York City news, arts and events, and food, brought to you by New York Public Radio. Gothamist is supported by the American Express Foundation."
      :primary-nav="footerNav"
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
        <p><em>slot for footer newsletter component</em></p>
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
    TheFooter: () => import('nypr-design-system-vue/src/components/TheFooter')
  },
  computed: {
    ...mapState('global', {
      footerNav: state => state.footerNav
    })
  }
}
</script>

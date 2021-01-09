<template>
  <the-footer
    slogan="Listener-supported WNYC is the home for independent journalism and courageous conversation on air and online. Broadcasting live from New York City on 93.9 FM and AM 820 and available online and on the go."
    :secondary-nav="footerSecondaryNav"
    :tertiary-nav="footerTertiaryNav"
    subheader1="About Us"
  >
    <template v-slot:logo>
      <nuxt-link to="/" aria-label="wnyc home page">
        <wnyc-logo />
      </nuxt-link>
    </template>
    <template v-slot:leftComponent>
      <div class="o-text-with-icon jlgreen-box">
        <p class="jlgreen-message">
          WNYC is supported by the JLGreene Foundation
        </p>
        <a
          href="https://jlgreene.org"
          target="_blank"
          aria-label="JL greene.org"
          rel="noopener"
        >
          <jlgreene-logo aria-hidden="true" />
        </a>
      </div>
    </template>
    <template v-slot:rightComponent>
      <div>
        <v-button label="Send Us Your Feedback" href="https://www.surveymonkey.com/r/LGP2Z96" target="_blank" />
      </div>
    </template>
    <template v-slot:social>
      <div>
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
      </div>
    </template>
  </the-footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WnycFooter',
  components: {
    JlgreeneLogo: () => import('nypr-design-system-vue/src/components/icons/wnyc/JlgreeneLogo'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    TheFooter: () => import('nypr-design-system-vue/src/components/TheFooter'),
    WnycLogo: () => import('nypr-design-system-vue/src/components/icons/wnyc/WnycLogo'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton')
  },
  computed: {
    ...mapState('global', {
      footerSecondaryNav: state => state.footerSecondaryNav,
      footerTertiaryNav: state => state.footerTertiaryNav
    })
  }
}
</script>

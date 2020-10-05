<template>
  <div>
    <the-header :donate-url="$store.getters['global/donateUrl']">
      <nuxt-link to="index">
        <wnyc-logo />
      </nuxt-link>
    </the-header>
    <v-spacer size="triple" />
    <main>
      <Nuxt />
    </main>
    <v-spacer size="triple" />
    <the-footer
      slogan="Listener-supported WNYC is the home for independent journalism and courageous conversation on air and online. Broadcasting live from New York City on 93.9 FM and AM 820 and available online and on the go."
      :secondary-nav="$store.getters['global/footerSecondaryNav']"
      :tertiary-nav="$store.getters['global/footerSecondaryNav']"
      subheader1="About Us"
    >
      <template v-slot:logo>
        <wnyc-logo />
      </template>
      <template v-slot:leftComponent>
        <div class="o-text-with-icon u-space--double--top">
          <p>WNYC is supported by the JLGreene Foundation</p>
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
    </the-footer>
    <v-spacer size="quad" />
    <div
      role="complementary"
      aria-label="WNYC Audio Controls"
    >
      <persistent-player
        livestream
        :station="$store.getters['whatsOnNow/station']"
        :title="$store.getters['whatsOnNow/title']"
        :title-link="$store.getters['whatsOnNow/titleLink']"
        :details="$store.getters['whatsOnNow/details']"
        :details-link="$store.getters['whatsOnNow/detailsLink']"
        :file="$store.getters['whatsOnNow/file']"
        class="u-color-group-dark"
        aria-live="polite"
      />
    </div>
  </div>
</template>

<script>
import JlgreeneLogo from 'nypr-design-system-vue/src/components/icons/wnyc/JlgreeneLogo'
import PersistentPlayer from 'nypr-design-system-vue/src/components/PersistentPlayer'
import ShareTools from 'nypr-design-system-vue/src/components/ShareTools'
import ShareToolsItem from 'nypr-design-system-vue/src/components/ShareToolsItem'
import TheFooter from 'nypr-design-system-vue/src/components/TheFooter'
import TheHeader from 'nypr-design-system-vue/src/components/TheHeader'
import WnycLogo from 'nypr-design-system-vue/src/components/icons/wnyc/WnycLogo'
import VSpacer from 'nypr-design-system-vue/src/components/VSpacer'

export default {
  name: 'Wnyc',
  components: {
    JlgreeneLogo,
    PersistentPlayer,
    ShareTools,
    ShareToolsItem,
    TheFooter,
    TheHeader,
    WnycLogo,
    VSpacer
  }
}
</script>

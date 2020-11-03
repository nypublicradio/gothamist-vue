<template>
  <div>
    <lazy-hydrate ssr-only>
      <the-header :donate-url="$store.getters['global/donateUrl']">
        <template v-slot:logo>
          <nuxt-link to="/" aria-label="wnyc home page">
            <wnyc-logo />
          </nuxt-link>
        </template>

        <template v-slot:navigation>
          <secondary-navigation
            orientation="horizontal"
            :nav-items="$store.getters['global/headerNav']"
          />
        </template>
      </the-header>
    </lazy-hydrate>
    <main>
      <div class="dots header-dots" />
      <Nuxt />
    </main>
    <lazy-hydrate ssr-only>
      <the-footer
        slogan="Listener-supported WNYC is the home for independent journalism and courageous conversation on air and online. Broadcasting live from New York City on 93.9 FM and AM 820 and available online and on the go."
        :secondary-nav="$store.getters['global/footerSecondaryNav']"
        :tertiary-nav="$store.getters['global/footerSecondaryNav']"
        subheader1="About Us"
      >
        <template v-slot:logo>
          <nuxt-link to="/" aria-label="wnyc home page">
            <wnyc-logo />
          </nuxt-link>
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
    </lazy-hydrate>
    <v-spacer size="quad" />
    <transition name="fade">
      <div
        v-if="$store.getters['whatsOnNow/whatsOnNow']"
        role="complementary"
        aria-label="WNYC Audio Controls"
      >
        <persistent-player
          livestream
          :auto-play="$store.getters['whatsOnNow/whatsOnNowPlaying']"
          :is-playing="$store.getters['whatsOnNow/whatsOnNowPlaying']"
          :image="$store.getters['whatsOnNow/whatsOnNowImage']"
          :station="$store.getters['whatsOnNow/whatsOnNowStation']"
          :title="$store.getters['whatsOnNow/whatsOnNowTitle']"
          :title-link="$store.getters['whatsOnNow/whatsOnNowTitleLink']"
          :description="$store.getters['whatsOnNow/whatsOnNowDetails']"
          :description-link="$store.getters['whatsOnNow/whatsOnNowDetailsLink']"
          :file="$store.getters['whatsOnNow/whatsOnNowFile']"
          :should-show-cta="true"
          class="u-color-group-dark"
          aria-live="polite"
          @togglePlay="togglePlay($store.getters['whatsOnNow/whatsOnNow'])"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import whatsOnNow from '@/mixins/whatsOnNow'

export default {
  name: 'Wnyc',
  components: {
    LazyHydrate,
    JlgreeneLogo: () => import('nypr-design-system-vue/src/components/icons/wnyc/JlgreeneLogo'),
    PersistentPlayer: () => import('nypr-design-system-vue/src/components/PersistentPlayer'),
    SecondaryNavigation: () => import('nypr-design-system-vue/src/components/SecondaryNavigation'),
    ShareTools: () => import('nypr-design-system-vue/src/components/ShareTools'),
    ShareToolsItem: () => import('nypr-design-system-vue/src/components/ShareToolsItem'),
    TheFooter: () => import('nypr-design-system-vue/src/components/TheFooter'),
    TheHeader: () => import('nypr-design-system-vue/src/components/TheHeader'),
    WnycLogo: () => import('nypr-design-system-vue/src/components/icons/wnyc/WnycLogo'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [whatsOnNow]
}
</script>

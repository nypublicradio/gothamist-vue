<template>
  <div class="l-container l-container--12col">
    <lazy-hydrate ssr-only>
      <h1 class="is-vishidden">
        Livestream WNYC FM 93.9 and AM 820
      </h1>
    </lazy-hydrate>
    <v-spacer size="double" />
    <stream-switcher class="u-color-group-dark">
      <stream-switcher-card
        station="WNYC 93.9 FM"
        title="BBC World Service"
        :active="true"
        :playing="true"
      />
      <stream-switcher-card
        station="WNYC AM 820"
        title="The Takeaway"
      />
    </stream-switcher>
    <main-player
      :image="$store.getters['whatsOnNow/image']"
      :title="$store.getters['whatsOnNow/title']"
      :title-link="$store.getters['whatsOnNow/titleLink']"
      :details="$store.getters['whatsOnNow/details']"
      :details-link="$store.getters['whatsOnNow/detailsLink']"
      :time="$store.getters['whatsOnNow/time']"
    >
      <v-button
        label="Listen Live"
        @click="updateWhatsOnNow"
      >
        <play-simple />
      </v-button>
    </main-player>
    <p class="u-space--triple--top">
      <nuxt-link to="/test">
        test page
      </nuxt-link>
    </p>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import whatsOnNow from '@/mixins/whatsOnNow'

export default {
  name: 'HomePage',
  components: {
    LazyHydrate,
    MainPlayer: () => import('nypr-design-system-vue/src/components/MainPlayer'),
    PlaySimple: () => import('nypr-design-system-vue/src/components/icons/PlaySimple'),
    StreamSwitcher: () => import('nypr-design-system-vue/src/components/StreamSwitcher'),
    StreamSwitcherCard: () => import('nypr-design-system-vue/src/components/StreamSwitcherCard'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [whatsOnNow],
  head () {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'test'
        }
      ]
    }
  }
}
</script>

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
        v-for="(stream, index) in $store.getters['whatsOnNow/streams']"
        :key="index"
        :station="stream.station"
        :title="stream.title"
        :up-next-title="stream.upNextTitle"
        :active="stream.active"
        :playing="stream.playing"
        @click="setSelectedStream(stream, index)"
      />
    </stream-switcher>
    <main-player
      :image="$store.getters['whatsOnNow/selectedStreamImage']"
      :title="$store.getters['whatsOnNow/selectedStreamTitle']"
      :title-link="$store.getters['whatsOnNow/selectedStreamTitleLink']"
      :details="$store.getters['whatsOnNow/selectedStreamDetails']"
      :details-link="$store.getters['whatsOnNow/selectedStreamDetailsLink']"
      :time="$store.getters['whatsOnNow/selectedStreamTime']"
    >
      <v-button
        label="Listen Live"
        @click="togglePlay($store.getters['whatsOnNow/selectedStream'])"
      >
        <pause-icon v-if="$store.getters['whatsOnNow/whatsOnNowPlaying']" />
        <play-simple v-else />
      </v-button>
    </main-player>
<!--    <p class="u-space&#45;&#45;triple&#45;&#45;top">-->
<!--      playing? {{ $store.getters['whatsOnNow/whatsOnNowPlaying'] }}-->
<!--    </p>-->
<!--    <p class="u-space&#45;&#45;triple&#45;&#45;top">-->
<!--      {{ $store.getters['whatsOnNow/whatsOnNow'] }}-->
<!--    </p>-->
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
    PauseIcon: () => import('nypr-design-system-vue/src/components/icons/wqxr/PauseIcon'),
    PlaySimple: () => import('nypr-design-system-vue/src/components/icons/PlaySimple'),
    StreamSwitcher: () => import('nypr-design-system-vue/src/components/StreamSwitcher'),
    StreamSwitcherCard: () => import('nypr-design-system-vue/src/components/StreamSwitcherCard'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [whatsOnNow]
}
</script>

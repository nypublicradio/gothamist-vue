<template>
  <div>
    <div class="l-container">
      <div class="l-container--12col">
        <h1 class="is-vishidden">
          Livestream WNYC FM 93.9 and AM 820
        </h1>
        <v-spacer size="quad" />
        <stream-switcher class="u-color-group-dark">
          <stream-switcher-card
            v-for="(stream, index) in $store.getters['whatsOnNow/streams']"
            :key="index"
            :station="stream.station"
            :title="stream.title"
            :active="stream.active"
            :playing="stream.playing"
            @click="setSelectedStream(stream, stream.index)"
          />
        </stream-switcher>
        <main-player
          :image="$store.getters['whatsOnNow/selectedStreamImage']"
          :title="$store.getters['whatsOnNow/selectedStreamTitle']"
          :title-link="$store.getters['whatsOnNow/selectedStreamTitleLink']"
          :details="$store.getters['whatsOnNow/selectedStreamDetails']"
          :details-link="$store.getters['whatsOnNow/selectedStreamDetailsLink']"
          :time="formatTime($store.getters['whatsOnNow/selectedStreamTime'])"
        >
          <v-button
            v-if="$store.getters['whatsOnNow/dataLoaded']"
            label="Listen Live"
            @click="playButtonClicked($store.getters['whatsOnNow/selectedStream'])"
          >
            <pause-icon v-if="$store.getters['vue-hifi/getIsPlaying'] && $store.getters['whatsOnNow/selectedStreamPlaying']" />
            <play-simple v-else />
          </v-button>
        </main-player>
      </div>
      <v-spacer size="quad" />
      <on-todays-show />
    </div>
  </div>
</template>

<script>
import whatsOnNow from '@/mixins/whatsOnNow'
import vueHifi from 'vue-hifi/src/mixins/vue-hifi'

export default {
  name: 'HomePage',
  components: {
    MainPlayer: () => import('nypr-design-system-vue/src/components/MainPlayer'),
    OnTodaysShow: () => import('../components/OnTodaysShow'),
    PauseIcon: () => import('nypr-design-system-vue/src/components/icons/wqxr/PauseIcon'),
    PlaySimple: () => import('nypr-design-system-vue/src/components/icons/PlaySimple'),
    StreamSwitcher: () => import('nypr-design-system-vue/src/components/StreamSwitcher'),
    StreamSwitcherCard: () => import('nypr-design-system-vue/src/components/StreamSwitcherCard'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [whatsOnNow, vueHifi]
}
</script>

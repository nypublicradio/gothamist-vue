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
            v-for="(stream, index) in streams"
            :key="index"
            :station="stream.station"
            :title="stream.title"
            :active="stream.active"
            :playing="stream.playing"
            @click="setSelectedStream(stream, stream.index)"
          />
        </stream-switcher>
        <main-player
          :image="mainPlayerImage"
          :title="mainPlayerTitle"
          :title-link="mainPlayerTitleLink"
          :details="mainPlayerDetails"
          :details-link="mainPlayerDetailsLink"
          :time="mainPlayerTime"
        >
          <v-button
            v-if="$store.getters['whatsOnNow/dataLoaded']"
            label="Listen Live"
            @click="playButtonClicked(selectedStream)"
          >
            <pause-icon v-show="vueHifiIsPlaying && selectedStreamPlaying" />
            <loading-icon v-show="vueHifiIsLoading" />
            <play-simple v-show="!vueHifiIsPlaying && !selectedStreamPlaying" />
          </v-button>
        </main-player>
      </div>
      <v-spacer size="quad" />
      <on-todays-show />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import whatsOnNow from '@/mixins/whatsOnNow'
import vueHifi from 'vue-hifi/src/mixins/vue-hifi'
import api from '~/mixins/api'
import helpers from '~/mixins/helpers'

export default {
  name: 'HomePage',
  components: {
    LoadingIcon: () => import('nypr-design-system-vue/src/components/animations/LoadingIcon'),
    MainPlayer: () => import('nypr-design-system-vue/src/components/MainPlayer'),
    OnTodaysShow: () => import('../components/OnTodaysShow'),
    PauseIcon: () => import('nypr-design-system-vue/src/components/icons/wqxr/PauseIcon'),
    PlaySimple: () => import('nypr-design-system-vue/src/components/icons/PlaySimple'),
    StreamSwitcher: () => import('nypr-design-system-vue/src/components/StreamSwitcher'),
    StreamSwitcherCard: () => import('nypr-design-system-vue/src/components/StreamSwitcherCard'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [whatsOnNow, vueHifi, api, helpers],
  computed: {
    ...mapState('whatsOnNow', {
      streams: state => state.streams,
      selectedStream: state => state.selectedStream,
      selectedStreamPlaying: state => state.selectedStream.playing,
      mainPlayerEndTime: state => state.selectedStream.timeEnd,
      mainPlayerDetails: state => state.selectedStream.details,
      mainPlayerDetailsLink: state => state.selectedStream.detailsLink,
      mainPlayerImage: state => state.selectedStream.image,
      mainPlayerStartTime: state => state.selectedStream.timeStart,
      mainPlayerTitle: state => state.selectedStream.title,
      mainPlayerTitleLink: state => state.selectedStream.titleLink
    }),
    ...mapState('vue-hifi', {
      vueHifiIsPlaying: state => state.isPlaying,
      vueHifiIsLoading: state => state.isLoading
    }),
    mainPlayerTime () {
      if (this.mainPlayerStartTime && this.mainPlayerEndTime) {
        return this.formatTime(this.mainPlayerStartTime) + ' - ' + this.formatTime(this.mainPlayerEndTime)
      }
      return null
    }
  }
}
</script>

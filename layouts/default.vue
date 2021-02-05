<template>
  <div>
    <wnyc-header />
    <main>
      <div class="dots header-dots" />
      <Nuxt />
    </main>
    <wnyc-footer />
    <v-spacer size="quad" />
    <transition name="fade">
      <div
        v-if="dataLoaded"
        role="complementary"
        aria-label="WNYC Audio Controls"
      >
        <persistent-player
          livestream
          :auto-play="whatsOnNowPlaying"
          :is-playing="vueHifiIsPlaying"
          :is-loading="vueHifiIsLoading"
          :volume="vueHifiVolume"
          :is-muted="vueHifiIsMuted"
          :image="whatsOnNowImage"
          :station="whatsOnNowStation"
          :title="whatsOnNowTitle"
          :title-link="whatsOnNowTitleLink"
          :description="whatsOnNowEpisodeTitle"
          :description-link="whatsOnNowEpisodeLink"
          :file="whatsOnNowFile"
          :should-show-cta="!hasSomethingBeenPlayedYet"
          class="u-color-group-dark"
          aria-live="polite"
          @togglePlay="playButtonClicked(whatsOnNow, 'Persistent Player')"
          @volume-toggle-mute="toggleMute"
          @volume-change="setVolume($event)"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import helpers from '@/mixins/helpers'
import gtm from '@/mixins/gtm'
import whatsOnNow from '@/mixins/whatsOnNow'
import api from '@/mixins/api'
import vueHifi from '../node_modules/vue-hifi/src/mixins/vue-hifi'
import 'focus-visible'

export default {
  name: 'Wnyc',
  components: {
    PersistentPlayer: () => import('nypr-design-system-vue/src/components/PersistentPlayer'),
    WnycFooter: () => import('../components/WnycFooter'),
    WnycHeader: () => import('../components/WnycHeader'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [whatsOnNow, vueHifi, api, helpers, gtm],
  data () {
    return {
      timer: null
    }
  },
  computed: {
    ...mapState('whatsOnNow', {
      dataLoaded: state => state.dataLoaded,
      hasSomethingBeenPlayedYet: state => state.hasSomethingBeenPlayedYet,
      whatsOnNow: state => state.whatsOnNow,
      whatsOnNowEpisodeTitle: state => state.whatsOnNow.episodeTitle,
      whatsOnNowEpisodeLink: state => state.whatsOnNow.episodeLink,
      whatsOnNowFile: state => state.whatsOnNow.file,
      whatsOnNowImage: state => state.whatsOnNow.image,
      whatsOnNowPlaying: state => state.whatsOnNow.playing,
      whatsOnNowStation: state => state.whatsOnNow.station,
      whatsOnNowTitle: state => state.whatsOnNow.title,
      whatsOnNowTitleLink: state => state.whatsOnNow.titleLink
    }),
    ...mapState('vue-hifi', {
      vueHifiVolume: state => state.volume,
      vueHifiIsLoading: state => state.isLoading,
      vueHifiIsMuted: state => state.isMuted,
      vueHifiIsPlaying: state => state.isPlaying
    })
  },
  mounted () {
    // send a google analytics event every 2 minutes if a stream is playing
    this.timer = window.setInterval(() => {
      if (this.vueHifiIsPlaying) {
        this.gaEvent('WNYC Player', 'Ping', this.station)
      } else {
        clearInterval(this.timer)
      }
    }, 120000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

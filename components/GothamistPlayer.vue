<template>
  <div
    v-if="!playerDismissed"
    class="persistent-player-wrapper"
  >
    <collapsible-message
      prefix="player-welcome"
      @collapse="handleWelcomeMessageCollapsed"
    >
      You can now listen to WNYC on Gothamist! Let us know what you think of this experimental feature <a href="https://surveys.hotjar.com/e0b0fda5-4c70-43b4-bea5-32bca9fd25f8" target="_blank" rel="noopener">here</a>.
    </collapsible-message>
    <div
      class="player-row u-color-group-dark"
    >
      <aside
        aria-label="WNYC Audio Controls"
      >
        <persistent-player
          v-if="dataLoaded"
          class="gothamist-player"
          livestream
          :auto-play="whatsOnNowPlaying"
          :is-playing="vueHifiIsPlaying"
          :is-loading="vueHifiIsLoading"
          :volume="vueHifiVolume"
          :is-muted="vueHifiIsMuted"
          :station="whatsOnNowStation"
          :title="whatsOnNowTitle"
          :description="whatsOnNowEpisodeTitle"
          :file="whatsOnNowFile"
          :should-show-cta="!hasSomethingBeenPlayedYet"
          aria-live="polite"
          @togglePlay="handlePlayButton"
          @volume-toggle-mute="toggleMute"
          @volume-change="setVolume($event)"
        />
        <div class="extra-controls">
          <v-button class="dismiss-button button" @click="handleDismissButton">
            <close-icon />
          </v-button>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import whatsOnNow from '@/mixins/whatsOnNow'
import gtm from '@/mixins/gtm'
import api from '@/mixins/api'
import vueHifi from '../node_modules/vue-hifi/src/mixins/vue-hifi'

export default {
  name: 'GothamistPlayer',
  mixins: [gtm, whatsOnNow, vueHifi, api],
  data () {
    return {
      windowWidth: null,
      timer: null,
      playerDismissed: false
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
      whatsOnNowTitleLink: state => state.whatsOnNow.titleLink,
      streams: state => state.streams,
      selectedStream: state => state.selectedStream,
      selectedStreamPlaying: state => state.selectedStream.playing
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
        this.gaEvent('Gothamist Player', 'Ping', this.station)
      } else {
        clearInterval(this.timer)
      }
    }, 120000)
  },
  beforeDestroy () {
    this.windowWidth = window.innerWidth
    clearInterval(this.timer)
  },
  methods: {
    handleWelcomeMessageCollapsed () {
      this.$emit('welcome-message-dismissed')
    },
    handleDismissButton () {
      this.$emit('player-dismissed')
      this.stop()
      this.playerDismissed = true
    },
    handlePlayButton (e) {
      if (!this.vueHifiIsPlaying && !this.vueHifiIsLoading) {
        this.$emit('play-clicked')
      }
      if (this.vueHifiIsPlaying && this.vueHifiIsLoading) {
        this.$emit('pause-clicked')
      }
      this.playButtonClicked(this.whatsOnNow, 'Persistent Player')
    }
  }
}
</script>

<style lang="scss">
.persistent-player-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  right: 0;
  height: 144px;
  z-index: 1200;
  width: 100%;

@include media('>medium') {
    width: 380px;
  }

  .player-row aside {
    display: flex;
    flex-direction: row;
    color: RGB(var(--color-text));
    background-color: RGB(var(--color-background));

    .persistent-player {
      position: relative;
      padding: 0 16px;
      flex-grow: 1;
    }

    .extra-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      flex-basis: 64px;
      flex-grow: 0;
      padding-right: 16px;
    }
  }

  .button {
    width: 40px;
    height: 40px;
    background: RGB(var(--color-white));
    & svg > path {
      fill: RGB(var(--color-dark-gray));
    }
    &:hover {
      transform: none;
    }
    &:before {
      content: none
    }
  }

  .dismiss-button {
    background: RGB(var(--color-dark-gray));
    & svg > path {
      fill: RGB(var(--color-white));
    }
  }

  .volume-control {
    display: none;
  }
}

.gothamist-player {
  .track-info-livestream-station {
    letter-spacing: 0.15em;
  }
  .player-cta-play-button .button-text {
    display: none;
  }
  .player-controls .player-cta-play-button {
    margin-right: 0;
  }
  .player-controls svg, .player-controls svg * {
    fill: RGB(var(--color-button-text));
  }
  .button .loading-icon path {
    stroke: RGB(51,51,51);
  }
  .player-controls .play-button {
    min-width: auto;
  }
}

</style>

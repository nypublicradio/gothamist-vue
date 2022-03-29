<template>
  <div
    class="persistent-player-wrapper"
  >
    <div
      class="intro-tooltip"
    >
      You can now listen to WNYC on Gothamist! Let us know what you think of this experimental feature here.
    </div>
    <div class="player-row">
      <aside
        aria-label="WNYC Audio Controls"
      >
        <persistent-player
          v-if="dataLoaded"
          livestream
          :auto-play="whatsOnNowPlaying"
          :is-playing="vueHifiIsPlaying"
          :is-loading="vueHifiIsLoading"
          :volume="vueHifiVolume"
          :is-muted="vueHifiIsMuted"
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
        <div class="extra-controls">
          <button class="close-button">
            X
          </button>
        </div>
      </aside>
    </div>
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
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
.persistent-player-wrapper {
  bottom: 0;
  right: 0;
  height: 144px;
  position: fixed;
  z-index: 1200;
  width: 100%;

  @include media('>medium') {
    width: 350px;
  }

  .intro-tooltip {
    height: 48px;
    background: RGB(var(--color-banana-yellow));
    padding: 8px 12px;
    font-size: 12px;
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
      width: 38px;
      flex-basis: 38px;
      flex-grow: 0;
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

  .volume-control {
    display: none;
  }
}
</style>

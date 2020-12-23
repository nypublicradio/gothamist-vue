export default {
  methods: {
    // update what's on now in the vuex store
    setWhatsOnNow (stream) {
      this.$store.commit(
        'whatsOnNow/setWhatsOnNow',
        {
          index: stream.index,
          active: stream.active,
          details: stream.details,
          detailsLink: stream.detailsLink,
          file: stream.file,
          image: stream.image,
          playing: stream.playing,
          station: stream.station,
          time: stream.time,
          title: stream.title,
          titleLink: stream.titleLink,
          upNextTitle: stream.upNextTitle
        }
      )
    },
    // update the selected stream in the vuex store
    setSelectedStream (stream, index) {
      this.$store.commit(
        'whatsOnNow/setSelectedStream',
        stream
      )
      // update the stream to active
      this.$store.commit(
        'whatsOnNow/setStreamToActive',
        index
      )
      // if nothing has been played yet, set what's on now to the selected stream
      if (!this.$store.getters['whatsOnNow/hasSomethingBeenPlayedYet']) {
        this.$store.commit(
          'whatsOnNow/setWhatsOnNow', stream
        )
      }
    },
    toggleAudioPlayback (stream) {
      this.$store.commit(
        'whatsOnNow/somethingHasBeenPlayed'
      )
      if (stream === this.$store.getters['whatsOnNow/whatsOnNow']) {
        // if the stream is the same one that's currently playing or paused:
        // toggle the what's on now playing state
        if (this.$store.getters['whatsOnNow/whatsOnNowPlaying']) {
          this.$store.commit(
            'whatsOnNow/setWhatsOnNowToNotPlaying'
          )
          this.$store.commit(
            'whatsOnNow/setStreamsToNotPlaying'
          )
        } else {
          this.setWhatsOnNow(stream)
          this.$store.commit(
            'whatsOnNow/setWhatsOnNowToPlaying'
          )
          this.$store.commit(
            'whatsOnNow/setStreamToPlaying', stream.index
          )
        }
      } else {
        // if the stream is not the same one that's currently playing or paused:
        // update what's on now
        this.$store.commit(
          'whatsOnNow/setWhatsOnNow', stream
        )
        // set the stream to playing
        this.$store.commit(
          'whatsOnNow/setStreamToPlaying', stream.index
        )
        // stop playback
        this.$store.commit(
          'whatsOnNow/setWhatsOnNowToNotPlaying'
        )
      }
    },
    playButtonClicked (stream) {
      this.toggleAudioPlayback(stream)
      const isPlaying = this.$store.getters['vue-hifi/getIsPlaying']
      if (isPlaying) {
        this.stop()
        this.$store.commit(
          'whatsOnNow/setStreamToNotPlaying', stream.index
        )
      } else if (stream) {
        this.play([stream.file])
        this.$store.commit(
          'whatsOnNow/setStreamToPlaying', stream.index
        )
      }
    },
    setVolume (volume) {
      if (!isNaN(volume)) {
        this.volume = volume
      }
    }
  }
}

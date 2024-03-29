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
          episodeTitle: stream.episodeTitle,
          episodeLink: stream.episodeLink,
          file: stream.file,
          image: stream.image,
          playing: stream.playing,
          slug: stream.slug,
          station: stream.station,
          timeStart: stream.timeStart,
          timeEnd: stream.timeEnd,
          title: stream.title,
          titleLink: stream.titleLink,
          upNextTitle: stream.upNextTitle,
          onTodaysShowHeadline: stream.onTodaysShowHeadline,
          onTodaysShowHeadlineLink: stream.onTodaysShowHeadlineLink,
          onTodaysShowHosts: stream.onTodaysShowHosts,
          onTodaysShowImage: stream.onTodaysShowHeadline,
          onTodaysShowImageAltText: stream.onTodaysShowImageAltText,
          onTodaysShowImageCaption: stream.onTodaysShowImageCaption,
          onTodaysShowImageCredits: stream.onTodaysShowImageCredits,
          onTodaysShowImageCreditsUrl: stream.onTodaysShowImageCreditsUrl,
          onTodaysShowSegments: stream.onTodaysShowSegments,
          onTodaysShowSocial: stream.onTodaysShowSocial
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
      this.gaEvent(
        'Non-Player',
        'Stream Switcher',
        stream.station,
        stream
      )
    },
    toggleAudioPlayback (stream) {
      this.$store.commit(
        'whatsOnNow/somethingHasBeenPlayed'
      )
      // clean this up in API integration
      if (stream.slug === this.$store.getters['whatsOnNow/whatsOnNow'].slug) {
        // if the stream is the same one that's currently playing or paused:
        // toggle the what's on now playing state
        if (this.$store.getters['whatsOnNow/whatsOnNowPlaying']) {
          this.stop()
          this.$store.commit(
            'whatsOnNow/setWhatsOnNowToNotPlaying'
          )
          this.$store.commit(
            'whatsOnNow/setStreamsToNotPlaying'
          )
        } else {
          this.play([stream.file])
          this.$store.commit(
            'whatsOnNow/setWhatsOnNow', stream
          )
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
        // stop playback
        this.stop()
        this.$store.commit(
          'whatsOnNow/setWhatsOnNowToNotPlaying'
        )
        // set the stream to playing
        this.play([stream.file])
        this.$store.commit(
          'whatsOnNow/setWhatsOnNowToPlaying'
        )
        this.$store.commit(
          'whatsOnNow/setStreamToPlaying', stream.index
        )
      }
    },
    playButtonClicked (stream, component) {
      let action = 'Play'
      if (stream.playing) {
        action = 'Pause'
      }
      this.gaEvent(
        'Gothamist Player',
        action,
        component,
        stream
      )
      this.toggleAudioPlayback(stream)
    },
    setVolume (volume) {
      if (!isNaN(volume)) {
        this.volume = volume
      }
    }
  }
}

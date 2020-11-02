export default {
  methods: {
    setWhatsOnNow (stream) {
      // update what's on now in the vuex store
      this.$store.commit(
        'whatsOnNow/setWhatsOnNow',
        {
          image: stream.image,
          title: stream.title,
          titleLink: stream.titleLink,
          details: stream.details,
          detailsLink: stream.detailsLink,
          time: stream.time,
          station: stream.station,
          streamIndex: stream.index,
          file: stream.file
        }
      )
    },
    setSelectedStream (stream, index) {
      // update the selected stream in the vuex store
      this.$store.commit(
        'whatsOnNow/setSelectedStream',
        {
          image: stream.image,
          title: stream.title,
          titleLink: stream.titleLink,
          details: stream.details,
          detailsLink: stream.detailsLink,
          time: stream.time,
          station: stream.station,
          file: stream.file
        }
      )
      // update the stream to active
      this.$store.commit(
        'whatsOnNow/setStreamToActive',
        index
      )
    },
    togglePlay (stream) {
      if (stream === this.$store.getters['whatsOnNow/whatsOnNow']) {
        // if the stream is the same one that's currently playing or paused
        // toggle the what's on now playing state
        if (this.$store.getters['whatsOnNow/whatsOnNowPlaying']) {
          this.$store.commit(
            'whatsOnNow/setWhatsOnNowPlaying', false
          )
        } else {
          this.$store.commit(
            'whatsOnNow/setWhatsOnNowPlaying', true
          )
        }
      } else {
        // if the stream is not the same one that's currently playing or paused
        // update what's on now
        this.$store.commit(
          'whatsOnNow/setWhatsOnNow', stream
        )
        // play the stream / set what's on now playing to true
        this.$store.commit(
          'whatsOnNow/setWhatsOnNowPlaying', true
        )
      }
    }
  }
}

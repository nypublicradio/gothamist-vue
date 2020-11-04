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
      // update the stream to active
      this.$store.commit(
        'whatsOnNow/setStreamToActive',
        index
      )
    },
    togglePlay (stream) {
      if (stream === this.$store.getters['whatsOnNow/whatsOnNow']) {
        // if the stream is the same one that's currently playing or paused:
        // toggle the what's on now playing state
        // console.log('stream is the same one that is currently playing or paused')
        if (this.$store.getters['whatsOnNow/whatsOnNowPlaying']) {
          // console.log('currently playing - pause it')
          this.$store.commit(
            'whatsOnNow/setWhatsOnNowPlaying', false
          )
          this.$store.commit(
            'whatsOnNow/setStreamsToNotPlaying'
          )
        } else {
          // console.log('NOT currently playing - play it')
          this.$store.commit(
            'whatsOnNow/setWhatsOnNowPlaying', true
          )
          this.$store.commit(
            'whatsOnNow/setStreamToPlaying', stream.index
          )
        }
      } else {
        // if the stream is not the same one that's currently playing or paused:
        // update what's on now
        // console.log('stream is NOT the same one that is currently playing or paused - set it an play it')
        this.$store.commit(
          'whatsOnNow/setWhatsOnNow', stream
        )
        // set the stream to playing
        this.$store.commit(
          'whatsOnNow/setStreamToPlaying', stream.index
        )
        // set what's on now playing to true
        this.$store.commit(
          'whatsOnNow/setWhatsOnNowPlaying'
        )
      }
    }
  }
}

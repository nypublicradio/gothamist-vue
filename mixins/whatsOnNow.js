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
      // update the streams to set the active/inactive states
      this.$store.commit(
        'whatsOnNow/setStreams',
        index
      )
    },
    togglePlay () {
      // update the global "playing" state
      if (this.$store.getters['global/playing']) {
        this.$store.commit(
          'global/setPlaying', false
        )
      } else {
        this.$store.commit(
          'global/setPlaying', true
        )
      }
    }
  }
}

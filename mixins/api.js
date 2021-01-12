import { mapState } from 'vuex'

export default {
  methods: {
    async pollApi () {
      // fm stream
      await this.$axios.get('/?filter[slug]=wnyc-fm939&include=current-airing.image,current-show.show.image,current-episode.segments')
        .then(response => (
          this.setTheState(response.data, 0)
        ))
        .catch(function (error) {
          console.log(error)
        })
      // am stream
      await this.$axios.get('/?filter[slug]=wnyc-am820&include=current-airing.image,current-show.show.image,current-episode.segments')
        .then(response => (
          this.setTheState(response.data, 1)
        ))
        .catch(function (error) {
          console.log(error)
        })
    },
    setTheState (apiResponse, index) {
      const showData = apiResponse.included.find((obj) => {
        return obj.type === 'show'
      })
      const scheduleData = apiResponse.included.find((obj) => {
        return obj.type === 'show-schedule'
      })
      const imageData = apiResponse.included.find((obj) => {
        return obj.type === 'image'
      })
      const episodeData = apiResponse.included.find((obj) => {
        return obj.type === 'episode'
      })
      const airingData = apiResponse.included.find((obj) => {
        return obj.type === 'airing'
      })
      const segmentData = apiResponse.included.filter(item => item.type === 'segment')
      const formattedSegments = []
      if (segmentData !== null) {
        segmentData.forEach(function (value) {
          formattedSegments.push(
            {
              title: value.attributes.title,
              url: 'https://www.wnyc.org/story/' + value.attributes.slug,
              newWindow: true
            }
          )
        })
      }
      let title = showData ? showData.attributes.title : null
      let details = showData ? showData.attributes.tease : null
      // handle special airings
      if (airingData) {
        title = airingData.attributes.title
        details = airingData.attributes.description
      }
      const formattedData = {
        index,
        active: this.streams[index].active,
        details,
        detailsLink: showData ? showData.attributes.url : null,
        episodeTitle: episodeData ? episodeData.attributes.title : null,
        episodeLink: episodeData ? episodeData.attributes.url : null,
        file: apiResponse.data[0].attributes['mobile-aac'],
        image: imageData ? 'https://media.wnyc.org/i/480/480/l/80/' + imageData.attributes.name : apiResponse.data[0].attributes['image-logo'],
        playing: this.streams[index].playing,
        slug: apiResponse.data[0].attributes.slug,
        station: apiResponse.data[0].attributes.name,
        timeStart: scheduleData ? scheduleData.attributes['iso-start-time'] : null,
        timeEnd: scheduleData ? scheduleData.attributes['iso-end-time'] : null,
        title,
        titleLink: showData ? showData.attributes.url : null,
        onTodaysShowHeadline: episodeData ? episodeData.attributes.title : null,
        onTodaysShowHeadlineLink: episodeData ? episodeData.attributes.url : null,
        onTodaysShowHosts: showData ? showData.attributes.about.roles.host : null,
        onTodaysShowImage: episodeData ? episodeData.attributes['image-main'].url : null,
        onTodaysShowImageAltText: episodeData ? episodeData.attributes['image-main']['alt-text'] : null,
        onTodaysShowImageCaption: episodeData ? episodeData.attributes['image-main'].caption : null,
        onTodaysShowImageCredits: episodeData ? episodeData.attributes['image-main']['credits-name'] : null,
        onTodaysShowImageCreditsUrl: episodeData ? episodeData.attributes['image-main']['credits-url'] : null,
        onTodaysShowSegments: formattedSegments || null,
        onTodaysShowSocial: showData ? showData.attributes.about.social : null
      }
      this.$store.commit(
        'whatsOnNow/setStream',
        formattedData
      )
      this.$store.commit(
        'whatsOnNow/setTheState',
        formattedData
      )
    }
  },
  computed: {
    ...mapState('whatsOnNow', {
      streams: state => state.streams
    })
  },
  mounted () {
    this.pollApi()
      .then(
        res => this.pollApi()
      )
    // poll the API every 8 seconds
    this.timer = setInterval(this.pollApi, 8000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}

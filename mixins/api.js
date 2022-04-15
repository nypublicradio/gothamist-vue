import { mapState } from 'vuex'

export default {
  methods: {
    async pollApi () {
      // fm stream
      await this.$axios.get('/?filter[slug]=wnyc-fm939&include=current-airing.image,current-show.show.image,current-episode.segments', { baseURL: this.$config.whatsOnAPI })
        .then(response => (
          this.setTheState(response.data, 0)
        ))
      // am stream
      await this.$axios.get('/?filter[slug]=wnyc-am820&include=current-airing.image,current-show.show.image,current-episode.segments', { baseURL: this.$config.whatsOnAPI })
        .then(response => (
          this.setTheState(response.data, 1)
        ))
        .catch((error) => {
          // eslint-disable-next-line no-console
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
        segmentData.forEach((value) => {
          formattedSegments.push(
            {
              title: value.attributes.title,
              url: `https://www.wnyc.org/story/${value.attributes.slug}`,
              newWindow: true
            }
          )
        })
      }
      let title = showData ? showData.attributes.title : null
      let details = showData ? showData.attributes.tease : null
      let titleLink = showData ? showData.attributes.url : null
      // handle special airings
      if (airingData) {
        ({ title, description: details, href: titleLink } = airingData.attributes)
      }
      const formattedData = {
        index,
        active: this.streams[index].active,
        details,
        detailsLink: showData ? showData.attributes.url : null,
        episodeTitle: episodeData ? episodeData.attributes.title : null,
        episodeLink: episodeData ? episodeData.attributes.url : null,
        file: apiResponse.data[0].attributes.mobileAac,
        image: imageData ? `https://media.wnyc.org/i/480/480/l/80/${imageData.attributes.name}` : apiResponse.data[0].attributes.imageLogo,
        playing: this.streams[index].playing,
        slug: apiResponse.data[0].attributes.slug,
        station: apiResponse.data[0].attributes.name,
        timeStart: scheduleData ? scheduleData.attributes.isoStartTime : null,
        timeEnd: scheduleData ? scheduleData.attributes.isoEndTime : null,
        title,
        titleLink,
        onTodaysShowHeadline: episodeData ? episodeData.attributes.title : null,
        onTodaysShowHeadlineLink: episodeData ? episodeData.attributes.url : null,
        onTodaysShowHosts: showData ? showData.attributes.about.roles.host : null,
        onTodaysShowImage: episodeData && episodeData.attributes.imageMain ? episodeData.attributes.imageMain.url : null,
        onTodaysShowImageAltText: episodeData && episodeData.attributes.imageMain ? episodeData.attributes.imageMain.altText : null,
        onTodaysShowImageCaption: episodeData && episodeData.attributes.imageMain ? episodeData.attributes.imageMain.caption : null,
        onTodaysShowImageCredits: episodeData && episodeData.attributes.imageMain ? episodeData.attributes.imageMain.creditsName : null,
        onTodaysShowImageCreditsUrl: episodeData && episodeData.attributes.imageMain ? episodeData.attributes.imageMain.creditsUrl : null,
        onTodaysShowSegments: segmentData.length > 0 ? formattedSegments : null,
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
    if (this.$features.enabled['experiment-audio-player']) {
      this.pollApi()
        .then(
          () => { this.pollApi() }
        )
      // poll the API every 8 seconds
      this.timer = setInterval(this.pollApi, 8000)
    }
  },
  beforeDestroy () {
    if (this.$features.enabled['experiment-audio-player']) {
      clearInterval(this.timer)
    }
  }
}

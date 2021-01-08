export default {
  data () {
    return {
      amStream: [],
      fmStream: []
    }
  },
  methods: {
    async pollApi () {
      // fm stream
      await this.$axios.get('/?filter[slug]=wnyc-fm939&include=current-show,current-airing,current-episode,current-episode.segments')
        .then(response => (
          this.fmStream = response.data
        ))
        .catch(function (error) {
          console.log(error)
        })
        .then(response => (
          this.$store.commit(
            'whatsOnNow/setStream',
            {
              index: 0,
              active: this.$store.getters['whatsOnNow/streams'][0].active,
              details: this.fmStream.included[0].attributes.tease,
              detailsLink: this.fmStream.included[0].attributes.url,
              episodeTitle: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.title : '',
              episodeLink: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.url : '',
              file: this.fmStream.data[0].attributes.hls ? this.fmStream.data[0].attributes.hls : this.fmStream.data[0].aac,
              image: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.headers.brand['logo-image'].url : this.fmStream.data[0].attributes['image-logo'],
              playing: this.$store.getters['whatsOnNow/streams'][0].playing,
              slug: this.fmStream.data[0].attributes.slug,
              station: this.fmStream.data[0].attributes.name,
              time: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured['date-line-datetime'] : '',
              title: this.fmStream.included[0].attributes.title ? this.fmStream.included[0].attributes.title : this.fmStream.data[0].attributes.name,
              titleLink: this.fmStream.included[0].attributes.url,
              upNextTitle: null,
              onTodaysShowHeadline: null,
              onTodaysShowHeadlineLink: this.fmStream.included[0].attributes.url,
              onTodaysShowHosts: this.fmStream.included[0].attributes.about ? this.fmStream.included[0].attributes.about.roles.host : null,
              onTodaysShowImage: 'https://media.wnyc.org/i/100/100/l/80/2021/01/genericperson.png',
              onTodaysShowImageAltText: null,
              onTodaysShowImageCaption: null,
              onTodaysShowImageCredits: null,
              onTodaysShowImageCreditsUrl: null,
              onTodaysShowSegments: null,
              onTodaysShowSocial: this.fmStream.included[0].attributes.about ? this.fmStream.included[0].attributes.about.social : null
            }
          )
        ))
        .then(response => (
          this.$store.commit(
            'whatsOnNow/setInitialState',
            {
              index: 0,
              active: this.$store.getters['whatsOnNow/streams'][0].active,
              details: this.fmStream.included[0].attributes.tease,
              detailsLink: this.fmStream.included[0].attributes.url,
              episodeTitle: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.title : '',
              episodeLink: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.url : '',
              file: this.fmStream.data[0].attributes.hls ? this.fmStream.data[0].attributes.hls : this.fmStream.data[0].aac,
              image: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.headers.brand['logo-image'].url : this.fmStream.data[0].attributes['image-logo'],
              playing: this.$store.getters['whatsOnNow/streams'][0].playing,
              slug: this.fmStream.data[0].attributes.slug,
              station: this.fmStream.data[0].attributes.name,
              time: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured['date-line-datetime'] : '',
              title: this.fmStream.included[0].attributes.title ? this.fmStream.included[0].attributes.title : this.fmStream.data[0].attributes.name,
              titleLink: this.fmStream.included[0].attributes.url,
              upNextTitle: null,
              onTodaysShowHeadline: null,
              onTodaysShowHeadlineLink: this.fmStream.included[0].attributes.url,
              onTodaysShowHosts: this.fmStream.included[0].attributes.about ? this.fmStream.included[0].attributes.about.roles.host : null,
              onTodaysShowImage: 'https://media.wnyc.org/i/100/100/l/80/2021/01/genericperson.png',
              onTodaysShowImageAltText: null,
              onTodaysShowImageCaption: null,
              onTodaysShowImageCredits: null,
              onTodaysShowImageCreditsUrl: null,
              onTodaysShowSegments: null,
              onTodaysShowSocial: this.fmStream.included[0].attributes.about ? this.fmStream.included[0].attributes.about.social : null
            }
          )
        ))
      // am stream
      await this.$axios.get('/?filter[slug]=wnyc-am820&include=current-show,current-airing,current-episode,current-episode.segments')
        .then(response => (
          this.amStream = response.data
        ))
        .catch(function (error) {
          console.log(error)
        })
        .then(response => (
          this.$store.commit(
            'whatsOnNow/setStream',
            {
              index: 1,
              active: this.$store.getters['whatsOnNow/streams'][1].active,
              details: this.amStream.included[0].attributes.tease,
              detailsLink: this.amStream.included[0].attributes.url,
              episodeTitle: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.title : '',
              episodeLink: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.url : '',
              file: this.amStream.data[0].attributes.hls ? this.amStream.data[0].attributes.hls : this.amStream.data[0].attributes.aac,
              image: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.headers.brand['logo-image'].url : this.amStream.data[0].attributes['image-logo'],
              playing: this.$store.getters['whatsOnNow/streams'][1].playing,
              slug: this.amStream.data[0].attributes.slug,
              station: this.amStream.data[0].attributes.name,
              time: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured['date-line-datetime'] : '',
              title: this.amStream.included[0].attributes.title,
              titleLink: this.amStream.included[0].attributes.url,
              upNextTitle: null,
              onTodaysShowHeadline: null,
              onTodaysShowHeadlineLink: this.amStream.included[0].attributes.url,
              onTodaysShowHosts: this.amStream.included[0].attributes.about ? this.fmStream.included[0].attributes.about.roles.host : null,
              onTodaysShowImage: 'https://media.wnyc.org/i/100/100/l/80/2021/01/genericperson.png',
              onTodaysShowImageAltText: null,
              onTodaysShowImageCaption: null,
              onTodaysShowImageCredits: null,
              onTodaysShowImageCreditsUrl: null,
              onTodaysShowSegments: null,
              onTodaysShowSocial: this.amStream.included[0].attributes.about ? this.fmStream.included[0].attributes.about.social : null
            }
          )
        ))
        .then(response => (
          this.$store.commit(
            'whatsOnNow/setInitialState',
            {
              index: 0,
              active: this.$store.getters['whatsOnNow/streams'][1].active,
              details: this.amStream.included[0].attributes.tease,
              detailsLink: this.amStream.included[0].attributes.url,
              episodeTitle: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.title : '',
              episodeLink: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.url : '',
              file: this.amStream.data[0].attributes.hls ? this.amStream.data[0].attributes.hls : this.amStream.data[0].attributes.aac,
              image: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.headers.brand['logo-image'].url : this.amStream.data[0].attributes['image-logo'],
              playing: this.$store.getters['whatsOnNow/streams'][1].playing,
              slug: this.amStream.data[0].attributes.slug,
              station: this.amStream.data[0].attributes.name,
              time: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured['date-line-datetime'] : '',
              title: this.amStream.included[0].attributes.title,
              titleLink: this.amStream.included[0].attributes.url,
              upNextTitle: null,
              onTodaysShowHeadline: null,
              onTodaysShowHeadlineLink: this.amStream.included[0].attributes.url,
              onTodaysShowHosts: this.amStream.included[0].attributes.about ? this.fmStream.included[0].attributes.about.roles.host : null,
              onTodaysShowImage: 'https://media.wnyc.org/i/100/100/l/80/2021/01/genericperson.png',
              onTodaysShowImageAltText: null,
              onTodaysShowImageCaption: null,
              onTodaysShowImageCredits: null,
              onTodaysShowImageCreditsUrl: null,
              onTodaysShowSegments: null,
              onTodaysShowSocial: this.amStream.included[0].attributes.about ? this.fmStream.included[0].attributes.about.social : null
            }
          )
        ))
    }
  },
  mounted () {
    this.pollApi()
    // poll the API every 6 seconds
    // this.timer = setInterval(this.pollApi, 6000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}

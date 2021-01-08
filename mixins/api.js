export default {
  data () {
    return {
      amStream: [],
      amStreamEpisodeData: [],
      amStreamFormatted: {},
      fmStream: [],
      fmStreamEpisodeData: [],
      fmStreamFormatted: {}
    }
  },
  methods: {
    async pollApi () {
      // fm stream
      await this.$axios.get('/?filter[slug]=wnyc-fm939&include=current-airing,current-show.image')
        .then(response => (
          this.fmStream = response.data
        ))
        .catch(function (error) {
          console.log(error)
        })
        .then(response => (
          this.fmStreamFormatted = {
            index: 0,
            active: this.$store.getters['whatsOnNow/streams'][0].active,
            details: this.fmStream.included[1].attributes.tease,
            detailsLink: this.fmStream.included[1].attributes.url,
            episodeTitle: this.fmStream.included[1].attributes.featured ? this.fmStream.included[1].attributes.featured.title : '',
            episodeLink: this.fmStream.included[1].attributes.featured ? this.fmStream.included[1].attributes.featured.url : '',
            file: this.fmStream.data[0].attributes.hls ? this.fmStream.data[0].attributes.hls : this.fmStream.data[0].aac,
            image: this.fmStream.included[0].attributes.name ? 'https://media.demo.nypr.digital/i/240/240/l/60/' + this.fmStream.included[0].attributes.name : this.fmStream.data[0].attributes['image-logo'],
            playing: this.$store.getters['whatsOnNow/streams'][0].playing,
            slug: this.fmStream.data[0].attributes.slug,
            station: this.fmStream.data[0].attributes.name,
            time: null,
            title: this.fmStream.included[1].attributes.title ? this.fmStream.included[1].attributes.title : this.fmStream.data[0].attributes.name,
            titleLink: this.fmStream.included[1].attributes.url,
            upNextTitle: null,
            onTodaysShowHeadline: null,
            onTodaysShowHeadlineLink: this.fmStream.included[0].attributes.url,
            onTodaysShowHosts: this.fmStream.included[1].attributes.about ? this.fmStream.included[1].attributes.about.roles.host : null,
            onTodaysShowImage: null,
            onTodaysShowImageAltText: null,
            onTodaysShowImageCaption: null,
            onTodaysShowImageCredits: null,
            onTodaysShowImageCreditsUrl: null,
            onTodaysShowSegments: null,
            onTodaysShowSocial: this.fmStream.included[1].attributes.about ? this.fmStream.included[1].attributes.about.social : null
          }
        ))
        .then(response => (
          this.$store.commit(
            'whatsOnNow/setStream',
            this.fmStreamFormatted
          )
        ))
        .then(response => (
          this.$store.commit(
            'whatsOnNow/setInitialState',
            this.fmStreamFormatted
          )
        ))
      // fm stream episode data
      await this.$axios.get('/?filter[slug]=wnyc-fm939&include=current-show,current-airing,current-episode,current-episode.segments,current-show.image')
        .then(response => (
          this.fmStreamEpisodeData = response.data
        ))
        .catch(function (error) {
          console.log(error)
        })
        .then(response => (
          this.$store.commit(
            'whatsOnNow/updateOnTodaysShow',
            {
              index: 0,
              onTodaysShowHeadline: this.fmStreamEpisodeData.included[0].attributes.tease,
              onTodaysShowHeadlineLink: this.fmStreamEpisodeData.included[0].attributes.url,
              onTodaysShowImage: this.fmStreamEpisodeData.included[0].attributes['image-main'].url,
              onTodaysShowImageAltText: this.fmStreamEpisodeData.included[0].attributes['image-main']['alt-text'],
              onTodaysShowImageCaption: this.fmStreamEpisodeData.included[0].attributes['image-main'].caption,
              onTodaysShowImageCredits: this.fmStreamEpisodeData.included[0].attributes['image-main']['credits-name'],
              onTodaysShowImageCreditsUrl: this.fmStreamEpisodeData.included[0].attributes['image-main']['credits-url'],
              onTodaysShowSegments: null
            }
          )
        ))
      // am stream
      await this.$axios.get('/?filter[slug]=wnyc-am820&include=current-airing,current-show.image')
        .then(response => (
          this.amStream = response.data
        ))
        .catch(function (error) {
          console.log(error)
        })
        .then(response => (
          this.amStreamFormatted = {
            index: 1,
            active: this.$store.getters['whatsOnNow/streams'][1].active,
            details: this.amStream.included[1].attributes.tease,
            detailsLink: this.amStream.included[1].attributes.url,
            episodeTitle: this.amStream.included[1].attributes.featured ? this.amStream.included[1].attributes.featured.title : '',
            episodeLink: this.amStream.included[1].attributes.featured ? this.amStream.included[1].attributes.featured.url : '',
            file: this.amStream.data[0].attributes.hls ? this.amStream.data[0].attributes.hls : this.amStream.data[0].aac,
            image: this.amStream.included[0].attributes.name ? 'https://media.demo.nypr.digital/i/240/240/l/60/' + this.amStream.included[0].attributes.name : this.amStream.data[0].attributes['image-logo'],
            playing: this.$store.getters['whatsOnNow/streams'][1].playing,
            slug: this.amStream.data[0].attributes.slug,
            station: this.amStream.data[0].attributes.name,
            time: null,
            title: this.amStream.included[1].attributes.title ? this.amStream.included[1].attributes.title : this.amStream.data[0].attributes.name,
            titleLink: this.amStream.included[1].attributes.url,
            upNextTitle: null,
            onTodaysShowHeadline: null,
            onTodaysShowHeadlineLink: this.amStream.included[0].attributes.url,
            onTodaysShowHosts: this.amStream.included[1].attributes.about ? this.amStream.included[1].attributes.about.roles.host : null,
            onTodaysShowImage: null,
            onTodaysShowImageAltText: null,
            onTodaysShowImageCaption: null,
            onTodaysShowImageCredits: null,
            onTodaysShowImageCreditsUrl: null,
            onTodaysShowSegments: null,
            onTodaysShowSocial: this.amStream.included[1].attributes.about ? this.amStream.included[1].attributes.about.social : null
          }
        ))
        .then(response => (
          this.$store.commit(
            'whatsOnNow/setStream',
            this.amStreamFormatted
          )
        ))
        .then(response => (
          this.$store.commit(
            'whatsOnNow/setInitialState',
            this.amStreamFormatted
          )
        ))
      // am stream episode data
      await this.$axios.get('/?filter[slug]=wnyc-am820&&include=current-show,current-airing,current-episode,current-episode.segments,current-show.image')
        .then(response => (
          this.amStreamEpisodeData = response.data
        ))
        .catch(function (error) {
          console.log(error)
        })
        .then(response => (
          this.$store.commit(
            'whatsOnNow/updateOnTodaysShow',
            {
              index: 1,
              onTodaysShowHeadline: this.amStreamEpisodeData.included[0].attributes.tease,
              onTodaysShowHeadlineLink: this.amStreamEpisodeData.included[0].attributes.url,
              onTodaysShowImage: this.amStreamEpisodeData.included[0].attributes['image-main'].url,
              onTodaysShowImageAltText: this.amStreamEpisodeData.included[0].attributes['image-main']['alt-text'],
              onTodaysShowImageCaption: this.amStreamEpisodeData.included[0].attributes['image-main'].caption,
              onTodaysShowImageCredits: this.amStreamEpisodeData.included[0].attributes['image-main']['credits-name'],
              onTodaysShowImageCreditsUrl: this.amStreamEpisodeData.included[0].attributes['image-main']['credits-url'],
              onTodaysShowSegments: null
            }
          )
        ))
    }
  },
  mounted () {
    this.pollApi()
    // poll the API every 6 seconds
    this.timer = setInterval(this.pollApi, 6000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}

import { mapState } from 'vuex'

export default {
  data () {
    return {
      amStream: [],
      amStreamFormatted: {},
      amStreamEpisodeData: [],
      amStreamSegments: [],
      fmStream: [],
      fmStreamFormatted: {},
      fmStreamSegments: [],
      fmStreamEpisodeData: []
    }
  },
  methods: {
    async pollApi () {
      // fm stream
      await this.$axios.get('/?filter[slug]=wnyc-fm939&include=current-airing,current-show.show.image')
        .then(response => (
          this.fmStream = response.data
        ))
        .catch(function (error) {
          console.log(error)
        })
        .then(response => (
          this.fmStreamFormatted = {
            index: 0,
            active: this.streams[0].active,
            details: this.fmStream.included[1].attributes.tease ? this.fmStream.included[1].attributes.tease : null,
            detailsLink: this.fmStream.included[1].attributes ? this.fmStream.included[1].attributes.url : null,
            episodeTitle: this.streams[0].episodeTitle ? this.streams[0].episodeTitle : null,
            episodeLink: this.streams[0].episodeLink ? this.streams[0].episodeLink : null,
            file: this.fmStream.data[0].attributes.hls ? this.fmStream.data[0].attributes.hls : this.fmStream.data[0].aac,
            image: this.fmStream.included[0].attributes.name ? 'https://media.wnyc.org/i/240/240/l/80/' + this.fmStream.included[0].attributes.name : this.fmStream.data[0].attributes['image-logo'],
            playing: this.streams[0].playing,
            slug: this.fmStream.data[0].attributes.slug,
            station: this.fmStream.data[0].attributes.name,
            timeStart: this.fmStream.included[2].attributes['iso-start-time'],
            timeEnd: this.fmStream.included[2].attributes['iso-end-time'],
            title: this.fmStream.included[1].attributes.title ? this.fmStream.included[1].attributes.title : this.amStream.data[0].attributes.name,
            titleLink: this.fmStream.included[1].attributes ? this.fmStream.included[1].attributes.url : null,
            upNextTitle: this.streams[0].upNextTitle ? this.streams[0].upNextTitle : null,
            onTodaysShowHeadline: this.streams[0].onTodaysShowHeadline ? this.streams[0].onTodaysShowHeadline : null,
            onTodaysShowHeadlineLink: this.streams[0].onTodaysShowHeadlineLink ? this.streams[0].onTodaysShowHeadlineLink : null,
            onTodaysShowHosts: this.fmStream.included[1].attributes.about ? this.fmStream.included[1].attributes.about.roles.host : null,
            onTodaysShowImage: this.streams[0].onTodaysShowImage ? this.streams[0].onTodaysShowImage : null,
            onTodaysShowImageAltText: this.streams[0].onTodaysShowImageAltText ? this.streams[0].onTodaysShowImageAltText : null,
            onTodaysShowImageCaption: this.streams[0].onTodaysShowImageCaption ? this.streams[0].onTodaysShowImageCaption : null,
            onTodaysShowImageCredits: this.streams[0].onTodaysShowImageCredits ? this.streams[0].onTodaysShowImageCredits : null,
            onTodaysShowImageCreditsUrl: this.streams[0].onTodaysShowImageCreditsUrl ? this.streams[0].onTodaysShowImageCreditsUrl : null,
            onTodaysShowSegments: this.streams[0].onTodaysShowSegments ? this.streams[0].onTodaysShowSegments : null,
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
            'whatsOnNow/setTheState',
            this.fmStreamFormatted
          )
        ))
      // fm stream episode data
      await this.$axios.get('/?filter[slug]=wnyc-fm939&include=current-show,current-airing,current-episode,current-episode.segments,current-show.show.image')
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
              episodeTitle: this.fmStreamEpisodeData.included[0].attributes && this.fmStreamEpisodeData.included[0].attributes.title ? this.fmStreamEpisodeData.included[0].attributes.title : null,
              episodeTitleLink: this.fmStreamEpisodeData.included[0].attributes && this.fmStreamEpisodeData.included[0].attributes.url ? this.fmStreamEpisodeData.included[0].attributes.url : null,
              onTodaysShowHeadline: this.fmStreamEpisodeData.included[0].attributes ? this.fmStreamEpisodeData.included[0].attributes.tease : null,
              onTodaysShowHeadlineLink: this.fmStreamEpisodeData.included[0].attributes ? this.fmStreamEpisodeData.included[0].attributes.url : null,
              onTodaysShowImage: this.fmStreamEpisodeData.included[0].attributes && this.fmStreamEpisodeData.included[0].attributes['image-main'] ? this.fmStreamEpisodeData.included[0].attributes['image-main'].url : null,
              onTodaysShowImageAltText: this.fmStreamEpisodeData.included[0].attributes && this.fmStreamEpisodeData.included[0].attributes['image-main'] ? this.fmStreamEpisodeData.included[0].attributes['image-main']['alt-text'] : null,
              onTodaysShowImageCaption: this.fmStreamEpisodeData.included[0].attributes && this.fmStreamEpisodeData.included[0].attributes['image-main'] ? this.fmStreamEpisodeData.included[0].attributes['image-main'].caption : null,
              onTodaysShowImageCredits: this.fmStreamEpisodeData.included[0].attributes && this.fmStreamEpisodeData.included[0].attributes['image-main'] ? this.fmStreamEpisodeData.included[0].attributes['image-main']['credits-name'] : null,
              onTodaysShowImageCreditsUrl: this.fmStreamEpisodeData.included[0].attributes && this.fmStreamEpisodeData.included[0].attributes['image-main'] ? this.fmStreamEpisodeData.included[0].attributes['image-main']['credits-url'] : null,
              onTodaysShowSegments: this.streams[0].onTodaysShowSegments ? this.streams[0].onTodaysShowSegments : null
            }
          )
        ))
      // fm stream segments
      await this.$axios.get('/?filter[slug]=wnyc-fm939&include=current-episode.segments')
        .then(response => (
          this.fmStreamSegments = response.data.included ? response.data.included : null
        ))
        .catch(function (error) {
          console.log(error)
        })
        .then(response => (
          this.$store.commit(
            'whatsOnNow/updateOnTodaysShowSegmentsFm',
            this.fmStreamSegments
          )
        ))
      // am stream
      await this.$axios.get('/?filter[slug]=wnyc-am820&include=current-airing,current-show.show.image')
        .then(response => (
          this.amStream = response.data
        ))
        .catch(function (error) {
          console.log(error)
        })
        .then(response => (
          this.amStreamFormatted = {
            index: 1,
            active: this.streams[1].active,
            details: this.amStream.included[1].attributes.tease ? this.amStream.included[1].attributes.tease : null,
            detailsLink: this.amStream.included[1].attributes ? this.amStream.included[1].attributes.url : null,
            episodeTitle: this.streams[1].episodeTitle ? this.streams[1].episodeTitle : null,
            episodeLink: this.streams[1].episodeLink ? this.streams[1].episodeLink : null,
            file: this.amStream.data[0].attributes.hls ? this.amStream.data[0].attributes.hls : this.amStream.data[0].aac,
            image: this.amStream.included[0].attributes.name ? 'https://media.wnyc.org/i/240/240/l/80/' + this.amStream.included[0].attributes.name : this.amStream.data[0].attributes['image-logo'],
            playing: this.streams[1].playing,
            slug: this.amStream.data[0].attributes.slug,
            station: this.amStream.data[0].attributes.name,
            timeStart: this.amStream.included[2].attributes['iso-start-time'],
            timeEnd: this.amStream.included[2].attributes['iso-end-time'],
            title: this.amStream.included[1].attributes.title ? this.amStream.included[1].attributes.title : this.amStream.data[0].attributes.name,
            titleLink: this.amStream.included[1].attributes ? this.amStream.included[1].attributes.url : null,
            upNextTitle: this.streams[1].upNextTitle ? this.streams[1].upNextTitle : null,
            onTodaysShowHeadline: this.streams[1].onTodaysShowHeadline ? this.streams[1].onTodaysShowHeadline : null,
            onTodaysShowHeadlineLink: this.streams[1].onTodaysShowHeadlineLink ? this.streams[1].onTodaysShowHeadlineLink : null,
            onTodaysShowHosts: this.amStream.included[1].attributes.about ? this.amStream.included[1].attributes.about.roles.host : null,
            onTodaysShowImage: this.streams[1].onTodaysShowImage ? this.streams[1].onTodaysShowImage : null,
            onTodaysShowImageAltText: this.streams[1].onTodaysShowImageAltText ? this.streams[1].onTodaysShowImageAltText : null,
            onTodaysShowImageCaption: this.streams[1].onTodaysShowImageCaption ? this.streams[1].onTodaysShowImageCaption : null,
            onTodaysShowImageCredits: this.streams[1].onTodaysShowImageCredits ? this.streams[1].onTodaysShowImageCredits : null,
            onTodaysShowImageCreditsUrl: this.streams[1].onTodaysShowImageCreditsUrl ? this.streams[1].onTodaysShowImageCreditsUrl : null,
            onTodaysShowSegments: this.streams[1].onTodaysShowSegments ? this.streams[1].onTodaysShowSegments : null,
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
            'whatsOnNow/setTheState',
            this.amStreamFormatted
          )
        ))
      // am stream episode data
      await this.$axios.get('/?filter[slug]=wnyc-am820&&include=current-show,current-airing,current-episode,current-episode.segments,current-show.show.image')
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
              episodeTitle: this.amStreamEpisodeData.included[0].attributes && this.amStreamEpisodeData.included[0].attributes.title ? this.amStreamEpisodeData.included[0].attributes.title : null,
              episodeTitleLink: this.amStreamEpisodeData.included[0].attributes && this.amStreamEpisodeData.included[0].attributes.url ? this.amStreamEpisodeData.included[0].attributes.url : null,
              onTodaysShowHeadline: this.amStreamEpisodeData.included[0].attributes ? this.amStreamEpisodeData.included[0].attributes.tease : null,
              onTodaysShowHeadlineLink: this.amStreamEpisodeData.included[0].attributes ? this.amStreamEpisodeData.included[0].attributes.url : null,
              onTodaysShowImage: this.amStreamEpisodeData.included[0].attributes['image-main'] ? this.amStreamEpisodeData.included[0].attributes['image-main'].url : null,
              onTodaysShowImageAltText: this.amStreamEpisodeData.included[0].attributes['image-main'] ? this.amStreamEpisodeData.included[0].attributes['image-main']['alt-text'] : null,
              onTodaysShowImageCaption: this.amStreamEpisodeData.included[0].attributes['image-main'] ? this.amStreamEpisodeData.included[0].attributes['image-main'].caption : null,
              onTodaysShowImageCredits: this.amStreamEpisodeData.included[0].attributes['image-main'] ? this.amStreamEpisodeData.included[0].attributes['image-main']['credits-name'] : null,
              onTodaysShowImageCreditsUrl: this.amStreamEpisodeData.included[0].attributes['image-main'] ? this.amStreamEpisodeData.included[0].attributes['image-main']['credits-url'] : null,
              onTodaysShowSegments: this.streams[1].onTodaysShowSegments ? this.streams[1].onTodaysShowSegments : null
            }
          )
        ))
      // am stream segments
      await this.$axios.get('/?filter[slug]=wnyc-am820&include=current-episode.segments')
        .then(response => (
          this.amStreamSegments = response.data.included ? response.data.included : null
        ))
        .catch(function (error) {
          console.log(error)
        })
        .then(response => (
          this.$store.commit(
            'whatsOnNow/updateOnTodaysShowSegmentsAm',
            this.amStreamSegments
          )
        ))
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
    // poll the API every 6 seconds
    this.timer = setInterval(this.pollApi, 6000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}

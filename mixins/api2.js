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
      await this.$axios.get('/?filter[slug]=wnyc-fm939')
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
              details: this.fmStream.included[0].attributes['show-tease'],
              detailsLink: this.fmStream.included[0].attributes.url,
              episodeTitle: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.title : '',
              episodeLink: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.url : '',
              file: this.fmStream.data[0].attributes.aac ? this.fmStream.data[0].attributes.aac : this.fmStream.data[0].mp3,
              image: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.headers.brand['logo-image'].url : this.fmStream.data[0].attributes['image-logo'],
              playing: this.$store.getters['whatsOnNow/streams'][0].playing,
              slug: this.fmStream.data[0].attributes.slug,
              station: this.fmStream.data[0].attributes.name,
              time: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured['date-line-datetime'] : '',
              title: this.fmStream.included[0].attributes['show-title'],
              titleLink: this.fmStream.included[0].attributes.url,
              upNextTitle: null
            }
          )
        ))
        // .then(response => (
        //   this.$store.commit(
        //     'onTodaysShow/setOnTodaysShow',
        //     {
        //       headline: this.fmStream.included[0].attributes ? this.fmStream.included[0].attributes.title : null,
        //       // headlineLink: this.fmStream.included[0].attributes.url,
        //       // hosts: this.fmStream.included[0].attributes ? this.amStream.included[0].attributes.about.roles.host : null,
        //       // image: this.fmStream.included[0].attributes ? this.fmStream.included[0].attributes['image-main'].url : null,
        //       // imageAltText: this.fmStream.included[0].attributes ? this.fmStream.included[0].attributes['image-main']['alt-text'] : null,
        //       // imageCaption: this.fmStream.included[0].attributes ? this.fmStream.included[0].attributes['image-main'].caption : null,
        //       // imageCredits: this.fmStream.included[0].attributes ? this.fmStream.included[0].attributes['image-main']['credits-name'] : null,
        //       // imageCreditsUrl: this.fmStream.included[0].attributes ? this.fmStream.included[0].attributes['image-main']['credits-url'] : null,
        //       segments: null
        //       // social: this.fmStream.included[0].attributes ? this.amStream.included[0].attributes['social-links'] : null
        //     }
        //   )
        // ))
        .then(response => (
          this.$store.commit(
            'whatsOnNow/setInitialState',
            {
              index: 0,
              active: this.$store.getters['whatsOnNow/streams'][0].active,
              details: this.fmStream.included[0].attributes['show-tease'],
              detailsLink: this.fmStream.included[0].attributes.url,
              episodeTitle: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.title : '',
              episodeLink: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.url : '',
              file: this.fmStream.data[0].attributes.aac ? this.fmStream.data[0].attributes.aac : this.fmStream.data[0].mp3,
              image: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured.headers.brand['logo-image'].url : this.fmStream.data[0].attributes['image-logo'],
              playing: this.$store.getters['whatsOnNow/streams'][0].playing,
              slug: this.fmStream.data[0].attributes.slug,
              station: this.fmStream.data[0].attributes.name,
              time: this.fmStream.included[0].attributes.featured ? this.fmStream.included[0].attributes.featured['date-line-datetime'] : '',
              title: this.fmStream.included[0].attributes['show-title'],
              titleLink: this.fmStream.included[0].attributes.url,
              upNextTitle: null
            }
          )
        ))
      // am stream
      await this.$axios.get('/?filter[slug]=wnyc-am820')
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
              details: this.amStream.included[0].attributes['show-tease'],
              detailsLink: this.amStream.included[0].attributes.url,
              episodeTitle: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.title : '',
              episodeLink: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.url : '',
              file: this.amStream.data[0].attributes.aac ? this.amStream.data[0].attributes.aac : this.amStream.data[0].attributes.mp3,
              image: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.headers.brand['logo-image'].url : this.amStream.data[0].attributes['image-logo'],
              playing: this.$store.getters['whatsOnNow/streams'][1].playing,
              slug: this.amStream.data[0].attributes.slug,
              station: this.amStream.data[0].attributes.name,
              time: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured['date-line-datetime'] : '',
              title: this.amStream.included[0].attributes['show-title'],
              titleLink: this.amStream.included[0].attributes.url,
              upNextTitle: null
            }
          )
        ))
        .then(response => (
          this.$store.commit(
            'whatsOnNow/setInitialState',
            {
              index: 0,
              active: this.$store.getters['whatsOnNow/streams'][1].active,
              details: this.amStream.included[0].attributes['show-tease'],
              detailsLink: this.amStream.included[0].attributes.url,
              episodeTitle: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.title : '',
              episodeLink: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.url : '',
              file: this.amStream.data[0].attributes.aac ? this.amStream.data[0].attributes.aac : this.amStream.data[0].attributes.mp3,
              image: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured.headers.brand['logo-image'].url : this.amStream.data[0].attributes['image-logo'],
              playing: this.$store.getters['whatsOnNow/streams'][1].playing,
              slug: this.amStream.data[0].attributes.slug,
              station: this.amStream.data[0].attributes.name,
              time: this.amStream.included[0].attributes.featured ? this.amStream.included[0].attributes.featured['date-line-datetime'] : '',
              title: this.amStream.included[0].attributes['show-title'],
              titleLink: this.amStream.included[0].attributes.url,
              upNextTitle: this.amStream.data[0].attributes.name
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

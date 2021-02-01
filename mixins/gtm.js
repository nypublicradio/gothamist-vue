import { mapState } from 'vuex'

export default {
  data () {
    return {
      clientID: null,
      sessionID: null
    }
  },
  methods: {
    // google analytics events
    gaEvent (gaCategory, gaAction, gaLabel, custom) {
      let hitType = 'event'
      const eventCategory = gaCategory
      const eventAction = gaAction
      const eventLabel = gaLabel ? this.capitalize(gaLabel) : null
      const hitTimeStamp = new Date().toISOString()
      const clientID = this.clientID
      const sessionID = this.sessionID
      let template = 'Home Page'
      let component = null
      let streamName = this.whatsOnNow.station
      const showName = this.whatsOnNow.title
      const hostName = this.whatsOnNow.onTodaysShowHosts
      let intendedUrl = null
      if (gaCategory === 'WNYC Player') {
        component = gaLabel
      } else {
        component = gaAction
      }
      if (gaAction === 'URL Error') {
        intendedUrl = custom
        hitType = 'exception'
        template = 'Error Page'
        streamName = null
        component = null
      }
      const data = {
        clientID,
        sessionID,
        hitType,
        eventCategory,
        eventAction,
        eventLabel,
        hitTimeStamp,
        template,
        component,
        streamName,
        showName,
        hostName,
        intendedUrl
      }
      this.$gtm.push(data)
    },
    // generate a unique ID
    generateId () {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    },
    // retrieve a cookie value
    getCookie (cname) {
      const name = cname + '='
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.includes(name)) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    }
  },
  computed: {
    ...mapState('whatsOnNow', {
      station: state => state.whatsOnNow.station,
      whatsOnNow: state => state.whatsOnNow
    }),
    ...mapState('vue-hifi', {
      vueHifiIsPlaying: state => state.isPlaying
    })
  },
  mounted () {
    // set GTM cookies
    if (this.getCookie('_wnycClientID') === '') {
      document.cookie = '_wnycClientID=' + this.generateId() + '; expires=0; path=/'
    }
    if (this.getCookie('_wnycSessionID') === '') {
      const cookieDate = new Date()
      cookieDate.setFullYear(cookieDate.getFullYear() + 10)
      document.cookie = '_wnycSessionID=' + this.generateId() + '; expires=' + cookieDate.toUTCString() + '; path=/'
    }
    this.clientID = this.getCookie('_wnycClientID')
    this.sessionID = this.getCookie('_wnycSessionID')
  }
}

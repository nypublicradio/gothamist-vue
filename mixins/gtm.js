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
      const event = 'eventTracking'
      let hitType = 'event'
      const eventCategory = gaCategory
      const eventAction = gaAction
      const eventLabel = gaLabel
      const hitTimeStamp = new Date().toISOString()
      const clientID = this.clientID
      const sessionID = this.sessionID
      let template = this.$route.name
      if (template === 'index') {
        template = 'homepage'
      }
      let component = gaAction
      let intendedUrl = null
      if (gaAction === 'URL Error') {
        intendedUrl = custom
        hitType = 'exception'
        template = 'Error Page'
        component = null
      }
      const data = {
        event,
        clientID,
        sessionID,
        hitType,
        category: eventCategory,
        eventCategory,
        action: eventAction,
        eventAction,
        label: eventLabel,
        eventLabel,
        hitTimeStamp,
        template,
        component,
        intendedUrl,
        custom
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
  mounted () {
    // set GTM cookies
    document.cookie = '_gothamistSessionID=' + this.generateId() + '; expires=0; path=/'
    if (this.getCookie('_gothamistClientID') === '') {
      const cookieDate = new Date()
      cookieDate.setFullYear(cookieDate.getFullYear() + 10)
      document.cookie = '_gothamistClientID=' + this.generateId() + '; expires=' + cookieDate.toUTCString() + '; path=/'
    }
    this.clientID = this.getCookie('_gothamistClientID')
    this.sessionID = this.getCookie('_gothamistSessionID')
  }
}

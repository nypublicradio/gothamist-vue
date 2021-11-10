import { mapState } from 'vuex'

export default {
  data () {
    return {
      clientID: null,
      sessionID: null,
      template: this.$options.name
    }
  },
  computed: {
    ...mapState('global', {
      previousPath: state => state.previousPath
    })
  },
  methods: {
    // google analytics events
    gaEvent (gaCategory, gaAction, gaLabel, custom) {
      let hitType = 'event'
      const eventCategory = gaCategory
      const eventAction = gaAction
      const eventLabel = gaLabel
      const hitTimeStamp = new Date().toISOString()
      let component = gaAction
      let intendedUrl = null
      if (gaAction === 'URL Error') {
        intendedUrl = custom
        hitType = 'exception'
        component = null
      }
      const data = {
        event: 'eventTracking',
        sessionID: this.sessionID,
        previousPath: this.previousPath,
        IDCustomEvents: this.clientID,
        hitType,
        category: eventCategory,
        eventCategory,
        action: eventAction,
        eventAction,
        label: eventLabel,
        eventLabel,
        hitTimeStamp,
        template: this.template,
        component,
        intendedUrl,
        custom,
        vue: true
      }
      this.$gtm.push(data)
    },
    // google analytics events
    gaArticleEvent (gaCategory, gaAction, gaLabel, custom) {
      let hitType = 'event'
      const eventCategory = gaCategory
      const eventAction = gaAction
      const eventLabel = gaLabel
      const hitTimeStamp = new Date().toISOString()
      let intendedUrl = null
      const component = null
      if (gaAction === 'URL Error') {
        intendedUrl = custom
        hitType = 'exception'
      }
      const data = {
        event: 'eventTracking',
        sessionID: this.sessionID,
        previousPath: this.previousPath,
        IDCustomEvents: this.clientID,
        articleTags: custom.articleTags,
        articleAuthors: custom.articleAuthors,
        articleSection: custom.articleSection,
        articleTitle: custom.articleTitle,
        articlePublishTime: custom.articlePublishTime,
        eventCategory,
        eventAction,
        eventLabel,
        eventValue: custom.milestone,
        hitTimeStamp,
        hitType,
        template: 'article',
        component,
        intendedUrl,
        vue: true
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
    },
    setTrackingData () {
      const tenYears = 60 * 60 * 24 * 365 * 10
      this.clientID = this.$cookies.get('_gothamistClientID') || this.generateId()
      this.sessionID = this.$cookies.get('_gothamistSessionID') || this.generateId()
      this.$cookies.set('_gothamistClientID', this.clientID, { path: '/', maxAge: tenYears })
      this.$cookies.set('_gothamistSessionID', this.sessionID, { path: '/', expires: 0 })
    },
    logPageView () {
      const data = {
        event: 'Page View',
        sessionID: this.sessionID,
        previousPath: this.previousPath,
        IDCustomEvents: this.clientID,
        template: this.$options.name,
        vue: true
      }
      this.$gtm.push(data)
    }
  }
}

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
      const event = 'eventTracking'
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
        event,
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
    this.clientID = this.getCookie('_gothamistClientID')
    this.sessionID = this.getCookie('_gothamistSessionID')
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // set cookies for client and session ID if they don't already exist
      if (vm.getCookie('_gothamistSessionID') === '') {
        document.cookie = '_gothamistSessionID=' + vm.generateId() + '; expires=0; path=/'
      }
      if (vm.getCookie('_gothamistClientID') === '') {
        const cookieDate = new Date()
        cookieDate.setFullYear(cookieDate.getFullYear() + 10)
        document.cookie = '_gothamistClientID=' + vm.generateId() + '; expires=' + cookieDate.toUTCString() + '; path=/'
      }
      // push page view data to GTM
      const data = {
        event: 'Page View',
        sessionID: vm.getCookie('_gothamistSessionID'),
        previousPath: vm.previousPath,
        IDCustomEvents: vm.getCookie('_gothamistClientID'),
        template: vm.$options.name,
        vue: true
      }
      vm.$gtm.push(data)
    })
  },
  beforeRouteLeave (to, from, next) {
    // set previous path
    this.$store.commit('global/setPreviousPath', this.$route.fullPath)
    // go to the next route
    next()
  }
}

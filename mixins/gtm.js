export default {
  data () {
    return {
      clientID: null,
      sessionID: null,
      template: this.$options.name,
      previousPath: null
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
      const IDCustomEvents = this.clientID
      const sessionID = this.sessionID
      const previousPath = this.previousPath
      let template = this.template
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
        sessionID,
        previousPath,
        IDCustomEvents,
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
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // set cookies for client and session ID
      if (vm.getCookie('_gothamistSessionID') === '') {
        document.cookie = '_gothamistSessionID=' + vm.generateId() + '; expires=0; path=/'
      }
      if (vm.getCookie('_gothamistClientID') === '') {
        const cookieDate = new Date()
        cookieDate.setFullYear(cookieDate.getFullYear() + 10)
        document.cookie = '_gothamistClientID=' + vm.generateId() + '; expires=' + cookieDate.toUTCString() + '; path=/'
      }
      vm.clientID = vm.getCookie('_gothamistClientID')
      vm.sessionID = vm.getCookie('_gothamistSessionID')
      // push page view to GTM
      vm.template = vm.$options.name
      vm.previousPath = from.fullPath
      const data = {
        event: 'Page View',
        sessionID: vm.sessionID,
        previousPath: vm.previousPath,
        IDCustomEvents: vm.clientID,
        template: vm.template,
        vue: true
      }
      vm.$gtm.push(data)
    })
  }
}

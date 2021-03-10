export default {
  methods: {
    amountScrolled () {
      const h = document.documentElement
      const b = document.body
      const st = 'scrollTop'
      const sh = 'scrollHeight'
      return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
    },
    // gets the section (i.e.,"news") for the current route
    getSection (route) {
      const routeArray = route.split('/')
      return routeArray[routeArray.length - 2]
    },
    // gets the slug for the current route
    getSlug (route) {
      const routeArray = route.split('/')
      return routeArray[routeArray.length - 1]
    }
  }
}

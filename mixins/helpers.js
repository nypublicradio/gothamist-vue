import moment from 'moment'

export default {
  methods: {
    amountScrolled () {
      const h = document.documentElement
      const b = document.body
      const st = 'scrollTop'
      const sh = 'scrollHeight'
      return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
    },
    // capitalize the first letter of a string
    capitalize (string) {
      return string[0].toUpperCase() + string.substring(1)
    },
    // formats an ISO date to display the time e.g. 6:00pm
    formatTime (time) {
      if (time !== undefined && time !== null) {
        const formattedTime = moment(time)
        return formattedTime.utc().local().format('h:mm a')
      }
      return null
    }
  }
}

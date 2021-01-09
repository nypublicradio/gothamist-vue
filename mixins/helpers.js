import moment from 'moment'

export default {
  methods: {
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

import moment from 'moment'

export default {
  methods: {
    formatTime (time) {
      if (time !== undefined && time !== null) {
        const formattedTime = moment(time)
        return formattedTime.utc().local().format('h:mm a')
      }
      return null
    }
  }
}

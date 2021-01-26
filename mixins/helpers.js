import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      timer: null
    }
  },
  mounted () {
    // send a google analytics event every 2 minutes if a stream is playing
    this.timer = window.setInterval(() => {
      if (this.vueHifiIsPlaying) {
        this.gaEvent('WNYC Player', 'ping', this.station)
      }
    }, 120000)
  },
  methods: {
    // fire google analytics event
    gaEvent (category, action, label, hitType) {
      // this.$ga.event({
      //   hitType: hitType || 'event',
      //   eventCategory: category,
      //   eventAction: action,
      //   eventLabel: label
      // })
      this.$gtm.push({
        hitType: hitType || 'event',
        eventCategory: category,
        eventAction: action,
        eventLabel: label
      })
    },
    // formats an ISO date to display the time e.g. 6:00pm
    formatTime (time) {
      if (time !== undefined && time !== null) {
        const formattedTime = moment(time)
        return formattedTime.utc().local().format('h:mm a')
      }
      return null
    }
  },
  computed: {
    ...mapState('whatsOnNow', {
      station: state => state.whatsOnNow.station
    }),
    ...mapState('vue-hifi', {
      vueHifiIsPlaying: state => state.isPlaying
    })
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}

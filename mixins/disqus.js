import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('global', {
      disqusAPI: state => state.disqusAPI,
      disqusPublicKey: state => state.disqusPublicKey
    })
  },
  methods: {
    // accepts an array of disqus thread IDs
    // returns an array of comment counts
    getCommentCount (threadIdArray) {
      try {
        let threadIdString = ''
        threadIdArray.forEach((thread) => {
          threadIdString += '&thread:ident=' + thread
        })
        return this.$axios
          .get(
            this.disqusAPI + '/threads/set.json?api_key=' + this.disqusPublicKey + '&forum=gothamist' + threadIdString
          )
          .then((response) => {
            return response
          })
          .catch((error) => {
            console.warn(error) // eslint-disable-line
          })
      } catch (e) {
        console.warn(e) // eslint-disable-line
      }
    }
  }
}

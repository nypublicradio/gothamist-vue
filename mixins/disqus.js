import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('global', {
      disqusAPI: state => state.disqusAPI,
      disqusPublicKey: state => state.disqusPublicKey
    })
  },
  methods: {
    // accepts an array of disqus thread IDs & returns the response from the disqus API
    getCommentCount (threadIdArray) {
      try {
        let threadIdString = ''
        threadIdArray.forEach((thread) => {
          if (thread) {
            threadIdString += '&thread:ident=' + thread
          }
        })
        if (threadIdString !== '') {
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
        }
      } catch (e) {
        console.warn(e) // eslint-disable-line
      }
    },
    // finds the disqus ID in an array of disqus thread IDs API responses and returns the comment count
    getCommentCountById (id, threadIdArray) {
      if (id !== null && id !== undefined && threadIdArray !== null && threadIdArray !== undefined) {
        let numberOfPosts = 0
        let tempArray = []
        if (threadIdArray.isArray) {
          tempArray = threadIdArray
        } else {
          tempArray.push(threadIdArray)
        }
        for (const arrayItem of tempArray) {
          for (const item of arrayItem.data.response) {
            if (item.identifiers[0] === id.toString()) {
              numberOfPosts = parseInt(item.posts)
            }
          }
        }
        return numberOfPosts
      }
    }
  }
}

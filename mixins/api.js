export default {
  methods: {
    async get (id) {
      // fm stream
      await this.$axios.get('/?filter[slug]=wnyc-fm939&include=current-airing.image,current-show.show.image,current-episode.segments')
        .then(response => (
          this.setTheState(response.data, 0)
        ))
      // am stream
      await this.$axios.get('/?filter[slug]=wnyc-am820&include=current-airing.image,current-show.show.image,current-episode.segments')
        .then(response => (
          this.setTheState(response.data, 1)
        ))
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    }
  }
}

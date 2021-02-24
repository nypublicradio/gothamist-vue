export default {
  methods: {
    async getArticle (articleID) {
      await this.$axios.get('/pages/' + articleID)
        .then(response => (
          this.setTheState(response.data, 0)
        ))
    }
  }
}

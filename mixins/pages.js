export default {
  methods: {
    // get the page data for the given ID
    getData (id) {
      return this.$axios
        .get('pages/' + id)
        .then(function (response) {
          return response.data
        })
    },
    // get the page ID for the given slug
    getID (slug) {
      return this.$axios
        .get('pages/?slug=' + slug)
        .then(function (response) {
          return response.data.items[0].id
        })
    },
    // get the slug for the given page ID
    getSlug (id) {
      return this.$axios
        .get('pages/' + id)
        .then(function (response) {
          return response.data.meta.slug
        })
    }
  }
}

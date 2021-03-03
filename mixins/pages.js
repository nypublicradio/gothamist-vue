import axios from 'axios'

export default {
  methods: {
    // get the page data for the given ID
    getData (id) {
      return axios
        .get('https://cms.demo.nypr.digital/api/v2/pages/' + id)
        .then(function (response) {
          return response.data
        })
    },
    // get the page ID for the given slug
    getID (slug) {
      return axios
        .get('https://cms.demo.nypr.digital/api/v2/pages/?slug=' + slug)
        .then(function (response) {
          return response.data.items[0].id
        })
    },
    // get the slug for the given page ID
    getSlug (id) {
      return axios
        .get('https://cms.demo.nypr.digital/api/v2/pages/' + id)
        .then(function (response) {
          return response.data.meta.slug
        })
    }
  }
}

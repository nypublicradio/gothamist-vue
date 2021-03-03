import axios from 'axios'

export default {
  async mounted () {
    const primaryNav = []
    await axios
      .get('https://cms.demo.nypr.digital/api/v2/navigation/1/')
      .then(response => (
        response.data.primary_navigation.forEach(function (item) {
          primaryNav.push(
            {
              type: item.type,
              text: item.value.title,
              url: item.value.url,
              newWindow: true
            }
          )
        })
      ))
      .then(
        this.$store.commit(
          'global/setHeaderNav',
          primaryNav
        )
      )
      .catch((error) => {
        console.log(error)
      })
  }
}

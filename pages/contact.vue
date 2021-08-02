<template>
  <div>
    <information-page :page="contactPage" />
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'

export default {
  name: 'Information', // this is the template name which is used for GTM
  components: {
    InformationPage: () => import('../components/InformationPage')
  },
  mixins: [gtm],
  data () {
    return {
      contactPage: null
    }
  },
  async mounted () {
    await this.$axios
      .get('/pages/find/?html_path=contact')
      .then(response => (
        this.contactPage = response.data
      ))
  },
  head () {
    return {
      title: 'Contact Us - Gothamist',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Contact Us - Gothamist'
        },
        {
          hid: 'og_url',
          name: 'og:url',
          content: 'https://www.gothamist.com' + this.$route.fullPath
        },
        {
          hid: 'og_title',
          name: 'og:title',
          content: 'Contact Us - Gothamist'
        },
        {
          hid: 'og_description',
          name: 'og:description',
          content: 'Contact Us - Gothamist'
        }
      ]
    }
  }
}
</script>

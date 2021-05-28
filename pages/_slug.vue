<template>
  <section-page
    v-if="page"
    :name="slug"
    :descendant-of="page.id"
  />
</template>

<script>
import gtm from '~/mixins/gtm'
import { capitalize } from '~/mixins/helpers'

export default {
  name: 'Section', // this is the template name which is used for GTM
  components: {
    SectionPage: () => import('../components/SectionPage')
  },
  mixins: [gtm],
  async asyncData ({
    $axios,
    params,
    error
  }) {
    const path = `${params.slug}`
    const page = await $axios.get(`/pages/find/?html_path=${path}`)
      .catch(() => {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      })
    return {
      page: page?.data,
      slug: capitalize(params.slug)
    }
  },
  head () {
    return {
      title: this.slug + ' - Gothamist',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.slug + ' - Gothamist'
        },
        {
          hid: 'og_url',
          name: 'og:url',
          content: 'https://www.gothamist.com' + this.$route.fullPath
        },
        {
          hid: 'og_title',
          name: 'og:title',
          content: this.slug + ' - Gothamist'
        },
        {
          hid: 'og_description',
          name: 'og:description',
          content: this.slug + ' - Gothamist'
        },
        {
          hid: 'twitter_title',
          name: 'twitter:title',
          content: this.slug + ' - Gothamist'
        },
        {
          hid: 'twitter_description',
          name: 'twitter:description',
          content: this.slug + ' - Gothamist'
        },
        {
          hid: 'twitter_url',
          name: 'twitter:url',
          content: 'https://www.gothamist.com' + this.$route.fullPath
        }
      ]
    }
  }
}
</script>

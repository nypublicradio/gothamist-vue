<template>
  <section-page
    v-if="page"
    :name="title"
    :descendant-of="page.id"
  />
</template>

<script>
import gtm from '~/mixins/gtm'
import { setTargeting, clearTargeting } from '~/mixins/htl'

const { formatTitle } = require('~/mixins/helpers')

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
      title: page?.data.title
    }
  },
  data () {
    return {
      page: null,
      slug: this.$route.params.slug,
      title: null
    }
  },
  mounted () {
    setTargeting({ Template: 'Tag' })
  },
  activated () {
    setTargeting({ Template: 'Tag' })
  },
  beforeUnmount () {
    clearTargeting(['Template'])
  },
  deactivated () {
    clearTargeting(['Template'])
  },
  methods: {
    formatTitle
  },
  head () {
    return {
      title: this.title + ' - Gothamist',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.title + ' - Gothamist'
        },
        {
          hid: 'og_url',
          name: 'og:url',
          content: 'https://gothamist.com' + this.$route.fullPath
        },
        {
          hid: 'og_title',
          name: 'og:title',
          content: this.title + ' - Gothamist'
        },
        {
          hid: 'og_description',
          name: 'og:description',
          content: this.title + ' - Gothamist'
        }
      ]
    }
  }
}
</script>

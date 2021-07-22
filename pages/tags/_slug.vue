<template>
  <div v-if="slug">
    <tag-page
      v-if="page && dataLoaded"
      :designed-header="page.designedHeader"
      :mid-page-zone="page.midpageZone"
      :slug="slug"
      :title="title"
      :top-page-zone="page.topPageZone"
    />
    <tag-page
      v-else
      :slug="slug"
      :title="title"
    />
  </div>
</template>

<script>
import gtm from '~/mixins/gtm'
import { setTargeting, clearTargeting } from '~/mixins/htl'

const { formatTitle } = require('~/mixins/helpers')

export default {
  name: 'Tag', // this is the template name which is used for GTM
  components: {
    TagPage: () => import('../../components/TagPage')
  },
  mixins: [gtm],
  data () {
    return {
      dataLoaded: false,
      page: null,
      slug: this.$route.params.slug,
      title: ''
    }
  },
  async mounted () {
    await this.$axios
      .get(`/pages/find/?html_path=tags/${this.slug}`)
      .then((response) => {
        this.page = response.data
        this.dataLoaded = true
        this.title = this.page.title
      })
      .catch((e) => {
        this.page = null
        this.dataLoaded = true
        this.title = formatTitle(this.$route.params.slug)
      })
    setTargeting({ Template: 'Tag' })
  },
  beforeUnmount () {
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

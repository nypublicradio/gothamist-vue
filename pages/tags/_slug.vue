<template>
  <div>
    <tag-page
      v-if="page"
      :designed-header="page.designedHeader"
      :mid-page-zone="page.midpageZone"
      :slug="slug"
      :title="page.title"
      :top-page-zone="page.topPageZone"
    />
    <tag-page
      v-else
      :slug="slug"
      :title="slug"
    />
  </div>
</template>

<script>
import gtm from '~/mixins/gtm'

export default {
  name: 'Tag', // this is the template name which is used for GTM
  components: {
    TagPage: () => import('../../components/TagPage')
  },
  mixins: [gtm],
  data () {
    return {
      page: null,
      slug: this.$route.params.slug
    }
  },
  async mounted () {
    await this.$axios
      .get(`/pages/find/?html_path=tags/${this.slug}`)
      .then(response => (
        this.page = response.data
      ))
      .catch(() => {
        this.page = null
      })
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

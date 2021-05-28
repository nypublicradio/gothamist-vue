<template>
  <div>
    <div
      v-if="contactPage"
      class="l-container l-container--14col"
    >
      <v-spacer size="quad" />
      <header class="c-basic__header u-spacing">
        <h1 class="c-basic__heading o-3d-heading">
          {{ contactPage.title }}
        </h1>
      </header>
      <v-spacer size="quad" />
      <div class="contact-page">
        <v-streamfield :streamfield="contactPage.body" />
      </div>
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'
import { mapState } from 'vuex'

export default {
  name: 'Information', // this is the template name which is used for GTM
  components: {
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    VStreamfield: () => import('../components/VStreamfield')
  },
  mixins: [gtm],
  data () {
    return {
      contactPage: null
    }
  },
  computed: {
    ...mapState('global', {
      donateUrl: state => state.donateUrl
    })
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
        },
        {
          hid: 'twitter_title',
          name: 'twitter:title',
          content: 'Contact Us - Gothamist'
        },
        {
          hid: 'twitter_description',
          name: 'twitter:description',
          content: 'Contact Us - Gothamist'
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

<style lang="scss">
.u-padding--quad--top {
  padding-top: calc(var(--space-3) * 3);
}

.contact-page p, .contact-page h2 {
  margin-bottom: var(--space-3);
}

.contact-page {
  max-width: var(--article-content-width);
  margin: auto;
}
</style>

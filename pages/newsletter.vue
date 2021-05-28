<template>
  <div class="u-spacing--quad c-basic-page newsletter-page">
    <v-spacer size="quad" />
    <div
      class="c-listing__sections u-section-spacing l-container l-wrap l-container--16col"
    >
      <header class="c-basic__header u-spacing">
        <h1 class="c-basic__heading o-3d-heading">
          Gothamist Daily Newsletter
        </h1>
      </header>
      <div class="c-basic-page__content">
        <div class="u-padding">
          <div class="l-grid l-grid--2up l-grid--top">
            <div
              class="u-space--bottom u-padding--bottom u-padding-right u-background-color--cool-white"
            >
              <div class="o-rte-text u-spacing l-container">
                <p>
                  Catch up on the most important headlines of the day with a
                  roundup of essential NYC news, delivered to your inbox every
                  day at 5pm.
                </p>
                <p>
                  <a
                    href="https://us5.campaign-archive.com/?e=40257345f9&u=4109fdd323aaac7078eadaa8f&id=82ecfc8061"
                    target="_blank"
                    rel="noopener"
                  >
                    Read a Sample Newsletter
                  </a>
                </p>
                <div
                  class="l-container--content u-section-spacing"
                  data-category="NTG newsletter"
                  data-action="newsletter modal impression 3"
                  data-label="Newsletter Signup Page"
                >
                  <article-page-newsletter />
                </div>
              </div>
            </div>
            <div
              class="u-space--bottom u-padding--bottom u-padding--left u-background-color--cool-white"
            >
              <img
                src="https://cms.prod.nypr.digital/documents/2/GothamistDaily.gif"
                alt="Get the top stories from Gothamist delivered to your inbox daily"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-spacer size="quad" />
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'

export default {
  name: 'Newsletter', // this is the template name which is used for GTM
  components: {
    ArticlePageNewsletter: () => import('../components/ArticlePageNewsletter'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [gtm],
  head () {
    return {
      title: 'Newsletter - Gothamist',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Newsletter - Gothamist'
        },
        {
          hid: 'og_url',
          name: 'og:url',
          content: 'https://www.gothamist.com' + this.$route.fullPath
        },
        {
          hid: 'og_title',
          name: 'og:title',
          content: 'Newsletter - Gothamist'
        },
        {
          hid: 'og_description',
          name: 'og:description',
          content: 'Newsletter - Gothamist'
        },
        {
          hid: 'twitter_title',
          name: 'twitter:title',
          content: 'Newsletter - Gothamist'
        },
        {
          hid: 'twitter_description',
          name: 'twitter:description',
          content: 'Newsletter - Gothamist'
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

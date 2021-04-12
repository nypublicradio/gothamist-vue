<template>
  <div class='u-spacing--quad c-basic-page newsletter-page'>
      <v-spacer size='quad' />
    <div
      class='c-listing__sections u-section-spacing l-container l-wrap l-container--16col'
    >
      <header class='c-basic__header u-spacing'>
        <h1 class='c-basic__heading o-3d-heading'>
          Gothamist Daily Newsletter
        </h1>
      </header>
      <div class='c-basic-page__content'>
        <div class='u-padding'>
          <div class='l-grid l-grid--2up l-grid--top'>
            <div
              class='u-space--bottom u-padding--bottom u-padding-right u-background-color--cool-white'
            >
              <div class='o-rte-text u-spacing l-container'>
                <p>
                  Catch up on the most important headlines of the day with a
                  roundup of essential NYC news, delivered to your inbox every
                  day at 5pm.
                </p>
                <p>
                  <a
                    href='https://us5.campaign-archive.com/?e=40257345f9&u=4109fdd323aaac7078eadaa8f&id=82ecfc8061'
                    target='_blank'
                    rel='noopener'
                  >
                    Read a Sample Newsletter
                  </a>
                </p>
                <div
                  class='l-container--content u-section-spacing'
                  {{track-impression}}
                  data-category='NTG newsletter'
                  data-action='newsletter modal impression 3'
                  data-label='Newsletter Signup Page'
                >
                   <article-page-newsletter />
                </div>
              </div>
            </div>
            <div
              class='u-space--bottom u-padding--bottom u-padding--left u-background-color--cool-white'
            >
              <img
                src='https://cms.prod.nypr.digital/documents/2/GothamistDaily.gif'
                alt='Get the top stories from Gothamist delivered to your inbox daily'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-spacer size='quad' />
  </div>
</template>

<script>
export default {
  name: 'Newsletter',
  components: {
    ArticlePageNewsletter: () => import('../components/ArticlePageNewsletter'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  }
}
</script>

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
                    href='https://us5.campaign-archive.com/?u=4109fdd323aaac7078eadaa8f&id=8c5254d6a1'
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
                    <form
      class="gtm__click-tracking"
      @submit.prevent="submitForm"
    >
      <label
        for="newsletter"
        class="is-vishidden"
      >
        newsletter signup
      </label>
      <div
        v-if="status !== 'success'"
        class="inline-button c-newsletter-form__inline-button"
      >
        <input
          id="newsletter"
          v-model="email"
          name="newsletter"
          placeholder="your@email.com"
          class="c-newsletter-form__input"
          required
          type="email"
        >
        <button
          class="c-newsletter-form__button"
          data-label="Footer"
          data-action="Newsletter Signup"
          data-category="Click Tracking"
          data-test-newsletter-submit=""
          type="submit"
          :disabled="!termsCheckbox"
        >
          <gothamist-arrow v-if="!submitted" />
          <loading-icon
            v-else
            class="c-newsletter-form__loading-icon"
          />
        </button>
      </div>
      <div
        v-if="status === 'success'"
        class="c-newsletter-form__submit"
      >
        Thanks for signing up!
      </div>
      <div
        v-if="status === 'error'"
        class="c-newsletter-form__submit"
      >
        Sorry, there was an error with your submission. Please try again!
      </div>
      <div
        v-if="status !== 'success'"
        class="c-newsletter-form__terms"
      >
        <fieldset>
          <legend class="is-vishidden">
            Terms
          </legend>
          <label>
            <input
              v-model="termsCheckbox"
              type="checkbox"
              required
              checked
            >
            By submitting your information, you're agreeing to receive communications from New York Public Radio in accordance with our
            <a
              href="https://www.wnyc.org/terms/"
              target="_blank"
              rel="noopener"
              class="u-has-accent"
            >Terms</a>.
          </label>
        </fieldset>
      </div>
    </form>
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
import newsletter from '../mixins/newsletter'

export default {
  name: 'Newsletter',
  mixins: [newsletter],
  components: {
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  }
}
</script>

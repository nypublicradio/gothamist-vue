<template>
  <div class="article-page-newsletter l-container l-container--6col">
    <h3>NYC news never sleeps. Get the Gothamist Daily newsletter and don't miss a moment.</h3>
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
</template>

<script>
import newsletter from '../mixins/newsletter'

export default {
  name: 'ArticlePageNewsletter',
  mixins: [newsletter]
}
</script>

<style lang="scss">
// most styles for this component are inherited from the GothamistFooterNewsletter component
// the styles below override those styles ^
.article-page-newsletter h3 {
  font-family: var(--font-family-pragati);
  font-size: var(--font-size-7);
  font-weight: bold;
  color: RGB(var(--color-text));
}

.article-page-newsletter .c-newsletter-form__input,
.article-page-newsletter .c-newsletter-form__button {
  height: 40px;
}

.article-page-newsletter .c-newsletter-form__button {
  width: 50px;
  background-color: RGB(var(--color-reddish-orange));
}

.article-page-newsletter .c-newsletter-form__terms input[type="checkbox"] {
  background-color: RGB(var(--color-reddish-orange));
}
</style>

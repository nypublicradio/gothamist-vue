<template>
  <div class="c-newsletter-form">
<!--    <div class="c-newsletter-form__graphic">-->
<!--      <party-confetti />-->
<!--    </div>-->

<!--    <div class="c-newsletter-form__inner u-spacing">-->

<!--      <div class="c-newsletter-form__text">-->
<!--        <p>-->
<!--          <span class="c-newsletter-form__icon o-icon o-icon&#45;&#45;newsletter-form u-icon&#45;&#45;s"><gothamist-arrow /></span>-->
<!--          <span>Sign up for our newsletter! Share your email address to get our top stories each day.</span>-->
<!--        </p>-->
<!--      </div>-->

<!--      <form-->
<!--        id="ember662"-->
<!--        class="c-newsletter-form__concrete ember-view u-spacing gtm__click-tracking"-->
<!--      >-->
<!--        <div class="c-newsletter-form__field-group">-->
<!--          <label-->
<!--            for="newsletter"-->
<!--            class="is-vishidden"-->
<!--          />-->
<!--          <input-->
<!--            name="newsletter"-->
<!--            required=""-->
<!--            placeholder="your@email.com"-->
<!--            id="ember663"-->
<!--            class="c-newsletter-form__input ember-text-field ember-view"-->
<!--            type="email"-->
<!--          >-->
<!--          <button-->
<!--            data-action="Newsletter Signup"-->
<!--            data-category="Click Tracking"-->
<!--            data-test-newsletter-submit=""-->
<!--            id="ember664"-->
<!--            class="o-button c-newsletter-form__button gtm__click-tracking ember-view o-button&#45;&#45;c-quarternary"-->
<!--            data-label="Footer"-->
<!--            type="submit"-->
<!--          >-->
<!--            <span class="c-newsletter-form__submit-icon o-icon o-icon&#45;&#45;newsletter-form"><gothamist-arrow /></span>-->
<!--            <span class="is-vishidden">Submit email</span>-->
<!--          </button>-->
<!--        </div>-->
<!--        <div-->
<!--          class="c-newsletter-form__message"-->
<!--          aria-live="polite"-->
<!--        />-->
<!--        <div class="c-newsletter-form__terms">-->
<!--          <label class="c-newsletter-form__terms-checkbox">-->
<!--            <input-->
<!--              name="newsletterCheckbox"-->
<!--              id="ember666"-->
<!--              class="o-checkbox ember-checkbox ember-view"-->
<!--              type="checkbox"-->
<!--            >-->
<!--            <p-->
<!--              class="u-font&#45;&#45;xs"-->
<!--              data-test-newsletter-tout-legal=""-->
<!--            >-->
<!--              By submitting your information, you're agreeing to receive communications from New York Public Radio in accordance with our-->
<!--              <a-->
<!--                href="https://www.wnyc.org/terms/"-->
<!--                target="_blank"-->
<!--                rel="noopener"-->
<!--                class="u-has-accent"-->
<!--              >Terms</a>.-->
<!--            </p>-->
<!--          </label>-->
<!--        </div>-->
<!--      </form>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'GothamistFooterNewsletter',
  components: {
    // GothamistArrow: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistArrow'),
    // PartyConfetti: () => import('nypr-design-system-vue/src/components/icons/gothamist/PartyConfetti')
  }
}
</script>

<style lang="scss">
.c-newsletter-form__button :hover {
  background-color: RGB(var(--color-form-button));
}

.c-newsletter-form__button {
  background-color: RGB(var(--color-reddish-orange));
}

.c-newsletter-form .c-newsletter-form__button {
  background-color: RGB(var(--color-dark-gray));
}

.c-newsletter-tout .c-newsletter-form__terms input[type="checkbox"] {
  border: 2px solid;
  border-color: RGB(var(--color-white));
}

.c-newsletter-tout .c-newsletter-form__terms input[type="checkbox"]:checked {
  border: 2px solid;
  border-color: RGB(var(--color-white));
}

.c-newsletter-form__terms a {
  color: RGB(var(--color-text));
  border-bottom: 2px dotted RGB(var(--color-text));

  &:hover {
    background-color: RGB(var(--color-reddish-orange));
  }
}

.c-newsletter-form .c-newsletter-form__button:hover[disabled] {
  background-color: RGB(var(--color-dark-gray));
}

.c-newsletter-form .c-newsletter-form__button {
  background-color: RGB(var(--color-dark-gray));
}

.c-newsletter-form__terms a {
  color: RGB(var(--color-text));
  border-bottom: 2px dotted RGB(var(--color-text));

  &:hover {
    background-color: RGB(var(--color-reddish-orange));
    color: RGB(var(--color-text-inverse));
  }
}

.c-newsletter-form__button svg,
.c-newsletter-form__button svg path,
.c-newsletter-form__button svg rect {
  fill: RGB(var(--color-footer-text));
}
</style>

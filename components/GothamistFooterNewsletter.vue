<template>
  <div class="c-newsletter-form">
    <div class="c-newsletter-form__graphic">
      <party-confetti />
    </div>
    <div class="c-newsletter-form__inner">
      <div class="c-newsletter-form__text">
        <gothamist-arrow />
        Sign up for our newsletter! Share your email address to get our top stories each day.
      </div>
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
</template>

<script>
import newsletter from '../mixins/newsletter'

export default {
  name: 'GothamistFooterNewsletter',
  components: {
    PartyConfetti: () => import('nypr-design-system-vue/src/components/icons/gothamist/PartyConfetti')
  },
  mixins: [newsletter]
}
</script>

<style lang="scss">
.c-newsletter-form {
  position: relative;
  width: 100%;
  @include typeface(body, 4);
  @include media(">medium") {
    max-width: 375px;
    margin: 0 0 0 auto;
  }
}

.c-newsletter-form .c-newsletter-form__graphic {
  z-index: 1;
  position: absolute;
  width: 130px;
  height: 170px;
  top: -50px;
  left: -10px;
  mix-blend-mode: difference;
  @include media(">xlarge") {
    z-index: 0;
    mix-blend-mode: normal;
    top: 50px;
    left: -120px;
  }
}

.c-newsletter-form .c-newsletter-form__graphic .party-confetti-icon path {
  fill: RGB(var(--color-background-highlight));
}

.c-newsletter-form .c-newsletter-form__inner {
  position: relative;
  background-color: RGB(var(--color-background-highlight));
  border: 3px solid RGB(var(--color-dark-gray));
  padding: var(--space-5) var(--space-4);
  @include media(">xlarge") {
    z-index: 1;
  }
}

.c-newsletter-form .c-newsletter-form__inner .c-newsletter-form__text {
  margin-left: 90px;
  @include media(">xlarge") {
    margin-left: 0;
  }
}

.c-newsletter-form .c-newsletter-form__inner .o-gothamist-arrow-icon {
  width: 20px;
  height: 20px;
  margin-right: var(--space-2);
  vertical-align: text-top;
}

.c-newsletter-form__inline-button {
  border: solid 2px RGB(var(--color-dark-gray));
  margin: var(--space-3) 0;
  position: relative;
  z-index: 3;
}

.c-newsletter-form__input {
  border-radius: 0 !important;
  height: 60px;
}

.c-newsletter-form__button {
  background-color: RGB(var(--color-dark-gray));
  border: none;
  height: 60px;
  width: 70px;
  padding: 0;
  cursor: pointer;

  &:hover {
    background-color: RGB(var(--color-reddish-orange));
    transform: none;

    .o-gothamist-arrow-icon {
      animation: bounceHorizontal .8s 0s ease-in-out infinite;
    }
  }

  &::before,
  &::after {
    display: none;
  }
}

.c-newsletter-form .c-newsletter-form__button .o-gothamist-arrow-icon,
.c-newsletter-form__button .o-gothamist-arrow-icon {
  width: 24px;
  margin: 0;

  path {
    fill: RGB(var(--color-white));
  }
}

.c-newsletter-form__terms {
  padding-left: 25px;
  position: relative;
}

.c-newsletter-form .c-newsletter-form__terms input[type="checkbox"],
.c-newsletter-form__terms input[type="checkbox"] {
  position: absolute;
  left: -25px;
  top: 2px;
  border: none !important;
  width: 17px;
  height: 17px;
  background-color: RGB(var(--color-dark-gray));
  background-size: 10px !important;
}

.c-newsletter-form__terms label {
  @include typeface(body, 3);
}

.c-newsletter-form__terms a {
  color: RGB(var(--color-text));
  border-bottom: 2px dotted RGB(var(--color-text));

  &:hover {
    background-color: RGB(var(--color-reddish-orange));
  }
}

.c-newsletter-form__submit {
  margin: var(--space-3) 0;
  font-weight: bold;
}

.c-newsletter-form__loading-icon {
  max-width: 30px;
}

@keyframes bounceHorizontal {
  0%, 100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
}
</style>

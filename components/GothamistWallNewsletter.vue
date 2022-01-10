<template>
  <div class="regwall">
    <div class="regwall-wrapper">
      <template
        v-if="status === '' || status === 'error'"
      >
        <h2 class="regwall-header">
          Read this story completely free.
        </h2>
        <div class="regwall-text">
          To continue reading, sign up for our daily newsletter and get unlimited access to Gothamist.com. <a>Why am I seeing this?</a>
        </div>
        <form
          class="gtm__click-tracking regwall-form"
          @submit.prevent="submitForm('footer')"
        >
          <label
            for="newsletter"
            class="is-vishidden"
          >
            newsletter signup
          </label>
          <div
            class="inline-button regwall-form-email"
          >
            <input
              id="newsletter"
              v-model="email"
              name="newsletter"
              placeholder="your@email.com"
              class="regwall-form-email-input"
              required
              type="email"
            >
            <button
              class="regwall-form-email-submit"
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
                class="regwall-form-email-button-loading"
              />
            </button>
          </div>
          <v-button class="regwall-button mod-flat" label="No Thanks" @click="decline" />
          <div
            v-if="status === 'error'"
            class="regwall-form-error"
          >
            Sorry, there was an error with your submission. Please try again!
          </div>
          <div
            class="regwall-form-terms"
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
      </template>
      <template
        v-if="status === 'success'"
        class="regwall-form__submit"
      >
        <div class="regwall-graphic">
          <party-confetti />
        </div>
        <h2 class="regwall-header">
          Thanks for subscribing!
        </h2>
        <div class="regwall-text">
          You just got yourself access to all our articles, old and new.
        </div>
        <v-button class="regwall-button" label="Start Reading" @click="startReading" />
      </template>
      <template
        v-if="status === 'declined'"
      >
        <h2 class="regwall-header">
          No hard feelings...
        </h2>
        <div class="regwall-text">
          You can still read the latest and greatest stories on Gothamist.com
        </div>
        <v-button class="regwall-button" label="Back to Homepage" @click="goToHomepage" />
      </template>
    </div>
  </div>
</template>

<script>
import newsletter from '../mixins/newsletter'

export default {
  name: 'GothamistFooterNewsletter',
  mixins: [newsletter],
  methods: {
    decline () {
      this.status = 'declined'
    },
    goToHomepage () {
      this.$router.push('/')
    },
    startReading () {
      this.$emit('wallCleared')
    }
  }
}
</script>

<style lang="scss">
.regwall-form {
  position: relative;
  width: 100%;
  @include typeface(body, 4);
}

.regwall-graphic {
  width: 100px;
  height: 100px;
  margin:  0 auto 16px;
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

.regwall-graphic .party-confetti-icon path {
  fill: RGB(var(--color-background-muted));
}

.regwall-form  {
  --color-button: RGB(var(--color-taxicab-yellow))
}

.regwall-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: RGB(var(--color-background-muted));
  border: 3px solid RGB(var(--color-dark-gray));
  padding: var(--space-5) var(--space-4);
  @include media(">xlarge") {
    z-index: 1;
  }
}

.regwall-header {
  font-family:  var(--font-family-subheader);
  font-weight:  var(--font-weight-subheader);
  font-size:  var(--font-size-8);
  text-align: center;
  margin-bottom: 16px;
}
.regwall-text {
  text-align: center;
  margin-bottom: 16px;
}

.regwall-button {
  height: 40px;
  padding: 16px;
  margin: 16px auto;
  background-color: RGB(var(--color-banana-yellow));
  &>span {
    font-size: var(--font-size-5);
    font-weight: 700;
    letter-spacing: var(--letter-spacing-small);
  }
  &:hover {
    background-color: RGB(var(--color-banana-yellow));
  }
}

.regwall-button.mod-flat {
  color: var(--color-black);
  &>span {
    font-size: var(--font-size-5);
    font-weight: 700;
    letter-spacing: var(--letter-spacing-small);
  }
  &:hover {
    background: transparent;
    color: var(--color-black);
    opacity: 0.8;
  }
  &:before {
    display: none;
  }
}

.regwall-form .o-gothamist-arrow-icon {
  width: 20px;
  height: 20px;
  margin-right: var(--space-2);
  vertical-align: text-top;
}

.regwall-form-email {
  border: solid 2px RGB(var(--color-dark-gray));
  margin: var(--space-3) 0;
  position: relative;
  z-index: 3;
}

.regwall-form-email-input {
  border-radius: 0 !important;
  height: 60px;
}

.regwall-form-email-submit {
  background-color: RGB(var(--color-banana-yellow));
  border: none;
  height: 60px;
  width: 70px;
  margin: 0;
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

.regwall-form-email-submit[disabled] {
  cursor: not-allowed;
  opacity: .6;
}

.regwall-form .regwall-form-email-submit .o-gothamist-arrow-icon,
.regwall-form-email-submit .o-gothamist-arrow-icon {
  width: 24px;
  margin: 0;

  path {
    fill: RGB(var(--color-black));
  }
}

.reg-wall-form-button {
  background-color: RGB(var(--color-banana-yellow));
}

.regwall-form-terms {
  padding-left: 25px;
  position: relative;
}

.regwall-form-terms input[type="checkbox"],
.regwall-form-terms input[type="checkbox"] {
  position: absolute;
  left: -25px;
  top: 2px;
  border: none !important;
  width: 17px;
  height: 17px;
  background-color: RGB(var(--color-banana-yellow));
  color: RGB(var(--color-black));
  background-size: 10px !important;
}

.regwall-form-terms label {
  @include typeface(body, 3);
}

.regwall-form-terms a {
  color: RGB(var(--color-text));
  border-bottom: 2px dotted RGB(var(--color-text));

  &:hover {
    background-color: RGB(var(--color-reddish-orange));
  }
}

.regwall-form-email-submit {
  font-weight: bold;
}

.regwall-form-loading {
  max-width: 30px;
}
</style>

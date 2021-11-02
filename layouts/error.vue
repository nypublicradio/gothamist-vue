<template>
  <div class="error-page">
    <div class="l-container l-container--11col l-wrap">
      <v-spacer size="quad" />
      <strong
        v-if="error.statusCode === 404"
        class="c-basic__header-kicker"
      >
        404 Page Error
      </strong>
      <strong
        v-else
        class="c-basic__header-kicker"
      >
        500 Server Error
      </strong>
      <v-spacer />
      <h1
        v-if="error.statusCode === 404"
        class="c-basic__heading o-3d-heading"
        data-test-404-heading
      >
        The page you're looking for doesn't appear to exist.
      </h1>
      <h1
        v-else
        class="c-basic__heading o-3d-heading"
      >
        Sorry, an error occurred.
      </h1>
      <v-spacer size="triple" />
    </div>
    <div class="l-container l-container--11col image-with-caption-container">
      <image-with-caption
        variation="gothamist"
        alt-text="Realize the key to Zubaz is wearing them high. No need to rock these low. They do the work for you."
        image="/static-images/404.jpg"
        caption="Realize the key to Zubaz is wearing them high. No need to rock these low. They do the work for you."
      />
    </div>
    <div class="error-page l-container l-container--11col l-wrap">
      <v-spacer size="double" />
      <p>
        Welcome! The Gothamist page you're looking for doesn't appear to exist. Would you like to visit our
        <nuxt-link to="/">
          Homepage
        </nuxt-link>
        ? Or you can
        <nuxt-link to="/search">
          search
        </nuxt-link>
        for what you're looking for.
      </p>
      <v-spacer size="triple" />
      <h2 class="o-section__heading o-bg-text-accent">
        Recent Stories
      </h2>
      <v-spacer />
      <recent-stories />
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'

export default {
  name: 'ErrorPage', // this is the template name which is used for GTM
  mixins: [gtm],
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.gaEvent('URL Error', 'URL Error', this.error.statusCode, window.location.href)
  }
}
</script>

<style lang="scss">
.error-page .image-with-caption-container {
  @include media("<medium") {
    padding: 0;
  }
}

.error-page .image-with-caption-container figure,
.error-page .image-with-caption-container img {
  width: 100%;
}

.error-page .image-with-caption-container figcaption {
  @include media("<medium") {
    padding: 0 var(--space-3);
  }
}
</style>

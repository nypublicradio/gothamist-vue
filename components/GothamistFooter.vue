<template>
  <div>
    <back-to-top />
    <the-footer
      :slogan="footerSlogan"
      :primary-nav="footerNav"
      :legal-nav="legalNav"
      subheader1="About Us"
    >
      <template v-slot:logo>
        <nuxt-link
          to="/"
          aria-label="gothamist home page"
        >
          <gothamist-logo-stacked />
        </nuxt-link>
      </template>
      <template v-slot:social>
        <div>
          <share-tools label="Follow Us">
            <share-tools-item
              service="facebook"
              username="gothamist"
              @follow="gaEvent('NTG social','social follow', ...arguments)"
            />
            <share-tools-item
              service="twitter"
              username="gothamist"
              @follow="gaEvent('NTG social','social follow', ...arguments)"
            />
            <share-tools-item
              service="instagram"
              username="gothamist"
              @follow="gaEvent('NTG social','social follow', ...arguments)"
            />
            <share-tools-item
              service="youtube"
              username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
              @follow="gaEvent('NTG social','social follow', ...arguments)"
            />
          </share-tools>
        </div>
      </template>
      <template v-slot:rightComponent>
        <div>
          <gothamist-footer-newsletter
            v-observe-visibility="{
              callback: handleNewsletterImpression,
            }"
            @newsletter-signup-success="handleNewsletterSignupSuccess"
          />
        </div>
      </template>
    </the-footer>
    <div class="htlad-interior_leaderboard_adhesion" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gtm from '@/mixins/gtm'

export default {
  name: 'GothamistFooter',
  mixins: [gtm],
  data () {
    return {
      newsletterImpressionWasTracked: false
    }
  },
  computed: {
    ...mapState('global', {
      footerNav: state => state.footerNav,
      footerSlogan: state => state.footerSlogan,
      legalNav: state => state.legalNav
    })
  },
  watch: {
    '$route.path' () {
      this.newsletterImpressionWasTracked = false
    }
  },
  methods: {
    handleNewsletterImpression (isVisible) {
      if (isVisible && !this.newsletterImpressionWasTracked) {
        this.gaEvent('NTG newsletter', 'newsletter modal impression 2', 'footer')
        this.newsletterImpressionWasTracked = true
      }
    },
    handleNewsletterSignupSuccess () {
      this.gaEvent('NTG newsletter', 'newsletter signup 2', 'success')
    }
  }
}
</script>

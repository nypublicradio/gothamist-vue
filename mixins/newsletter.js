import { mapState } from 'vuex'
import gtm from '../mixins/gtm'

export default {
  data () {
    return {
      email: '',
      status: '',
      submitted: false,
      termsCheckbox: true
    }
  },
  components: {
    GothamistArrow: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistArrow'),
    LoadingIcon: () => import('nypr-design-system-vue/src/components/animations/LoadingIcon')
  },
  mixins: [gtm],
  computed: {
    ...mapState('global', {
      dailyNewsletter: state => state.dailyNewsletter,
      newsletterAPI: state => state.newsletterAPI
    })
  },
  methods: {
    submitForm (location) {
      this.submitted = true
      this.$axios
        .post(
          this.newsletterAPI,
          {
            list: this.dailyNewsletter,
            email: this.email,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        )
        .then(() => {
          this.status = 'success'
          this.$emit('newsletter-signup-success')
        })
        .catch(() => {
          this.status = 'error'
          this.submitted = false
          this.$emit('newsletter-signup-error')
        })
    }
  }
}

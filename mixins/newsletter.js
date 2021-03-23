import { mapState } from 'vuex'

export default {
  data () {
    return {
      email: '',
      status: '',
      submitted: false,
      termsCheckbox: false
    }
  },
  components: {
    GothamistArrow: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistArrow'),
    LoadingIcon: () => import('nypr-design-system-vue/src/components/animations/LoadingIcon')
  },
  computed: {
    ...mapState('global', {
      dailyNewsletter: state => state.dailyNewsletter,
      mailchimpAPI: state => state.mailchimpAPI
    })
  },
  methods: {
    submitForm () {
      this.submitted = true
      this.$axios
        .post(
          this.mailchimpAPI,
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
        })
        .catch(() => {
          this.status = 'error'
          this.submitted = false
        })
    }
  }
}

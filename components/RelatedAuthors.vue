<template>
  <div>
    <div
      v-for="(a, index) in finalAuthors"
      :key="index"
      class="l-container l-container--10col"
    >
      <v-person
        :orientation="orientation"
        :image="a.photo ? a.photo : defaultPhoto"
        :video="a.video"
        :img-scale="imgScale"
        :circle="circle"
        :animate="animate"
        :name="a.title"
        :name-link="a.url"
        :role="a.job_title"
        :organization="a.organization"
        :organization-link="a.organization_link"
        :blurb="a.biography"
        :truncate="a.biography ? truncate : null"
        :website-url="a.website"
        :website-label="a.website_label"
        :email="a.email"
        :phone-number="a.phone_numbers"
        :social="a.social_media_profile"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelatedAuthors',
  mixins: [],
  props: {
    authors: {
      type: Array,
      default: () => []
    },
    defaultPhoto: {
      type: String,
      default: ''
    },
    imgScale: {
      type: String,
      default: '40'
    },
    truncate: {
      type: String,
      default: '2'
    },
    animate: {
      type: Boolean,
      default: true
    },
    circle: {
      type: Boolean,
      default: false
    },
    orientation: {
      type: String,
      default: 'responsive'
    }
  },
  async asyncData ({ params }) {},
  data () {
    return {
      finalAuthors: []
    }
  },
  computed: {},
  watch: {},
  updated () {},
  created () {
    this.authors.forEach((author, index, arr) => {
      fetch('https://cms.demo.nypr.digital/api/v2/pages/' + author.id)
        .then(response => response.json())
        .then((data) => {
          this.finalAuthors.push(data)
        })
    })
    console.log('finalAuthors = ', this.finalAuthors)
  },
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <div
      v-for="(a, index) in finalAuthors"
      :key="index"
    >
      <v-person
        :orientation="orientation"
        :image="!!a.photo ? a.photo.meta.downloadUrl : defaultPhoto"
        :video="a.video"
        :img-scale="imgScale"
        :circle="circle"
        :animate="animate"
        :full-name="a.title"
        :name-link="a.url"
        :role="a.jobTitle"
        :organization="a.organization"
        :organization-link="a.organizationLink"
        :blurb="a.biography"
        :truncate="a.biography ? truncate : null"
        :website-url="a.website"
        :website-label="a.websiteLabel"
        :email="a.email"
        :phone-numbers="a.phoneNumbers"
        :social="a.socialMediaProfile"
        :on-author-page="onAuthorPage"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RelatedAuthors',
  props: {
    author: {
      type: Object,
      default: null
    },
    authors: {
      type: Array,
      default: null
    },
    onAuthorPage: {
      type: Boolean,
      default: false
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
      default: false
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
  async asyncData ({ params }) { },
  data () {
    return {
      finalAuthors: []
    }
  },
  computed: {
    ...mapState('global', {
      API: state => state.API
    })
  },
  mounted () {
    if (this.authors) {
      this.authors.forEach((author, index, arr) => {
        this.$axios
          .get(this.API + 'pages/' + author.id)
          .then((response) => {
            this.finalAuthors.push(response.data)
          })
      })
    } else if (this.author) {
      this.finalAuthors.push(this.author)
    } else {
    }
  }
}
</script>

<style lang="scss" scoped></style>

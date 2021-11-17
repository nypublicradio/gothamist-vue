<template>
  <div>
    <div
      v-for="(a, index) in finalAuthors"
      :key="index"
    >
      <v-person
        :orientation="orientation"
        :image="a.photo ? a.photo.meta.download_url : defaultPhoto"
        :video="a.video"
        :img-scale="imgScale"
        :circle="circle"
        :animate="animate"
        :full-name="a.title"
        :name-link="a.url"
        :role="a.job_title"
        :organization="a.organization"
        :organization-link="a.organization_link"
        :blurb="a.biography"
        :truncate="a.biography ? truncate : null"
        :website-url="a.website"
        :website-label="a.website_label"
        :email="a.email"
        :phone-numbers="a.phone_numbers"
        :social="a.social_media_profile"
      />
    </div>
  </div>
</template>

<script>
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
  created () {
    if (this.authors) {
      this.authors.forEach((author, index, arr) => {
        fetch('https://cms.demo.nypr.digital/api/v2/pages/' + author.id)
          .then(response => response.json())
          .then((data) => {
            this.finalAuthors.push(data)
          })
      })
    } else if (this.author) {
      this.finalAuthors.push(this.author)
    } else {
      console.error('No author(s) found')
    }
    // console.log('finalAuthors = ', this.finalAuthors)
  }
}
</script>

<style lang="scss" scoped></style>

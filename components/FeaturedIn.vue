<template>
  <div class="featured-in">
    {{ featuredStory }}
    <v-card
      v-if="featuredStory"
      class="gothamist mod-vertical mod-large"
      :image="featuredStory.story.leadAsset[0] && featuredStory.story.leadAsset[0].value.image && featuredStory.story.leadAsset[0].value.image.file ||
        featuredStory.story.leadAsset[0] && featuredStory.story.leadAsset[0].value.defaultImage && featuredStory.story.leadAsset[0].value.defaultImage.file ||
        defaultImage"
      :image-height="150"
      :image-width="150"
      :title="getTitle(featuredStory.story)"
      :title-link="featuredStory.story.url"
      :tags="featuredStory.story.tags"
    >
      <article-metadata
        :publish-date="featuredStory.story.meta.firstPublishedAt"
      >
        <template v-slot:comments>
          <v-counter
            icon="comment"
            value="40"
            href="http://www.google.com"
          />
        </template>
      </article-metadata>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const {
  getTitle
} = require('~/mixins/helpers')

export default {
  name: 'FeaturedIn',
  data () {
    return {
      featuredStory: null
    }
  },
  computed: {
    ...mapState('global', {
      defaultImage: state => state.defaultImage
    })
  },
  methods: {
    getTitle
  }
  // async mounted () {
  //   await this.$axios
  //     .get('/pages/?type=' + this.type + '.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=1')
  //     .then(response => (
  //       this.featuredStory = response.data.items
  //     ))
  // }
}
</script>

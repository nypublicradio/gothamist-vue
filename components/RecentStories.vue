<template>
  <div class="recent-stories">
    <v-card
      v-for="(story, index) in recentStories"
      :key="index"
      class="gothamist mod-small"
      :show-gallery-icon="hasGallery(story.leadAsset)"
      :image="story.leadAsset[0] && story.leadAsset[0].value.image && story.leadAsset[0].value.image.file ||
        story.leadAsset[0] && story.leadAsset[0].value.defaultImage && story.leadAsset[0].value.defaultImage.file ||
        defaultImage"
      :image-height="150"
      :image-width="150"
      :sponsored="story.sponsoredContent"
      :title="story.title"
      :title-link="story.url"
      :tags="formatTags(story.ancestry[0].title, story.ancestry[0].slug, story.sponsored_content, story.tags)"
    >
      <article-metadata
        :publish-date="story.updatedDate ? null : fuzzyDateTime(story.meta.firstPublishedAt)"
        :updated-date="story.updatedDate ? fuzzyDateTime(story.updatedDate) : null"
      >
        <template
          v-if="disqusData && disqusData.data.response[index]"
          v-slot:comments
        >
          <v-counter
            icon="comment"
            :value="disqusData.data.response[index].posts"
            :href="story.url + '?to=comments'"
          />
        </template>
      </article-metadata>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import disqus from '~/mixins/disqus'

const { formatTags, fuzzyDateTime, hasGallery } = require('~/mixins/helpers')

export default {
  name: 'RecentStories',
  components: {
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard')
  },
  mixins: [disqus],
  props: {
    type: {
      type: String,
      default: 'news'
    }
  },
  async fetch () {
    await this.$axios
      .get('/pages/?type=' + this.type + '.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=4')
      .then((response) => {
        this.recentStories = response.data.items
        response.data.items.forEach((item) => {
          this.disqusThreadIds.push(item.uuid)
        })
      })
  },
  data () {
    return {
      recentStories: null,
      disqusThreadIds: [],
      disqusData: null
    }
  },
  computed: {
    ...mapState('global', {
      defaultImage: state => state.defaultImage
    })
  },
  async mounted () {
    // get disqus comment counts
    this.disqusData = await this.getCommentCount(this.disqusThreadIds)
  },
  methods: {
    formatTags,
    fuzzyDateTime,
    hasGallery
  }
}
</script>

<style lang="scss">
.recent-stories .card {
  margin-bottom: var(--space-4);
}
</style>

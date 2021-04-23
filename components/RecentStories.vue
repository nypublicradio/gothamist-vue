<template>
  <div class="recent-stories">
    <v-card
      v-for="(story, index) in recentStories"
      :key="index"
      class="gothamist mod-small"
      :image="story.lead_asset[0] && story.lead_asset[0].value.image ? story.lead_asset[0].value.image.file : defaultImage"
      :image-height="150"
      :image-width="150"
      :sponsored="story.sponsored_content"
      :title="story.title"
      :title-link="story.url"
      :tags="story.tags"
    >
      <article-metadata
        :publish-date="fuzzyDateTime(story.meta.first_published_at)"
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
import helpers from '~/mixins/helpers'

export default {
  name: 'RecentStories',
  components: {
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard')
  },
  mixins: [disqus, helpers],
  props: {
    type: {
      type: String,
      default: 'news'
    }
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
    await this.$axios
      .get('/pages/?type=' + this.type + '.ArticlePage&fields=*&order=-publication_date&show_on_index_listing=true&limit=4')
      .then((response) => {
        this.recentStories = response.data.items
        response.data.items.forEach((item) => {
          this.disqusThreadIds.push(item.uuid)
        })
      })
    // get disqus comment counts
    this.disqusData = await this.getCommentCount(this.disqusThreadIds)
  }
}
</script>

<style lang="scss">
.recent-stories .card {
  margin-bottom: var(--space-4);
}
</style>

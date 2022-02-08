<template>
  <v-collection v-if="links.length" :title="title" class="related-links">
    <div
      v-for="link in detailedLinks"
      :key="link.id"
    >
      <v-card
        v-if="link.pageType === 'story' && link.page"
        class="gothamist mod-small"
        :image="getArticleImage(link.page.leadAsset, link.page.ancestry[0].slug, link.page.listingImage)"
        :title="link.value.titleOverride || getTitle(link.page)"
        :title-link="`/${link.page.ancestry[0].slug}/${link.page.meta.slug}`"
        :image-width="100"
        :image-height="100"
        :image-max-width="getArticleImageWidth(link.page, link.page.listingImage) || Infinity"
        :image-max-height="getArticleImageHeight(link.page, link.page.listingImage) || Infinity"
        :tags="formatTags(link.page.ancestry[0].title,
                          link.page.ancestry[0].slug,
                          link.page.sponsoredContent,
                          link.page.tags)"
      >
        <article-metadata
          :publish-date="link.page.updatedDate ? null : fuzzyDateTime(link.page.meta.firstPublishedAt)"
          :updated-date="link.page.updatedDate ? fuzzyDateTime(link.page.updatedDate) : null"
        >
          <template
            v-if="disqusData && disqusData.data.response[index]"
            v-slot:comments
          >
            <v-counter
              icon="comment"
              :value="disqusData.data.response[index].posts"
              :href="'/' + link.page.ancestry[0].slug + '/' + link.page.meta.slug + '?to=comments'"
            />
          </template>
        </article-metadata>
      </v-card>
      <v-card
        v-else-if="link.pageType === 'page' && link.page"
        class="gothamist mod-small"
        :image="getArticleImage(undefined, undefined, link.page.listingImage)"
        :title="link.value.titleOverride || link.page.title"
        :title-link="link.page.path"
        :image-width="100"
        :image-height="100"
        :image-max-width="getArticleImageWidth(undefined, link.page.listingImage) || Infinity"
        :image-max-height="getArticleImageHeight(undefined, link.page.listingImage) || Infinity"
      />
      <v-card
        v-else-if="!link.pageType"
        :key="'link-' + link.id"
        class="gothamist mod-small"
        :image="getArticleImage(undefined, undefined, link.value.thumbnail)"
        :title="link.value.title"
        :title-link="link.value.url"
        :image-width="100"
        :image-height="100"
        :image-max-width="(link.value.thumbnail && link.value.thumbnail.width) || Infinity"
        :image-max-height="(link.value.thumbnail && link.value.thumbnail.height) || Infinity"
      />
    </div>
  </v-collection>
</template>
<script>
import disqus from '~/mixins/disqus'
import {
  formatTags,
  getArticleImage,
  getArticleImageHeight,
  getArticleImageWidth,
  getTitle,
  fuzzyDateTime
} from '~/mixins/helpers'

export default {
  name: 'RelatedLinks',
  mixins: [disqus],
  props: {
    title: {
      type: String,
      default: ''
    },
    links: {
      type: Array,
      default: () => []
    }
  },
  async fetch () {
    const requests = this.links
      .filter(link => link.type === 'cms_page')
      .map((link) => {
        return this.$axios.get(`/pages/${link.value.page}`).then((result) => {
          const page = result.data
          const pathMatch = page.url && /^http[s]?:\/\/[^/]+(\/.*)/.exec(page.url.match)
          page.path = pathMatch && pathMatch[1] ? pathMatch[1] : ''
          this.pages.push(page)
          if (this.getPageType(page) === 'story') {
            this.disqusThreadIds.push(page.uuid)
          }
        })
      })
    return await Promise.all([...requests])
  },
  data () {
    return {
      pages: [],
      disqusThreadIds: [],
      disqusData: null
    }
  },
  computed: {
    detailedLinks () {
      return this.links.map((link) => {
        const page = this.getPageForLink(link)
        const pageType = this.getPageType(link)
        return Object.assign({}, link, { page, pageType })
      })
    }
  },
  methods: {
    formatTags,
    getArticleImage,
    getArticleImageHeight,
    getArticleImageWidth,
    getTitle,
    fuzzyDateTime,
    getPageForLink (link) {
      return this.pages.find(page => page.id === link.value.page)
    },
    getPageType (link) {
      if (link.type === 'cms_page') {
        const page = this.getPageForLink(link)
        if (page?.meta?.type === 'news.ArticlePage') {
          return 'story'
        }
        return 'page'
      }
    }
  }
}
</script>
<style lang="scss">
.related-links {
  margin-bottom: var(--space-4)
}

.related-links .card.gothamist.mod-small {
  --card-image-width: 100px;
  --card-image-height: 100px;
}

.related-links .article-metadata {
  margin-bottom: 0;
}

.c-article__body .related-links a {
  transition: all 0s;
  text-underline-position: auto;
  text-decoration-line: none;
  &:hover {
    text-decoration-line: none;
  }
  > span {
    transition: all 0s;
  }
}
</style>

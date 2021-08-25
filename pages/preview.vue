<template>
  <div v-if="page">
    <gothamist-article
      v-if="page.meta.type === 'news.ArticlePage'"
      :article="page"
    />
    <information-page
      v-if="page.meta.type === 'standardpages.InformationPage'"
      :page="page"
    />
    <tag-page
      v-if="page.meta.type === 'tagpages.TagPage'"
      :designed-header="page.designedHeader"
      :mid-page-zone="page.midpageZone"
      :slug="page.meta.slug"
      :title="page.title"
      :top-page-zone="page.topPageZone"
    />
  </div>
</template>

<script>
import { fuzzyDateTime } from '~/mixins/helpers'

export default {
  name: 'Preview',
  components: {
    GothamistArticle: () => import('../components/GothamistArticle'),
    InformationPage: () => import('../components/InformationPage'),
    TagPage: () => import('../components/TagPage')
  },
  async asyncData ({
    $axios,
    route,
    error
  }) {
    const requestOptions = {
      transformResponse: $axios.defaults.transformResponse.concat(
        (data) => {
          const transformedData = data
          if (transformedData.meta.type === 'news.ArticlePage') {
            transformedData.authors = transformedData.relatedAuthors.map(author => ({
              firstName: author.firstName,
              lastName: author.lastName,
              url: author.slug && `/staff/${author.slug}`,
              organization: author.contributingOrganization?.name,
              organizationUrl: author.contributingOrganization?.url
            }))
            transformedData.formattedPublishDate = fuzzyDateTime(data.publicationDate)
            if (data.updatedDate) {
              transformedData.formattedUpdatedDate = fuzzyDateTime(data.updatedDate)
            }
          }
          return transformedData
        }
      )
    }

    const page = await $axios.get(`/page_preview/?identifier=${route.query.identifier}&token=${route.query.token}`, requestOptions)
      .catch(() => {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      })
    if (page?.data.meta.type === 'news.ArticlePage' && page?.data.leadAsset.length > 0 && page?.data.leadAsset[0].type === 'lead_gallery') {
      const gallery = await $axios.get(`/pages/${page.data.leadAsset[0].value.gallery}`)
      page.data.gallery = gallery.data
    }

    return {
      page: page?.data
    }
  }
}
</script>

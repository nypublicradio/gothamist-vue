<template>
  <div>
    <Article
      :article="page"
      :show-donate-banner="!cookies.donateBannerDismissed && cookies.articlesViewed >= 3"
    />
  </div>
</template>

<script>
import { fuzzyDateTime } from '~/mixins/helpers'

export default {
  name: 'ArtsAndEntertainment',
  components: {
    Article: () => import('../../components/Article')
  },
  async asyncData ({
    $axios,
    $cookies,
    params,
    error
  }) {
    const donateBannerDismissed = $cookies.get('donateBannerDismissed') || false
    let articleViews = Number($cookies.get('articleViews')) || 0
    articleViews += 1
    $cookies.set('articleViews', articleViews)
    const cookies = {
      articleViews,
      donateBannerDismissed
    }

    const path = `${params.section}/${params.article}`
    const requestOptions = {
      transformResponse: $axios.defaults.transformResponse.concat(
        (data) => {
          const transformedData = data
          transformedData.authors = transformedData.relatedAuthors.map(author => ({
            firstName: author.firstName,
            lastName: author.lastName,
            url: author.slug && `/author-detail/${author.slug}`,
            organization: author.contributingOrganization?.name,
            organizationUrl: author.contributingOrganization?.url
          }))
          transformedData.formattedPublishDate = fuzzyDateTime(transformedData.publicationDate)
          transformedData.formattedUpdatedDate = fuzzyDateTime(transformedData.updatedDate)
          return transformedData
        }
      )
    }

    const page = await $axios.get(`/pages/find/?html_path=${path}`, requestOptions)
      .catch(() => {
        error({
          statusCode: 404,
          message: 'Page not found'
        })
      })

    if (page?.data.leadAsset.length > 0 && page?.data.leadAsset[0].type === 'leadGallery') {
      const gallery = await $axios.get(`/pages/${page.data.leadAsset[0].value.gallery}`)
      page.data.gallery = gallery.data
    }

    return {
      page: page?.data,
      cookies
    }
  }
}
</script>

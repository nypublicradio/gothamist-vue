<template>
  <div>
    <Article :article="page" />
  </div>
</template>

<script>
import humps from 'humps'
import { fuzzyDateTime } from '../../mixins/helpers'

export default {
  name: 'ArtsAndEntertainment',
  components: {
    Article: () => import('../../components/Article')
  },
  async asyncData ({ $axios, params, error }) {
    const path = `${params.section}/${params.article}`
    const requestOptions = {
      transformResponse: [
        (data) => {
          const transformedData = humps.camelizeKeys(JSON.parse(data))
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
      ]
    }

    const page = await $axios.get(`/pages/find/?html_path=${path}`, requestOptions)
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    if (page.data.leadAsset[0].type === 'lead_gallery') {
      const gallery = await $axios.get(`/pages/${page.data.leadAsset[0].value.gallery}`, {
        transformResponse: data => humps.camelizeKeys(JSON.parse(data))
      })
      page.data.gallery = gallery.data
    }

    return { page: page?.data }
  }
}
</script>

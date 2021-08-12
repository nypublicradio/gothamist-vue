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
import { setTargeting, clearTargeting } from '~/mixins/htl'
import gtm from '~/mixins/gtm'

export default {
  name: 'Article',
  components: {
    Article: () => import('../../components/Article')
  },
  mixins: [gtm],
  async asyncData ({
    $axios,
    $cookies,
    params,
    error
  }) {
    const donateBannerDismissed = $cookies.get('donateBannerDismissed') || false
    const oneMonth = 60 * 60 * 24 * 31
    let articleViews = Number($cookies.get('articleViews')) || 0
    articleViews += 1
    $cookies.set('articleViews', articleViews, { path: '/', maxAge: oneMonth })
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
            url: author.slug && `/staff/${author.slug}`,
            organization: author.contributingOrganization?.name,
            organizationUrl: author.contributingOrganization?.url
          }))
          transformedData.formattedPublishDate = fuzzyDateTime(data.publicationDate)
          if (data.updatedDate) {
            transformedData.formattedUpdatedDate = fuzzyDateTime(data.updatedDate)
          }
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
    if (page?.data.leadAsset.length > 0 && page?.data.leadAsset[0].type === 'lead_gallery') {
      const gallery = await $axios.get(`/pages/${page.data.leadAsset[0].value.gallery}`)
      page.data.gallery = gallery.data
    }

    return {
      page: page?.data,
      cookies
    }
  },
  beforeMount () {
    if (this.page?.sensitiveContent) {
      this.$store.commit('global/setSensitiveContent', true)
    } else {
      this.$store.commit('global/setSensitiveContent', false)
    }
  },
  mounted () {
    setTargeting({
      Template: 'Article',
      tags: this.page?.tags?.map(tag => tag.name),
      racy: this.page?.provocativeContent ? 'true' : '',
      Sponsor: this.page?.relatedSponsors?.map(tag => tag.name),
      Category: this.page?.ancestry[0].slug
    })
  },
  beforeDestroy () {
    clearTargeting(['Template', 'tags', 'racy', 'Sponsor', 'Category'])
    this.$store.commit('global/setSensitiveContent', false)
  }
}
</script>

<template>
  <div>
    <GothamistArticle
      :article="page"
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
    GothamistArticle: () => import('../../components/GothamistArticle')
  },
  mixins: [gtm],
  async asyncData ({
    $axios,
    params,
    error
  }) {
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
      page: page?.data
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
  },
  head () {
    return {
      link: [
        {
          hid: 'canonical_url',
          href: this.page?.canonicalUrl || 'https://gothamist.com' + this.$route.path,
          rel: 'canonical'
        }
      ]
    }
  }
}
</script>

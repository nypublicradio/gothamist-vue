import { getImagePath } from '~/mixins/image'

const getStructuredData = function ({ article, imageBase }) {
  const publisher = {
    '@type': 'NewsMediaOrganization',
    name: 'Gothamist',
    logo: {
      '@type': 'ImageObject',
      url: 'http://gothamist.com/static-images/home_og_1200x600.png',
      width: '1200',
      height: '600'
    },
    sameAs: 'https://www.facebook.com/gothamist,https://twitter.com/gothamist,https://www.instagram.com/gothamist,https://www.youtube.com/channel/UCY_2VeS5Q9_sMZRhtvF0c5Q,https://en.wikipedia.org/wiki/Gothamist',
    url: 'https://gothamist.com',
    diversityPolicy: 'https://www.nypublicradio.org/diversity-dei-overview/'
  }

  const author = article.relatedAuthors.map((author) => {
    return {
      '@type': 'Person',
      name: `${author.firstName} ${author.lastName}`,
      email: author.email,
      jobTitle: author.jobTitle,
      image: author.photo && {
        '@type': 'ImageObject',
        url: getImageUrl(imageBase, { id: author.photo }, 600, 600),
        height: 600,
        width: 600,
        caption: `${author.firstName} ${author.lastName}`
      },
      url: `https://gothamist.com/staff/${author.slug}`,
      sameAs: ''
    }
  })

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        mainEntityOfPage: article.url,
        image: getOgImage(article) && {
          '@type': 'ImageObject',
          url: getImageUrl(imageBase, getOgImage(article), 1400, 800),
          width: 1400,
          height: 800,
          caption: getOgImage(article)?.caption
        },
        headline: article.title,
        alternativeHeadline: article.meta.seoTitle,
        description: article.meta.searchDescription || article.description,
        datePublished: article.meta.firstPublishedAt,
        dateModified: article.updatedDate,
        author,
        publisher,
        isAccessibleForFree: true
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: getBreadcrumbs(article).map((crumb, index) => {
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@id': 'https://gothamist.com' + crumb.slug,
              name: crumb.name
            }
          }
        })
      }
    ]
  }
}

const getImageUrl = function (baseUrl, image, width, height) {
  if (image) {
    return `${baseUrl}` + getImagePath(image, width, height)
  }
}

const getSection = function (article) {
  return article.meta.parent.title
}

const getBreadcrumbs = function (article) {
  const breadcrumbs = [
    {
      name: getSection(article),
      slug: '/' + article.ancestry[0].slug
    }
  ]
  if (article.sponsoredContent) {
    breadcrumbs.push({ name: 'Sponsored' })
  }
  if (
    article.tags.find(
      tag => tag.name === 'opinion' || tag.name === '@opinion'
    )
  ) {
    breadcrumbs.push({
      name: 'Opinion',
      slug: '/tags/opinion'
    })
  }
  if (
    article.tags.find(
      tag => tag.name === 'analysis' || tag.name === '@analysis'
    )
  ) {
    breadcrumbs.push({
      name: 'Analysis',
      slug: '/tags/analysis'
    })
  }
  if (article.tags.find(tag => tag.name === 'we the commuters')) {
    breadcrumbs.push({
      name: 'We The Commuters',
      slug: '/tags/we-the-commuters'
    })
  }
  return breadcrumbs
}

const getOgImage = function (article) {
  return article.socialImage ??
  article.leadAsset[0]?.value.image ??
  article.leadAsset[0]?.value.defaultImage
}
export {
  getStructuredData,
  getImageUrl,
  getOgImage,
  getSection,
  getBreadcrumbs
}

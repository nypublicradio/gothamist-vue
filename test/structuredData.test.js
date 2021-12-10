import { getStructuredData } from '../utils/metadata'
import { coronavirusStatistics } from './story-data'

describe('getStructuredData', () => {
  it('should generate a structured json object', () => {
    const testArticle = coronavirusStatistics
    expect(getStructuredData({ article: testArticle })['@context']).toEqual('https://schema.org')
  })

  it('should generate the correct breadcrumb list', () => {
    const testArticle = coronavirusStatistics
    const expectedBreadcrumbs = {
      '@type': 'BreadcrumbList',
      itemListElement: [{
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': 'https://gothamist.com/news',
          name: 'News'
        }
      }
      ]
    }

    const breadCrumbMetadata = getStructuredData({ article: testArticle })['@graph'][1]
    expect(breadCrumbMetadata).toMatchObject(expectedBreadcrumbs)
  })

  it('should generate the correct article data', () => {
    const testArticle = coronavirusStatistics
    const expectedUrl = 'https://gothamist.com/news/coronavirus-statistics-tracking-epidemic-new-york'
    const expectedTitle = 'Coronavirus Statistics: Tracking The Epidemic In NYC'
    const expectedDescription = 'Graphs charting the coronavirus in New York State and New York City.'
    const expectedAlternativeHeadline = 'Coronavirus Statistics: Tracking The Epidemic In New York'
    const expectedPublishDate = '2021-12-03T20:30:00Z'
    const expectedModifiedDate = '2021-12-03T20:30:00Z'
    const expectedImage = {
      '@type': 'ImageObject',
      url: 'https://cms.prod.nypr.digital/images/327482/fill-1200x800/',
      width: 1200,
      height: 800,
      caption: 'A chart showing COVID-19 case rate among vaccinated and unvaccinated New Yorkers.'
    }
    const expectedAuthor = [{
      '@type': 'Person',
      name: 'Jaclyn Jeffrey-Wilensky',
      email: '',
      jobTitle: 'Data Reporter',
      image: {
        '@type': 'ImageObject',
        url: 'https://cms.prod.nypr.digital/images/327474/fill-600x600/',
        width: 600,
        height: 600,
        caption: 'Jaclyn Jeffrey-Wilensky'
      },
      url: 'https://gothamist.com/staff/jaclyn-jeffrey-wilensky',
      sameAs: ''
    }, {
      '@type': 'Person',
      name: 'Nsikan Akpan',
      email: '',
      jobTitle: 'Editor',
      url: 'https://gothamist.com/staff/nsikan-akpan',
      sameAs: ''
    }]
    const expectedPublisher = {
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

    const articleMetadata = getStructuredData({
      article: testArticle,
      imageBase: 'https://cms.prod.nypr.digital/images/'
    })['@graph'][0]

    expect(articleMetadata['@type']).toEqual('NewsArticle')
    expect(articleMetadata.isAccessibleForFree).toEqual(true)
    expect(articleMetadata.mainEntityOfPage).toEqual(expectedUrl)
    expect(articleMetadata.headline).toEqual(expectedTitle)
    expect(articleMetadata.description).toEqual(expectedDescription)
    expect(articleMetadata.alternativeHeadline).toEqual(expectedAlternativeHeadline)
    expect(articleMetadata.datePublished).toEqual(expectedPublishDate)
    expect(articleMetadata.dateModified).toEqual(expectedModifiedDate)
    expect(articleMetadata.image).toMatchObject(expectedImage)
    expect(articleMetadata.author).toMatchObject(expectedAuthor)
    expect(articleMetadata.publisher).toMatchObject(expectedPublisher)
  })

  it('should generate the correct description data', () => {
    const testArticle1 = {
      meta: {
        searchDescription: ''
      },
      description: 'Default Description'
    }
    const testArticle2 = {
      meta: {
        searchDescription: 'Override Description'
      },
      description: 'Default Description'
    }

    expect(getStructuredData({ article: testArticle1 })['@graph'][0].description).toEqual('Default Description')
    expect(getStructuredData({ article: testArticle2 })['@graph'][0].description).toEqual('Override Description')
  })

  it('should use the seo title for headline the main title as the alternative headline', () => {
    const testArticle = {
      meta: {
        seoTitle: 'SEO Title'
      },
      title: 'H1 Title'
    }

    expect(getStructuredData({ article: testArticle })['@graph'][0].headline).toEqual('SEO Title')
    expect(getStructuredData({ article: testArticle })['@graph'][0].alternativeHeadline).toEqual('H1 Title')
  })

  it('should use the main title for headline when no seo override exists', () => {
    const testArticle = {
      meta: {
        seoTitle: ''
      },
      title: 'H1 Title'
    }

    expect(getStructuredData({ article: testArticle })['@graph'][0].headline).toEqual('H1 Title')
    expect(getStructuredData({ article: testArticle })['@graph'][0].alternativeHeadline).toEqual('')
  })

  it('should use the seo description when it exists', () => {
    const testArticle = {
      meta: {
        searchDescription: 'SEO Description'
      },
      description: 'Default Description'
    }

    expect(getStructuredData({ article: testArticle })['@graph'][0].description).toEqual('SEO Description')
  })

  it('should use the main description when no seo override exists', () => {
    const testArticle = {
      meta: {
        searchDescription: ''
      },
      description: 'Default Description'
    }

    expect(getStructuredData({ article: testArticle })['@graph'][0].description).toEqual('Default Description')
  })

  it('should use the social image when available', () => {
    const testArticle = {
      socialImage: {
        id: 123,
        caption: 'caption'
      },
      leadAsset: [{
        type: 'leadImage',
        value: {
          image: {
            id: 987,
            caption: 'wrong'
          }
        }
      }]
    }

    expect(getStructuredData({
      article: testArticle,
      imageBase: 'https://example.com/'
    })['@graph'][0].image.url).toContain('/123/')
    expect(getStructuredData({
      article: testArticle,
      imageBase: 'https://example.com/'
    })['@graph'][0].image.caption).toContain('caption')
  })

  it('should use the lead image', () => {
    const testArticle = {
      socialImage: undefined,
      leadAsset: [{
        type: 'leadImage',
        caption: '',
        value: {
          image: {
            id: 123,
            caption: 'caption'
          }
        }
      }]
    }

    expect(getStructuredData({
      article: testArticle,
      imageBase: 'https://example.com/'
    })['@graph'][0].image.url).toContain('/123/')
    expect(getStructuredData({
      article: testArticle,
      imageBase: 'https://example.com/'
    })['@graph'][0].image.caption).toContain('caption')
  })

  it('should use the lead image caption override', () => {
    const testArticle = {
      socialImage: undefined,
      leadAsset: [{
        type: 'leadImage',
        caption: 'caption',
        value: {
          image: {
            id: 123,
            caption: 'wrong'
          }
        }
      }]
    }

    expect(getStructuredData({
      article: testArticle,
      imageBase: 'https://example.com/'
    })['@graph'][0].image.url).toContain('/123/')
    expect(getStructuredData({
      article: testArticle,
      imageBase: 'https://example.com/'
    })['@graph'][0].image.caption).toContain('caption')
  })

  it('should use the default gallery image', () => {
    const testArticle = {
      socialImage: undefined,
      leadAsset: [{
        type: 'Gallery',
        value: {
          defaultImage: {
            id: 123,
            caption: 'caption'
          },
          slides: []
        }
      }]
    }

    expect(getStructuredData({
      article: testArticle,
      imageBase: 'https://example.com/'
    })['@graph'][0].image.url).toContain('/123/')
    expect(getStructuredData({
      article: testArticle,
      imageBase: 'https://example.com/'
    })['@graph'][0].image.caption).toContain('caption')
  })

  it('should use the manual publish date', () => {
    const testArticle = {
      meta: {
        firstPublishedAt: 'automatic publish date'
      },
      publicationDate: 'manual publish date',
      updatedDate: 'updated date'
    }

    expect(getStructuredData({ article: testArticle })['@graph'][0].datePublished).toEqual('manual publish date')
    expect(getStructuredData({ article: testArticle })['@graph'][0].dateModified).toEqual('updated date')
  })

  it('should use the auto publish date when no manual publish date is set', () => {
    const testArticle = {
      meta: {
        firstPublishedAt: 'automatic publish date'
      },
      publicationDate: undefined,
      updatedDate: 'updated date'
    }

    expect(getStructuredData({ article: testArticle })['@graph'][0].datePublished).toEqual('automatic publish date')
    expect(getStructuredData({ article: testArticle })['@graph'][0].dateModified).toEqual('updated date')
  })
})

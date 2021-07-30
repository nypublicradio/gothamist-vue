// vuex store fake data

export const state = () => ({
  dailyNewsletter: '65dbec786b',
  defaultImage: '/images/defaults/no-category/no-category-tile.png',
  defaultImageArts: '/images/defaults/arts/arts-tile.png',
  defaultImageFood: '/images/defaults/food/food-tile.png',
  defaultImageNews: '/images/defaults/news/news-tile.png',
  disqusAPI: process.env.DISQUS_API,
  disqusPublicKey: process.env.DISQUS_PUBLIC_KEY,
  donateUrl: 'https://pledge3.wnyc.org/donate/gothamist/onestep/?utm_medium=partnersite&utm_source=gothamist&utm_campaign=brandheader',
  footerNav: [],
  footerSlogan: '',
  headerNav: [],
  imagePath: process.env.IMAGE_PATH,
  legalNav: [],
  mailchimpAPI: process.env.MAILCHIMP_API,
  navigationAPI: 'navigation/1/',
  newsletterAPI: process.env.NEWSLETTER_API,
  previousPath: 'none',
  readMoreNav: [
    {
      text: 'News',
      url: '/news'
    },
    {
      text: 'Arts & Entertainment',
      url: '/arts-entertainment'
    },
    {
      text: 'Food',
      url: '/food'
    },
    {
      text: 'Election 2021',
      url: '/election-2021'
    }
  ],
  isSensitiveContent: false,
  tipsEmail: 'tips@gothamist.com',
  wtcNewsletter: '8c376c6dff'
})

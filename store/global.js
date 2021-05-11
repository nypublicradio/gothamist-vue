import navigation from '~/mixins/navigation'

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
  legalNav: [],
  mailchimpAPI: process.env.MAILCHIMP_API,
  navigationAPI: 'navigation/1/',
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
  tipsEmail: 'tips@gothamist.com',
  wtcNewsletter: '8c376c6dff'
})

// Getters read the current state of the store module and return something

export const getters = {
  dailyNewsletter (state) {
    return state.dailyNewsletter
  },
  defaultImage (state) {
    return state.defaultImage
  },
  defaultImageArts (state) {
    return state.defaultImageArts
  },
  defaultImageFood (state) {
    return state.defaultImageFood
  },
  defaultImageNews (state) {
    return state.defaultImageNews
  },
  disqusAPI (state) {
    return state.disqusAPI
  },
  disqusPublicKey (state) {
    return state.disqusPublicKey
  },
  donateUrl (state) {
    return state.donateUrl
  },
  headerNav (state) {
    return state.headerNav
  },
  footerNav (state) {
    return state.footerNav
  },
  footerSlogan (state) {
    return state.footerSlogan
  },
  legalNav (state) {
    return state.legalNav
  },
  mailchimpAPI (state) {
    return state.mailchimpAPI
  },
  navigationAPI (state) {
    return state.navigationAPI
  },
  previousPath (state) {
    return state.previousPath
  },
  tipsEmail (state) {
    return state.tipsEmail
  },
  wtcNewsletter (state) {
    return state.wtcNewsletter
  }
}

// Actions commit mutations and can contain arbitrary asynchronous operations

export const actions = {
  setNavigation ({
    commit,
    state
  }) {
    this.$axios
      .get(state.navigationAPI)
      .then((response) => {
        commit('setHeaderNav', response.data.primary_navigation)
        commit('setFooterNav', response.data.secondary_navigation)
        commit('setFooterSlogan', response.data.property_description)
        commit('setLegalNav', response.data.legal_links)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }
}

// Mutations change the state of the store

export const mutations = {
  setHeaderNav (state, data) {
    state.headerNav = navigation.methods.formatNavigationArray(data)
  },
  setFooterNav (state, data) {
    state.footerNav = navigation.methods.formatNavigationArray(data)
  },
  setFooterSlogan (state, data) {
    state.footerSlogan = data
  },
  setLegalNav (state, data) {
    state.legalNav = navigation.methods.formatNavigationArray(data)
  },
  setPreviousPath (state, path) {
    state.previousPath = path
  }
}

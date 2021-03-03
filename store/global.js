// import pages from '~/mixins/pages'

export const state = () => ({
  donateUrl: 'https://pledge3.wnyc.org/donate/gothamist/onestep/?utm_medium=partnersite&utm_source=gothamist&utm_campaign=brandheader',
  tipsEmail: 'tips@gothamist.com',
  headerNav: [],
  footerNav: [
    {
      url: 'https://www.gothamistllc.com',
      text: 'Advertising',
      newWindow: true
    },
    {
      url: '/contact',
      text: 'Contact Us'
    },
    {
      url: 'https://gothamist.com/feed/',
      text: 'RSS Feed',
      newWindow: true
    },
    {
      url: '/staff',
      text: 'Staff'
    }
  ]
})

// Getters read the current state of the store module and return something

export const getters = {
  donateUrl (state) {
    return state.donateUrl
  },
  tipsEmail (state) {
    return state.tipsEmail
  },
  headerNav (state) {
    return state.headerNav
  },
  footerNav (state) {
    return state.footerNav
  }
}

// Actions commit mutations and can contain arbitrary asynchronous operations

export const actions = {
  setNavigation ({ commit }) {
    this.$axios
      .get('navigation/1/')
      .then(response => (
        commit('setHeaderNav', response.data)
      ))
      .catch((error) => {
        console.log(error)
      })
  }
}

// Mutations change the state of the store

export const mutations = {
  setHeaderNav (state, data) {
    const headerNav = []
    data.primary_navigation.forEach(function (item) {
      headerNav.push(
        {
          text: item.value.title,
          url: item.value.url,
          newWindow: false
        }
      )
    })
    console.log(headerNav)
    state.headerNav = headerNav
  }
}

import navigation from '~/mixins/navigation'

export const state = () => ({
  donateUrl: 'https://pledge3.wnyc.org/donate/gothamist/onestep/?utm_medium=partnersite&utm_source=gothamist&utm_campaign=brandheader',
  headerNav: [],
  footerNav: [],
  footerSlogan: '',
  legalNav: [],
  tipsEmail: 'tips@gothamist.com'
})

// Getters read the current state of the store module and return something

export const getters = {
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
  tipsEmail (state) {
    return state.tipsEmail
  }
}

// Actions commit mutations and can contain arbitrary asynchronous operations

export const actions = {
  setNavigation ({ commit }) {
    this.$axios
      .get('navigation/1/')
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
  }
}

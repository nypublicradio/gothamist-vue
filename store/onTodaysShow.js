export const state = () => ({
  dataLoaded: false,
  headline: 'test headline',
  headlineLink: null,
  social: [],
  hosts: []
})

// Getters read the current state of the store module and return something

export const getters = {
  dataLoaded (state) {
    return state.dataLoaded
  },
  headline (state) {
    return state.headline
  },
  headlineLink (state) {
    return state.headlineLink
  },
  social (state) {
    return state.social
  },
  hosts (state) {
    return state.hosts
  }
}

// Mutations commit values in the state
// A mutation is a reactive event - our app will know when something changes!

export const mutations = {
  dataLoaded (state) {
    state.dataLoaded = true
  },
  headline (state, headline) {
    state.headline = headline
  },
  headlineLink (state, headlineLink) {
    state.headline = headlineLink
  },
  social (state, social) {
    state.social = social
  },
  hosts (state, hosts) {
    state.hosts = hosts
  }
}

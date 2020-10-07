export const state = () => ({
  // need to get these values from the API on load
  whatsOnNow: {
    image: 'https://media.wnyc.org/i/258/258/l/85/2020/06/AllOfIt.png',
    title: 'All Of It',
    titleLink: 'http://www.google.com',
    details: 'This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.',
    detailsLink: 'http://www.bing.com',
    time: '3:00 PM - 4:00 PM',
    station: 'WNYC 93.9 FM',
    file: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3'
  }
})

// Getters read the current state of the store module and return something

export const getters = {
  image (state) {
    return state.whatsOnNow.image
  },
  title (state) {
    return state.whatsOnNow.title
  },
  titleLink (state) {
    return state.whatsOnNow.titleLink
  },
  details (state) {
    return state.whatsOnNow.details
  },
  detailsLink (state) {
    return state.whatsOnNow.detailsLink
  },
  time (state) {
    return state.whatsOnNow.time
  },
  station (state) {
    return state.whatsOnNow.station
  },
  file (state) {
    return state.whatsOnNow.file
  }
}

// Mutations commit values in the state
// A mutation is a reactive event - our app will know when something changes!

export const mutations = {
  set (state, whatsOnNow) {
    state.whatsOnNow = whatsOnNow
  }
}

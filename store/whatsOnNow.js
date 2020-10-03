export const state = () => ({
  whatsOnNow: {
    image: 'https://placehold.it/175x175',
    title: 'The Takeaway',
    titleLink: 'http://www.google.com',
    details: 'This week, people in Tulsa filed a lawsuit demanding reparations for victims and descendants of the Tulsa Race Massacre.',
    detailsLink: 'http://www.bing.com',
    time: '3:00 PM - 4:00 PM',
    station: 'WNYC 93.9 FM',
    file: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3'
  }
})

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

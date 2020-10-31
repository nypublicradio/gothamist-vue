export const state = () => ({
  whatsOnNow: {
    details: 'This is the description for All Of It on WNYC 93.9 FM!',
    detailsLink: 'http://www.google.com',
    file: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3',
    image: 'https://media.wnyc.org/i/258/258/l/85/2020/06/AllOfIt.png',
    playing: false,
    station: 'WNYC 93.9 FM',
    time: '3:00 PM - 4:00 PM',
    title: 'All Of It',
    titleLink: 'http://www.google.com'
  },
  selectedStream: {
    details: 'This is the description for All Of It on WNYC 93.9 FM!',
    detailsLink: 'http://www.google.com',
    file: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3',
    image: 'https://media.wnyc.org/i/258/258/l/85/2020/06/AllOfIt.png',
    playing: false,
    station: 'WNYC 93.9 FM',
    time: '3:00 PM - 4:00 PM',
    title: 'All Of It',
    titleLink: 'http://www.google.com'
  },
  streams: [
    {
      active: true,
      details: 'This is the description for All Of It on WNYC 93.9 FM!',
      detailsLink: 'http://www.google.com',
      file: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3',
      image: 'https://media.wnyc.org/i/258/258/l/85/2020/06/AllOfIt.png',
      playing: false,
      station: 'WNYC 93.9 FM',
      time: '3:00 PM - 4:00 PM',
      title: 'All Of It',
      titleLink: 'http://www.google.com'
    },
    {
      active: false,
      details: 'This is the description for The Brian Lehrer Show on WNYC AM 820!',
      detailsLink: 'http://www.bing.com',
      file: 'https://www.liberliber.it/mediateca/musica/g/gershwin/rhapsody_in_blue/mp3/gershwin_rhapsody_in_blue_bl_01.mp3',
      image: 'https://media.demo.nypr.digital/i/800/800/c/80/1/BL.png',
      playing: false,
      station: 'WNYC AM 820',
      time: '4:30 PM - 5:30 PM',
      title: 'The Brian Lehrer Show',
      titleLink: 'http://www.bing.com'
    }
  ]
})

// Getters read the current state of the store module and return something

export const getters = {
  selectedStreamImage (state) {
    return state.selectedStream.image
  },
  selectedStreamTitle (state) {
    return state.selectedStream.title
  },
  selectedStreamTitleLink (state) {
    return state.selectedStream.titleLink
  },
  selectedStreamDetails (state) {
    return state.selectedStream.details
  },
  selectedStreamDetailsLink (state) {
    return state.selectedStream.detailsLink
  },
  selectedStreamPlaying (state) {
    return state.selectedStream.playing
  },
  selectedStreamTime (state) {
    return state.selectedStream.time
  },
  selectedStreamStation (state) {
    return state.selectedStream.station
  },
  selectedStreamFile (state) {
    return state.selectedStream.file
  },
  whatsOnNowImage (state) {
    return state.whatsOnNow.image
  },
  whatsOnNowTitle (state) {
    return state.whatsOnNow.title
  },
  whatsOnNowTitleLink (state) {
    return state.whatsOnNow.titleLink
  },
  whatsOnNowDetails (state) {
    return state.whatsOnNow.details
  },
  whatsOnNowDetailsLink (state) {
    return state.whatsOnNow.detailsLink
  },
  whatsOnNowPlaying (state) {
    return state.whatsOnNow.playing
  },
  whatsOnNowTime (state) {
    return state.whatsOnNow.time
  },
  whatsOnNowStation (state) {
    return state.whatsOnNow.station
  },
  whatsOnNowFile (state) {
    return state.whatsOnNow.file
  },
  streams (state) {
    return state.streams
  }
}

// Mutations commit values in the state
// A mutation is a reactive event - our app will know when something changes!

export const mutations = {
  // update what's on now
  setWhatsOnNow (state, whatsOnNow) {
    state.whatsOnNow = whatsOnNow
  },
  // update the selected stream
  setSelectedStream (state, selectedStream) {
    state.selectedStream = selectedStream
  },
  // update the streams
  setStreams (state, index) {
    // set all streams' active property to false
    for (const i in state.streams) {
      state.streams[i].active = false
    }
    // set the selected stream's active property to true
    state.streams[index].active = true
  }
}

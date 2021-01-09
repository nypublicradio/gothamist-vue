export const state = () => ({
  dataLoaded: false,
  hasSomethingBeenPlayedYet: false,
  whatsOnNow: {
    index: 0,
    active: true,
    details: '',
    detailsLink: null,
    episodeTitle: '',
    episodeLink: null,
    file: null,
    image: 'https://media.demo.nypr.digital/i/240/240/c/80/1/wnyc_2_1.png',
    playing: false,
    slug: 'wnyc-fm939',
    station: 'WNYC 93.9 FM',
    timeStart: null,
    timeEnd: null,
    title: '',
    titleLink: null,
    upNextTitle: null,
    onTodaysShowHeadline: null,
    onTodaysShowHeadlineLink: null,
    onTodaysShowHosts: null,
    onTodaysShowImage: null,
    onTodaysShowImageAltText: null,
    onTodaysShowImageCaption: null,
    onTodaysShowImageCredits: null,
    onTodaysShowImageCreditsUrl: null,
    onTodaysShowSegments: null,
    onTodaysShowSocial: null
  },
  selectedStream: {
    index: 0,
    active: true,
    details: '',
    detailsLink: null,
    episodeTitle: '',
    episodeLink: null,
    file: null,
    image: 'https://media.demo.nypr.digital/i/240/240/c/80/1/wnyc_2_1.png',
    playing: false,
    slug: 'wnyc-fm939',
    station: 'WNYC 93.9 FM',
    timeStart: null,
    timeEnd: null,
    title: '',
    titleLink: null,
    upNextTitle: null,
    onTodaysShowHeadline: null,
    onTodaysShowHeadlineLink: null,
    onTodaysShowHosts: null,
    onTodaysShowImage: null,
    onTodaysShowImageAltText: null,
    onTodaysShowImageCaption: null,
    onTodaysShowImageCredits: null,
    onTodaysShowImageCreditsUrl: null,
    onTodaysShowSegments: null,
    onTodaysShowSocial: null
  },
  streams: [
    {
      index: 0,
      active: true,
      details: '',
      detailsLink: null,
      episodeTitle: '',
      episodeLink: null,
      file: null,
      image: 'https://media.demo.nypr.digital/i/240/240/c/80/1/wnyc_2_1.png',
      playing: false,
      slug: 'wnyc-fm939',
      station: 'WNYC 93.9 FM',
      timeStart: null,
      timeEnd: null,
      title: '',
      titleLink: null,
      upNextTitle: null,
      onTodaysShowHeadline: null,
      onTodaysShowHeadlineLink: null,
      onTodaysShowHosts: null,
      onTodaysShowImage: null,
      onTodaysShowImageAltText: null,
      onTodaysShowImageCaption: null,
      onTodaysShowImageCredits: null,
      onTodaysShowImageCreditsUrl: null,
      onTodaysShowSegments: null,
      onTodaysShowSocial: null
    },
    {
      index: 1,
      active: false,
      details: '',
      detailsLink: null,
      episodeTitle: '',
      episodeLink: null,
      file: null,
      image: 'https://media.demo.nypr.digital/i/240/240/c/10/1/wnyc_2_1.png',
      playing: false,
      slug: 'wnyc-am820',
      station: 'WNYC AM 820',
      timeStart: null,
      timeEnd: null,
      title: '',
      titleLink: null,
      upNextTitle: null,
      onTodaysShowHeadline: null,
      onTodaysShowHeadlineLink: null,
      onTodaysShowHosts: null,
      onTodaysShowImage: null,
      onTodaysShowImageAltText: null,
      onTodaysShowImageCaption: null,
      onTodaysShowImageCredits: null,
      onTodaysShowImageCreditsUrl: null,
      onTodaysShowSegments: null,
      onTodaysShowSocial: null
    }
  ]
})

// Getters read the current state of the store module and return something

export const getters = {
  dataLoaded (state) {
    return state.dataLoaded
  },
  hasSomethingBeenPlayedYet (state) {
    return state.hasSomethingBeenPlayedYet
  },
  fmStream (state) {
    return state.streams[0]
  },
  amStream (state) {
    return state.streams[1]
  },
  streams (state) {
    return state.streams
  },
  selectedStream (state) {
    return state.selectedStream
  },
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
  selectedStreamTimeStart (state) {
    return state.selectedStream.timeStart
  },
  selectedStreamTimeEnd (state) {
    return state.selectedStream.timeEnd
  },
  selectedStreamStation (state) {
    return state.selectedStream.station
  },
  selectedStreamFile (state) {
    return state.selectedStream.file
  },
  whatsOnNow (state) {
    return state.whatsOnNow
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
  whatsOnNowEpisodeTitle (state) {
    return state.whatsOnNow.episodeTitle
  },
  whatsOnNowEpisodeLink (state) {
    return state.whatsOnNow.episodeLink
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
  onTodaysShowHeadline (state) {
    return state.whatsOnNow.onTodaysShowHeadline
  },
  onTodaysShowHeadlineLink (state) {
    return state.whatsOnNow.onTodaysShowHeadlineLink
  },
  onTodaysShowHosts (state) {
    return state.whatsOnNow.onTodaysShowHosts
  },
  onTodaysShowImage (state) {
    return state.whatsOnNow.onTodaysShowImage
  },
  onTodaysShowImageAltText (state) {
    return state.whatsOnNow.onTodaysShowImageAltText
  },
  onTodaysShowImageCaption (state) {
    return state.whatsOnNow.onTodaysShowImageCaption
  },
  onTodaysShowImageCredits (state) {
    return state.whatsOnNow.onTodaysShowImageCredits
  },
  onTodaysShowImageCreditsUrl (state) {
    return state.whatsOnNow.onTodaysShowImageCreditsUrl
  },
  onTodaysShowSegments (state) {
    return state.whatsOnNow.onTodaysShowSegments
  },
  onTodaysShowSocial (state) {
    return state.whatsOnNow.onTodaysShowSocial
  }
}

// Mutations commit values in the state
// A mutation is a reactive event - our app will know when something changes!

export const mutations = {
  dataLoaded (state) {
    state.dataLoaded = true
  },
  somethingHasBeenPlayed (state) {
    state.hasSomethingBeenPlayedYet = true
  },
  // update what's on now
  setWhatsOnNow (state, whatsOnNow) {
    state.whatsOnNow = whatsOnNow
  },
  // update what's on now to playing
  setWhatsOnNowToPlaying (state) {
    state.whatsOnNow.playing = true
  },
  // update what's on now to not playing
  setWhatsOnNowToNotPlaying (state) {
    state.whatsOnNow.playing = false
  },
  // update a stream
  setStream (state, stream) {
    state.streams[stream.index] = stream
  },
  // update the streams
  setStreams (state, streams) {
    state.streams = streams
  },
  // update the selected stream
  setSelectedStream (state, selectedStream) {
    state.selectedStream = selectedStream
  },
  // set a stream to active
  setStreamToActive (state, index) {
    // set all streams' active property to false
    for (const i in state.streams) {
      state.streams[i].active = false
    }
    // set the selected stream's active property to true
    state.streams[index].active = true
  },
  // set all the streams' playing to false
  setStreamsToNotPlaying (state) {
    for (const i in state.streams) {
      state.streams[i].playing = false
    }
    state.whatsOnNow.playing = false
  },
  // set the selected stream's playing to true
  // set all the other streams' playing to false
  setStreamToPlaying (state, index) {
    for (const i in state.streams) {
      state.streams[i].playing = false
    }
    state.streams[index].playing = true
    state.whatsOnNow.playing = true
  },
  // set the initial state of everything
  setTheState (state, stream) {
    state.streams[stream.index] = stream
    if (!state.dataLoaded) {
      // if this is first load, update what's on now
      state.whatsOnNow = stream
    }
    if (stream.index === state.whatsOnNow.index) {
      // if the stream matches what's on now, update what's on now
      state.whatsOnNow = stream
    }
    if (stream.active) {
      // update selected stream
      state.selectedStream = stream
    }
    // tell the store the data has been loaded
    state.dataLoaded = true
  },
  // update the On Today's Show section of a stream
  updateOnTodaysShow (state, data) {
    state.streams[data.index].onTodaysShowHeadline = data.onTodaysShowHeadline
    state.streams[data.index].onTodaysShowHeadlineLink = data.onTodaysShowHeadlineLink
    state.streams[data.index].onTodaysShowImage = data.onTodaysShowImage
    state.streams[data.index].onTodaysShowImageAltText = data.onTodaysShowImageAltText
    state.streams[data.index].onTodaysShowImageCaption = data.onTodaysShowImageCaption
    state.streams[data.index].onTodaysShowImageCredits = data.onTodaysShowImageCredits
    state.streams[data.index].onTodaysShowImageCreditsUrl = data.onTodaysShowImageCreditsUrl
  },
  // update the On Today's Show segments
  updateOnTodaysShowSegmentsFm (state, data) {
    if (data !== null) {
      const formattedSegments = []
      // need to get rid of first item in array
      const slicedData = data.slice(1)
      slicedData.forEach(function (value) {
        formattedSegments.push(
          {
            title: value.attributes.title,
            url: 'https://www.wnyc.org/story/' + value.attributes.slug,
            newWindow: true
          }
        )
        state.streams[0].onTodaysShowSegments = formattedSegments
      })
    }
  },
  // update the On Today's Show segments
  updateOnTodaysShowSegmentsAm (state, data) {
    if (data !== null) {
      const formattedSegments = []
      const slicedData = data.slice(1)
      slicedData.forEach(function (value) {
        formattedSegments.push(
          {
            title: value.attributes.title,
            url: 'https://www.wnyc.org/story/' + value.attributes.slug,
            newWindow: true
          }
        )
        state.streams[1].onTodaysShowSegments = formattedSegments
      })
    }
  }
}

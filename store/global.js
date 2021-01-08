export const state = () => ({
  donateUrl: 'https://pledge3.wnyc.org/donate/main/onestep/?utm_medium=partnersite&utm_source=w3k&utm_campaign=brandheader',
  headerNav: [
    {
      url: 'https://www.wnyc.org/schedule/',
      text: 'Schedule',
      newWindow: true
    },
    {
      url: 'https://www.wnyc.org/streams',
      text: 'All Streams',
      newWindow: true
    },
    {
      url: 'https://www.wnyc.org/shows',
      text: 'Shows',
      newWindow: true
    }
  ],
  footerSecondaryNav: [
    {
      url: ['https://www.wnyc.org/resources/912769/fcc_eeo_public_file_report.pdf'],
      text: 'EEO Report',
      newWindow: true
    },
    {
      url: ['https://publicfiles.fcc.gov/fm-profile/wnyc-fm'],
      text: 'WNYC-FM FCC Public File',
      newWindow: true
    },
    {
      url: ['https://publicfiles.fcc.gov/am-profile/wnyc'],
      text: 'WNYC-AM FCC Public File',
      newWindow: true
    },
    {
      url: ['https://www.wnyc.org/support'],
      text: 'Support WNYC',
      newWindow: true
    },
    {
      url: ['https://www.wnyc.org/contact'],
      text: 'Contact Us',
      newWindow: true
    }
  ],
  footerTertiaryNav: [
    {
      url: ['https://www.wnyc.org/corrections/'],
      text: 'Corrections',
      newWindow: true
    },
    {
      url: ['https://www.wnyc.org/articles/wnyc-contest-rules'],
      text: 'Giveaway Rules',
      newWindow: true
    },
    {
      url: ['https://sponsorship.wnyc.org/'],
      text: 'Sponsorship',
      newWindow: true
    }
  ]
})

// Getters read the current state of the store module and return something

export const getters = {
  donateUrl (state) {
    return state.donateUrl
  },
  headerNav (state) {
    return state.headerNav
  },
  footerSecondaryNav (state) {
    return state.footerSecondaryNav
  },
  footerTertiaryNav (state) {
    return state.footerTertiaryNav
  }
}

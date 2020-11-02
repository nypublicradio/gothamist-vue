export const state = () => ({
  donateUrl: 'http://www.google.com',
  headerNav: [
    {
      url: 'https://www.wnyc.org/schedule/',
      text: 'Schedule'
    }
  ],
  footerSecondaryNav: [
    {
      url: ['https://www.wnyc.org/resources/912769/fcc_eeo_public_file_report.pdf'],
      text: 'EEO Report'
    },
    {
      url: ['https://publicfiles.fcc.gov/fm-profile/wnyc-fm'],
      text: 'WNYC-FM FCC Public File'
    },
    {
      url: ['https://publicfiles.fcc.gov/am-profile/wnyc'],
      text: 'WNYC-AM FCC Public File'
    },
    {
      url: ['https://www.wnyc.org/articles/wnyc-contest-rules'],
      text: 'Contact Us'
    }
  ],
  footerTertiaryNav: [
    {
      url: ['https://www.wnyc.org/corrections/'],
      text: 'Corrections'
    },
    {
      url: ['https://www.wnyc.org/articles/wnyc-contest-rules'],
      text: 'Giveaway Rules'
    },
    {
      url: ['https://sponsorship.wnyc.org/'],
      text: 'Sponsorship'
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

export const state = () => ({
  donateUrl: 'https://pledge3.wnyc.org/donate/gothamist/onestep/?utm_medium=partnersite&utm_source=gothamist&utm_campaign=brandheader',
  tipsEmail: 'tips@gothamist.com',
  headerNav: [
    {
      url: '/news',
      text: 'News'
    },
    {
      url: '/arts-entertainment',
      text: 'Arts & Entertainment'
    },
    {
      url: '/food',
      text: 'Food'
    },
    {
      url: '/newsletter',
      text: 'Newsletter',
      icon: 'EmailIcon'
    }
  ],
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

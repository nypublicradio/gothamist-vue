const redirects =
  [
    { from: '/tags/wethecommuters', to: '/tags/we-the-commuters' },
    { from: '/tags/agata%26valentia', to: '/tags/agata-valentia' },
    { from: '/tags/agata&valentia', to: '/tags/agata-valentia' },
    { from: '/tags/Sets%20&%20the%20City%20profile', to: '/tags/sets-and-the-city-profile' }
  ]

// Percent of users sent to beta site
const betaPercent = process.env.BETA_PERCENT || 5

module.exports = function (req, res, next) {
  const betaCookie = req.headers.cookie ? req.headers.cookie.match('betaLot=([^;]+);') : undefined
  let lot = 1000
  if (betaCookie) {
    lot = parseInt(betaCookie[1])
  } else {
    lot = Math.floor(Math.random() * 100)
    res.setHeader('Set-Cookie', [`betaLot=${lot}`])
  }
  let urlParams = null
  if (req.url.includes('?')) {
    urlParams = '?' + req.url.split('?')[1]
  }

  if (lot < betaPercent) {
    res.writeHead(302, {
      Location: `https://beta.gothamist.com${req.url}`
    })
    res.end()
  }

  // const host = req.headers.host
  // const fullUrl = req.url
  const url = req.url.split('?')[0]

  const redirect = redirects.find(r => r.from === url)
  if (redirect) {
    let newLocation
    if (urlParams) {
      newLocation = redirect.to + urlParams
    } else {
      newLocation = redirect.to
    }
    res.writeHead(301, {
      Location: newLocation
    })
    res.end()
  } else {
    next()
  }
}

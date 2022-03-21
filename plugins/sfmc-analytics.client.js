export default ({ $gtm, $cookies }) => {
  const maxAge = 60 * 60 * 24 * 365 * 5 // 5 years, the far future

  // Set the cookie and data layer status for an active member
  const setActiveMember = function () {
    $cookies.set('_gothamistNyprMember', 'True', { path: '/', maxAge })
    $gtm.push({ NYPRMember: 'active-member' })
  }

  // Set the cookie and data layer status for an inactive member
  const setInactiveMember = function () {
    $cookies.set('_gothamistNyprMember', 'False', { path: '/', maxAge })
    $gtm.push({ NYPRMember: 'inactive-member' })
  }

  if (window && window.location) {
    const url = new URL(window.location.href)
    const memberStatus = url.searchParams.get('nypr_member')
    switch (memberStatus) {
      case 'True':
        setActiveMember()
        return // if setting status from url, we don't need to check cookie
      case 'False':
        setInactiveMember()
        return // if setting status from url, we don't need to check cookie
      default:
    }
  }

  switch ($cookies.get('_gothamistNyprMember')) {
    case 'True':
      setActiveMember()
      break
    case 'False':
      setInactiveMember()
      break
    default:
  }
}

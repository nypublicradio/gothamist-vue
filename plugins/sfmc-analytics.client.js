export default ({ $gtm, $cookies }) => {
  const setActiveMember = function () {
    $cookies.set('_gothamistNyprMember', 'True')
    $gtm.push({ NYPRMember: 'active-member' })
  }

  const setInactiveMember = function () {
    $cookies.set('_gothamistNyprMember', 'False')
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
    }
  }

  switch ($cookies.get('_gothamistNyprMember')) {
    case 'True':
      setActiveMember()
      break
    case 'False':
      setInactiveMember()
      break
  }
}

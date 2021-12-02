export default function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }
  // fixes weird scroll position when gallery page url query updates on scroll
  if (from && Object.keys(to.query).length) {
    if (to.fullPath.split('?')[0] === from.fullPath.split('?')[0]) { return }
  }
  return { x: 0, y: 0 }
}

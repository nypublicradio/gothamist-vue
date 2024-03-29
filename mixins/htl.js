/* global htlbid */

export const setTargeting = function (targetingParams) {
  window.htlbid = window.htlbid || {}
  htlbid.cmd = htlbid.cmd || []
  htlbid.cmd.push(() => {
    for (const key in targetingParams) {
      htlbid.setTargeting(key, targetingParams[key])
    }
  })
}

export const clearTargeting = function (targetingKeys) {
  window.htlbid = window.htlbid || {}
  htlbid.cmd = htlbid.cmd || []
  htlbid.cmd.push(() => {
    targetingKeys.forEach((key) => {
      htlbid.clearTargeting(key)
    })
  })
}

export default {
  methods: {
    setTargeting,
    clearTargeting
  }
}

// set experiment id and variant in ga
// https://github.com/nuxt-community/google-optimize-module/issues/50
export default ({ $gtm, $exp: { experimentID, $variantIndexes } }) => {
  if (!experimentID) {
    return
  }
  $gtm.push({
    optimizeExperimentId: experimentID,
    optimizeVariantId: $variantIndexes.join('-')
  })
}

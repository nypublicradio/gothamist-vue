// set experiment id and variant in ga
// https://github.com/nuxt-community/google-optimize-module/issues/50
export default ({ $ga, $exp: { experimentID, $variantIndexes } }) => {
  if (!experimentID) {
    return
  }
  const exp = experimentID + '.' + $variantIndexes.join('-')
  $ga.set('exp', exp)
}

/** See features.md in this same folder for documentation **/

export default function ({ $exp }, inject) {
  // Add your features here
  const features = {
    // Remove tags from the home page cards
    // Part of a Google Optimize a/b test
    // - Matt Walsh
    // Experiment started: March 14 2022
    'experiment-tagless-homepage': $exp && $exp.name === 'tagless-cards-on-homepage' && $exp.$variantIndexes.includes(1)
  }

  const enabled = features || {}
  const disabled = {}
  for (const feature of Object.entries(enabled)) {
    disabled[feature[0]] = !feature[1]
  }
  const classes = Object.entries(enabled)
    .map((entry) => (entry[1] ? `${entry[0]}-enabled` : `${entry[0]}-disabled`))
  inject('features', { enabled, disabled, classes })
}

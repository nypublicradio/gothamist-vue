/** See features.md in this same folder for documentation **/

export default function ({ $exp }, inject) {
  // Add your features here
  const features = {
    // Show the audio player on the home page
    'experiment-audio-player': $exp && $exp.name === 'audio-player' && $exp.$variantIndexes.includes(1)
  }

  const enabled = features || {}
  const disabled = {}
  for (const feature of Object.entries(enabled)) {
    disabled[feature[0]] = !feature[1]
  }
  const classes = Object.entries(enabled)
    .map(entry => (entry[1] ? `${entry[0]}-enabled` : `${entry[0]}-disabled`))
  inject('features', { enabled, disabled, classes })
}

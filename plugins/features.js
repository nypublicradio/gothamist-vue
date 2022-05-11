/** See features.md in this same folder for documentation **/

export default function (_, inject) {
  // Add your features here
  const features = {

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

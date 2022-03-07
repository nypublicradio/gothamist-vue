/**
The features layer lets us decouple feature logic from experiment logic.
Make your in-app conditionals based on the feature toggle instead of on the
experiment itself

$features.$enabled - object containing feature names as keys and a boolean value: true (enabled) / false (disabled),
  this is where we add new feature toggles
$features.$classes - array of css classes, add these to the html body: feature-name-enabled or feature-name-disabled

This allows us to do things like:
- make experiments that enable multiple features
- toggle features based on logic that looks at query strings or build options
- quickly enable a feature after an experiment
*/

export default function ({ $exp }, inject) {
  const $enabled = {
    'tagless-homepage': $exp && $exp.name === 'test' && $exp.$variantIndexes.includes(1)
  }
  const $classes = Object.entries($enabled)
    .map(entry => entry[1] ? entry[0] + '-enabled' : entry[0] + '-disabled')
  inject('features', { $enabled, $classes })
}

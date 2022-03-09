/**

# Feature toggles

The feature toggle plugin was created to enable us to toggle a/b test experiment features
without the rest of the code needing to know anything about the a/b testing setup. The client code
shouldn't need to know what experiment id 123 variant 2 means, it just needs to know if  a feature is
enabled or disabled.

While it was created with a/b testing in mind it also has other applications:
https://en.wikipedia.org/wiki/Feature_toggle

## Properties

$features.enabled - An object containing feature names as keys and a boolean value: true (enabled) / false (disabled),
  this is where we add new feature toggles
$features.disabled - the inverse of disabled,
$features.classes - array of css classes, add these to the html body: feature-name-enabled or feature-name-disabled

This allows us to do things like:
- make experiments that enable multiple features
- toggle features based on logic that looks at query strings or build options
- quickly enable a feature after an experiment

## Using toggles within the app

### Using in css
.feature-name-enabled .some-other-class {
 --- some custom css ---
}

### Using in a template
<div "#some-div-to-hide" v-if="!$features.enabled['feature-name]">
</div>

### using in script
mounted () {
  if (this.$features.enabled['feature-name']) {
    --- code ---
  }
}

## Adding a feature toggle

First, decide if it makes sense for your feature to use a feature toggle. While there
are several cases where they're useful, too many toggles will create technical debt.

To add a new feature toggle, add your feature name and the condition to enable it to
the "enabled" object below. Also add a description of the feature and your name to aid
in cleaning up the toggle later

### Adding an google optimize toggle
Usefule

### Adding an environment variable based toggle
Useful when you need to integrate a feature into the main branch but aren't ready to deploy yet.

### Adding a query string based toggle
Useful for doing a "soft launch" of a feature that you need to see in the production
environment but aren't ready to release to all users.

## Cleaning up feature toggles

*/

export default function ({ $exp }, inject) {
  const enabled = {
    // Remove tags from the home page cards
    // Part of a Google Optimize a/b test
    // - Matt Walsh
    'experiment-tagless-homepage': $exp && $exp.name === 'test' && $exp.$variantIndexes.includes(1)
  }
  const disabled = {}
  for (const feature of Object.entries(enabled)) {
    disabled.push(feature[0], !!feature[1])
  }
  const classes = Object.entries(enabled)
    .map(entry => entry[1] ? entry[0] + '-enabled' : entry[0] + '-disabled')
  inject('features', { enabled, disabled, classes })
}

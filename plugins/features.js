// The features layer lets us decouple feature logic from experiment logic.
//
// Make your in-app conditionals based on the feature toggle instead of on the
// experiment i
//
// This allows us to do things like:
// - make experiments that enable multiple features
// - toggle features based on logic that looks at query strings or build options
// - quickly enable a feature after an experiment

export default function ({ $exp }, inject) {
  const features = {
    isBlueSquareEnabled: $exp && $exp.name === 'test' && $exp.$variantIndexes.includes(1)
  }
  inject('features', features)
}

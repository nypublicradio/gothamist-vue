export default {
  // A helper exp-{name}-{var} class will be added to the root element
  name: 'audio-player',

  // Google optimize experiment id
  experimentID: '1',

  // [optional] specify number of sections for MVT experiments
  // sections: 1,

  // [optional] maxAge for a user to test this experiment
  // maxAge: 60 * 60 * 24, // 24 hours,

  // [optional] Enable/Set experiment on certain conditions
  isEligible: ({ route }) => route.path === '/',

  // Implemented variants and their weights
  variants: [
    { weight: 1 }, // Original
    { weight: 1 } // Audio Player
  ]
}

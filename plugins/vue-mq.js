import Vue from 'vue'
import VueMq from 'vue-mq'

export default function () {
  Vue.use(VueMq, {
    breakpoints: { // default breakpoints - customize this
      xsmall: 768,
      small: 768,
      medium: 850,
      large: 1024,
      xlarge: 1280,
      xxlarge: 1500,
      xxxlarge: Infinity
    },
    defaultBreakpoint: 'xsmall' // customize this for SSR
  })
}

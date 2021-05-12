<template>
  <progress-bar :percent="scrollPercent" />
</template>

<script>
export default {
  name: 'ScrollMeter',
  components: {
    ProgressBar: () => import('nypr-design-system-vue/src/components/ProgressBar')
  },
  props: {
    scrollTargetSelector: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      scrollPercent: 0
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    handleScroll () {
      let target = document.querySelector(this.scrollTargetSelector)
      if (!target) {
        target = document.body
      }
      let distanceToTargetBottom = target.offsetHeight + target.offsetTop
      let parent = target.offsetParent
      while (parent) {
        distanceToTargetBottom += parent.offsetTop
        parent = parent.offsetParent
      }

      const scrolled = window.pageYOffset
      const windowHeight = window.innerHeight
      const progress = scrolled / (distanceToTargetBottom - windowHeight)
      const percent = Math.min(Math.max(0, progress * 100), 100)
      this.scrollPercent = percent
    }
  }
}
</script>

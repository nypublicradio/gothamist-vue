<template>
  <div id="disqus_thread" class="no-print" />
</template>

<script>
/*
EXAMPLE USAGE:
<disqus-embed
  identifier="8621007665"
  url="https://gothamist.com/news/what-will-happen-when-board-elections-ranks-votes"
/>
(identifier is the legacyId)
*/
export default {
  name: 'DisqusEmbed',
  props: {
    url: {
      type: String,
      default: null
    },
    identifier: {
      type: String,
      default: null
    },
    shortname: {
      type: String,
      default: 'gothamist'
    }
  },
  computed: {
    getShortname () {
      const shortname = this.shortname ? this.shortname : this.$disqus ? this.$disqus.shortname : null
      if (!shortname) {
        throw new Error('shortname is required')
      }
      return shortname
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.$disqus) {
        this.$disqus.reset = this.reset
      }
      if (window.DISQUS) {
        return this.reset()
      }
      const setBaseConfig = this.setBaseConfig
      window.disqus_config = function () {
        setBaseConfig(this)
      }
      this.loadEmbedScript()
      if (this.$route) {
        this.$watch('$route.path', () => this.reset())
      }
    },
    reset (dsq = window.DISQUS) {
      const setBaseConfig = this.setBaseConfig
      dsq.reset({
        reload: true,
        config () {
          setBaseConfig(this)
        }
      })
    },
    loadEmbedScript () {
      const d = document
      const s = d.createElement('script')
      s.setAttribute('id', 'embed-disqus')
      s.setAttribute('data-timestamp', (new Date()).toString())
      s.type = 'text/javascript'
      s.async = true
      s.src = `//${this.getShortname}.disqus.com/embed.js`
      ;(d.head || d.body).appendChild(s)
    },
    setBaseConfig (disqusConfig) {
      this.setPageConfig(disqusConfig)
      disqusConfig.language = 'en'
    },
    setPageConfig (disqusConfig) {
      const defaultConfig = {
        url: this.url,
        identifier: this.identifier
      }
      Object.assign(disqusConfig.page, defaultConfig)
    }
  }
}
</script>

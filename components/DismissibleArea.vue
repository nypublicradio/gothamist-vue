<template>
  <div v-show="shouldShow">
    <slot :handleDismissed="handleDismissed" />
  </div>
</template>
<script>
/**
   * Wrap an area to make it temporarily dismissible
   *
   * Usage Example:
   * <dismissible-area prefix="Reminder1">
   *    <template v-slot="dismissibleArea">
   *      <div>
   *        Reminder: Brush your teeth.
   *        <button name="close" @click="dismissibleArea.handleDismissed">Close</button>
   *      </div>
   *    </template>
   *  </dismissible-area>
   */

const oneMonth = 60 * 60 * 24 * 31
export default {
  props: {
    /**
     * A unique prefix used to name the cookies for this area.
    */
    prefix: {
      type: String,
      required: true
    },
    /**
     * Delay actually showing this area until a certain number of pageviews.
     * Resets when the banner is dismissed.
     */
    viewsBeforeShowable: {
      type: Number,
      default: 0
    },
    /**
     * Number of seconds before showing the area again, once it's been dismissed.
     */
    dismissedTimeout: {
      type: Number,
      default: 60 * 60 * 24 // One day
    }
  },
  data () {
    return {
      wasDismissed: false,
      views: 0
    }
  },
  computed: {
    shouldShow () {
      return !this.wasDismissed && (this.views >= this.viewsBeforeShowable)
    }
  },
  beforeMount () {
    this.wasDismissed = this.$cookies.get(`${this.prefix}Dismissed`)
    if (!this.wasDismissed) {
      const views = Number(this.$cookies.get(`${this.prefix}Views`)) || 0
      this.views = views + 1
      this.$cookies.set(`${this.prefix}Views`, this.views, { path: '/', maxAge: oneMonth })
    }
  },
  methods: {
    handleDismissed () {
      this.wasDismissed = true
      this.$cookies.set(`${this.prefix}Dismissed`, true, { path: '/', maxAge: this.dismissedTimeout })
      this.$cookies.set(`${this.prefix}Views`, 0, { path: '/', maxAge: oneMonth })
      this.showDonateBanner = false
    }
  }

}
</script>

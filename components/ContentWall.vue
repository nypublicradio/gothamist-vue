<template>
  <div>
    <slot v-if="showContent" name="full" />
    <slot v-if="!showContent" name="leadin" />
    <slot v-if="!showContent" name="wall" :dismiss="dismiss" />
  </div>
</template>

<script>
export default {
  name: 'ContentWall',
  props: {
    showContent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    dismiss () {
      this.showContent = true
    }
  }
}
</script>

<style lang="scss">

</style>

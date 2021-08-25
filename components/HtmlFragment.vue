<template>
  <div v-html="html" />
</template>
<script>
export default {
  props: {
    html: { type: String, required: false, default: null }
  },
  mounted () {
    const element = this.$el
    const parent = element.parentNode

    // Move all children node to the parent
    while (element.firstChild) {
      element.firstChild.classList?.add('streamfield-block')
      parent.insertBefore(element.firstChild, element)
    }

    // `element` becomes an empty element
    // Remove it from the parent
    parent.removeChild(element)
  }
}
</script>

<template>
  <div class="l-container">
    <h1>test page!</h1>
    <v-button label="internal link" />
    <v-button external label="external link" />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    VButton: () => import('nypr-design-system-vue/src/components/VButton')
  },
  head () {
    return {
      title: 'test page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'test page'
        }
      ]
    }
  }
}
</script>

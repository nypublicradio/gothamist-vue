<template>
  <div class="l-container">
    <h1 class="is-vishidden">
      Livestream WNYC FM 93.9 and AM 820
    </h1>
    <main-player
      :image="$store.getters['whatsOnNow/image']"
      :title="$store.getters['whatsOnNow/title']"
      :title-link="$store.getters['whatsOnNow/titleLink']"
      :details="$store.getters['whatsOnNow/details']"
      :details-link="$store.getters['whatsOnNow/detailsLink']"
      :time="$store.getters['whatsOnNow/time']"
    />
    <v-spacer size="double" />
    <p>
      <nuxt-link to="/test">
        test page
      </nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    MainPlayer: () => import('nypr-design-system-vue/src/components/MainPlayer')
  },
  head () {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'test'
        }
      ]
    }
  }
}
</script>

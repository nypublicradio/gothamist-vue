<template>
  <div>
    <div class="l-container">
      <v-spacer size="quad" />
      <p>
        home page
        <nuxt-link to="kim">
          kim's test page
        </nuxt-link>
      </p>
      <v-spacer size="quad" />
      <read-more-in />
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
import gtm from '@/mixins/gtm'

export default {
  name: 'HomePage', // this is the template name which is used for GTM
  components: {
    ReadMoreIn: () => import('../components/ReadMoreIn'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  },
  mixins: [gtm]
}
</script>

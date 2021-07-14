<template>
  <div class="do-you-know-the-scoop u-reversed-out o-3d-heading">
    <strong>Do you know the scoop?</strong>
    <!-- eslint-disable-next-line -->
    <template v-if="!disableComments"><nuxt-link to="#comments">Comment</nuxt-link> below or</template>
    <a
      :href="'mailto:' + tipsEmail"
      target="_blank"
      rel="noopener"
    >Send us a Tip</a>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DoYouKnowTheScoop',
  props: {
    disableComments: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('global', {
      tipsEmail: state => state.tipsEmail
    })
  }
}
</script>

<style lang="scss">
.do-you-know-the-scoop {
  width: 100%;
  padding: var(--space-4) !important;
  @include typeface(body, 6);
}

.do-you-know-the-scoop strong {
  margin-right: var(--space-2);
}

.do-you-know-the-scoop a:hover {
  text-decoration: underline;
}
</style>

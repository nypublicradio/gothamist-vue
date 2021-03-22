<template>
  <div class="do-you-know-the-scoop u-reversed-out o-3d-heading">
    <strong>Do you know the scoop?</strong>
    <a href="#comments">Comment</a> below or
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

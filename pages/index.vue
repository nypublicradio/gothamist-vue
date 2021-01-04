<template>
  <div>
    <div class="l-container">
      <lazy-hydrate ssr-only>
        <p>content goes here</p>
      </lazy-hydrate>
      <v-spacer />
    </div>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

export default {
  name: 'HomePage',
  components: {
    LazyHydrate,
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  }
}
</script>

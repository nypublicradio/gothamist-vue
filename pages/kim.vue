<template>
  <div>
    <div class="l-container">
      <v-spacer size="quad" />
      <p>kim's test page</p>
      <v-spacer size="quad" />
      <Breadcrumbs :breadcrumbs="[{title: 'News', url:'/news'},{title: 'Opinion', url:'/opinion'}]" />
      <v-spacer size="quad" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'KimTestPage',
  components: {
    Breadcrumbs: () => import('../components/Breadcrumbs'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer')
  }
}
</script>

<template>
  <div class="o-breadcrumbs">
    <a
      :href="url"
      class="o-breadcrumb"
    >{{ title }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    url: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  }
}
</script>

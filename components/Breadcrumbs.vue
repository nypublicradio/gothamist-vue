<template>
  <div class="breadcrumbs">
    <v-tag
      v-for="(crumb, index) in breadcrumbs"
      :key="index"
      :name="crumb.name"
      :slug="crumb.slug"
    />
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  components: {
    VTag: () => import('nypr-design-system-vue/src/components/VTag')
  },
  props: {
    breadcrumbs: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss">
.breadcrumbs {
  position: relative;

  &::before {
    content: "";
    z-index: -1;
    height: 1px;
    width: 100%;
    position: absolute;
    left: 0;
    top: calc(50% - 2px);
    @include border-accent;
    background-image: linear-gradient(to right, transparent 50%, RGB(var(--color-gray)) 50%);
  }
}
</style>

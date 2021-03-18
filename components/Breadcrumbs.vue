<template>
  <div class="breadcrumbs">
    <a
      v-for="(crumb, index) in breadcrumbs"
      :key="index"
      :href="crumb.url"
      class="breadcrumb-crumb"
    >{{ crumb.title }}</a>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
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
  margin-right: var(--space-3);

  &::before {
    content: "";
    z-index: -1;
    height: 1px;
    width: 100%;
    position: absolute;
    left: 3px;
    top: calc(50% + 1px);
    @include border-accent;
    background-image: linear-gradient(to right, transparent 50%, RGB(var(--color-gray)) 50%);
  }
}

.breadcrumb-crumb {
  @include typeface(small, 1);
  margin-right: var(--space-3);
  @include media(">=medium") {
    font-size: var(--font-size-3);
    line-height: var(--line-height-3);
    font-weight: bold;
  }
  background-color: RGB(var(--color-tag-background));
  padding: 2px 6px 3px;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
  color: RGB(var(--color-tag-text));
  font-weight: bold;
}
</style>

<template>
  <a
    aria-label="back to top"
    class="back-to-top"
    tabindex="0"
    @click="scrollToTop"
    @keypress.enter.space.prevent="scrollToTop"
  >
    <span class="back-to-top-icon"><gothamist-arrow /></span> Back To Top
  </a>
</template>

<script>
export default {
  name: 'BackToTop',
  components: {
    GothamistArrow: () => import('nypr-design-system-vue/src/components/icons/gothamist/GothamistArrow')
  },
  methods: {
    scrollToTop () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss">
.back-to-top {
  @include typeface(small, 3);
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 700;
  color: RGB(var(--color-text));
  margin: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;

  &:hover {
    text-decoration: none;
    color: RGB(var(--color-reddish-orange));

    .back-to-top-icon {
      animation: bounce .8s 0s ease-in-out infinite;
    }
  }
}

.back-to-top svg {
  margin-right: var(--space-1);
  height: 30px;
  transform: rotate(-90deg);
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

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
import gtm from '@/mixins/gtm'

export default {
  name: 'BackToTop',
  mixins: [gtm],
  methods: {
    scrollToTop () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
      this.gaEvent('Click Tracking', 'Back To Top')
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

    .back-to-top-icon svg {
      animation: bounceVertical .8s 0s ease-in-out infinite;
    }
  }
}

.back-to-top-icon {
  transform: rotate(-90deg);
}

.back-to-top svg {
  margin: 0 var(--space-1);
  height: 30px;
}

@keyframes bounceVertical {
  0%, 100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
}
</style>

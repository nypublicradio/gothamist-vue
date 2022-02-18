<template>
  <div
    v-if="active"
    class="product-marketing-banner o-3d-heading no-print"
    :class="{ 'product-marketing-banner-active': active }"
  >
    <div class="product-marketing-banner-close" @click="active = false">
      <close-icon />
    </div>
    <div class="product-marketing-banner-content">
      <h3 class="product-marketing-banner-heading">
        {{ title }}
      </h3>
      <div>
        <div
          class="product-marketing-banner-description"
          v-html="description"
        />
        <v-button
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
          class="product-marketing-banner-button"
          :label="cta"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProductMarketingBanner',
  props: {
    cta: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      active: true
    }
  },
  computed: {
    ...mapState('global', {
      donateUrl: state => state.donateUrl
    })
  }
}
</script>

<style lang="scss">
.product-marketing-banner {
  position: relative;
  width: 100%;
  align-items: center;
  padding-right: var(--space-3);

  &::after {
    background-color: RGB(var(--color-background-highlight)) !important;
  }
}

.product-marketing-banner .product-marketing-banner-content {
  text-align: center;
  padding: var(--space-4) var(--space-4) var(--space-4);
  @include media('>large') {
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
}

.product-marketing-banner
  .product-marketing-banner-content
  .product-marketing-banner-heading {
  text-align: center;
  @include typeface(header, 8);
  font-weight: bold;
  @include media('>large') {
    text-align: right;
    @include typeface(header, 10);
    padding-right: var(--space-7);
  }
}

.product-marketing-banner
  .product-marketing-banner-content
  .product-marketing-banner-description {
  font-size: var(--font-size-5);
  line-height: 1.45;
  margin-bottom: var(--space-2);
  @include media('>large') {
    margin-bottom: var(--space-3);
    @include typeface(body, 6);
  }
}

.product-marketing-banner .product-marketing-banner-close {
  position: absolute;
  cursor: pointer;
  top: var(--space-1);
  right: var(--space-1);
  width: 30px;
  height: 30px;
  padding: 6px;
  transition: var(--animation-duration-standard);

  &:hover {
    opacity: var(--opacity-hover);
  }
}

.product-marketing-banner .product-marketing-banner-button {
  background-color: RGB(var(--color-reddish-orange));
  border: 0;
  margin-top: var(--space-3);
  height: 60px;
  padding-right: var(--space-5);
  padding-left: var(--space-5);
  @include media('>large') {
    margin-top: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    border: 3px solid RGB(var(--color-reddish-orange));
    transform: translate(0, 0);
  }

  &:hover {
    background-color: RGB(var(--color-reddish-orange));

    &::before {
      transform: translate(-10px, 10px);
    }
  }

  &:active {
    background-color: RGB(var(--color-reddish-orange));
  }
}

.product-marketing-banner .product-marketing-banner-button .button-label {
  font-weight: bold !important;
  font-size: 18px !important;
  letter-spacing: 2px;
  color: RGB(var(--color-white));
}
</style>

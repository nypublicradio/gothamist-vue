<template>
  <div
    v-if="active"
    class="donate-banner"
    :class="{'is-active': active}"
  >
    <div class="donate-banner-graphic">
      <nyc-love />
    </div>
    <div
      class="donate-banner-close"
      @click="closeBanner"
    >
      <close-icon />
    </div>
    <div class="donate-banner-content">
      <p>Help fund the local coverage you rely on. Back the extra reporting you need during this global pandemic.</p>
      <v-button
        :href="donateUrl"
        target="_blank"
        class="donate-banner-button"
        label="Donate Now"
        @click="donateClick"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DonateBanner',
  components: {
    CloseIcon: () => import('nypr-design-system-vue/src/components/icons/CloseIcon'),
    NycLove: () => import('nypr-design-system-vue/src/components/icons/gothamist/NycLove'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton')
  },
  props: {
    onscreen: {
      type: Boolean,
      default: false
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
  },
  methods: {
    closeBanner () {
      this.active = false
      this.$emit('close')
    },
    donateClick () {
      this.$emit('donate-click')
    }
  }
}
</script>

<style lang="scss">
.donate-banner {
  padding: var(--space-5);
  width: 100%;
  max-width: 270px;
  position: fixed;
  z-index: 9999;
  right: 20px;
  bottom: 50px;
  background-color: RGB(var(--color-background-highlight));
  align-items: center;
  box-shadow: 0 0 10px RGB(0 0 0 / 20%);
  border: var(--border-standard);

  right: calc(-1 * ((var(--grid-col-width) * 15) + (var(--grid-gutter) * 13)));
  transform: translateX(0);
  transition: transform .2s cubic-bezier(.86,0,.07,1);

  &::before {
    content: "";
    position: absolute;
    left: -3px;
    top: -3px;
    width: 120px;
    height: 90px;
    background-color: RGB(var(--color-background-highlight));
  }

  @include media(">large") {
    width: 980px;
    max-width: calc(100% - var(--space-6));
  }
}

.donate-banner.is-onscreen {
    transform: translateX(calc(-1 * (var(--grid-col-width) * 15 + var(--grid-gutter) * 13 + var(--space-3))));
}

.donate-banner .donate-banner-content {
  @include media(">large") {
    padding: 0 var(--space-3) 0 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.donate-banner .donate-banner-content p {
  width: 100%;
  position: relative;
  @include media(">large") {
    width: calc(65% - var(--space-3));
  }
}

.donate-banner .donate-banner-close {
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

.donate-banner .donate-banner-graphic {
  width: 120px;
  height: 133px;
  position: relative;
  margin-left: -55px;
  margin-top: -95px;
  margin-right: var(--space-2);
  float: left;
  @include media(">large") {
    float: none;
    margin: 0;
    position: absolute;
    left: calc(var(--space-3) * -1);
    top: calc(var(--space-3) * -1);
  }

  svg {
    display: block;
  }

  path {
    fill: RGB(var(--color-dusk-blue));
  }
}

.donate-banner .donate-banner-button {
  background-color: RGB(var(--color-reddish-orange));
  border: 0;
  margin-top: var(--space-3);
  height: 60px;
  width: 100%;
  @include media(">large") {
    width: calc(35% - var(--space-3));
    margin-top: 0;
  }

  &::before {
    content: "";
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

.donate-banner .donate-banner-button .button-label {
  font-weight: bold !important;
  font-size: 18px !important;
  letter-spacing: 2px;
  color: RGB(var(--color-white));
}
</style>

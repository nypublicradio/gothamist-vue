<template>
  <div class="homepage-donate-banner">
    <div class="homepage-donate-banner-content">
      <div class="homepage-donate-banner-graphic">
        <nyc-love />
      </div>
      <p>Help fund the local coverage you rely on. Back the extra reporting you need during this global pandemic.</p>
      <v-button
        :href="donateUrl"
        target="_blank"
        class="homepage-donate-banner-button"
        label="Donate"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DonateBanner',
  components: {
    NycLove: () => import('nypr-design-system-vue/src/components/icons/gothamist/NycLove'),
    VButton: () => import('nypr-design-system-vue/src/components/VButton')
  },
  computed: {
    ...mapState('global', {
      donateUrl: state => state.donateUrl
    })
  }
}
</script>

<style lang="scss">
.homepage-donate-banner {
  position: relative;
  margin-top: var(--space-8);
  padding: var(--space-5);
  width: 100%;
  background-color: RGB(var(--color-background-highlight));
  align-items: center;
  box-shadow: 0 0 10px RGB(0 0 0 / 20%);
  border: var(--border-standard);
  border-left: none;
  border-right: none;

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
    margin-top: var(--space-4);
    &::before {
      display: none;
    }
  }
}

.homepage-donate-banner .homepage-donate-banner-content {
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  @include media(">large") {
    max-width: 895px;
    margin: auto;
    padding: 0 var(--space-3) 0 100px;
    display: flex;
    justify-content: space-between;
  }
}

.homepage-donate-banner .homepage-donate-banner-content p {
  width: 100%;
  position: relative;
  text-align: left;
  @include media(">large") {
    width: calc(65% - var(--space-3));
  }
}

.homepage-donate-banner .homepage-donate-banner-graphic {
  width: 120px;
  height: 133px;
  margin-left: -32px;
  margin-top: -105px;
  position: relative;
  float: left;
  @include media(">large") {
    position: absolute;
    float: none;
    top: -55px;
    left: -32px;
    margin: 0;
  }

  svg {
    display: block;
  }

  path {
    fill: RGB(var(--color-dusk-blue));
  }
}

.homepage-donate-banner .homepage-donate-banner-button {
  background-color: RGB(var(--color-reddish-orange));
  border: 0;
  margin-top: var(--space-3);
  height: 60px;
  width: 100%;
  max-width: 400px;
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

.homepage-donate-banner .homepage-donate-banner-button .button-label {
  font-weight: bold !important;
  font-size: 18px !important;
  letter-spacing: 2px;
  color: RGB(var(--color-white));
}
</style>

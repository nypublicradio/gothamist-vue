<template>
  <div v-if="productMarketingBanner && productMarketingBanner.length > 0" class="gothamist-marketing-banners">
    <template
      v-for="(banner, index) in productMarketingBanner"
      class="l-container l-container--xl l-wrap"
    >
      <product-marketing-banner
        v-if="banner.value"
        :key="index"
        class="gothamist-marketing-banners-banner"
        :title="banner.value.title"
        :description="banner.value.description"
        :cta="banner.value.buttonText"
        :link="banner.value.buttonLink"
      />
    </template>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.productMarketingBanner = await this.$axios
      .get('/system_messages/2/')
      .then(response => response.data.productBanners)
  },
  data () {
    return {
      productMarketingBanner: null
    }
  }
}
</script>
<style>
.gothamist-marketing-banners-banner {
   margin-bottom: var(--space-9);
}
</style>

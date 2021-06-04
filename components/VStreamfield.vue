<template>
  <div class="streamfield">
    <div
      v-for="block in streamfield"
      :key="block.id"
      class="streamfield-block"
    >
      <!-- block-quote -->
      <div v-if="block.type === 'block-quote'">
        <blockquote>
          <p>
            {{ block.value.block_quote }}
          </p>
        </blockquote>
      </div>

      <!-- code -->
      <div
        v-else-if="block.type === 'code'"
        v-html="block.value.code"
      />

      <!-- embed -->
      <div
        v-else-if="block.type === 'embed'"
        v-html="block.value.code"
      />

      <!-- heading -->
      <div v-else-if="block.type === 'heading'">
        <h3>{{ block.value }}</h3>
      </div>

      <!-- image -->
      <div v-else-if="block.type === 'image'">
        <image-with-caption
          variation="gothamist"
          :alt-text="block.value.image.alt"
          :caption="block.value.caption || block.value.image.caption"
          :credit="block.value.image.credit"
          :credit-url="block.value.image.creditLink"
          :image="block.value.image.file"
          :width="block.value.image.width"
          :height="block.value.image.height"
        />
      </div>

      <!-- paragraph -->
      <div
        v-else-if="block.type === 'paragraph'"
        v-html="block.value"
      />

      <!-- pull-quote -->
      <div v-else-if="block.type === 'pull-quote'">
        <pull-quote
          :quote="block.value.pull_quote"
          :author="block.value.attribution"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Streamfield',
  components: {
    ImageWithCaption: () => import('nypr-design-system-vue/src/components/ImageWithCaption'),
    PullQuote: () => import('nypr-design-system-vue/src/components/PullQuote')
  },
  props: {
    streamfield: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.streamfield-block {
  margin-bottom: var(--space-3);

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>

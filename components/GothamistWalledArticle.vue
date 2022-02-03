<template>
  <ContentWall class="content-wall" @dismissed="handleDismissed">
    <template v-slot:full>
      <v-streamfield
        :key="article.uuid"
        ref="article-body"
        class="l-container l-container--10col article-body c-article__body"
        :streamfield="article.body"
      />
    </template>
    <template v-slot:leadin>
      <LazyHydrate when-visible>
        <v-streamfield
          :streamfield="article.body"
          class="leadin l-container l-container--10col article-body c-article__body"
        />
      </LazyHydrate>
    </template>
    <template v-slot:wall="wall">
      <div class="wall-wrapper">
        <GothamistWallNewsletter @wallCleared="wall.dismiss" />
      </div>
    </template>
  </ContentWall>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import ContentWall from './ContentWall'
import GothamistWallNewsletter from './GothamistWallNewsletter'

export default {
  name: 'GothamistWalledArticle',
  components: {
    ContentWall,
    GothamistWallNewsletter,
    LazyHydrate
  },
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleDismissed () {
      this.$emit('wallDismissed')
    }
  }
}
</script>

<style lang="scss">
.content-wall {
  --content-wall-height: 400px;
  position: relative;
  min-height: var(--content-wall-height);
}

.leadin  {
  max-height: var(--content-wall-height);
  overflow: hidden;
}

.wall-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  height: var(--content-wall-height);
  background: linear-gradient(rgba(255,255,255,0) 5%, rgba(255,255,255,1) 80%);
  padding: calc(var(--line-height-6) * var(--font-size-6) * 3) var(--space-2) 0;
  @include media(">medium") {
    padding: calc(var(--line-height-6) * var(--font-size-6) * 3) 96px 0;
  }
}
</style>

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
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="scss">
.content-wall {
  position: relative;
}

.leadin  {
  max-height: 400px;
  overflow: hidden;
}
.wall-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  height: 400px;
  background: linear-gradient(rgba(255,255,255,0) 15%, rgba(255,255,255,1) 70%);
  padding: 32px 96px;
}

</style>

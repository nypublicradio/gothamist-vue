<template>
  <div class="recent-stories">
    <v-card
      class="gothamist mod-small"
      image="http://placehold.it/150x150"
      :image-height="150"
      :image-width="150"
      title="'What’s The Point?': A Year After COVID Shut Down NYC Schools, Many Students Struggle To Cope"
      title-link="http://www.google.com"
      :tags="[{text: 'news',href: '/news'},{text: 'sponsored',href: ''}]"
    >
      <article-metadata
        publish-date="2 HOURS AGO"
      >
        <template v-slot:comments>
          <v-counter
            icon="comment"
            value="40"
            href="http://www.google.com"
          />
        </template>
      </article-metadata>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'RecentStories',
  components: {
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard')
  }
}
</script>

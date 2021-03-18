<template>
  <div>
    <div class="l-container">
      <v-spacer size="quad" />
      <p>kim's test page</p>
      <v-spacer size="quad" />
      <Breadcrumbs :breadcrumbs="[{title: 'News', url:'/news'},{title: 'Opinion', url:'/opinion'}]" />
      <v-spacer size="quad" />
      <v-card
        show-gallery-icon
        class="gothamist mod-vertical mod-large"
        image="http://placehold.it/640x430"
        :image-height="150"
        :image-width="150"
        title="'What’s The Point?': A Year After COVID Shut Down NYC Schools, Many Students Struggle To Cope"
        title-link="http://www.google.com"
        subtitle="Here's what the latest Campaign Finance Board filings tell us."
        :tags="[{'name': 'news','slug': 'news'},{'name': 'sponsored','slug': ''}]"
      >
        <article-metadata
          publish-date="Jan 1, 2020 1:25PM"
          updated-date="Mar 2, 2020 10:08AM"
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
      <v-spacer size="quad" />
      <v-card
        show-gallery-icon
        class="gothamist mod-small"
        image="http://placehold.it/150x150"
        :image-height="150"
        :image-width="150"
        title="'What’s The Point?': A Year After COVID Shut Down NYC Schools, Many Students Struggle To Cope"
        title-link="http://www.google.com"
        :tags="[{'name': 'news','slug': 'news'},{'name': 'sponsored','slug': ''}]"
      >
        <article-metadata
          publish-date="Jan 1, 2020 1:25PM"
          updated-date="Mar 2, 2020 10:08AM"
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
  </div>
</template>

<script>
export default {
  name: 'KimTestPage',
  components: {
    Breadcrumbs: () => import('../components/Breadcrumbs'),
    VSpacer: () => import('nypr-design-system-vue/src/components/VSpacer'),
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    VCard: () => import('nypr-design-system-vue/src/components/VCard'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter')
  }
}
</script>

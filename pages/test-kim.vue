<template>
  <div>
    <article-metadata
      publish-date="test"
      updated-date="test"
    >
      <template
        #comments
      >
        <v-counter
          icon="comment"
          :value="10"
          href="https://www.google.com"
        />
      </template>
    </article-metadata>
    <br>
    <br>
    <disqus-embed
      :identifier="8645630297"
      url="https://gothamist.com/news/cuomo-drops-plan-place-essential-workers-monument-near-irish-hunger-memorial"
    />
  </div>
</template>

<script>
export default {
  name: 'KimTestPage', // this is the template name which is used for GTM
  components: {
    DisqusEmbed: () => import('../components/DisqusEmbed'),
    ArticleMetadata: () => import('nypr-design-system-vue/src/components/ArticleMetadata'),
    VCounter: () => import('nypr-design-system-vue/src/components/VCounter')
  }
}
</script>

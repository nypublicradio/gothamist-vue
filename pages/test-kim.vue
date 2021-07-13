<template>
  <div>
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
    DisqusEmbed: () => import('../components/DisqusEmbed')
  }
}
</script>

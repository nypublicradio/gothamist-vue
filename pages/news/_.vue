<template>
  <div>
    <Article />
  </div>
</template>

<script>
export default {
  name: 'News',
  components: {
    Article: () => import('../../components/Article')
  }
}
</script>

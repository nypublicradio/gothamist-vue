<template>
  <div>
    <Article />
  </div>
</template>

<script>
export default {
  name: 'Food',
  components: {
    Article: () => import('../../components/Article')
  }
}
</script>

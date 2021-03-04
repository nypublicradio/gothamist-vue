<template>
  <div>
    <Article />
  </div>
</template>

<script>
export default {
  name: 'Miscellaneous',
  components: {
    Article: () => import('../../components/Article')
  }
}
</script>

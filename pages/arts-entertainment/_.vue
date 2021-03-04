<template>
  <div>
    <Article />
  </div>
</template>

<script>
export default {
  name: 'ArtsAndEntertainment',
  components: {
    Article: () => import('../../components/Article')
  }
}
</script>

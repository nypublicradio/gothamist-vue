<template>
  <div class="l-container">
    <h1 v-if="error.statusCode === 404">404 page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Go back to the home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

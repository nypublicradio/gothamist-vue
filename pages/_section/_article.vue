<template>
  <div>
    <Article :article="page" />
  </div>
</template>

<script>
export default {
  name: 'ArtsAndEntertainment',
  components: {
    Article: () => import('../../components/Article')
  },
  async asyncData ({ $axios, params, error }) {
    const path = `${params.section}/${params.article}`
    const page = await $axios.get(`/pages/find/?html_path=${path}`)
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return { page: page?.data }
  }
}
</script>

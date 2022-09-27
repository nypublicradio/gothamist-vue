<template>
  <div />
</template>

<script>
export default {
  beforeMount () {
    const targetPath = 'https://gothamist.com' + this.$route.query.target || ''
    const oneMonth = 60 * 60 * 24 * 31
    this.$cookies.set('betaLot', '1', { path: '/', maxAge: oneMonth })
    window.location.href = targetPath
  }
}
</script>

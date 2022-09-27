<template>
  <div />
</template>

<script>
export default {
  beforeMount () {
    const targetPath = 'https://gothamist.com' + this.$route.query.target || ''
    const cookieOptions = {
      secure: true,
      httpOnly: true,
      expires: 'Thu, 01 Dec 2022 05:00:00 GMT'
    }
    this.$cookies.set('betaLot', '1', cookieOptions)
    window.location.href = targetPath
  }
}
</script>

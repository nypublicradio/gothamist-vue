<template>
  <div class="beta-opt-in">
    A new Gothamist is coming! We’ve moved comments over to our beta site. <a :href="`beta-opt-in/${redirectTo ? '?target=' + redirectTo : ''} `">Click here to join the conversation and get a preview of our new website.</a>
  </div>
</template>
<script>
export default {
  name: 'BetaOptIn',
  props: {
    redirectTo: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.beta-opt-in {
  background-color: RGB(var(--color-background-standard));
  border: 3px solid RGB(var(--color-border-standard));
  padding: var(--space-5) var(--space-4);
  margin-bottom: var(--space-6);
}

.beta-opt-in a {
  text-decoration: underline;
    text-decoration: var(--text-decoration-link);
    text-underline-position: under;
    border-bottom: none;
    cursor: pointer;
    padding-bottom: 2px;
    border-bottom: 2px dotted RGB(var(--color-link));
    text-decoration: none;
    color: RGB(var(--color-link));

    &:hover {
      color: RGB(var(--color-link-hover));
      background-color: RGB(var(--color-reddish-orange));
    }
}
</style>

<template>
  <div class="read-more-in">
    <div class="read-more-in-text">
      Read More In:
    </div>
    <ul class="read-more-in-links">
      <li
        v-for="(item, key) in readMoreNav"
        :key="key"
        class="read-more-in-links-item"
      >
        <nuxt-link :to="item.url">
          {{ item.text }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ReadMoreIn',
  computed: {
    ...mapState('global', {
      readMoreNav: state => state.readMoreNav
    })
  }
}
</script>

<style lang="scss">
.read-more-in {
  border-top: 2px dashed RGB(var(--color-border-standard));
  border-bottom: 2px dashed RGB(var(--color-border-standard));
  padding: var(--space-5) var(--space-3);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @include media(">medium") {
    flex-direction: row;
    border: 2px dashed RGB(var(--color-border-standard));
  }
}

.read-more-in-text {
  @include typeface(small, 3);
  text-transform: uppercase;
  color: RGB(var(--color-dark-gray));
  margin-bottom: var(--space-3);
  @include media(">medium") {
    margin-right: var(--space-3);
    margin-bottom: 0;
  }
}

.read-more-in-links {
  list-style: none;
}

.read-more-in-links-item {
  display: inline-block;
  position: relative;
  padding: 0 1em;
  margin-bottom: var(--space-3);
  @include media(">medium") {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    background-color: rgba(var(--color-black), .358);
    left: -4px;
    top: calc(50% - 2px);
    width: 3px;
    height: 3px;
    display: block;
    border-radius: 50%;
  }

  &:first-of-type {
    &::before {
      display: none;
    }
  }
}

.read-more-in-links-item a {
  @include typeface(body, 7);
  font-family: var(--font-family-pragati);
  font-weight: bold;
  color: RGB(var(--color-reddish-orange));
  border-bottom: 2px dotted RGB(var(--color-reddish-orange));
  text-decoration: none;

  &:hover {
    background-color: RGB(var(--color-reddish-orange));
    color: RGB(var(--color-white));
  }
}
</style>

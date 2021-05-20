<template>
  <div class="staff-card">
    <div class="l-grid l-grid--2x3 u-space--bottom">
      <img
        :src="image"
        :alt="name"
      >
      <div>
        <h3 class="staff-card-name">
          {{ name }}
        </h3>
        <p class="staff-card-title">
          {{ title }}<span v-if="articleLink" class="staff-card-articles"><a :href="/staff/ + articleLink" class="staff-card-link">Articles</a></span>
        </p>
        <div class="staff-card-sharelinks">
          <slot />
        </div>
        <p
          class="staff-card-description"
          v-html="description"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffCard',

  props: {
    name: {
      type: String,
      default: null
    },

    title: {
      type: String,
      default: null
    },

    articleLink: {
      type: String,
      default: null
    },

    image: {
      type: String,
      default: null
    },

    description: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.staff-card-name {
  @include typeface(header, 10);
  margin-bottom: var(--space-2);
}

.staff-card-title {
  @include typeface(small, 3);
  text-transform: uppercase;
  font-weight: bold;
  color: RGB(var(--color-gray));
  margin: var(--space-3) 0;
}

.staff-card-link {
  padding-bottom: 2px;
  border-bottom: 2px dotted RGB(var(--color-border-standard));
  text-decoration: none;
  font-weight: normal;

  &:hover {
    background-color: RGB(var(--color-reddish-orange));
  }
}

.staff-card-articles {
  &::before {
    content: "•";
    color: RGB(var(--color-text));
    display: inline-block;
    line-height: 1;
    margin: 0 var(--space-2);
  }
}

.staff-card-sharelinks {
  margin: var(--space-4) 0;
}

.staff-card-description a,
.staff-card-description a:visited,
.staff-card-description a:active {
  padding-bottom: 2px;
  border-bottom: 2px dotted RGB(var(--color-border-standard));
  text-decoration: none;
  font-weight: normal;

  &:hover {
    background-color: RGB(var(--color-reddish-orange));
  }
}
</style>
